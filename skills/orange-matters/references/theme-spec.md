# Orange Matters Theme Spec

中文別名：`大橘為重`

這個名字取的是雙關語感，核心意思不是「真的翻成一句英文成語」，而是讓這個 theme 在英文環境裡也保留「橘色最重要」的感覺。這份規格仍然保留中文語意，方便之後延伸時不失真。

這份文件是可攜式的 UI 規格參考，目的是讓之後其他專案的 agent 可以直接沿用同一套視覺語言。

它不是綁定某個專案的實作文件，所以內容應該聚焦在：

- 色彩系統
- 字體與層級
- 元件語言
- 動效規則
- 後續 agent 的延伸原則

不要在這份文件裡放專案路徑、檔名、框架耦合資訊，或特定頁面文案。

## 設計目標

這套 UI 適合用在：

- 內容工具
- 後台介面
- 內部管理系統
- 資料瀏覽工具
- 輕量但有質感的 dashboard

核心氣質：

- light mode 是暖米白工作台
- dark mode 是深炭灰玻璃面板
- accent 固定走橘到橘紅
- 介面要有柔和浮動感，但不能花俏
- 互動要清楚、穩定、帶一點玩味

## 核心視覺方向

- 整體不是純白 dashboard，而是偏暖、帶紙感與內容工具感的工作區
- surface 使用半透明 panel + blur + 柔和陰影
- 主視覺重點放在 sticky topbar、圓角卡片、封面或媒體 hover sheen、橘色 CTA
- dark theme 不走藍黑，也不走 pure black，而是中性深炭灰
- 不用企業藍 focus ring，不用紫色系，也不要做成通用 SaaS 模板風格

## Typography

- 主字體建議：`Outfit`
- 中文搭配建議：`Noto Sans TC`
- 基本字體堆疊建議：
  `"Outfit", "Noto Sans TC", sans-serif`

字體使用原則：

- 標題短、重、緊，字距略收
- 內文與說明維持清楚，不要過細
- eyebrow / meta 走小字、uppercase、低對比

## Theme Tokens

### Light

- `--bg: #f4efe7`
- `--bg-elevated: rgba(255, 250, 243, 0.78)`
- `--bg-panel: rgba(252, 246, 239, 0.94)`
- `--bg-strong: rgba(255, 255, 255, 0.9)`
- `--card-surface: linear-gradient(180deg, rgba(248, 242, 233, 0.94), rgba(241, 232, 219, 0.94))`
- `--text: #13151b`
- `--text-soft: #68707f`
- `--border: rgba(19, 21, 27, 0.1)`
- `--border-strong: rgba(19, 21, 27, 0.18)`
- `--accent: #ff7a00`
- `--accent-strong: #ff4f0f`
- `--accent-soft: rgba(255, 122, 0, 0.12)`
- `--danger: #da3b67`
- `--shadow: 0 24px 70px rgba(55, 37, 16, 0.12)`
- `--shadow-soft: 0 16px 36px rgba(31, 23, 14, 0.08)`

### Dark

- `--bg: #121212`
- `--bg-elevated: rgba(28, 28, 28, 0.82)`
- `--bg-panel: rgba(36, 36, 36, 0.84)`
- `--bg-strong: rgba(44, 44, 44, 0.94)`
- `--card-surface: linear-gradient(180deg, rgba(58, 58, 58, 0.96), rgba(46, 46, 46, 0.98))`
- `--text: #eef3fb`
- `--text-soft: #98a2b5`
- `--border: rgba(238, 243, 251, 0.1)`
- `--border-strong: rgba(238, 243, 251, 0.18)`
- `--accent: #ff9350`
- `--accent-strong: #ff6736`
- `--accent-soft: rgba(255, 147, 80, 0.14)`
- `--danger: #ff5c8a`
- `--shadow: 0 28px 90px rgba(0, 0, 0, 0.42)`
- `--shadow-soft: 0 18px 42px rgba(0, 0, 0, 0.24)`

## Layout Rules

- App shell 建議最大寬度：`1560px`
- 外層內容左右留白：桌機約 `40px`，手機約 `20px`
- Topbar 建議 sticky，距離頂部約 `16px`
- 主內容優先採單欄 section 疊放，不做過度複雜的 dashboard mosaic
- 主結果區與次要面板應維持同一套 panel 語言

Radius 規則建議：

- `--radius-xl: 30px`
- `--radius-lg: 24px`
- `--radius-md: 18px`
- `--radius-sm: 14px`
- `--radius-pill: 999px`

