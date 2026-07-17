# Orange Matters Theme Spec

中文別名：`大橘為重`

Portable UI spec for warm, compact product screens: content tools, admin panels, internal systems, data browsers, and lightweight dashboards. Keep project paths, prompt text, requirements, and framework-specific notes out of this file.

## Targets

- Warm off-white light mode; neutral charcoal glass dark mode.
- Orange to orange-red is the primary accent.
- Muted teal is the secondary action/status family.
- Surfaces are translucent, rounded, softly layered, and product-like.
- UI is compact, fluid, and functional, not marketing-like.

## Copy Rules

- Visible UI text must be product copy only.
- Strictly never render agent/LLM explanations, prompt summaries, requirement lists, constraints, implementation notes, or limitation notes in the UI.
- Keep text sparse: title, clear labels, values, actions, necessary helper/error text.
- Avoid decorative subtitles, filler descriptions, and repeated explanatory paragraphs.
- Do not add eyebrow/meta text above a title when it only restates selection, section type, or obvious context.
- If context is already clear from layout or title, remove the extra label and use title styling instead.
- Use tooltips, placeholders, icons, labels, and progressive disclosure before adding long helper copy.

## Tokens

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
- `--secondary: #0f9f8f`
- `--secondary-strong: #08796f`
- `--secondary-soft: rgba(15, 159, 143, 0.13)`
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
- `--secondary: #46cbbd`
- `--secondary-strong: #7ee4d8`
- `--secondary-soft: rgba(70, 203, 189, 0.16)`
- `--danger: #ff5c8a`
- `--shadow: 0 28px 90px rgba(0, 0, 0, 0.42)`
- `--shadow-soft: 0 18px 42px rgba(0, 0, 0, 0.24)`

### Shared

- Font stack: `"Outfit", "Noto Sans TC", sans-serif`
- `--radius-xl: 30px`
- `--radius-lg: 24px`
- `--radius-md: 18px`
- `--radius-sm: 14px`
- `--radius-pill: 999px`
- `--ease: 200ms cubic-bezier(0.22, 1, 0.36, 1)`

## Layout

- Default dashboard frame: `100dvw` by `100dvh`, no document scrolling.
- Required structure for app screens: top `Header`, left `Menubar`, lower/right `Main`.
- Use [layouts/dashboard-frame.md](layouts/dashboard-frame.md) for the layout contract and guardrails; copy the complete implementation from its linked asset.
- Use CSS grid or flex so header height and menu width are stable.
- Add a sidebar toggle icon button in the header, adjacent to the brand/title cluster. It controls the left menu on both desktop and compact layouts.
- When there is not enough width to show the menu and main content together, auto-collapse the menu. Reopen it as an absolute/floating left drawer with a backdrop, similar to a dialog but anchored to the left edge below the header.
- Prefer fluid width. Do not wrap the whole app in a narrow `max-width`.
- Use max-width only for long-form reading, modals, or intentionally constrained forms.
- `html`, `body`, and root app nodes must not show horizontal or vertical scrollbars.
- Set global overflow deliberately, then assign scrolling to internal regions only.
- Valid scroll regions: main content, side menu, table body, table horizontal viewport, result list, drawer, modal body, code/log panel.
- Style internal scrollbars with subtle rounded thumbs and transparent/low-contrast tracks.
- Popovers, custom select lists, dropdown menus, tooltips, and date pickers must not be clipped by dialog/drawer/panel overflow. Render them through a portal or top-level floating layer, position them with fixed coordinates, and flip above the trigger when there is not enough room below.
- Portal/floating layers must inherit the same theme tokens as the trigger. Put `data-theme` on `html`, `body`, or the portal host, or copy the active theme onto the floating panel. Do not scope dark mode only to a layout root when portals render under `document.body`.
- On mobile or constrained widths, collapse the left menu into a left drawer controlled by the header sidebar button while preserving local scrolling.
- If mobile navigation hides visible labels and shows icons only, each nav action must keep an accessible label and preferably a tooltip/title.
- Use space-efficient composition. Short controls should be inline or in responsive dense grids when horizontal room exists.
- Do not stack short fields into separate full-width rows unless the viewport is narrow or the field truly needs long text entry.
- Prefer `grid-template-columns: minmax(0, 1fr) auto`, `auto-fit`, fixed-width compact controls, and inline action rows.

Keep the layout recipe in [layouts/dashboard-frame.md](layouts/dashboard-frame.md) as the source of truth. This file owns the shorter design rules only.

## Surfaces

