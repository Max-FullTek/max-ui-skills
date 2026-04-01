---
name: orange-matters
description: 'Apply or extend the "Orange Matters" UI theme ("大橘為重"): warm off-white light mode, charcoal dark mode, orange-to-orange-red accents, glass panels, rounded cards, soft shadows, and restrained playful motion. Use when Codex needs to theme a frontend project, restyle pages or shared components to match this visual system, create new UI that should stay consistent with this theme, or keep future additions aligned with the same tokens, component language, and dark-mode rules.'
---

# Orange Matters

Use this skill as the implementation guide for the `大橘為重` theme. Treat it as a portable visual system for content tools, admin panels, internal tools, data browsers, and lightweight dashboards that should feel warm, polished, and slightly playful instead of generic SaaS.

## Start Here

- Read [references/theme-spec.md](references/theme-spec.md) before making visual changes.
- Extract or map tokens first. Set global colors, typography, radius, shadows, and motion timing before styling individual screens.
- Implement light mode and dark mode together.
- Preserve the theme identity: warm light surfaces, charcoal dark surfaces, orange accents, glass panels, rounded cards, and soft depth.

## Apply The Theme

1. Set up global tokens.
- Define the documented theme variables as project-level tokens or CSS variables.
- If the project already has a token layer, map it to this theme instead of creating a second parallel system.

2. Style the app shell and surfaces.
- Use a warm, slightly atmospheric workspace in light mode and restrained charcoal depth in dark mode.
- Make topbars, result panels, drawers, and secondary panes share the same glass-panel or gradient-surface language.
- Prefer soft layered shadows over sharp, high-contrast "enterprise dashboard" shadows.

3. Style interaction patterns.
- Use accent borders and glow for focus; do not use default blue focus rings.
- Keep hover motion short and intentional, mostly small `translateY`, shadow deepening, and slight saturation increase.
- Reuse the documented motion names and behavior before inventing new animations.

4. Extend the system carefully.
- Derive new buttons from `primary`, `ghost`, `danger`, or `icon-only`.
- Derive new containers from the existing panel, card, drawer, tooltip, and snackbar language.
- Keep new UI consistent with the same radius family, accent family, and motion vocabulary.

## Non-Negotiables

- Do not introduce purple accents.
- Do not fall back to corporate blue focus styling.
- Do not flatten the interface into generic white SaaS cards.
- Do not create a new primary color family alongside orange.
- Do not ship light mode without matching dark mode.
- Do not mix too many unrelated easing curves or long animations on the same page.

## Working Rules

- If the target project already has a strong brand language, confirm before replacing the entire product identity.
- If the user asks for this theme, apply it consistently across shared layout, shared components, and key screens rather than only recoloring one isolated widget.
- When forced to adapt around existing implementation constraints, preserve the theme's feel first: warm surfaces, orange emphasis, soft depth, and compact playful motion.

## Reference

- Use [references/theme-spec.md](references/theme-spec.md) for the exact token values, typography stack, layout rules, component behavior, motion rules, and responsive guidance.
- Reuse the closest existing pattern from that reference before inventing a new component treatment.
