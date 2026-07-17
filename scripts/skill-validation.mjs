import { createHash } from "node:crypto";
import { cp, lstat, mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { componentRecipesFor, layoutRecipesFor, listThemeConfigs } from "./skill-catalog.mjs";

const toPosix = (value) => value.split(path.sep).join("/");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const sortNames = (values) => [...values].sort((left, right) => left.localeCompare(right, "en"));
const textExtensions = new Set([
  ".cjs",
  ".css",
  ".cts",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".mts",
  ".scss",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function pathInfo(target) {
  return lstat(target).catch(() => null);
}

async function assertRegularFile(root, relative) {
  const info = await pathInfo(path.join(root, relative));
  assert(info?.isFile() && !info.isSymbolicLink(), `Expected regular file: ${relative}`);
}

async function assertDirectory(root, relative) {
  const info = await pathInfo(path.join(root, relative));
  assert(info?.isDirectory() && !info.isSymbolicLink(), `Expected directory: ${relative}`);
}

async function listFiles(directory, prefix = "") {
  const files = [];
  const entries = (await readdir(directory, { withFileTypes: true })).sort((left, right) =>
    left.name.localeCompare(right.name, "en"),
  );
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    const relative = prefix ? path.join(prefix, entry.name) : entry.name;
    const info = await lstat(absolute);
    assert(!info.isSymbolicLink(), `Symbolic links are not allowed: ${toPosix(relative)}`);
    if (info.isDirectory()) {
      files.push(...(await listFiles(absolute, relative)));
    } else if (info.isFile()) {
      files.push(toPosix(relative));
    } else {
      throw new Error(`Unsupported filesystem entry: ${toPosix(relative)}`);
    }
  }
  return sortNames(files);
}

async function directoryNames(root, relative) {
  const entries = await readdir(path.join(root, relative), { withFileTypes: true });
  for (const entry of entries) {
    assert(entry.isDirectory() && !entry.isSymbolicLink(), `Expected only directories in ${relative}: ${entry.name}`);
  }
  return sortNames(entries.map((entry) => entry.name));
}

async function markdownBasenames(root, relative) {
  const entries = await readdir(path.join(root, relative), { withFileTypes: true });
  for (const entry of entries) {
    assert(entry.isFile() && !entry.isSymbolicLink(), `Expected only recipe files in ${relative}: ${entry.name}`);
    assert(entry.name.endsWith(".md"), `Expected Markdown recipe in ${relative}: ${entry.name}`);
  }
  return sortNames(entries.map((entry) => path.basename(entry.name, ".md")));
}

function assertExactSet(actual, expected, label) {
  const actualSorted = sortNames(actual);
  const expectedSorted = sortNames(expected);
  assert(
    JSON.stringify(actualSorted) === JSON.stringify(expectedSorted),
    `${label} differs. Expected: ${expectedSorted.join(", ")}; actual: ${actualSorted.join(", ")}`,
  );
}

function isSafeRelativePath(relative) {
  return (
    typeof relative === "string" &&
    relative.length > 0 &&
    !relative.includes("\\") &&
    !/^[A-Za-z]:/.test(relative) &&
    relative === toPosix(relative) &&
    !path.posix.isAbsolute(relative) &&
    !relative.split("/").some((segment) => segment === "" || segment === "." || segment === "..")
  );
}

async function validateFrontmatter(skillRoot, theme) {
  const text = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert(match, "SKILL.md must begin with YAML frontmatter");
  const entries = [];
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const field = line.match(/^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$/);
    assert(field, `Unsupported SKILL.md frontmatter line: ${line}`);
    entries.push([field[1], field[2]?.trim() ?? ""]);
  }
  assertExactSet(entries.map(([key]) => key), ["name", "description"], "SKILL.md frontmatter keys");
  assert(new Set(entries.map(([key]) => key)).size === entries.length, "SKILL.md frontmatter keys must be unique");
  const fields = Object.fromEntries(entries);
  const unquote = (value) => {
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
      return value.slice(1, -1);
    }
    return value;
  };
  assert(unquote(fields.name) === theme.name, `SKILL.md name must match folder name: ${theme.name}`);
  assert(unquote(fields.description).length > 0, "SKILL.md description must not be empty");
}

