---
name: orange-matters
description: 'Apply or extend the "Orange Matters" UI theme ("大橘為重"): warm off-white light mode, charcoal dark mode, orange primary actions, teal secondary actions, glass panels, compact dashboard frames, strict local overflow, and restrained motion. Use for frontend UI, admin panels, internal tools, data browsers, dashboards, component styling, layout polish, theme tokens, and dark-mode alignment.'
---

# Orange Matters

Use this as a concise implementation guide for the Orange Matters product UI system. Read [references/theme-spec.md](references/theme-spec.md) before visual work. For React projects, also read [react-spec.md](../../foundation/react-spec.md).

Use each recipe for its contract, minimal usage, accessibility, and guardrails; copy the complete implementation from the corresponding `assets/react/` path.

## Workflow

- Inspect the existing stack, token layer, shared components, theme entry points, routes, and layouts.
- Map the theme into existing abstractions. For new product frontends with no stack, prefer React + TSX + SCSS + Vite.
- In React, follow `references/react-spec.md`: colocated CSS Modules, per-component folders, page modules, and minimal globals only.
- For a new dashboard frame, load `references/layouts/dashboard-frame.md`, `references/components/header.md`, and `references/components/menubar.md`.
- Implement light and dark mode together.
- Keep dark-mode token scope compatible with portals: floating menus, selects, tooltips, and dialogs rendered under `document.body` must inherit or receive the active theme.
- Default app screens to a full-viewport dashboard frame: top header, left menu, main content at the lower/right work area.
- Control the left sidebar with a header icon button placed beside the brand/title cluster. When horizontal space is tight, auto-collapse the sidebar and reopen it as a left-side floating drawer.
- Keep `html` and `body` free of horizontal and vertical scrollbars. Put scrolling only inside intentional regions such as main panels, lists, sidebars, drawers, or tables.
- Prefer fluid width. Avoid narrow global max-width wrappers except for long-form content.
- Use minimal product copy only: titles, clear labels, necessary helper text. Strictly never render agent/LLM explanations, prompts, requirements, or limitation notes in the UI.
- Use space efficiently. Short fields, short selects, status controls, numeric inputs, and compact actions should sit inline or in dense grids when there is room; do not let low-complexity controls each consume a full row or large vertical block by default.
- In React product projects, prefer a flat `services/` folder for shared business services and stateful hooks when the code is not page-private. Name each service by one business responsibility; avoid generic `runtime/` as the default bucket.

## Visual Rules

- Use warm light surfaces, charcoal dark surfaces, glass panels, soft depth, compact controls, and orange primary emphasis.
- Use teal only as the secondary action/status family; do not let it compete with orange as the brand accent.
- Derive buttons from `primary`, `primary-outline`, `secondary`, `secondary-outline`, `ghost`, `danger`, or `icon-only`.
- Derive surfaces from panel, card, drawer, toolbar, tooltip, toast, running border, search, table/list, and menu patterns in the reference.
- Use orange accent borders/glow for focus; never default blue focus rings.
- Keep motion short: small lift, soft shadow change, slight saturation increase.

## Guardrails

- Do not build app screens as hero/feature-card landing pages.
- Do not add decorative subtitle/helper copy just to fill space.
- Do not waste rows or height on short data. Prefer `auto-fit`, `minmax()`, fixed-width compact controls, and inline action rows before stacking.
- Do not introduce purple accents, corporate blue focus, generic white SaaS cards, or a second primary color system.
- Do not ship light mode without dark mode.
- Do not solve overflow with document-level scrolling.
- Do not let dense tables or fixed-width lists get clipped on mobile; use internal horizontal scroll viewports when columns cannot collapse cleanly.
- Finish by summarizing theme changes, key files touched, and any rollout gaps.
