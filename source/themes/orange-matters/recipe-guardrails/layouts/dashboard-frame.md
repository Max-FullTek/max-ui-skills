## Orange Matters guardrails

- Fill `100dvw × 100dvh` and keep the root overflow hidden. Put scrolling in the main workspace, sidebar, tables, and other intentional local regions.
- Use a top header and left sidebar by default. On narrow screens, collapse the sidebar and reopen it as a left floating drawer with a backdrop.
- Keep layout structure theme-neutral; apply Orange Matters through semantic tokens such as the warm/charcoal application background, glass surfaces, and orange focus.
- Prefer fluid workspace width and compact padding. Do not add a narrow global max-width wrapper or restore document scrolling.
- Preserve the host's previous document theme when the frame unmounts or moves between environments.
