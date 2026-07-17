# Component Matrix

This inventory classifies the 13 shared components under `source/react/components/`, the Orange-exclusive `RunningBorder`, and the shared `DashboardFrame` layout. It is the source of truth for component sharing, recipe coverage, installable asset status, and sample coverage.

Token category semantics and the token-vs-override rule are defined only in [ARCHITECTURE.md](ARCHITECTURE.md#token-contract).

## Classification

- **L1 — Shared component:** API, behavior, layout, and CSS structure are common; normal visual differences come from tokens.
- **L2 — Shared behavior with theme presentation:** API and behavior are shared; theme overrides may change geometry or visual/state structure.
- **L3 — Theme-exclusive:** the visual concept belongs to a theme. Low-level logic may be shared, but another theme does not need a matching public component.

No installable React assets exist under `skills/orange-matters/assets/react/` yet. Every asset cell below is therefore explicitly planned; each canonical source path identifies the future builder input, not a published dependency.

## Inventory

| Component/layout | Level | Common API / logic | Layout CSS | Visual CSS / tokens | Theme override or exclusive | Recipe | Asset | Current sample screen |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Alert` | L1 | Shared tone contract and semantic content wrapper | Shared compact status-strip layout | Tokenized tone surfaces, text, and borders | Token values only by default | `skills/orange-matters/references/components/alert.md` | Planned from `source/react/components/Alert/` | Records; Controls |
| `Button` | L2 | Shared native button props, tones, icon/content behavior, and accessibility | Shared sizing and icon/content alignment | Semantic action, focus, shadow, geometry, and motion tokens | Theme override for fill treatment, geometry, hover/active presentation | `skills/orange-matters/references/components/button.md` | Planned from `source/react/components/Button/` | Records; Images; Vision; Controls |
| `Card` | L1 | Shared polymorphic element, compact variant, and native attributes | Shared section/card spacing and content layout | Tokenized surface, border, radius, and elevation | Token values only by default | `skills/orange-matters/references/components/card.md` | Planned from `source/react/components/Card/` | Records |
| `ControlCard` | L1 | Shared title, description, controls, body, and footer slots | Shared dense header/body/footer grid | Tokenized surface, hierarchy, border, and spacing roles | Token values only by default | `skills/orange-matters/references/components/control-card.md` | Planned from `source/react/components/ControlCard/` | Controls |
| `DataTable` | L1 | Shared generic columns/rows/key contract and table semantics | Shared table viewport, header, row, and cell layout | Tokenized table surface, dividers, row hover, and text hierarchy | Token values only by default | `skills/orange-matters/references/components/table.md` | Planned from `source/react/components/DataTable/` | Records |
| `Dialog` | L1 | Shared open/close behavior, size variants, portal behavior, accessible dialog structure | Shared backdrop, panel sizing, internal scrolling, and action composition | Tokenized overlay, surface, border, elevation, and focus | Token values normally; override only if a theme changes decorative panel structure | `skills/orange-matters/references/components/dialog.md` | Planned from `source/react/components/Dialog/` | Records |
| `Field` (`TextField`, `SelectField`) | L2 | Shared native input contract, option model, selection behavior, portal/floating-list accessibility | Shared control sizing and floating option positioning | Semantic control surface, focus, border, text, and geometry tokens | Theme override for pill vs sharp geometry, option indicator, and state presentation | `skills/orange-matters/references/components/field.md` | Planned from `source/react/components/Field/` | Records; Vision; Controls |
| `Header` | L2 | Shared theme/sidebar controls and product-header responsibilities | Shared dashboard grid-area, responsive clustering, and action alignment | Tokenized header surface, border, elevation, and typography | Theme override for brand treatment, control geometry, and decorative surface structure | `skills/orange-matters/references/components/header.md` | Planned from `source/react/components/Header/` | Application shell / all screens |
| `Heading` | L2 | Shared title, semantic heading level, and action slot | Shared compact title/action row and responsive wrapping | Tokenized type hierarchy, divider/accent, and spacing | Theme override for title divider or other restrained theme-specific treatment | `skills/orange-matters/references/components/heading.md` | Planned from `source/react/components/Heading/` | Records; Images; Vision; Controls |
| `ImageCard` | L1 | Shared image/upload/remove/actions/sizing/fill/info-layout contract | Shared media, below/overlay information, and action layout | Tokenized surface, overlay, border, focus, and metadata hierarchy | Token values only by default | `skills/orange-matters/references/components/image-card.md` | Planned from `source/react/components/ImageCard/` | Images |
| `Menu` / published `Menubar` | L2 | Shared navigation items, active state, open/floating behavior, hash/navigation integration boundary, and close behavior | Shared sidebar/drawer placement, local scroll, and responsive overlay behavior | Tokenized navigation surface, text, border, focus, and active roles | Theme override for active marker, item geometry, and hover presentation | `skills/orange-matters/references/components/menubar.md` | Planned from `source/react/components/Menu/`; normalize public naming during migration | Application shell / all screens |
| `RunningBorder` | L3 | Orange public component; measurement, radius clamp, and unique-ID helpers may be shared internally | Orange-specific overlay/path layout | Component-specific timing, stroke, dash, and fallback-border tokens | **Orange Matters exclusive**; Green Ink may omit it or provide a separately named concept | `skills/orange-matters/references/components/running-border.md` | Planned Orange asset from `source/themes/orange-matters/theme-components/RunningBorder/` | Controls |
| `ToastProvider` | L1 | Shared provider/hook API, queue lifecycle, tone contract, and live-region behavior | Shared portal stack, toast layout, and dismissal/action positioning | Tokenized tone surfaces, border, elevation, and entry motion | Token values only by default | `skills/orange-matters/references/components/toast.md` | Planned from `source/react/components/ToastProvider/` | Controls; provider wraps all screens |
| `VisionStage` | L1 | Shared media, overlay, HUD, toolbar, and label slots | Shared stable aspect-ratio stage and overlay coordinate layers | Tokenized stage surface, HUD, border, focus, and toolbar roles | Token values only by default | `skills/orange-matters/references/components/vision-stage.md` | Planned from `source/react/components/VisionStage/` | Vision |
| `DashboardFrame` layout | L2 | Shared theme synchronization, header/sidebar slots, sidebar state inputs, backdrop, and workspace contract | Shared full-viewport header/sidebar/main grid and local-overflow model | Tokenized application background, header/sidebar dimensions, surface, and motion | Theme override for background composition, drawer treatment, and geometry | `skills/orange-matters/references/layouts/dashboard-frame.md` | Planned layout asset from `source/react/layouts/DashboardFrame/` | Application shell / all screens |

## Current Coverage Summary

| Coverage | Count | Notes |
| --- | ---: | --- |
| L1 shared components | 8 | Alert, Card, ControlCard, DataTable, Dialog, ImageCard, ToastProvider, VisionStage |
| L2 shared behavior/theme presentation | 6 | Button, Field, Header, Heading, Menu/Menubar, DashboardFrame |
| L3 theme-exclusive components | 1 | RunningBorder belongs to Orange Matters |
| Existing Orange recipes | 15 | One recipe for every row, including the layout; recipe names differ from sample names for table, toast, menu, and frame |
| Existing installable React assets | 0 | `skills/orange-matters/assets/react/` has not been created; all rows are planned for the asset-extraction phase |
| Existing sample screens | 4 + shell | Records, Images, Vision, Controls, plus the shared application shell |

## Update Rules

- Add a row before introducing a new public component or layout.
- Record an asset as present only after it exists inside the installable Skill output; a sample source alone is not an installable asset.
- A public asset must have a recipe. An asset without a public recipe must be marked internal.
- Keep API/logic common unless behavior truly differs. Move value-only differences to tokens and structural differences to theme overrides.
- Do not add a Green counterpart for an L3 component merely to make catalogs symmetrical.
- When `Menu` is extracted, resolve the sample/published `Menu` versus `Menubar` name deliberately while preserving the supported public API or documenting an approved migration.
