import path from "node:path";
import { fileURLToPath } from "node:url";
import { getThemeConfig, listThemeConfigs } from "./skill-catalog.mjs";
import { validateMarkdownLinks, validateSkillDirectory, validateSkillInIsolation } from "./skill-validation.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = path.join(repoRoot, "skills");

function selectedThemes(arguments_) {
  if (arguments_.length === 0) return listThemeConfigs();
  if (arguments_.length === 2 && arguments_[0] === "--theme") return [getThemeConfig(arguments_[1])];
  if (arguments_.length === 1 && arguments_[0].startsWith("--theme=")) {
    return [getThemeConfig(arguments_[0].slice("--theme=".length))];
  }
  throw new Error("Usage: node scripts/validate-skills.mjs [--theme <name>]");
}

const themes = selectedThemes(process.argv.slice(2));
await validateMarkdownLinks(path.join(repoRoot, "source"), repoRoot);
console.log("Canonical source Markdown links are valid.");
for (const theme of themes) {
  const skillRoot = path.join(skillsRoot, theme.name);
  await validateSkillDirectory(skillRoot, theme);
  await validateSkillInIsolation(skillRoot, theme);
  console.log(`${theme.name} Skill structure, links, imports, manifest, and isolation are valid.`);
}