## Surface Language

- Topbar、results panel、drawer panel、source card 都適合使用 glass panel
- 卡片本體建議使用 gradient surface，不是單色平面
- 陰影要柔和深層，不要銳利 web2.0 式陰影
- light mode 可保留白色高光 inset
- dark mode 改成較低對比的邊界與陰影，不要亮邊過重

## 元件規格

### Topbar

- 三段式：品牌、搜尋、工具列
- sticky 且高 z-index
- 自帶半透明背景、blur、陰影
- 品牌 mark 適合用橘色 gradient block，hover 時可輕微旋轉

### Search

- 搜尋輸入框適合使用 pill 容器
- focus 時可放大到更寬，並增加 accent glow
- placeholder 可改用 ghost typing 動畫
- submit button 建議保持主 CTA 地位

### Buttons

- `primary`
  橘到橘紅漸層，白字，外部陰影明顯
- `ghost`
  低對比 surface + 邊框，hover 後用 accent-soft 染色
- `danger`
  粉紅紅系，不和 accent 混用
- `icon-only`
  方形圓角按鈕，內含 SVG，hover 可有微浮動

### Cards

- 卡片建議固定為媒體區 + 標題 + action
- 媒體區可保留 gloss 與 sweep sheen
- hover 以整卡 lift 為主，不要按鈕各自過度彈跳
- badge 建議尺寸小、位置固定、不干擾主視覺

### Drawer

- 從右側滑入
- backdrop 要有半透明暗遮罩
- drawer panel 和主要 panel 同一套材質語言

### Snackbar

- 固定右下角
- 要有 scale + fade in
- success / error 用不同底色
- 可保留短暫粒子 burst，但不要過強

### Tooltip

- 深色、小型、圓角
- 不要使用亮色 tooltip
- 進場是短距離 rise，不要彈跳

## 動效規則

全站 transition 基準建議：

- `200ms cubic-bezier(0.22, 1, 0.36, 1)`

建議保留的動效語言：

- `fade-slide`
  section 切換時由下往上淡入
- `ghost-caret`
  搜尋 ghost 文案打字游標
- `icon-idle-float`
  icon 靜態輕微漂浮
- `icon-bob`
  hover 時 icon 小幅彈動
- `snackbar-burst`
  snackbar 出現時粒子式 burst
- `tooltip-rise`
  tooltip 輕微上浮進場

互動原則：

- hover 主要是 `translateY(-1px ~ -6px)`、陰影變深、飽和微升
- focus 主要用 accent 邊框與 glow，不用預設藍框
- 動效要短，不要拖
- 同一頁不能同時有太多不同節奏的動畫

## 背景規則

### Light Mode

- 使用多層 radial gradient
- 橘、橘紅、青綠只出現在背景霧光，不可變成主色塊
- 目的是增加空氣感，不是做 hero 背景

### Dark Mode

- 背景改成更克制的白色低透明度霧光
- 避免在 dark mode 再塞彩色漸層，會顯得髒

## 響應式規則

- `1180px` 以下：topbar 變單欄，搜尋區撐滿
- `720px` 以下：
  - 外層左右縮窄
  - topbar / panel radius 可縮到 `24px`
  - 搜尋區改單欄
  - 結果卡最小寬度可降到約 `154px`
  - snackbar 靠近螢幕邊緣

## Agent 實作守則

之後任何 agent 在新專案延伸這套 UI，請遵守：

- 沿用現有 token，不要另起一套主色
- 新 panel、drawer、popover 都先沿用 glass panel 語言
- 新按鈕優先從 `primary / ghost / danger / icon-only` 演化
- 新卡片優先延續目前媒體卡的 hover / sheen / radius 語言
- 新 icon 動效沿用現有 idle float / hover bob，不要加入其他花式 easing
- dark mode 必須同步設計，不允許只補 light mode
- 不要引入另一套 UI framework 覆蓋這套視覺

## 可以直接貼給後續 Agent 的提示詞

```md
請沿用這份 UI system：
- 暖米白 light mode / 深炭灰 dark mode
- 橘到橘紅 accent
- glass panel + rounded card + soft shadow
- 搜尋區、卡片、drawer、snackbar 的動效語言一致
- 不使用紫色、企業藍 focus ring、通用 SaaS 模板風格
如果新增元件，請先從既有 `primary / ghost / danger / icon-only / card / drawer` 語言延伸。
```
