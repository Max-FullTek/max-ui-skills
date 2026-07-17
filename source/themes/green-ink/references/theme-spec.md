# Green Ink Theme Spec

Portable visual specification for compact product screens, admin tools, data workspaces, and dashboards. The theme evokes paper, ink, and editorial order through material restraint rather than decorative imitation.

## Identity

- **Primary material:** opaque paper-white or near-black ink surfaces.
- **Primary action:** deep mineral green.
- **Secondary accent:** restrained vermilion, used less often and in smaller areas than green.
- **Geometry:** cut, low-radius forms; `2px` to `8px`, never pills.
- **Depth:** flat by default; when separation is necessary, use a short hard offset shadow with no blur.
- **Tone:** precise, quiet, contemporary, and suitable for dense product work.

Green Ink must not look like Orange Matters with a new accent color. Its identity depends on clean content surfaces, lower geometry, border hierarchy, restrained motion, and the absence of glass, glow, decorative CSS gradients, and floating lift. A small indexed artwork vocabulary supplies material character without turning each component into an illustration.

## Palette

### Light

| Role | Value | Use |
| --- | --- | --- |
| Paper background | `#e9e5d8` | Application canvas |
| Elevated paper | `#f8f5ea` | Controls and raised work areas |
| Panel paper | `#f3efe2` | Panels, menus, dialogs |
| Strong paper | `#fffdf5` | Inputs and high-contrast surfaces |
| Ink | `#171b18` | Primary text and strongest borders |
| Soft ink | `#5f675e` | Secondary text |
| Deep green | `#174a34` | Primary action and focus |
| Strong green | `#0e3525` | Active state and high emphasis |
| Green wash | `#dce9df` | Selected and quiet primary states |
| Vermilion | `#a84533` | Secondary action and sparse marks |
| Strong vermilion | `#813326` | Active secondary state |
| Vermilion wash | `#f2dfd8` | Quiet secondary state |

### Dark

| Role | Value | Use |
| --- | --- | --- |
| Ink background | `#121813` | Application canvas |
| Elevated ink | `#182219` | Controls and work areas |
| Panel ink | `#1d281f` | Panels, menus, dialogs |
| Strong ink | `#233025` | Inputs and high-contrast surfaces |
| Paper text | `#ede9dc` | Primary text |
| Soft paper | `#adb5aa` | Secondary text |
| Deep green | `#316f4b` | Primary action and focus |
| Strong green | `#23583a` | Active primary state |
| Green wash | `#263d2d` | Selected and quiet primary states |
| Vermilion | `#a94c3a` | Secondary action and sparse marks |
| Strong vermilion | `#81382c` | Active secondary state |
| Vermilion wash | `#422b26` | Quiet secondary state |

Keep normal text at accessible contrast. Success follows the deep-green family. Vermilion is not a competing brand color; use it for a secondary action family, warning/destructive semantics, or one small identifying mark.

## Surface And Border Hierarchy

Use opaque fills for content, controls, tables, dialogs, cards, and media metadata. Do not use alpha glass surfaces, `backdrop-filter`, blur, glow, or decorative CSS gradients. Only the shell and the explicitly named accent components in [art-assets.md](art-assets.md) may use the four approved non-semantic artwork files.

1. **Application:** solid fallback background; the shell may layer the indexed paper grain, light ink horizon, or dark ink flow behind content.
2. **Panel:** solid panel fill with a `1px` neutral border.
3. **Control:** strong solid fill with a `1px` border; focus replaces the border with green and adds a hard spread ring.
4. **Emphasis:** `2px` green or ink rule, or a single short hard offset shadow.

Use `--border` for ordinary separation and `--border-strong` for structural edges. Avoid surrounding every nested region with an equally strong box.

## Geometry And Depth

- `--radius-sm: 2px`
- `--radius-md: 4px`
- `--radius-lg: 6px`
- `--radius-xl: 8px`
- Map legacy pill roles to `4px`; Green Ink never renders pill geometry.
- Default depth is none.
- Soft depth token: `2px 2px 0` with low-opacity ink.
- Strong depth token: `4px 4px 0` with low-opacity ink.
- Hover changes fill or border only. It never moves upward.
- Active controls may shift `1px` down/right while removing their offset shadow.

## Focus And State

- Focus is a crisp deep-green border plus a hard `2px` spread ring separated from the control by the current surface color.
- Hover increases border contrast or changes one solid fill step.
- Active states deepen the fill and may use a `1px` press offset.
- Disabled states lower contrast without adding translucency effects or blur.
- Keep transitions between `100ms` and `160ms`; use linear or simple ease-out curves.

## Typography

- Body/UI stack: system UI, `PingFang TC`, `Microsoft JhengHei`, `Noto Sans TC`, sans-serif. It must work without a network request.
- Optional display stack: `LXGW WenKai TC`, `Noto Serif TC`, `Source Han Serif TC`, `PMingLiU`, serif.
- Use the display role only for short headings, brand text, or a compact dialog title. Keep controls, tables, helper text, and dense content sans-serif.
- `LXGW WenKai TC` is consumer-installed or consumer-hosted opt-in typography. Green Ink does not bundle a CJK font or require remote font loading; the remaining stack is the required fallback.
- Avoid faux calligraphy fonts, vertical typesetting, excessive tracking, or ornamental punctuation.

## Controlled Artwork

The canonical artwork vocabulary is capped at four reusable WebP files: paper grain, light ink horizon, dry brush, and dark ink flow. Their canonical and published paths, consumers, fallbacks, and mode rules are defined in [art-assets.md](art-assets.md).

Artwork is decorative only: it carries no copy, status, hit target, focus indicator, or accessibility meaning. Do not create one image per component and do not encode asset paths as tokens. Component-specific size, crop, placement, and opacity stay in Green presentation fragments.

Keep content surfaces clean. Cards, tables, fields, dialogs, inspector metadata, image previews, and vision/debug media never receive paper grain, ink flow, or brush overlays. Never add dragons, cloud curls, lattice windows, scroll edges, repeated seals, pagodas, lanterns, bamboo patterns, or unindexed brush splashes.

## Calibrated Components

- **Button:** solid fallback fills, `2px` corners, crisp focus, optional hard offset, and the shared dry-brush artwork on `primary` only; no lift.
- **Field:** rectangular controls, solid option panel, green focus, selected option indicated by fill and a narrow inset rule.
- **Card:** token-only. Solid card surface, low radius, border, and short hard shadow are sufficient; no structural override.
- **Header:** solid fallback panel with the light ink horizon artwork, strong lower rule, squared brand mark, compact mixed typography, and no blur. Dark mode removes the horizon and lets the shell own the dark flow.
- **Dialog:** solid backdrop and panel, low radius, hard offset shadow, compact display title, no backdrop blur or floating lift.

These five components remain the baseline calibration set. The A+B/C calibration additionally assigns the shared dry-brush asset to active `Menubar` rows and short `Heading` titles, paper/dark-flow artwork to `DashboardFrame`, and the horizon to `Header`. Extend the same decisions across the catalog; do not locally reinvent radii, shadows, accent behavior, or artwork.

## Theme-exclusive Vocabulary

Green Ink has no exclusive public component in the initial release. Its identity is expressed through tokens, presentation overrides, typography, and restrained marks. Add an exclusive only when a reusable interaction or component concept is native to this theme; never add one solely to mirror another theme's catalog.