- Use glass panels for header, menu, toolbars, result panels, drawers, filters, source cards, and secondary panes.
- Use gradient card surfaces; avoid flat white SaaS cards.
- Keep shadows soft and deep.
- Light mode can use subtle white inset highlights.
- Dark mode should keep borders low-contrast and avoid bright rims.
- Keep empty space intentional; compact work surfaces beat decorative whitespace.
- Do not give large vertical space to low-information metrics. A label plus number should usually fit in a compact strip, row, chip, or small stat tile.
- Large cards are only for rich content, charts, previews, forms, or multi-field summaries.

## Components

Component contracts, minimal usage, accessibility notes, and guardrails live under `components/`. Each recipe links to its complete copyable implementation under `assets/react/`; load only the recipe needed for the task:

- [components/alert.md](components/alert.md)
- [components/button.md](components/button.md)
- [components/card.md](components/card.md)
- [components/control-card.md](components/control-card.md)
- [components/dialog.md](components/dialog.md)
- [components/field.md](components/field.md)
- [components/header.md](components/header.md)
- [components/heading.md](components/heading.md)
- [components/image-card.md](components/image-card.md)
- [components/menubar.md](components/menubar.md)
- [components/running-border.md](components/running-border.md)
- [components/table.md](components/table.md)
- [components/toast.md](components/toast.md)
- [components/vision-stage.md](components/vision-stage.md)

### React Structure

- Follow [react-spec.md](../../../foundation/react-spec.md).
- Use colocated CSS Modules for reusable components and route/page screens.
- Keep global styles limited to reset, base elements, tokens, fonts, and true third-party global overrides.
- Put shared business state hooks in a flat `services/` folder when they are not owned by a single page or component. Prefer responsibility names such as backend socket, device connection, settings, or diagnostics over generic runtime buckets.

### Header

- Contains brand/context, primary search or page title, and tools/actions.
- Includes the sidebar toggle button beside the logo/title cluster when the screen has a left menu.
- Sticky or fixed inside the dashboard frame, with blur, border, and soft shadow.
- Use [components/header.md](components/header.md) for the component contract and linked complete asset.
- Avoid large hero copy in app screens.
- Page/section titles should feel designed through weight, spacing, alignment, and restrained dividers, not redundant subtitle text.
- Avoid AI-looking title decoration: large accent bars, gradient rails, oversized underlines, glow strips, or decorative blocks beside simple text.

### Menubar

- Left-side navigation by default.
- Is controlled by the header sidebar toggle. On roomy screens it can collapse by reducing the sidebar grid column to `0`; on constrained screens it becomes an absolute left drawer that slides over main content.
- Use compact labels, icons where useful, active orange indicator, and local overflow if needed.
- Do not create a long page just to expose navigation.
- Menubar hover is simple background/text change only. Do not lift or press menu items.
- Use [components/menubar.md](components/menubar.md) for the component contract and linked complete asset.

### Main

- Occupies the lower/right work area.
- Use panels, tables, lists, inspectors, tabs, and drawers.
- Put overflow on the relevant child region, not on `body`.

### Buttons

- `primary`: solid orange/orange-red gradient, white text, clear shadow.
- `primary-outline`: transparent or warm surface, orange border/text, orange hover fill/glow.
- `secondary`: muted teal fill, white or charcoal text based on contrast.
- `secondary-outline`: transparent or surface fill, teal border/text, teal hover tint.
- `ghost`: low-contrast surface/border, orange-soft hover.
- `danger`: pink/red family, not orange.
- `icon-only`: square rounded icon button with tooltip when meaning is not obvious.
- Keep buttons compact; avoid oversized marketing CTAs in app screens.
- Hover lifts slightly; active must press downward with a small inset shadow.

Use [components/button.md](components/button.md) for the component contract and linked complete asset.

### Icons

- Use a stable icon library such as `lucide-react` in React projects.
- Do not hand-author one-off SVG icons unless a product-specific mark or custom illustration is required.
- Do not use plain text glyphs such as `X`, `+`, or `?` as reusable UI icons; use the icon library equivalent.
- Keep icon sizing and stroke weight consistent within a surface.

### Search And Inputs

- Use pill or rounded panel inputs.
- Focus uses orange border/glow, never browser-blue rings.
- Placeholder text should be short and task-specific.
- Short selects/status fields should use content-sized or fixed compact widths, not full-width rows.
- Custom select option panels must render as portal/floating layers so they are not cut off inside dialogs, drawers, cards, or scroll panels.
- Use [components/field.md](components/field.md) for the text input/select contract and linked complete asset.

### Cards And Lists

