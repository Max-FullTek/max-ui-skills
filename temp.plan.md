可以共用，而且不會影響單獨安裝。關鍵是把「共用」限定在 repository 的開發階段；發布後，每個 Skill 都必須自包含。

> Core 是建置來源，不是使用者安裝後的 runtime dependency。

我先把你說的 `sample-component` 解讀為可複製的 TSX／SCSS 元件範例，而不是整個 Vite sample app。

## 最終架構決策

每個已發布 Skill 都包含：

- 自己的 `SKILL.md`
- 完整 component references
- 可直接複製的 React sample components
- 自己的 tokens
- 自己的 theme-specific overrides
- 不依賴另一個 Skill
- 不引用 repo 外部的 `source/`

完整 sample app 留在 repository，不跟著 Skill 安裝。

```text
開發階段                         發布／安裝階段

source/foundation ───────┐       skills/orange-matters/
source/components ───────┼─────▶   references/
source/themes/orange ─────┘         assets/react/

source/foundation ───────┐       skills/green-ink/
source/components ───────┼─────▶   references/
source/themes/green ──────┘         assets/react/
```

這代表產物中會有重複檔案，但維護來源沒有重複。

## 使用者只裝一個 Skill 時會得到什麼

例如只安裝 `green-ink`：

```text
green-ink/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── references/
│   ├── theme-spec.md
│   ├── react-spec.md
│   ├── layouts/
│   └── components/
└── assets/
    └── react/
        ├── components/
        ├── layouts/
        └── styles/
            ├── tokens.scss
            └── globals.scss
```

`references/components/button.md` 負責告訴 Codex：

- Button 的使用規則
- props 與 variants
- accessibility
- Green Ink 的視覺限制
- 何時讀取或複製 asset

`assets/react/components/Button/` 則提供實際 TSX、SCSS Module 與 `index.ts`。

所以即使使用者只裝 Green Ink，也能看到並使用完整 sample components；他不需要 Orange Matters，也不需要整份 repository。

## 不把完整 sample app 放進 Skill

目前 [sample-orange-matters](G:/max-ui-skills/sample-orange-matters) 是完整 Vite 專案，適合：

- repository 開發驗證
- 視覺展示
- regression check
- 截圖與文件素材

但不適合每個 Skill 都攜帶，因為會包含：

- `package.json`
- Vite 設定
- feature demo data
- 整頁 dashboard composition
- 大量與單一任務無關的程式碼

因此建議分成兩類：

| 類型 | 放置位置 | 是否隨 Skill 安裝 |
|---|---|---|
| 可複製 component source | `assets/react/components/` | 是 |
| 完整可執行展示站 | `samples/<theme>/` | 否 |

## 元件共用層級

抽取前先為現有 14 個元件建立分類矩陣。

### Level 1：完全共用

共用 TSX、props、ARIA 與行為：

- Alert
- Card
- ControlCard
- Dialog
- DataTable
- ToastProvider
- VisionStage
- ImageCard

差異主要由 tokens 與 theme CSS 控制。

### Level 2：共用邏輯，主題外觀不同

TSX 共用，但需要 theme-specific styles：

- Button
- Field
- Header
- Menu
- Heading
- DashboardFrame

例如 Green Ink 的 Field 不該沿用 pill geometry，Menu active state 也可能從橘色圓角底改成墨線或左側直線。

### Level 3：主題專屬

不強迫兩個 Skill 一一對應：

- Orange Matters：`RunningBorder`
- Green Ink：未來可能是 `InkTrace`、`SealMark` 或完全不提供對應元件

這類元件可以共享底層測量邏輯，但不應偽裝成同一種視覺語彙。

# 完整開發計畫

## Phase 0：建立文件治理

目前 repository 沒有 documentation index，而 `UPDATE_LOG.md` 又放在 Skill 內。實作時先建立：

```text
docs/
├── DOCUMENTATION_INDEX.md
├── ARCHITECTURE.md
└── DEVELOPMENT_PLAN.md
```

文件責任：

- `ARCHITECTURE.md`：長期架構與發布原則。
- `DEVELOPMENT_PLAN.md`：本次遷移階段、進度和驗收標準。
- `README.md`／`README.zh-TW.md`：只保留使用者安裝與使用方式。
- `SKILL.md`：只保留 Codex 執行工作所需指示。
- `UPDATE_LOG.md`：移出 Skill；歷史若需保留，移到 `docs/history/`。

