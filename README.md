# Max UI Skills

這個 repo 是一組可攜式的 UI theme skills，目的是讓未來的 Codex agents 可以直接從 GitHub 取得、安裝、套用到其他專案。

每個 theme 都是一個獨立 skill，放在 `skills/<skill-name>/` 之下。  
目前第一個 theme 是：

- `orange-matters`
  中文概念是「大橘為重」。
  視覺方向是暖米白 light mode、深炭灰 dark mode、橘到橘紅 accent、glass panel、rounded card、soft shadow。

## Repo Structure

```text
skills/
  orange-matters/
    SKILL.md
    agents/openai.yaml
    references/theme-spec.md
```

## Install

### Option 1: Install with a skill installer agent

如果你的 agent 支援 skill 安裝流程，直接把這個 GitHub repo 連結丟給它，並指定要安裝的 skill 名稱即可。

Example prompt:

```md
Use $skill-installer to install the `orange-matters` skill from this GitHub repo.
```

### Option 2: Manual install

把想要的 skill 資料夾複製到本機 Codex skills 目錄：

```text
~/.codex/skills/orange-matters
```

Windows 常見位置也可以是：

```text
C:\Users\<you>\.codex\skills\orange-matters
```

複製完成後，確認目錄裡至少包含：

- `SKILL.md`
- `agents/openai.yaml`

## Use

安裝後，可以直接在 prompt 裡明示使用這個 skill：

```md
Use $orange-matters to restyle this project with the Da Ju Wei Zhong orange-glass theme.
```

也可以更具體：

```md
Use $orange-matters to redesign the dashboard and shared components while preserving the existing product structure.
```

## Add More Themes

之後新增 theme 時，請沿用同樣結構：

- 每個 theme 一個資料夾：`skills/<theme-name>/`
- 每個 theme 至少包含 `SKILL.md`
- 建議包含 `agents/openai.yaml`
- 詳細規格放在 `references/`

這樣未來其他 agent 就可以從同一個 repo 挑選並安裝指定 theme。