- Cards: preview/media or key value, short title, metadata, action.
- Lists/tables: dense enough for scanning, with sticky headers when useful.
- Table/list row hover is simple background/border change only. Do not lift or press rows.
- Card hover can lift only when the whole card is a primary clickable command.
- Badges are small, stable, and non-distracting.
- Inspector/card headers should be compact. Use a simple row, tight `h2`, and optional thin divider; avoid decorative title treatments that consume vertical space.
- Metric cards should be compact by default: horizontal label/value alignment, low padding, and no decorative empty lower half.
- If a metric card has only one label and one number, target a height around `48px` to `64px`.
- Image-processing result cards should preserve the full output with `object-fit: contain`; do not crop inspection images.
- Control cards pair a compact title/description with inline controls and optional dense content.
- Use [components/card.md](components/card.md), [components/control-card.md](components/control-card.md), [components/heading.md](components/heading.md), [components/image-card.md](components/image-card.md), and [components/table.md](components/table.md) for their contracts and linked complete assets.

### Running Border

- Use [components/running-border.md](components/running-border.md) for hover-only moving border emphasis.
- Keep the normal CSS border visible. On hover or focus, shift it to warm milk-tea while the animated orange stroke travels on the measured border path.
- Do not use rotating full-frame gradients or `conic-gradient` for this effect.

### Vision And Media Debug

- Use [components/vision-stage.md](components/vision-stage.md) for video/canvas/SVG overlay surfaces.
- Keep media and ROI overlays in one stable aspect-ratio stage so debug geometry is readable.
- Use SVG overlays for editable ROI and vector annotations; use canvas overlays for masks, heatmaps, or high-frequency drawing.
- Keep HUD labels short and non-obstructive: FPS, resolution, latency, frame id, or model status.
- Do not blur, darken, crop, or decorate live/debug media in a way that hides processing results.

### Dashboard Composition

- Prefer one compact page heading with inline actions, then a short alert/status strip when needed.
- Metric rows should be compact strips or small stat cards, not tall empty cards.
- Main work areas can pair a locally scrolling table/list with a right inspector panel on roomy screens.
- On constrained widths, hide or move secondary inspector panels before shrinking the primary work area too far.

### Drawer, Tooltip, Toast

- Drawer slides from right by default, with translucent backdrop and matching glass panel.
- Dialogs use `compact`, `default`, or `wide` width variants. Simple content defaults to about `50vw`; dense settings/content can use `80-90vw`.
- Dialog panel max height is `90dvh`; the dialog body scrolls internally.
- Dialog header and body do not use a separator line.
- Dialog close buttons are borderless by default and show button treatment only on hover.
- Dialog actions/footer must have clear spacing from fields/content without adding a divider line. If actions live inside the body grid, use a dedicated action row with `row-gap` or top padding so buttons do not visually touch the last field row.
- Tooltip is small, dark, rounded, and enters with a short rise.
- Toast appears lower-right, scale/fade in, with subtle info/success/warning/danger styling.
- Use [components/dialog.md](components/dialog.md), [components/alert.md](components/alert.md), and [components/toast.md](components/toast.md) for their contracts and linked complete assets.

## Motion

- Base transition: `var(--ease)`.
- Use `fade-slide`, `icon-idle-float`, `icon-bob`, `tooltip-rise`, and subtle toast entry only when useful.
- Hover: `translateY(-1px)` to `translateY(-6px)`, deeper shadow, slight saturation increase.
- Avoid unrelated easing curves, long animations, and decorative motion clutter.

## Background

- Light: layered radial gradients for warmth; orange/red/teal only as faint haze.
- Dark: restrained low-opacity white haze; avoid muddy colorful dark gradients.
- Backgrounds support the product workspace; they are not hero illustrations.

## Responsive

- Below `1180px`: header can stack; search stretches; menu may narrow.
- Below the point where sidebar plus main cannot fit comfortably, reduce outer spacing/radii and make the menu an absolute left drawer controlled by the header sidebar button.
- Keep stable dimensions for toolbars, counters, icon buttons, tables, boards, and cards so text or hover states do not shift layout.
- Dense tables that cannot fit on narrow screens must use an internal horizontal scroll viewport that keeps the header and rows aligned. Do not let fixed-width table columns overflow and get clipped by a rounded outer card.

## Guardrails

- Do not use purple accents, corporate blue focus, generic white SaaS cards, or a second primary system.
- Do not render prompt/agent text into UI.
- Do not add filler subtitles or explanatory paragraphs.
- Do not use body/page scroll for app screens.
- Do not ship light mode without matching dark mode.
- Do not replace an existing strong brand unless explicitly asked.