async function validateRequiredStructure(skillRoot) {
  for (const relative of [
    "agents",
    "references",
    "references/components",
    "references/layouts",
    "assets/react/components",
    "assets/react/layouts",
    "assets/react/styles",
  ]) {
    await assertDirectory(skillRoot, relative);
  }
  for (const relative of [
    "SKILL.md",
    "agents/openai.yaml",
    "references/theme-spec.md",
    "references/react-spec.md",
    "assets/react/styles/tokens.scss",
    "assets/react/styles/globals.scss",
    "manifest.json",
  ]) {
    await assertRegularFile(skillRoot, relative);
  }
}

async function validateRecipesAndAssets(skillRoot, theme) {
  const componentRecipes = componentRecipesFor(theme);
  const layoutRecipes = layoutRecipesFor(theme);
  const componentAssets = await directoryNames(skillRoot, "assets/react/components");
  const componentRecipeNames = await markdownBasenames(skillRoot, "references/components");
  assertExactSet(componentAssets, componentRecipes.map(([asset]) => asset), "Component assets");
  assertExactSet(componentRecipeNames, componentRecipes.map(([, recipe]) => recipe), "Component recipes");

  const layoutAssets = await directoryNames(skillRoot, "assets/react/layouts");
  const layoutRecipeNames = await markdownBasenames(skillRoot, "references/layouts");
  assertExactSet(layoutAssets, layoutRecipes.map(([asset]) => asset), "Layout assets");
  assertExactSet(layoutRecipeNames, layoutRecipes.map(([, recipe]) => recipe), "Layout recipes");
}

async function validateOpaqueMedia(skillRoot, theme) {
  const mediaRoot = path.join("assets", "react", "styles", "media", theme.name);
  const expectedFiles = theme.opaqueMedia.files;
  assert(Array.isArray(expectedFiles), `${theme.name} opaque media inventory must be an array`);
  assert(expectedFiles.every(isSafeRelativePath), `${theme.name} opaque media inventory contains an invalid path`);
  assert(new Set(expectedFiles).size === expectedFiles.length, `${theme.name} opaque media inventory contains duplicates`);
  if (theme.opaqueMedia.reference) {
    assert(isSafeRelativePath(theme.opaqueMedia.reference), `${theme.name} opaque media reference path is invalid`);
    assert(theme.opaqueMedia.reference.endsWith(".md"), `${theme.name} opaque media reference must be Markdown`);
    await assertRegularFile(skillRoot, theme.opaqueMedia.reference);
  }
  if (expectedFiles.length === 0) {
    assert(!(await pathInfo(path.join(skillRoot, mediaRoot))), `Unexpected opaque media directory: ${toPosix(mediaRoot)}`);
    return;
  }
  assert(theme.opaqueMedia.reference, `${theme.name} opaque media requires a textual reference`);
  await assertDirectory(skillRoot, mediaRoot);
  const actualFiles = await listFiles(path.join(skillRoot, mediaRoot));
  assertExactSet(actualFiles, expectedFiles, `${theme.name} opaque media files`);
  for (const relative of expectedFiles) await assertRegularFile(skillRoot, path.join(mediaRoot, ...relative.split("/")));
}

async function validateManifest(skillRoot) {
  const manifest = JSON.parse(await readFile(path.join(skillRoot, "manifest.json"), "utf8"));
  assert(manifest.algorithm === "sha256", 'manifest.json algorithm must be "sha256"');
  assert(Array.isArray(manifest.files), "manifest.json files must be an array");
  const actualFiles = (await listFiles(skillRoot)).filter((file) => file !== "manifest.json");
  const manifestPaths = [];
  for (const entry of manifest.files) {
    assert(entry && typeof entry === "object" && !Array.isArray(entry), "Manifest entries must be objects");
    assertExactSet(Object.keys(entry), ["path", "sha256"], `Manifest entry keys for ${entry?.path ?? "unknown"}`);
    assert(typeof entry.path === "string" && entry.path.length > 0, "Manifest path must be non-empty");
    assert(entry.path === toPosix(entry.path) && !path.posix.isAbsolute(entry.path), `Invalid manifest path: ${entry.path}`);
    assert(!entry.path.split("/").includes(".."), `Manifest path escapes the Skill: ${entry.path}`);
    assert(/^[a-f0-9]{64}$/.test(entry.sha256), `Invalid SHA-256 for ${entry.path}`);
    manifestPaths.push(entry.path);
  }
  assert(new Set(manifestPaths).size === manifestPaths.length, "Manifest paths must be unique");
  assertExactSet(manifestPaths, actualFiles, "Manifest file set");
  for (const entry of manifest.files) {
    const actualHash = sha256(await readFile(path.join(skillRoot, ...entry.path.split("/"))));
    assert(actualHash === entry.sha256, `Manifest hash mismatch: ${entry.path}`);
  }
}

