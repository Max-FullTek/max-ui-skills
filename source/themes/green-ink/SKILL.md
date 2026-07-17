---
name: green-ink
description: "Apply or extend the Green Ink UI theme: paper-white and ink-black solid surfaces, deep-green primary actions, restrained vermilion secondary accents, low-radius geometry, hard-edged depth, and modern CJK/Latin typography. Use for product interfaces, admin tools, dashboards, data workspaces, component styling, layout polish, and coordinated light/dark modes that should feel editorial and precise without ornamental Chinese motifs."
---

# Green Ink

Apply a restrained paper-and-ink visual system to modern product interfaces. Read [references/theme-spec.md](references/theme-spec.md) before visual work and load [references/theme-guardrails.md](references/theme-guardrails.md) when implementing or reviewing components.

## Workflow

- Inspect the existing token layer, component contracts, theme entry points, portals, and application frame.
- Preserve component APIs and behavior. Express value-only differences with tokens and use presentation overrides only for geometry or state structure.
- Implement light and dark modes together, including portals rendered under `document.body`.
- Use solid paper, ink, and deep-green surfaces; use vermilion only for secondary emphasis, warnings, destructive actions, or one restrained mark.
- Keep app screens compact, fluid, and locally scrollable. Do not turn product screens into landing pages.
- Apply the component-specific rules in `references/theme-guardrails.md`; do not invent a decorative counterpart for another theme's exclusive component.

## Visual Rules

- Use low geometry: `2px` controls, `4px` compact surfaces, and at most `8px` large panels.
- Build hierarchy with border weight, solid tone changes, spacing, and short hard shadows. Never use blur, glow, glass, radial wash, gradient fill, or hover lift.
- Use deep green as the primary action and focus family. Keep vermilion subordinate and sparse.
- Pair a legible sans-serif product body with a restrained CJK serif display role for short headings or brand marks.
- Keep decoration to one small mark per major surface at most. Prefer rules, inset lines, or a stamp-sized block.

## Guardrails

- Do not use stereotyped motifs such as dragons, clouds, lattice windows, scroll edges, brush splashes, pagoda silhouettes, or faux calligraphy.
- Do not use pill controls, floating cards, translucent panels, soft ambient shadows, neon focus, or decorative gradients.
- Do not use green as a generic recolor while retaining rounded glass geometry.
- Do not ship a light-only or dark-only implementation.
- Do not solve overflow at the document level; keep scrolling inside intentional work regions.
- Finish by reporting the theme changes, important files, validation run, and any remaining rollout gaps.
