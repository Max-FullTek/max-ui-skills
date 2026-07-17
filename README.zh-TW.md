# Max UI Skills

[English](./README.md) | [繁體中文](./README.zh-TW.md)

![Codex Skill](https://img.shields.io/badge/Codex-Skills-ff7a00) ![Themes](https://img.shields.io/badge/themes-2-174a34) ![React Recipes](https://img.shields.io/badge/recipes-React%20%2B%20SCSS-0f9f8f)

提供給 Codex agents 的可攜式、自包含 UI design-system skills：

- `orange-matters`（`大橘為重`）— 暖米白與炭黑 product UI、橘色主操作、青綠輔助操作、glass panels 與緊湊 dashboard layout。
- `green-ink` — 乾淨的紙墨工作面、受控山水與乾筆素材、深綠主操作、低圓角，以及 dark mode 墨流氛圍。

每個 Skill 都包含自己的指令、元件 recipes、React/SCSS assets、theme tokens 與 manifest。Sample applications 只存在 repository，不是 runtime dependency。

## 快速安裝

可單獨安裝任一 Skill，也可以兩個都安裝：

```text
skills/orange-matters/
skills/green-ink/
```

### Skill Installer Prompts

```md
Use $skill-installer to install the Skill at `skills/orange-matters` from https://github.com/Max-FullTek/max-ui-skills.
Use $skill-installer to install the Skill at `skills/green-ink` from https://github.com/Max-FullTek/max-ui-skills.
```

### 手動安裝

Skills 可用於 ChatGPT desktop app、Codex CLI 與 IDE extension。把需要的資料夾複製到對應 scope：

```text
使用者全域：$HOME/.agents/skills/orange-matters
使用者全域：$HOME/.agents/skills/green-ink
單一 repository：$REPO_ROOT/.agents/skills/orange-matters
單一 repository：$REPO_ROOT/.agents/skills/green-ink
```

Windows 的使用者全域等價路徑是 `%USERPROFILE%\.agents\skills\orange-matters` 與 `%USERPROFILE%\.agents\skills\green-ink`。若新複製的 Skill 沒有出現，請重新啟動 Codex。最新的探索位置可參考官方 [Build skills](https://learn.chatgpt.com/docs/build-skills) 指南。

兩個 Skills 可以同時安裝；單一 UI 任務請選擇其中一套 theme。除非正在刻意設計 theme switcher，否則不要在同一畫面混用兩套視覺語言。

## 使用方式

```md
Use $orange-matters to restyle this compact operations dashboard.
Use $green-ink to build a paper-and-ink content workspace with coordinated light and dark modes.
```

先讀所選 Skill 的 `SKILL.md`，再按需要載入 theme spec、React guide、layout recipe、component recipes 或 artwork index。`assets/` 下的二進位水墨素材應直接複製或依路徑引用，不需要當成文字載入模型。

## Repository 結構

```text
skills/
  orange-matters/       自包含的 generated Skill
  green-ink/            自包含的 generated Skill
source/                 Canonical shared React 與各 theme source
samples/
  orange-matters/       Orange React/Vite sample
  green-ink/            Green React/Vite sample
  shared/               僅供 repository 使用的情境與畫面
```

不要安裝 `samples/`，也不要讓 installed Skill 依賴它。

## 本機檢查

Fresh clone 第一次先安裝兩個 sample 的 locked dependencies：

```bash
npm ci --prefix samples/orange-matters
npm ci --prefix samples/green-ink
```

再執行完整的基本 release gate：

```bash
npm run release:check
```

等價的個別命令如下：

```bash
npm run check:skills
npm run validate:skills
npm run build:samples
git diff --check
```

兩個 sample build 都直接使用 `skills/<theme>/` 下的 generated assets，因此基本 gate 會編譯使用者實際安裝的 React/SCSS 檔案。可用 `npm --prefix samples/orange-matters run dev` 或 `npm --prefix samples/green-ink run dev` 啟動單一 sample。

## 新增或更新 Theme

修改 `source/` 下的 canonical inputs，再執行 `npm run build:skills`。不要直接修改 generated `skills/<theme>/`。保持 `SKILL.md` 精簡，把詳細實作指引放進針對性的 references，讓 agents 使用 progressive disclosure。