function withoutQueryOrFragment(value) {
  return value.split("#", 1)[0].split("?", 1)[0];
}

async function assertResolvableFile(root, fromFile, reference, kind) {
  const cleaned = withoutQueryOrFragment(reference.trim().replace(/^<|>$/g, ""));
  if (!cleaned || cleaned.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(cleaned) || cleaned.startsWith("//")) return;
  let decoded;
  try {
    decoded = decodeURIComponent(cleaned);
  } catch {
    throw new Error(`Invalid encoded ${kind} in ${fromFile}: ${reference}`);
  }
  const resolved = path.resolve(path.dirname(fromFile), decoded);
  assert(resolved === root || resolved.startsWith(`${root}${path.sep}`), `${kind} escapes the Skill: ${fromFile} -> ${reference}`);
  assert(await pathInfo(resolved), `Broken ${kind}: ${fromFile} -> ${reference}`);
}

async function validateMarkdownLinks(skillRoot) {
  for (const relative of await listFiles(skillRoot)) {
    if (!relative.endsWith(".md")) continue;
    const absolute = path.join(skillRoot, relative);
    const text = await readFile(absolute, "utf8");
    for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^)]*["'])?\)/g)) {
      await assertResolvableFile(skillRoot, absolute, match[1], "Markdown link");
    }
  }
}

async function resolvesImport(fromFile, reference) {
  const base = path.resolve(path.dirname(fromFile), reference);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.mjs`,
    `${base}.scss`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];
  if (path.extname(base) === "") candidates.push(path.join(path.dirname(base), `_${path.basename(base)}.scss`));
  for (const candidate of candidates) {
    if (await pathInfo(candidate)) return true;
  }
  return false;
}

async function validateRelativeImports(skillRoot) {
  for (const relative of await listFiles(skillRoot)) {
    if (!/\.(?:ts|tsx|scss)$/.test(relative)) continue;
    const absolute = path.join(skillRoot, relative);
    const text = await readFile(absolute, "utf8");
    const patterns = [
      /(?:import|export)\s+(?:[^"'`;]*?\s+from\s+)?["']([^"']+)["']/g,
      /import\(\s*["']([^"']+)["']\s*\)/g,
      /@(?:use|forward|import)\s+["']([^"']+)["']/g,
    ];
    for (const pattern of patterns) {
      for (const match of text.matchAll(pattern)) {
        if (match[1].startsWith(".") && !(await resolvesImport(absolute, match[1]))) {
          throw new Error(`Broken relative import: ${relative} -> ${match[1]}`);
        }
      }
    }
  }
}

async function validateForbiddenReferences(skillRoot, theme) {
  const siblingNames = listThemeConfigs().filter(({ name }) => name !== theme.name).map(({ name }) => name);
  for (const relative of await listFiles(skillRoot)) {
    if (!textExtensions.has(path.extname(relative).toLowerCase())) continue;
    const text = await readFile(path.join(skillRoot, relative), "utf8");
    assert(!/\bsource[\\/]/i.test(text), `Forbidden source reference in ${relative}`);
    assert(!/(?:sample-orange-matters|\bsamples[\\/])/i.test(text), `Forbidden sample reference in ${relative}`);
    for (const sibling of siblingNames) {
      const escaped = sibling.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`(?:skills[\\/]|\\.\\.[\\/])${escaped}(?:[\\/]|\\b)`, "i");
      assert(!pattern.test(text), `Forbidden sibling Skill reference in ${relative}: ${sibling}`);
    }
  }
}

export async function validateSkillDirectory(skillRoot, theme) {
  await validateRequiredStructure(skillRoot);
  await validateFrontmatter(skillRoot, theme);
  await validateRecipesAndAssets(skillRoot, theme);
  await validateOpaqueMedia(skillRoot, theme);
  await validateManifest(skillRoot);
  await validateMarkdownLinks(skillRoot);
  await validateRelativeImports(skillRoot);
  await validateForbiddenReferences(skillRoot, theme);
}

export async function validateSkillInIsolation(skillRoot, theme) {
  const temporary = await mkdtemp(path.join(tmpdir(), `max-ui-skill-${theme.name}-`));
  try {
    const isolatedRoot = path.join(temporary, theme.name);
    await cp(skillRoot, isolatedRoot, { recursive: true, force: false, errorOnExist: true });
    await validateSkillDirectory(isolatedRoot, theme);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}
