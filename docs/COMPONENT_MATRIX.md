# Component Matrix

This inventory classifies the 13 shared components under `source/react/components/`, the Orange-exclusive `RunningBorder`, and the shared `DashboardFrame` layout. It is the source of truth for component sharing, recipe coverage, installable asset status, and sample coverage.

Token category semantics and the token-vs-override rule are defined only in [ARCHITECTURE.md](ARCHITECTURE.md#token-contract).

## Classification

- **L1 — Shared component:** API, behavior, layout, and CSS structure are common; normal visual differences come from tokens.
- **L2 — Shared behavior with theme presentation:** API and behavior are shared; theme overrides may change geometry or visual/state structure.
- **L3 — Theme-exclusive:** the visual concept belongs to a theme. Low-level logic may be shared, but another theme does not need a matching public component.

Installable React assets are generated under `skills/<theme>/assets/react/`. Each public component and layout has a corresponding recipe; canonical source paths remain the maintenance inputs rather than published dependencies. Inventory paths below use Orange Matters as the concrete shared-asset example; the same shared rows also exist in Green Ink, except for the Orange-exclusive `RunningBorder`.

## Inventory

| Component/layout | Level | Common API / logic | Layout CSS | Visual CSS / tokens | Theme override or exclusive | Recipe | Asset | Current sample screen |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Alert` | L1 | Shared tone contract and semantic content wrapper | Shared compact status-strip layout | Tokenized tone surfaces, text, and borders | Token values only by default | `skills/orange-matters/references/components/alert.md` | Present at `skills/orange-matters/assets/react/components/Alert/` | Records; Controls |
| `Button` | L2 | Shared native button props, tones, icon/content behavior, and accessibility | Shared sizing and icon/content alignment | Semantic action, focus, shadow, geometry, and motion tokens | Theme override for fill treatment, geometry, hover/active presentation | `skills/orange-matters/references/components/button.md` | Present at `skills/orange-matters/assets/react/components/Button/` | Records; Images; Vision; Controls |
| `Card` | L1 | Shared polymorphic element, compact variant, and native attributes | Shared section/card spacing and content layout | Tokenized surface, border, radius, and elevation | Token values only by default | `skills/orange-matters/references/components/card.md` | Present at `skills/orange-matters/assets/react/components/Card/` | Records |
| `ControlCard` | L1 | Shared title, description, controls, body, and footer slots | Shared dense header/body/footer grid | Tokenized surface, hierarchy, border, and spacing roles | Token values only by default | `skills/orange-matters/references/components/control-card.md` | Present at `skills/orange-matters/assets/react/components/ControlCard/` | Controls |
| `DataTable` | L1 | Shared generic columns/rows/key contract and table semantics | Shared table viewport, header, row, and cell layout | Tokenized table surface, dividers, row hover, and text hierarchy | Token values only by default | `skills/orange-matters/references/components/table.md` | Present at `skills/orange-matters/assets/react/components/DataTable/` | Records |
| `Dialog` | L2 | Shared open/close behavior, size variants, portal behavior, accessible dialog structure | Shared backdrop, panel sizing, internal scrolling, and action composition | Tokenized overlay, surface, border, elevation, and focus | Theme presentation may change panel edge hierarchy, title typography, and close states without changing behavior | `skills/orange-matters/references/components/dialog.md` | Present at `skills/orange-matters/assets/react/components/Dialog/` | Records |
| `Field` (`TextField`, `SelectField`) | L2 | Shared native input contract, option model, selection behavior, portal/floating-list accessibility | Shared control sizing and floating option positioning | Semantic control surface, focus, border, text, and geometry tokens | Theme override for pill vs sharp geometry, option indicator, and state presentation | `skills/orange-matters/references/components/field.md` | Present at `skills/orange-matters/assets/react/components/Field/` | Records; Vision; Controls |
| `Header` | L2 | Shared theme/sidebar controls and product-header responsibilities | Shared dashboard grid-area, responsive clustering, and action alignment | Tokenized header surface, border, elevation, and typography | Theme override for brand treatment, control geometry, and decorative surface structure | `skills/orange-matters/references/components/header.md` | Present at `skills/orange-matters/assets/react/components/Header/` | Application shell / all screens |
| `Heading` | L2 | Shared title, semantic heading level, and action slot | Shared compact title/action row and responsive wrapping | Tokenized type hierarchy, divider/accent, and spacing | Theme override for title divider or other restrained theme-specific treatment | `skills/orange-matters/references/components/heading.md` | Present at `skills/orange-matters/assets/react/components/Heading/` | Records; Images; Vision; Controls |
| `ImageCard` | L2 | Shared image/upload/remove/actions/sizing/fill/info-layout contract | Shared media, below/overlay information, and action layout | Tokenized surface, overlay, border, focus, and metadata hierarchy | Theme presentation may change metadata/overlay opacity, badges, and focus treatment while preserving media fidelity | `skills/orange-matters/references/components/image-card.md` | Present at `skills/orange-matters/assets/react/components/ImageCard/` | Images |
| `Menubar` | L2 | Shared generic item IDs, labels, icons, active state, selection callback, open/floating state, and close behavior; routing remains application-owned | Shared sidebar/drawer placement, local scroll, hidden-focus exclusion, and responsive overlay behavior | Tokenized navigation surface, text, border, focus, and active roles | Theme override for active marker, item geometry, and hover presentation | `skills/orange-matters/references/components/menubar.md` | Present at `skills/orange-matters/assets/react/components/Menubar/` | Application shell / all screens |
| `RunningBorder` | L3 | Orange public component; measurement, radius clamp, and unique-ID helpers may be shared internally | Orange-specific overlay/path layout | Component-specific timing, stroke, dash, and fallback-border tokens | **Orange Matters exclusive**; Green Ink may omit it or provide a separately named concept | `skills/orange-matters/references/components/running-border.md` | Present at `skills/orange-matters/assets/react/components/RunningBorder/` | Controls |
| `ToastProvider` | L2 | Shared provider/hook API, queue lifecycle, tone contract, and live-region behavior | Shared portal stack, toast layout, and dismissal/action positioning | Tokenized tone surfaces, border, elevation, and entry motion | Theme presentation may change surface material, action focus, and entry motion without changing the queue/live region | `skills/orange-matters/references/components/toast.md` | Present at `skills/orange-matters/assets/react/components/ToastProvider/` | Controls; provider wraps all screens |
| `VisionStage` | L2 | Shared media, overlay, HUD, toolbar, and label slots | Shared stable aspect-ratio stage and overlay coordinate layers | Tokenized stage surface, HUD, border, focus, and toolbar roles | Theme presentation may change HUD/toolbar surfaces while never tinting or decorating media | `skills/orange-matters/references/components/vision-stage.md` | Present at `skills/orange-matters/assets/react/components/VisionStage/` | Vision |
| `DashboardFrame` layout | L2 | Shared theme synchronization, header/sidebar slots, sidebar state inputs, backdrop, and workspace contract | Shared full-viewport header/sidebar/main grid and local-overflow model | Tokenized application background, header/sidebar dimensions, surface, and motion | Theme override for background composition, drawer treatment, and geometry | `skills/orange-matters/references/layouts/dashboard-frame.md` | Present at `skills/orange-matters/assets/react/layouts/DashboardFrame/` | Application shell / all screens |

## Current Coverage Summary

| Coverage | Count | Notes |
| --- | ---: | --- |
| L1 shared components | 4 | Alert, Card, ControlCard, DataTable |
| L2 shared behavior/theme presentation | 10 | Button, Dialog, Field, Header, Heading, ImageCard, Menubar, ToastProvider, VisionStage, DashboardFrame |
| L3 theme-exclusive components | 1 | RunningBorder belongs to Orange Matters |
| Existing Orange recipes | 15 | One recipe for every row, including the layout; recipe names differ from sample names for table, toast, menu, and frame |
| Existing Green recipes | 14 | Every shared component/layout row is published; Green intentionally omits the Orange-exclusive `RunningBorder` |
| Present installable component assets | 14 Orange / 13 Green | Every published component recipe maps to its generated asset; only Orange includes `RunningBorder` |
| Present installable layout assets | 1 per theme | `DashboardFrame` is generated independently for both themes |
| Existing sample screens | 4 + shell per theme | Both use shared Records, Images, Vision, Controls, and application-shell scenarios; the exclusive showcase remains Orange-only |

## Green Ink Phase 6 Calibration

| Component/layout | Green Ink decision | Canonical presentation source |
| --- | --- | --- |
| `Alert` | Tokens and recipe guardrail; artwork-free | `source/themes/green-ink/tokens.scss` |
| `Button` | Presentation fragment; shared dry brush on primary only | `source/themes/green-ink/component-overrides/components/Button/Button.theme.scss` |
| `Card` | Tokens only | `source/themes/green-ink/tokens.scss` |
| `ControlCard` | Tokens and recipe guardrail; artwork-free | `source/themes/green-ink/tokens.scss` |
| `DataTable` | Tokens and recipe guardrail; artwork-free | `source/themes/green-ink/tokens.scss` |
| `Dialog` | Presentation fragment; artwork-free | `source/themes/green-ink/component-overrides/components/Dialog/Dialog.theme.scss` |
| `Field` | Presentation fragment; artwork-free | `source/themes/green-ink/component-overrides/components/Field/Field.theme.scss` |
| `Header` | Presentation fragment; light ink horizon, solid dark fallback | `source/themes/green-ink/component-overrides/components/Header/Header.theme.scss` |
| `Heading` | Presentation fragment; shared dry-brush underline | `source/themes/green-ink/component-overrides/components/Heading/Heading.theme.scss` |
| `ImageCard` | Presentation fragment; inspection media remains artwork-free | `source/themes/green-ink/component-overrides/components/ImageCard/ImageCard.theme.scss` |
| `Menubar` | Presentation fragment; shared dry brush on active row | `source/themes/green-ink/component-overrides/components/Menubar/Menubar.theme.scss` |
| `ToastProvider` | Presentation fragment; artwork-free | `source/themes/green-ink/component-overrides/components/ToastProvider/ToastProvider.theme.scss` |
| `VisionStage` | Presentation fragment; media remains artwork-free | `source/themes/green-ink/component-overrides/components/VisionStage/VisionStage.theme.scss` |
| `DashboardFrame` | Presentation fragment; paper grain in light mode and dark ink flow in dark mode | `source/themes/green-ink/component-overrides/layouts/DashboardFrame/DashboardFrame.theme.scss` |

The controlled four-file artwork vocabulary and fallback rules are recorded in `source/themes/green-ink/references/art-assets.md`; component clauses remain in `source/themes/green-ink/references/theme-guardrails.md`. Green Ink has no initial L3 component; do not infer one from Orange Matters coverage.

## Update Rules

- Add a row before introducing a new public component or layout.
- Record an asset as present only after it exists inside the installable Skill output; a sample source alone is not an installable asset.
- A public asset must have a recipe. An asset without a public recipe must be marked internal.
- Keep API/logic common unless behavior truly differs. Move value-only differences to tokens and structural differences to theme overrides.
- Do not add a Green counterpart for an L3 component merely to make catalogs symmetrical.
- Keep navigation routes, hashes, and product-specific icons in the consuming application; `Menubar` owns only generic navigation presentation and selection behavior.
