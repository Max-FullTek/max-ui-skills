import { createHash } from "node:crypto";
import {
  access,
  cp,
  lstat,
  mkdtemp,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(repoRoot, "source");
const skillsRoot = path.join(repoRoot, "skills");
const outputRoot = path.join(skillsRoot, "orange-matters");
const checkOnly = process.argv.slice(2).includes("--check");
const unexpectedArgs = process.argv.slice(2).filter((argument) => argument !== "--check");

if (unexpectedArgs.length > 0) {
  throw new Error(`Unknown argument(s): ${unexpectedArgs.join(", ")}`);
}

const toPosix = (value) => value.split(path.sep).join("/");
const normalizeText = (value) => value.replace(/\r\n?/g, "\n");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

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
  const targetStat = await lstat(target);
  if (targetStat.isSymbolicLink()) {
    throw new Error(`Symbolic links are not allowed: ${label}`);
  }
  if (!targetStat.isDirectory()) return;

  for (const entry of await sortedEntries(target)) {
    const child = path.join(target, entry.name);
    await assertNoSymlinks(child, path.join(label, entry.name));
  }
}

async function copyTextFile(source, destination, rewrite = (value) => value) {
  const sourceStat = await lstat(source);
  if (sourceStat.isSymbolicLink() || !sourceStat.isFile()) {
    throw new Error(`Expected a regular file: ${source}`);
  }
  const text = rewrite(normalizeText(await readFile(source, "utf8")));
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, text, "utf8");
}

async function copyTextTree(source, destination) {
  await assertNoSymlinks(source);
  for (const entry of await sortedEntries(source)) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      await copyTextTree(from, to);
    } else if (entry.isFile()) {
      await copyTextFile(from, to);
    } else {
      throw new Error(`Unsupported filesystem entry: ${from}`);
    }
  }
}

async function listFiles(directory, prefix = "") {
  const files = [];
  for (const entry of await sortedEntries(directory)) {
    const absolute = path.join(directory, entry.name);
    const relative = prefix ? path.join(prefix, entry.name) : entry.name;
    const entryStat = await lstat(absolute);
    if (entryStat.isSymbolicLink()) {
      throw new Error(`Symbolic links are not allowed: ${absolute}`);
    }
    if (entryStat.isDirectory()) {
      files.push(...(await listFiles(absolute, relative)));
    } else if (entryStat.isFile()) {
      files.push(toPosix(relative));
    } else {
      throw new Error(`Unsupported filesystem entry: ${absolute}`);
    }
  }
  return files.sort((left, right) => left.localeCompare(right, "en"));
}

async function writeManifest(root) {
  const files = (await listFiles(root)).filter((file) => file !== "manifest.json");
  const entries = [];
  for (const file of files) {
    entries.push({ path: file, sha256: sha256(await readFile(path.join(root, file))) });
  }
  const manifest = `${JSON.stringify({ algorithm: "sha256", files: entries }, null, 2)}\n`;
  await writeFile(path.join(root, "manifest.json"), manifest, "utf8");
}

async function assembleOrange(destination) {
  const theme = path.join(sourceRoot, "themes", "orange-matters");
  await mkdir(destination, { recursive: true });

  await copyTextFile(path.join(theme, "SKILL.md"), path.join(destination, "SKILL.md"), (text) =>
    text.replaceAll("../../foundation/react-spec.md", "references/react-spec.md"),
  );
  await copyTextTree(path.join(theme, "agents"), path.join(destination, "agents"));
  await copyTextTree(path.join(theme, "references", "components"), path.join(destination, "references", "components"));
  await copyTextTree(path.join(theme, "references", "layouts"), path.join(destination, "references", "layouts"));
  await copyTextFile(
    path.join(theme, "references", "theme-spec.md"),
    path.join(destination, "references", "theme-spec.md"),
    (text) => text.replaceAll("../../../foundation/react-spec.md", "react-spec.md"),
  );
  await copyTextFile(
    path.join(sourceRoot, "foundation", "react-spec.md"),
    path.join(destination, "references", "react-spec.md"),
  );

  await copyTextTree(
    path.join(sourceRoot, "react", "components"),
    path.join(destination, "assets", "react", "components"),
  );
  await copyTextTree(
    path.join(theme, "theme-components", "RunningBorder"),
    path.join(destination, "assets", "react", "components", "RunningBorder"),
  );
  await copyTextTree(
    path.join(sourceRoot, "react", "layouts", "DashboardFrame"),
    path.join(destination, "assets", "react", "layouts", "DashboardFrame"),
  );
  await copyTextFile(
    path.join(sourceRoot, "react", "styles", "globals.scss"),
    path.join(destination, "assets", "react", "styles", "globals.scss"),
  );
  await copyTextFile(
    path.join(theme, "tokens.scss"),
    path.join(destination, "assets", "react", "styles", "tokens.scss"),
  );

  await writeManifest(destination);
  await assertNoSymlinks(destination);
}

async function compareTrees(leftRoot, rightRoot, label) {
  if (!(await pathExists(rightRoot))) {
    throw new Error(`${label} is missing: ${rightRoot}`);
  }
  const [leftFiles, rightFiles] = await Promise.all([listFiles(leftRoot), listFiles(rightRoot)]);
  if (JSON.stringify(leftFiles) !== JSON.stringify(rightFiles)) {
    const onlyLeft = leftFiles.filter((file) => !rightFiles.includes(file));
    const onlyRight = rightFiles.filter((file) => !leftFiles.includes(file));
    throw new Error(
      `${label} file list differs. Generated only: ${onlyLeft.join(", ") || "none"}; existing only: ${onlyRight.join(", ") || "none"}`,
    );
  }
  for (const file of leftFiles) {
    const [left, right] = await Promise.all([
      readFile(path.join(leftRoot, file)),
      readFile(path.join(rightRoot, file)),
    ]);
    if (!left.equals(right)) {
      throw new Error(`${label} differs at ${file}`);
    }
  }
}