驗收：

- 每種資訊只有一個 source of truth。
- Skill 裡沒有 repository 維護日誌。
- README 不複製完整架構規格。

## Phase 1：建立元件分類與 token contract

新增元件矩陣，逐一標記：

- API／TSX 是否共用
- layout CSS 是否共用
- visual CSS 是否 token 化
- 是否需要 theme override
- 是否為 theme-exclusive
- 對應 recipe
- 對應 sample asset
- 對應 sample app 畫面

同時整理 token contract：

```text
Color
Surface
Border
Geometry
Typography
Shadow
Focus
Motion
Component-specific
```

除了現有的 `--accent`、`--radius-*`，還需要加入語意更清楚的 tokens，例如：

```css
--control-radius
--panel-radius
--button-shadow
--focus-ring
--surface-treatment
--hover-translate-y
--active-translate-y
--border-width
```

但避免把每一條 CSS 都抽成 token；真正結構不同時使用 override。

驗收：

- 所有元件都有明確分類。
- 沒有用 token 強行解決結構差異。
- Orange 與 Green 的差異可以被清楚定位。

## Phase 2：建立 canonical source

建議目錄：

```text
source/
├── foundation/
│   ├── react-spec.md
│   ├── layout-rules.md
│   └── component-contracts/
├── react/
│   ├── components/
│   ├── layouts/
│   └── styles/
└── themes/
    ├── orange-matters/
    │   ├── theme-spec.md
    │   ├── tokens.scss
    │   ├── component-overrides/
    │   └── theme-components/
    └── green-ink/
        ├── theme-spec.md
        ├── tokens.scss
        ├── component-overrides/
        └── theme-components/
```

原則：

- TSX 行為只維護一份。
- 共用 layout styles 只維護一份。
- Theme tokens 各自維護。
- Theme overrides 各自維護。
- Theme-exclusive 元件不放進 foundation。

## Phase 3：先遷移 Orange Matters

不能一開始就同時重構 Orange 和開發 Green。先讓既有 Orange Matters 通過新管線。

步驟：

1. 將現有 component TSX 移到 canonical source。
2. 將 Orange tokens 移到 `source/themes/orange-matters`。
3. 將橘色專屬描述從共用規則移到 Orange theme。
4. 保留既有 public component API。
5. 由 canonical source 重新產生 `skills/orange-matters`。
6. 讓 sample app 改為消費 canonical source 或生成產物。

驗收：

- Orange component API 沒有非必要變更。
- 每個既有 recipe 都仍存在。
- Orange Skill 可獨立安裝。
- Orange Skill 裡沒有 `../green-ink` 或 `../../source` 引用。
- 現有 sample app 基本 build 通過。

## Phase 4：建立 Skill 打包流程

新增 deterministic build script，例如：

```text
scripts/build-skills.mjs
```

它負責：

1. 清理受控的暫存輸出。
2. 複製 foundation references。
3. 合併指定 theme spec。
4. 複製共用 React components。
5. 套入 theme tokens 和 overrides。
6. 加入 theme-exclusive components。
7. 產生完整自包含 Skill。
8. 檢查相對連結。
9. 產生檔案 manifest 或 checksum。

輸出：

```text
skills/
├── orange-matters/
└── green-ink/
```

建議把生成後的 Skill 提交進 Git，讓 GitHub 上的 `$skill-installer` 可以直接安裝單一資料夾，不要求使用者先執行 build。

不要使用 symlink，避免 Windows、ZIP、GitHub installer 和不同 filesystem 行為不一致。

驗收：

- 連續執行兩次產生完全相同結果。
- 生成後 `git diff` 為空。
- 產物沒有 repo 外部相依。
- 任一 Skill 資料夾可獨立複製。

## Phase 5：將 sample components 加入 Skill assets

將目前 sample app 中具有重用價值的程式碼轉成：

```text
skills/<theme>/assets/react/
├── components/
├── layouts/
└── styles/
```

Recipe 不再維護另一份巨大程式碼副本，而是：

- 描述元件 contract
- 顯示最小 usage example
- 指向完整 asset
- 補充 theme-specific guardrails

這能降低現在「Markdown recipe 一份、sample app source 又一份」的漂移風險。

驗收：

- 每個 reference recipe 都能找到對應 asset。
- 每個 asset 都有 recipe 或明確標記為 internal。
- 使用者只安裝一個 Skill 時，所有 component assets 都存在。

