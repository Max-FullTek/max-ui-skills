import { createHash } from "node:crypto";
import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillName = "orange-matters";
const skillRoot = path.join(repoRoot, "skills", skillName);

const componentRecipes = new Map([
  ["Alert", "alert"],
  ["Button", "button"],
  ["Card", "card"],
  ["ControlCard", "control-card"],
  ["DataTable", "table"],
  ["Dialog", "dialog"],
  ["Field", "field"],
  ["Header", "header"],
  ["Heading", "heading"],
  ["ImageCard", "image-card"],
  ["Menubar", "menubar"],
  ["RunningBorder", "running-border"],
  ["ToastProvider", "toast"],
  ["VisionStage", "vision-stage"],
]);
const layoutRecipes = new Map([["DashboardFrame", "dashboard-frame"]]);

const toPosix = (value) => value.split(path.sep).join("/");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const sortNames = (values) => [...values].sort((left, right) => left.localeCompare(right, "en"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function assertRegularFile(relative) {
  const absolute = path.join(skillRoot, relative);
  const info = await lstat(absolute).catch(() => null);
  assert(info?.isFile() && !info.isSymbolicLink(), `Expected regular file: ${relative}`);
}

async function assertDirectory(relative) {
  const absolute = path.join(skillRoot, relative);
  const info = await lstat(absolute).catch(() => null);
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

async function directoryNames(relative) {
  const entries = await readdir(path.join(skillRoot, relative), { withFileTypes: true });
  for (const entry of entries) {
    assert(entry.isDirectory() && !entry.isSymbolicLink(), `Expected only directories in ${relative}: ${entry.name}`);
  }
  return sortNames(entries.map((entry) => entry.name));
}

async function markdownBasenames(relative) {
  const entries = await readdir(path.join(skillRoot, relative), { withFileTypes: true });
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

async function validateFrontmatter() {
  const skillFile = path.join(skillRoot, "SKILL.md");
  const text = await readFile(skillFile, "utf8");
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
  assert(unquote(fields.name) === skillName, `SKILL.md name must match folder name: ${skillName}`);
  assert(unquote(fields.description).length > 0, "SKILL.md description must not be empty");
}

async function validateRequiredStructure() {
  for (const relative of [
    "agents",
    "references",
    "references/components",
    "references/layouts",
    "assets/react/components",
    "assets/react/layouts",
    "assets/react/styles",
  ]) {
    await assertDirectory(relative);
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
    await assertRegularFile(relative);
  }
}

async function validateRecipesAndAssets() {
  const componentAssets = await directoryNames("assets/react/components");
  const componentRecipeNames = await markdownBasenames("references/components");
  assertExactSet(componentAssets, componentRecipes.keys(), "Component assets");
  assertExactSet(componentRecipeNames, componentRecipes.values(), "Component recipes");
  for (const [asset, recipe] of componentRecipes) {
    assert(componentAssets.includes(asset), `Missing component asset for recipe ${recipe}: ${asset}`);
    assert(componentRecipeNames.includes(recipe), `Missing component recipe for asset ${asset}: ${recipe}.md`);
  }

  const layoutAssets = await directoryNames("assets/react/layouts");
  const layoutRecipeNames = await markdownBasenames("references/layouts");
  assertExactSet(layoutAssets, layoutRecipes.keys(), "Layout assets");
  assertExactSet(layoutRecipeNames, layoutRecipes.values(), "Layout recipes");
  for (const [asset, recipe] of layoutRecipes) {
    assert(layoutAssets.includes(asset), `Missing layout asset for recipe ${recipe}: ${asset}`);
    assert(layoutRecipeNames.includes(recipe), `Missing layout recipe for asset ${asset}: ${recipe}.md`);
  }
}

async function validateManifest() {
  const manifestPath = path.join(skillRoot, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  assert(manifest.algorithm === "sha256", 'manifest.json algorithm must be "sha256"');
  assert(Array.isArray(manifest.files), "manifest.json files must be an array");

  const actualFiles = (await listFiles(skillRoot)).filter((file) => file !== "manifest.json");
  const manifestPaths = [];
  for (const entry of manifest.files) {
    assert(entry && typeof entry === "object" && !Array.isArray(entry), "Manifest entries must be objects");
    assertExactSet(Object.keys(entry), ["path", "sha256"], `Manifest entry keys for ${entry?.path ?? "unknown"}`);
    assert(typeof entry.path === "string" && entry.path.length > 0, "Manifest entry path must be non-empty");
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

await validateRequiredStructure();
await validateFrontmatter();
await validateRecipesAndAssets();
await validateManifest();

console.log("orange-matters Skill structure, recipe mapping, and manifest are valid.");