function withoutQueryOrFragment(value) {
  return value.split("#", 1)[0].split("?", 1)[0];
}

async function assertResolvableFile(root, fromFile, reference, kind) {
  const cleaned = withoutQueryOrFragment(reference.trim().replace(/^<|>$/g, ""));
  if (!cleaned || cleaned.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(cleaned) || cleaned.startsWith("//")) {
    return;
  }
  let decoded;
  try {
    decoded = decodeURIComponent(cleaned);
  } catch {
    throw new Error(`Invalid encoded ${kind} in ${fromFile}: ${reference}`);
  }
  const resolved = path.resolve(path.dirname(fromFile), decoded);
  if (!resolved.startsWith(`${root}${path.sep}`) && resolved !== root) {
    throw new Error(`${kind} escapes the Skill: ${fromFile} -> ${reference}`);
  }
  if (!(await pathExists(resolved))) {
    throw new Error(`Broken ${kind}: ${fromFile} -> ${reference}`);
  }
}

async function validateMarkdownLinks(root) {
  for (const relative of await listFiles(root)) {
    if (!relative.endsWith(".md")) continue;
    const absolute = path.join(root, relative);
    const text = await readFile(absolute, "utf8");
    const linkPattern = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^)]*["'])?\)/g;
    for (const match of text.matchAll(linkPattern)) {
      await assertResolvableFile(root, absolute, match[1], "Markdown link");
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
  if (path.extname(base) === "") {
    candidates.push(path.join(path.dirname(base), `_${path.basename(base)}.scss`));
  }
  for (const candidate of candidates) {
    if (await pathExists(candidate)) return true;
  }
  return false;
}

async function validateRelativeImports(root) {
  for (const relative of await listFiles(root)) {
    if (!/\.(?:ts|tsx|scss)$/.test(relative)) continue;
    const absolute = path.join(root, relative);
    const text = await readFile(absolute, "utf8");
    const patterns = [
      /(?:import|export)\s+(?:[^"'`;]*?\s+from\s+)?["']([^"']+)["']/g,
      /import\(\s*["']([^"']+)["']\s*\)/g,
      /@(?:use|forward|import)\s+["']([^"']+)["']/g,
    ];
    for (const pattern of patterns) {
      for (const match of text.matchAll(pattern)) {
        if (!match[1].startsWith(".")) continue;
        if (!(await resolvesImport(absolute, match[1]))) {
          throw new Error(`Broken relative import: ${relative} -> ${match[1]}`);
        }
      }
    }
  }
}

async function validateForbiddenReferences(root) {
  const siblingSkills = (await sortedEntries(skillsRoot))
    .filter((entry) => entry.isDirectory() && entry.name !== "orange-matters")
    .map((entry) => entry.name);
  for (const relative of await listFiles(root)) {
    const absolute = path.join(root, relative);
    const text = await readFile(absolute, "utf8");
    if (/(?:\.\.[\\/]){2,}source(?:[\\/]|\b)/i.test(text)) {
      throw new Error(`Forbidden source reference in ${relative}`);
    }
    if (/sample-orange-matters/i.test(text)) {
      throw new Error(`Forbidden sample app reference in ${relative}`);
    }
    for (const sibling of siblingSkills) {
      const escaped = sibling.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const siblingPattern = new RegExp(`(?:skills[\\/]|\\.\\.[\\/])${escaped}(?:[\\/]|\\b)`, "i");
      if (siblingPattern.test(text)) {
        throw new Error(`Forbidden sibling Skill reference in ${relative}: ${sibling}`);
      }
    }
  }
}

async function validateOutput(root) {
  await assertNoSymlinks(root);
  await validateMarkdownLinks(root);
  await validateRelativeImports(root);
  await validateForbiddenReferences(root);
}

async function replaceOutput(stagedRoot) {
  await mkdir(skillsRoot, { recursive: true });
  const nonce = `${process.pid}-${Date.now()}`;
  const candidate = path.join(skillsRoot, `.orange-matters-candidate-${nonce}`);
  const backup = path.join(skillsRoot, `.orange-matters-backup-${nonce}`);
  let backedUp = false;
  try {
    await cp(stagedRoot, candidate, { recursive: true, force: false, errorOnExist: true });
    if (await pathExists(outputRoot)) {
      await rename(outputRoot, backup);
      backedUp = true;
    }
    await rename(candidate, outputRoot);
    if (backedUp) await rm(backup, { recursive: true, force: true });
  } catch (error) {
    await rm(candidate, { recursive: true, force: true });
    if (backedUp && !(await pathExists(outputRoot))) {
      await rename(backup, outputRoot);
    }
    throw error;
  }
}

async function withTemporaryBuild(callback) {
  const temporary = await mkdtemp(path.join(tmpdir(), "max-ui-skills-"));
  try {
    const assembled = path.join(temporary, "orange-matters");
    await assembleOrange(assembled);
    return await callback(assembled);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

if (checkOnly) {
  await withTemporaryBuild(async (first) => {
    await withTemporaryBuild(async (second) => {
      await compareTrees(first, second, "Repeated build");
      await compareTrees(first, outputRoot, "Committed output");
      await validateOutput(first);
      await validateOutput(outputRoot);
    });
  });
  console.log("orange-matters Skill is deterministic, self-contained, and up to date.");
} else {
  await withTemporaryBuild(async (staged) => {
    await replaceOutput(staged);
  });
  console.log(`Built ${path.relative(repoRoot, outputRoot)}.`);
}
