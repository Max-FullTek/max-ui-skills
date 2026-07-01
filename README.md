# Max UI Skills

[English](./README.md) | [繁體中文](./README.zh-TW.md)

![Codex Skill](https://img.shields.io/badge/Codex-Skill-ff7a00) ![Theme](https://img.shields.io/badge/theme-orange--matters-ff4f0f) ![React Recipes](https://img.shields.io/badge/recipes-React%20%2B%20SCSS-0f9f8f) ![Install](https://img.shields.io/badge/install-copy%20skill%20folder-lightgrey)

Portable UI design-system skills for Codex agents.

This repository currently provides `orange-matters` (`大橘為重`): a warm, compact product UI theme with off-white light mode, charcoal dark mode, orange primary actions, muted teal secondary actions, glass panels, local scrolling, and reusable React component recipes.

## Quick Install

Install only this folder:

```text
skills/orange-matters/
```

Do not install the sample app. `sample-orange-matters/` is only a demo and regression check.

### Skill Installer Prompt

```md
Use $skill-installer to install the `orange-matters` skill from this GitHub repo.
```

### Manual Install

Copy:

```text
skills/orange-matters
```

to:

```text
~/.codex/skills/orange-matters
```

Common Windows path:

```text
C:\Users\<you>\.codex\skills\orange-matters
```

The installed folder should contain:

- `SKILL.md`
- `agents/openai.yaml`
- `references/theme-spec.md`
- `references/react-spec.md`
- `references/components/`
- `references/layouts/`

## Usage

Invoke the skill explicitly:

```md
Use $orange-matters to restyle this dashboard.
```

Examples:

```md
Use $orange-matters to build a compact React dashboard frame with a collapsible sidebar.
Use $orange-matters to create image-processing result cards and a video ROI debug view.
Use $orange-matters to align this admin panel with the Orange Matters component language.
```

## What Is Included

```text
skills/
  orange-matters/
    SKILL.md
    agents/openai.yaml
    references/
      theme-spec.md
      react-spec.md
      layouts/
        dashboard-frame.md
      components/
        alert.md
        button.md
        card.md
        control-card.md
        dialog.md
        field.md
        header.md
        heading.md
        image-card.md
        menubar.md
        running-border.md
        table.md
        toast.md
        vision-stage.md

sample-orange-matters/
  React/Vite demo for visual verification.
```

## For Agents

When installing or using this repo as an agent:

- Treat `skills/orange-matters/` as the only installable skill directory.
- Read `skills/orange-matters/SKILL.md` first.
- Use progressive disclosure:
  - read `references/theme-spec.md` for visual rules and the component index
  - read `references/react-spec.md` only for React work
  - read `references/layouts/dashboard-frame.md` only for a full dashboard frame
  - read component recipes only for the components being implemented
- Do not copy `sample-orange-matters/` into a user's Codex skills directory.
- Do not depend on sample files at runtime; reusable patterns belong under `skills/orange-matters/references/`.

## Sample App

`sample-orange-matters/` demonstrates the recipes in a real React/Vite app:

- full-viewport dashboard frame
- header with sidebar toggle
- collapsible/floating left menu
- side-menu page switching
- records table and dashboard composition
- image result cards
- video/SVG ROI debug stage
- control cards
- running border hover states
- toast feedback
- light and dark theme tokens

Run locally:

```bash
cd sample-orange-matters
npm install
npm run dev
```

Build check:

```bash
npm run build
```

Generated files such as `node_modules/`, `dist/`, `.vite/`, coverage output, logs, and TypeScript build info are ignored.

## Adding More Skills

New themes should follow this structure:

- one skill per folder under `skills/<skill-name>/`
- required: `SKILL.md`
- recommended: `agents/openai.yaml`
- durable rules and recipes under `references/`
- optional demo app as `sample-<skill-name>/`

Keep `SKILL.md` short. Put larger implementation details in targeted reference files so agents only load what they need.
