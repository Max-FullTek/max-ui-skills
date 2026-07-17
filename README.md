# Max UI Skills

[English](./README.md) | [繁體中文](./README.zh-TW.md)

![Codex Skill](https://img.shields.io/badge/Codex-Skills-ff7a00) ![Themes](https://img.shields.io/badge/themes-2-174a34) ![React Recipes](https://img.shields.io/badge/recipes-React%20%2B%20SCSS-0f9f8f)

Portable, self-contained UI design-system skills for Codex agents:

- `orange-matters` (`大橘為重`) — warm off-white and charcoal product UI, orange primary actions, teal secondary actions, glass panels, and compact dashboard layouts.
- `green-ink` — clean paper-and-ink work surfaces, controlled landscape and dry-brush artwork, deep-green actions, low geometry, and a dark ink-flow atmosphere.

Each Skill includes its own instructions, component recipes, React/SCSS assets, theme tokens, and manifest. Sample applications stay in this repository and are not runtime dependencies.

## Quick Install

Install either Skill or both:

```text
skills/orange-matters/
skills/green-ink/
```

### Skill Installer Prompts

```md
Use $skill-installer to install the Skill at `skills/orange-matters` from https://github.com/Max-FullTek/max-ui-skills.
Use $skill-installer to install the Skill at `skills/green-ink` from https://github.com/Max-FullTek/max-ui-skills.
```

### Manual Install

Skills are available in the ChatGPT desktop app, Codex CLI, and the IDE extension. Copy the selected folder to the scope you want:

```text
User-wide:  $HOME/.agents/skills/orange-matters
User-wide:  $HOME/.agents/skills/green-ink
Repository: $REPO_ROOT/.agents/skills/orange-matters
Repository: $REPO_ROOT/.agents/skills/green-ink
```

On Windows, the user-wide equivalents are `%USERPROFILE%\.agents\skills\orange-matters` and `%USERPROFILE%\.agents\skills\green-ink`. Restart Codex if a newly copied Skill does not appear. See the official [Build skills](https://learn.chatgpt.com/docs/build-skills) guide for current discovery locations.

Both Skills can be installed together. Choose one theme for a given UI task; do not apply both visual systems to the same screen unless you are deliberately designing a theme switcher.

## Usage

```md
Use $orange-matters to restyle this compact operations dashboard.
Use $green-ink to build a paper-and-ink content workspace with coordinated light and dark modes.
```

Read the selected `SKILL.md` first, then load only the relevant theme spec, React guide, layout recipe, component recipes, or artwork index. Binary artwork under `assets/` is meant to be copied or referenced by path, not loaded into the model as text.

## Repository Layout

```text
skills/
  orange-matters/       Self-contained generated Skill
  green-ink/            Self-contained generated Skill
source/                 Canonical shared React and per-theme sources
samples/
  orange-matters/       Orange React/Vite sample
  green-ink/            Green React/Vite sample
  shared/               Repository-only scenarios and screens
```

Do not install `samples/` or make an installed Skill depend on it.

## Local Checks

On a fresh clone, install each sample's locked dependencies once:

```bash
npm ci --prefix samples/orange-matters
npm ci --prefix samples/green-ink
```

Then run the complete basic release gate:

```bash
npm run release:check
```

The equivalent individual commands are:

```bash
npm run check:skills
npm run validate:skills
npm run build:samples
git diff --check
```

Both sample builds consume the generated assets under `skills/<theme>/`, so the basic gate compiles the same React/SCSS files that users install. Run one sample in development mode with `npm --prefix samples/orange-matters run dev` or `npm --prefix samples/green-ink run dev`.

## Adding Or Updating Themes

Edit canonical inputs under `source/`, then regenerate with `npm run build:skills`. Do not edit generated `skills/<theme>/` output directly. Keep `SKILL.md` concise and move detailed implementation guidance into targeted references so agents can use progressive disclosure.
