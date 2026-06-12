# Max UI Skills

[English](./README.md) | [繁體中文](./README.zh-TW.md)

![Codex Skill](https://img.shields.io/badge/Codex-Skill-ff7a00) ![Theme](https://img.shields.io/badge/theme-orange--matters-ff4f0f) ![React Recipes](https://img.shields.io/badge/recipes-React%20%2B%20SCSS-0f9f8f) ![Install](https://img.shields.io/badge/install-copy%20skill%20folder-lightgrey)

給 Codex agents 使用的可攜式 UI design-system skills。

目前提供的 skill 是 `orange-matters`（`大橘為重`）：一套暖色、緊湊、偏 app shell 的 UI theme，包含暖米白 light mode、深炭灰 dark mode、橘色主操作、低飽和青綠輔助操作、glass panels、局部滾動，以及可重複使用的 React component recipes。

## 快速安裝

只需要安裝這個資料夾：

```text
skills/orange-matters/
```

不要安裝 sample app。`sample-orange-matters/` 只是 demo 和 regression check。

### 使用 Skill Installer Agent

```md
Use $skill-installer to install the `orange-matters` skill from this GitHub repo.
```

### 手動安裝

複製：

```text
skills/orange-matters
```

到：

```text
~/.codex/skills/orange-matters
```

Windows 常見路徑：

```text
C:\Users\<you>\.codex\skills\orange-matters
```

安裝後請確認資料夾裡有：

- `SKILL.md`
- `agents/openai.yaml`
- `references/theme-spec.md`
- `references/react-spec.md`
- `references/components/`
- `references/layouts/`

## 使用方式

在 prompt 中明確指定：

```md
Use $orange-matters to restyle this dashboard.
```

範例：

```md
Use $orange-matters to build a compact React app shell with a collapsible sidebar.
Use $orange-matters to create image-processing result cards and a video ROI debug view.
Use $orange-matters to align this admin panel with the Orange Matters component language.
```

## 內容結構

```text
skills/
  orange-matters/
    SKILL.md
    agents/openai.yaml
    references/
      theme-spec.md
      react-spec.md
      layouts/
        app-shell.md
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
        table.md
        vision-stage.md

sample-orange-matters/
  用來做視覺驗證的 React/Vite demo。
```

## 給 Agents 的注意事項

如果你是負責安裝或使用這個 repo 的 agent：

- 只有 `skills/orange-matters/` 是 installable skill directory。
- 先讀 `skills/orange-matters/SKILL.md`。
- 使用 progressive disclosure：
  - 視覺規則與元件索引讀 `references/theme-spec.md`
  - React 專案才讀 `references/react-spec.md`
  - 要建立完整 app shell 才讀 `references/layouts/app-shell.md`
  - 只讀當前需要實作的 component recipes
- 不要把 `sample-orange-matters/` 複製到使用者的 Codex skills 目錄。
- 不要讓 skill runtime 依賴 sample files；可重複使用的模式都應該放在 `skills/orange-matters/references/`。

## Sample App

`sample-orange-matters/` 是用來驗證 recipes 是否能落地成真實 React/Vite UI 的 demo。

它展示：

- full-viewport app shell
- header sidebar toggle
- 可收合 / floating 的左側 menu
- side-menu 換頁
- records table 與 dashboard composition
- image result cards
- video/SVG ROI debug stage
- control cards
- light / dark theme tokens

本機執行：

```bash
cd sample-orange-matters
npm install
npm run dev
```

Build check：

```bash
npm run build
```

`node_modules/`、`dist/`、`.vite/`、coverage、logs、TypeScript build info 等產物已被忽略。

## 新增更多 Skills

新增 theme 時請沿用：

- 每個 theme 一個資料夾：`skills/<skill-name>/`
- 必要：`SKILL.md`
- 建議：`agents/openai.yaml`
- 穩定規則與 recipes 放在 `references/`
- demo app 可放在 repo root，命名為 `sample-<skill-name>/`

保持 `SKILL.md` 短小。較長的實作細節放進針對性的 reference files，讓 agents 只讀需要的內容。
