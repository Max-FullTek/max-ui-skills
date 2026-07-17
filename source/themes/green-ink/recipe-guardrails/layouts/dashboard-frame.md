## Green Ink guardrails

- Fill `100dvw × 100dvh`, keep root overflow hidden, and preserve local scrolling in the workspace, sidebar, tables, and other intentional regions.
- Use a solid application fallback and opaque menu/drawer surfaces. The shell owns indexed `paper-grain.webp` in light mode and `dark-ink-flow.webp` in dark mode; do not place either on content panels.
- Do not add unindexed artwork, CSS gradient washes, glass, blur, or soft floating depth.
- Keep the top-header/left-sidebar structure and reopen navigation as a left floating drawer with a backdrop on narrow screens.
- Apply identity through Green Ink tokens, low geometry, ink border hierarchy, and crisp focus without changing the shared layout or theme-restoration contract.
