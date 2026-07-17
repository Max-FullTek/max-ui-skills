---
name: green-ink
description: "Apply or extend the Green Ink UI theme: clean paper-white and ink-black content surfaces, controlled landscape and dry-brush artwork, a dark ink-flow atmosphere, deep-green primary actions, restrained vermilion accents, low-radius geometry, hard-edged depth, and fallback-first CJK/Latin typography. Use for product interfaces, admin tools, dashboards, data workspaces, component styling, layout polish, and coordinated light/dark modes that should feel editorial and precise without ornamental Chinese motifs."
---

# Green Ink

Apply a restrained paper-and-ink visual system to modern product interfaces. Read [references/theme-spec.md](references/theme-spec.md) before visual work, read [references/art-assets.md](references/art-assets.md) before placing artwork or choosing display typography, and load [references/theme-guardrails.md](references/theme-guardrails.md) when implementing or reviewing components.

## Workflow

- Inspect the existing token layer, component contracts, theme entry points, portals, and application frame.
- Preserve component APIs and behavior. Express value-only differences with tokens and use presentation overrides only for geometry or state structure.
- Implement light and dark modes together, including portals rendered under `document.body`.
- Use solid paper, ink, and deep-green content surfaces; use vermilion only for secondary emphasis, warnings, destructive actions, or one restrained mark.
- Limit non-semantic artwork to the four reusable assets defined in `references/art-assets.md`. Keep their paths in presentation CSS rather than design tokens.
- Keep app screens compact, fluid, and locally scrollable. Do not turn product screens into landing pages.
- Apply the component-specific rules in `references/theme-guardrails.md`; do not invent a decorative counterpart for another theme's exclusive component.

## Visual Rules

- Use low geometry: `2px` controls, `4px` compact surfaces, and at most `8px` large panels.
- Build hierarchy with border weight, solid tone changes, spacing, and short hard shadows. Never use blur, glow, glass, decorative CSS gradients, or hover lift.
- Use deep green as the primary action and focus family. Keep vermilion subordinate and sparse.
- Pair a legible system sans-serif product body with the optional `LXGW WenKai TC` display face for short headings or brand marks. The declared fallback stack must remain complete without downloads.
- Keep artwork outside content-heavy controls and media. The shell may carry the paper, horizon, and dark-flow assets; active navigation, short headings, and primary buttons may share the dry-brush asset.

## Guardrails

- Do not use stereotyped motifs such as dragons, cloud curls, lattice windows, scroll edges, pagoda silhouettes, repeated seals, or faux calligraphy. The four indexed material assets are the only approved brush/ink artwork.
- Do not use pill controls, floating cards, translucent panels, soft ambient shadows, neon focus, or decorative gradients.
- Do not use green as a generic recolor while retaining rounded glass geometry.
- Do not ship a light-only or dark-only implementation.
- Do not solve overflow at the document level; keep scrolling inside intentional work regions.
- Finish by reporting the theme changes, important files, validation run, and any remaining rollout gaps.