## Phase 6：定義 Green Ink 視覺系統

先完成 Green Ink spec，再寫元件。

至少需要定義：

- 墨綠、紙白、墨黑、朱砂的角色
- light／dark mode
- 低圓角、直角或切角規則
- panel 與 control 的 border hierarchy
- 陰影是否改為硬邊、短陰影或無陰影
- focus state
- hover／active motion
- 字體與中英文混排
- 裝飾使用上限
- 禁止的中式刻板裝飾
- theme-exclusive component 語彙

建議先選 5 個代表性元件做 visual calibration：

- Button
- Field
- Card
- Header
- Dialog

確認方向後再擴展到完整 catalog。

驗收：

- Green Ink 不是單純把 accent 換成綠色。
- 不殘留 Orange Matters 的 pill、glass、orange glow 或浮動陰影。
- 視覺規則能用文字和 tokens 重現。

## Phase 7：產生 Green Ink Skill

建立：

```text
skills/green-ink/
├── SKILL.md
├── agents/openai.yaml
├── references/
└── assets/react/
```

`SKILL.md` 的 description 必須清楚區隔：

- 墨綠中國風
- 紙墨 surfaces
- 銳利 geometry
- restrained depth
- 現代 product UI
- 不應由 Orange Matters 觸發的情境

驗收：

- `$green-ink` 可明確呼叫。
- 隱式觸發描述不與 `$orange-matters` 重疊。
- Green Ink Skill 完全不依賴 Orange Matters。
- 所有共用元件和 Green-specific assets 都在安裝資料夾內。

## Phase 8：建立 Green Ink sample app

建議改成：

```text
samples/
├── orange-matters/
└── green-ink/
```

兩個 sample app 使用相同：

- page data
- component API
- dashboard scenarios
- responsive layout cases

只更換：

- theme tokens
- overrides
- theme-exclusive showcase

這樣才能真正驗證「共用元件骨架，不同視覺系統」。

驗收：

- 兩個 sample app 都能基本 build。
- 相同 component props 在兩邊可用。
- 主題專屬元件分開展示。
- 不要求畫面 pixel-identical。

## Phase 9：重寫安裝文件

更新：

- [README.md](G:/max-ui-skills/README.md)
- [README.zh-TW.md](G:/max-ui-skills/README.zh-TW.md)

需要包含：

- Orange only
- Green only
- Both skills
- Skill installer prompt
- 手動安裝方式
- 每個 Skill 都是 self-contained
- 不需要安裝 `source/`
- 不需要安裝完整 sample app
- sample components 已包含在 Skill assets
- sample apps 只存在 repository
- 不建議在同一任務同時套用兩個 theme

README 的安裝路徑應以 installer 為主要方式；手動路徑則依支援的 Codex surface 分開說明，避免只宣稱單一路徑適用所有版本。

## Phase 10：基本驗證與發布門檻

依目前專案指示，只做基本檢查，不進行完整 browser QA。

每次發布至少執行：

```text
1. Validate orange-matters Skill
2. Validate green-ink Skill
3. Build sample-orange-matters
4. Build sample-green-ink
5. Check generated files are reproducible
6. Check all relative links
7. Check each Skill in isolation
```

單獨安裝測試：

- 將 `orange-matters` 複製到空白暫存 skills directory。
- 確認所有 references 和 assets 可解析。
- 對 `green-ink` 重複相同步驟。
- 確認沒有跨 Skill 路徑。
- 確認兩者不需要 repository root。

若需要視覺 QA、responsive inspection 或 screenshot comparison，再另外明確安排可見 Browser 檢查，不放進每次基本 build。

## 建議實作順序

最安全的順序是：

1. 文件與 component matrix
2. canonical source
3. Orange Matters 遷移
4. 打包器與 isolation check
5. sample component assets
6. Green Ink spec
7. Green Ink components
8. Green Ink sample app
9. README 與安裝流程
10. 選配整合 Plugin

不要先寫 Green Ink，再回頭抽 core；那會立即產生兩份彼此漂移的元件。

這份計畫的核心驗收句可以定為：

> Repository 內共用一份元件來源；每個發布 Skill 都攜帶完整、可閱讀、可複製、無外部相依的元件 recipes 與 sample assets。

本輪只完成架構盤點與計畫，尚未修改 repository 文件或程式碼。