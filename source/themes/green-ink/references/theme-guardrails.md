# Green Ink Component Guardrails

Use these theme-specific clauses with the shared component and layout contracts when generating recipes. They define presentation only; component API, behavior, accessibility, and shared layout remain foundation-owned.

## Global

- Use solid surfaces and the Green Ink tokens from `tokens.scss`.
- Keep radii between `2px` and `8px`; map pill roles to `4px`.
- Remove `backdrop-filter`, gradient fills, radial backgrounds, glow, soft blur shadows, and hover lift.
- Use deep green for primary/focus states and vermilion sparingly for secondary or destructive emphasis.
- Preserve portal theme synchronization and local-overflow behavior.

## Components

- **Alert:** use a solid semantic wash, a neutral border, and one stronger leading or top rule; do not use translucent tint or glow.
- **Button:** use the Green override. Keep fills solid, corners at `2px`, and active feedback as a small press rather than lift.
- **Card:** use tokens only. Do not add a presentation override unless the public structure changes for a real product need.
- **ControlCard:** use solid paper/ink surfaces and border hierarchy; keep its dense shared layout.
- **DataTable:** use solid header and hover fills, strong row rules where needed, and no floating row treatment.
- **Dialog:** use the Green override. Remove backdrop blur, use a solid panel, and keep the hard offset shallow enough for product UI.
- **Field:** use the Green override. Use rectangular controls, a solid portal panel, and a narrow inset indicator for selection.
- **Header:** use the Green override. Use an opaque surface, a strong lower rule, and restrained display typography; keep one decorative mark at most.
- **Heading:** use the shared contract initially; short headings may use the display font and a single thin rule, never a large decorative rail.
- **ImageCard:** keep the shared media behavior and solid metadata surfaces; never add an ink texture over inspection media.
- **Menubar:** keep behavior shared; use solid panels, low-radius items, and a narrow green active inset. Remove blur in the Green presentation layer.
- **ToastProvider:** use solid tone surfaces, a hard short shadow, and the shared live-region behavior.
- **VisionStage:** preserve media fidelity. Use ink borders and solid HUD labels without tinting, blurring, or decorating the media.

## Layout

- **DashboardFrame:** use a flat application background, opaque menu/drawer surfaces, no backdrop blur, and the shared full-viewport/local-overflow contract.

## Exclusives

Do not publish a Green-exclusive component in the initial release. Another theme's exclusive component is not part of the shared contract and does not require a Green counterpart.
