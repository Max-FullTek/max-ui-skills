# Green Ink Component Guardrails

Use these theme-specific clauses with the shared component and layout contracts when generating recipes. They define presentation only; component API, behavior, accessibility, and shared layout remain foundation-owned.

## Global

- Use solid content surfaces and the Green Ink tokens from `tokens.scss`.
- Keep radii between `2px` and `8px`; map pill roles to `4px`.
- Remove `backdrop-filter`, decorative CSS gradients, glow, soft blur shadows, and hover lift.
- Use deep green for primary/focus states and vermilion sparingly for secondary or destructive emphasis.
- Use only the four non-semantic files in `art-assets.md`; keep asset paths out of tokens and keep every component functional when artwork is unavailable.
- Preserve portal theme synchronization and local-overflow behavior.

## Components

- **Alert:** use a solid semantic wash, a neutral border, and one stronger leading or top rule; do not use translucent tint or glow.
- **Button:** use the Green override. Keep fallback fills solid, corners at `2px`, use the shared dry brush only on `primary`, and make active feedback a small press rather than lift.
- **Card:** use tokens only. Do not add a presentation override unless the public structure changes for a real product need.
- **ControlCard:** use solid paper/ink surfaces and border hierarchy; keep its dense shared layout.
- **DataTable:** use solid header and hover fills, strong row rules where needed, and no floating row treatment.
- **Dialog:** use the Green override. Remove backdrop blur, use a solid panel, and keep the hard offset shallow enough for product UI.
- **Field:** use the Green override. Use rectangular controls, a solid portal panel, and a narrow inset indicator for selection.
- **Header:** use the Green override. Use an opaque fallback surface, the light ink horizon in light mode, a strong lower rule, and restrained display typography. Do not show the horizon in dark mode.
- **Heading:** preserve the shared compact contract; short headings may use the optional display font and the shared dry-brush underline.
- **ImageCard:** keep the shared media behavior and solid metadata surfaces; never add an ink texture over inspection media.
- **Menubar:** keep behavior shared; use solid panels and low-radius items, with the shared dry brush plus a narrow green inset on the active row. Remove blur in the Green presentation layer.
- **ToastProvider:** use solid tone surfaces, a hard short shadow, and the shared live-region behavior.
- **VisionStage:** preserve media fidelity. Use ink borders and solid HUD labels without tinting, blurring, or decorating the media.

## Layout

- **DashboardFrame:** own paper grain in light mode and dark ink flow in dark mode, with a solid fallback background, opaque menu/drawer surfaces, no backdrop blur, and the shared full-viewport/local-overflow contract.

## Exclusives

Do not publish a Green-exclusive component in the initial release. Another theme's exclusive component is not part of the shared contract and does not require a Green counterpart.
