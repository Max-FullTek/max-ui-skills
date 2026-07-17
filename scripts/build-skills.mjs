import { createHash } from "node:crypto";
import { access, copyFile, cp, lstat, mkdtemp, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getThemeConfig, listThemeConfigs, skillCatalog } from "./skill-catalog.mjs";
import { validateSkillDirectory, validateSkillInIsolation } from "./skill-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(repoRoot, "source");
const skillsRoot = path.join(repoRoot, "skills");
const toPosix = (value) => value.split(path.sep).join("/");
const normalizeText = (value) => value.replace(/\r\n?/g, "\n");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function parseArguments(arguments_) {
  let checkOnly = false;
  let themeName;
  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (argument === "--check") {
      checkOnly = true;
    } else if (argument === "--theme") {
      if (!arguments_[index + 1]) throw new Error("--theme requires a theme name");
      themeName = arguments_[index + 1];
      index += 1;
    } else if (argument.startsWith("--theme=")) {
      themeName = argument.slice("--theme=".length);
      if (!themeName) throw new Error("--theme requires a theme name");
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  return { checkOnly, themes: themeName ? [getThemeConfig(themeName)] : listThemeConfigs() };
}

const { checkOnly, themes } = parseArguments(process.argv.slice(2));

async function pathExists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function sortedEntries(directory) {
  return (await readdir(directory, { withFileTypes: true })).sort((left, right) =>
    left.name.localeCompare(right.name, "en"),
  );
}

async function assertNoSymlinks(target, label = target) {
  const info = await lstat(target);
  if (info.isSymbolicLink()) throw new Error(`Symbolic links are not allowed: ${label}`);
  if (!info.isDirectory()) return;
  for (const entry of await sortedEntries(target)) {
    await assertNoSymlinks(path.join(target, entry.name), path.join(label, entry.name));
  }
}

async function copyTextFile(source, destination, rewrite = (value) => value) {
  const info = await lstat(source);
  if (info.isSymbolicLink() || !info.isFile()) throw new Error(`Expected a regular file: ${source}`);
  const text = rewrite(normalizeText(await readFile(source, "utf8")));
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, text, "utf8");
}

async function copyOpaqueFile(source, destination) {
  const info = await lstat(source);
  if (info.isSymbolicLink() || !info.isFile()) throw new Error(`Expected a regular opaque asset: ${source}`);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(source, destination);
}

function assertSafeRelativePath(relative, label) {
  if (
    typeof relative !== "string" ||
    relative.length === 0 ||
    relative.includes("\\") ||
    /^[A-Za-z]:/.test(relative) ||
    relative !== toPosix(relative) ||
    path.posix.isAbsolute(relative) ||
    relative.split("/").some((segment) => segment === "" || segment === "." || segment === "..")
  ) {
    throw new Error(`Invalid ${label}: ${relative}`);
  }
}

async function copyTextTree(source, destination, rewrite = (value) => value) {
  await assertNoSymlinks(source);
  for (const entry of await sortedEntries(source)) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) await copyTextTree(from, to, rewrite);
    else if (entry.isFile()) await copyTextFile(from, to, rewrite);
    else throw new Error(`Unsupported filesystem entry: ${from}`);
  }
}

async function listFiles(directory, prefix = "") {
  const files = [];
  for (const entry of await sortedEntries(directory)) {
    const absolute = path.join(directory, entry.name);
    const relative = prefix ? path.join(prefix, entry.name) : entry.name;
    const info = await lstat(absolute);
    if (info.isSymbolicLink()) throw new Error(`Symbolic links are not allowed: ${absolute}`);
    if (info.isDirectory()) files.push(...(await listFiles(absolute, relative)));
    else if (info.isFile()) files.push(toPosix(relative));
    else throw new Error(`Unsupported filesystem entry: ${absolute}`);
  }
  return files.sort((left, right) => left.localeCompare(right, "en"));
}

async function writeManifest(root) {
  const entries = [];
  for (const file of (await listFiles(root)).filter((file) => file !== "manifest.json")) {
    entries.push({ path: file, sha256: sha256(await readFile(path.join(root, file))) });
  }
  await writeFile(path.join(root, "manifest.json"), `${JSON.stringify({ algorithm: "sha256", files: entries }, null, 2)}\n`, "utf8");
}

