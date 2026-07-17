# Application Layout Rules

These rules define the theme-neutral behavior of full-screen product layouts. Theme geometry, colors, shadows, and token values belong to each theme; token category semantics remain owned by `docs/ARCHITECTURE.md`.

## Full-viewport frame

- Product shells occupy `100dvw` by `100dvh` and keep `html`, `body`, and the root node free of document scrolling.
- A dashboard frame provides stable header, sidebar, and main work areas. Main content uses `min-width: 0` and `min-height: 0` so its own scroll region can shrink correctly.
- Scrolling belongs only to intentional local regions such as main content, sidebars, tables, lists, drawers, dialogs, and code/log panels.
- Prefer fluid work areas. Restrict width only for long-form reading, dialogs, or intentionally constrained forms.

## Responsive sidebar

- The header exposes an accessible sidebar control near the brand/title cluster.
- On roomy screens, closing the sidebar removes its reserved layout column.
- When sidebar plus main content no longer fit comfortably, the sidebar becomes a floating left drawer below the header and no longer reserves a column.
- A visible backdrop closes the floating drawer. The drawer and backdrop must stay within the frame while main content retains local overflow.

## Floating and portal layers

- Popovers, select lists, menus, tooltips, and date pickers that could be clipped by local overflow render through a portal or top-level floating layer.
- The active theme is mirrored to a document-level node or the portal host so floating content receives the same tokens as its trigger.
- Floating content uses viewport-aware positioning and flips when there is insufficient room; it must not force document scrolling.

## Composition

- Keep compact controls inline or in responsive dense grids while space allows.
- Tables or fixed-width lists use an internal horizontal viewport rather than clipping columns or widening the document.
- Header, sidebar, and main are reusable layout slots. Routing, page selection, demo data, and product-specific responsive state remain application responsibilities.