async function composeRecipe(contractFile, guardrailFile, destination, rewrite) {
  const contract = normalizeText(await readFile(contractFile, "utf8"));
  const guardrails = normalizeText(await readFile(guardrailFile, "utf8")).trim();
  const marker = "\n## Asset\n";
  const markerIndex = contract.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Recipe contract is missing the Asset section: ${contractFile}`);
  const composed = `${contract.slice(0, markerIndex).trimEnd()}\n\n${guardrails}\n\n${contract.slice(markerIndex).trim()}\n`;
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, rewrite(composed), "utf8");
}

async function appendThemeFragment(target, fragment, themeName) {
  const [baseline, presentation] = await Promise.all([readFile(target, "utf8"), readFile(fragment, "utf8")]);
  const combined = `${normalizeText(baseline).trimEnd()}\n\n/* ${themeName} presentation overrides */\n${normalizeText(presentation).trim()}\n`;
  await writeFile(target, combined, "utf8");
}

async function assembleTheme(theme, destination) {
  const themeRoot = path.join(sourceRoot, "themes", theme.name);
  const foundationContracts = path.join(sourceRoot, "foundation", "component-contracts");
  await mkdir(destination, { recursive: true });

  await copyTextFile(path.join(themeRoot, "SKILL.md"), path.join(destination, "SKILL.md"), (text) =>
    text.replaceAll("../../foundation/react-spec.md", "references/react-spec.md"),
  );
  await copyTextTree(path.join(themeRoot, "agents"), path.join(destination, "agents"));
  await copyTextFile(
    path.join(themeRoot, "references", "theme-spec.md"),
    path.join(destination, "references", "theme-spec.md"),
    (text) =>
      text
        .replaceAll("../../../foundation/react-spec.md", "react-spec.md")
        .replaceAll("../../../foundation/component-contracts/components/", "components/")
        .replaceAll("../../../foundation/component-contracts/layouts/", "layouts/"),
  );
  for (const relative of theme.extraReferences) {
    await copyTextFile(path.join(themeRoot, relative), path.join(destination, relative));
  }
  if (theme.opaqueMedia.reference) {
    assertSafeRelativePath(theme.opaqueMedia.reference, `${theme.name} opaque media reference path`);
    if (!theme.opaqueMedia.reference.endsWith(".md")) {
      throw new Error(`${theme.name} opaque media reference must be Markdown: ${theme.opaqueMedia.reference}`);
    }
    await copyTextFile(
      path.join(themeRoot, theme.opaqueMedia.reference),
      path.join(destination, theme.opaqueMedia.reference),
    );
  }

  for (const [asset, recipe] of skillCatalog.shared.componentRecipes) {
    await composeRecipe(
      path.join(foundationContracts, "components", `${recipe}.md`),
      path.join(themeRoot, "recipe-guardrails", "components", `${recipe}.md`),
      path.join(destination, "references", "components", `${recipe}.md`),
      (text) => text.replaceAll("../../../react/components/", "../../assets/react/components/"),
    );
  }
  for (const [asset, recipe] of skillCatalog.shared.layoutRecipes) {
    await composeRecipe(
      path.join(foundationContracts, "layouts", `${recipe}.md`),
      path.join(themeRoot, "recipe-guardrails", "layouts", `${recipe}.md`),
      path.join(destination, "references", "layouts", `${recipe}.md`),
      (text) => text.replaceAll("../../../react/layouts/", "../../assets/react/layouts/"),
    );
  }
  for (const exclusive of theme.exclusiveComponents) {
    await copyTextFile(
      path.join(themeRoot, exclusive.recipeSource),
      path.join(destination, "references", "components", `${exclusive.recipe}.md`),
      (text) => text.replaceAll(
        `../../theme-components/${exclusive.asset}/`,
        `../../assets/react/components/${exclusive.asset}/`,
      ),
    );
  }

  await copyTextFile(
    path.join(sourceRoot, "foundation", "react-spec.md"),
    path.join(destination, "references", "react-spec.md"),
    (text) =>
      text
        .replaceAll("source/react/", "assets/react/")
        .replaceAll(
          "Theme token values, structural theme overrides, and exclusive components live under `source/themes/<theme>/`, not beside the shared React contracts.",
          "Theme token values and exclusive assets live inside the installed Skill alongside the shared React assets.",
        ),
  );
  await copyTextTree(path.join(sourceRoot, "react", "components"), path.join(destination, "assets", "react", "components"));
  await copyTextTree(
    path.join(sourceRoot, "react", "layouts", "DashboardFrame"),
    path.join(destination, "assets", "react", "layouts", "DashboardFrame"),
  );
  for (const exclusive of theme.exclusiveComponents) {
    await copyTextTree(
      path.join(themeRoot, exclusive.source),
      path.join(destination, "assets", "react", "components", exclusive.asset),
    );
  }
  for (const override of theme.componentOverrides) {
    await appendThemeFragment(
      path.join(destination, "assets", "react", "components", override.asset, `${override.asset}.module.scss`),
      path.join(themeRoot, override.source),
      theme.displayName,
    );
  }
  for (const override of theme.layoutOverrides) {
    await appendThemeFragment(
      path.join(destination, "assets", "react", "layouts", override.asset, `${override.asset}.module.scss`),
      path.join(themeRoot, override.source),
      theme.displayName,
    );
  }
  await copyTextFile(path.join(sourceRoot, "react", "styles", "globals.scss"), path.join(destination, "assets", "react", "styles", "globals.scss"));
  await copyTextFile(path.join(themeRoot, "tokens.scss"), path.join(destination, "assets", "react", "styles", "tokens.scss"));
  if (theme.opaqueMedia.files.length > 0 && !theme.opaqueMedia.reference) {
    throw new Error(`${theme.name} opaque media requires a textual reference`);
  }
  for (const relative of theme.opaqueMedia.files) {
    assertSafeRelativePath(relative, `${theme.name} opaque media path`);
    await copyOpaqueFile(
      path.join(themeRoot, "media", ...relative.split("/")),
      path.join(destination, "assets", "react", "styles", "media", theme.name, ...relative.split("/")),
    );
  }
  await writeManifest(destination);
  await assertNoSymlinks(destination);
}

async function assembleThemes(root, selectedThemes) {
  for (const theme of selectedThemes) await assembleTheme(theme, path.join(root, theme.name));
}

async function compareTrees(leftRoot, rightRoot, label) {
  if (!(await pathExists(rightRoot))) throw new Error(`${label} is missing: ${rightRoot}`);
  const [leftFiles, rightFiles] = await Promise.all([listFiles(leftRoot), listFiles(rightRoot)]);
  if (JSON.stringify(leftFiles) !== JSON.stringify(rightFiles)) {
    const onlyLeft = leftFiles.filter((file) => !rightFiles.includes(file));
    const onlyRight = rightFiles.filter((file) => !leftFiles.includes(file));
    throw new Error(`${label} file list differs. Generated only: ${onlyLeft.join(", ") || "none"}; existing only: ${onlyRight.join(", ") || "none"}`);
  }
  for (const file of leftFiles) {
    const [left, right] = await Promise.all([readFile(path.join(leftRoot, file)), readFile(path.join(rightRoot, file))]);
    if (!left.equals(right)) throw new Error(`${label} differs at ${file}`);
  }
}

async function validateThemes(root, selectedThemes) {
  for (const theme of selectedThemes) {
    const skillRoot = path.join(root, theme.name);
    await validateSkillDirectory(skillRoot, theme);
    await validateSkillInIsolation(skillRoot, theme);
  }
}

async function replaceOutputs(stagedRoot, selectedThemes) {
  await mkdir(skillsRoot, { recursive: true });
  const nonce = `${process.pid}-${Date.now()}`;
  const records = selectedThemes.map((theme) => ({
    theme,
    output: path.join(skillsRoot, theme.name),
    candidate: path.join(skillsRoot, `.${theme.name}-candidate-${nonce}`),
    backup: path.join(skillsRoot, `.${theme.name}-backup-${nonce}`),
    backedUp: false,
    installed: false,
  }));
  try {
    for (const record of records) {
      await cp(path.join(stagedRoot, record.theme.name), record.candidate, { recursive: true, force: false, errorOnExist: true });
    }
    for (const record of records) {
      if (await pathExists(record.output)) {
        await rename(record.output, record.backup);
        record.backedUp = true;
      }
    }
    for (const record of records) {
      await rename(record.candidate, record.output);
      record.installed = true;
    }
  } catch (error) {
    const rollbackErrors = [];
    for (const record of [...records].reverse()) {
      try {
        await rm(record.candidate, { recursive: true, force: true });
        if (record.installed) await rm(record.output, { recursive: true, force: true });
        if (record.backedUp && (await pathExists(record.backup))) await rename(record.backup, record.output);
      } catch (rollbackError) {
        rollbackErrors.push(rollbackError);
      }
    }
    if (rollbackErrors.length > 0) throw new AggregateError([error, ...rollbackErrors], "Skill output replacement and rollback failed");
    throw error;
  }
  const cleanupErrors = [];
  for (const record of records) {
    if (!record.backedUp) continue;
    try {
      await rm(record.backup, { recursive: true, force: true });
    } catch (error) {
      cleanupErrors.push(error);
    }
  }
  if (cleanupErrors.length > 0) {
    throw new AggregateError(cleanupErrors, "Skills were installed, but one or more backup directories could not be removed");
  }
}

async function withTemporaryAssembly(selectedThemes, callback) {
  const temporary = await mkdtemp(path.join(tmpdir(), "max-ui-skills-"));
  try {
    await assembleThemes(temporary, selectedThemes);
    return await callback(temporary);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (checkOnly) {
  await withTemporaryAssembly(themes, async (first) => {
    await withTemporaryAssembly(themes, async (second) => {
      await validateThemes(first, themes);
      await validateThemes(second, themes);
      for (const theme of themes) {
        await compareTrees(path.join(first, theme.name), path.join(second, theme.name), `${theme.name} repeated build`);
        await compareTrees(path.join(first, theme.name), path.join(skillsRoot, theme.name), `${theme.name} committed output`);
      }
    });
  });
  console.log(`${themes.map(({ name }) => name).join(", ")} Skills are deterministic, self-contained, and up to date.`);
} else {
  await withTemporaryAssembly(themes, async (stagedRoot) => {
    await validateThemes(stagedRoot, themes);
    await replaceOutputs(stagedRoot, themes);
  });
  console.log(`Built ${themes.map(({ name }) => `skills/${name}`).join(", ")}.`);
}
