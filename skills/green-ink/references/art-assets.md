# Green Ink Art Assets

Green Ink uses four optional, reusable WebP files. They are opaque build resources rather than instructions: copy or reference them by path and do not ask an agent to inspect, inline, base64-encode, or recreate their binary contents during normal component work.

Every placement must retain the listed solid CSS fallback. Artwork is decorative only and must not carry text, state, interaction, focus, or accessibility meaning.

| Asset | Installed path | Owner and consumers | Mode and fallback |
| --- | --- | --- | --- |
| Paper grain | `assets/react/styles/media/green-ink/paper-grain.webp` | `DashboardFrame` shell only | Light mode, low-contrast repeat or cover; fall back to `--bg`. |
| Ink horizon | `assets/react/styles/media/green-ink/ink-horizon.webp` | `Header` shell band | Light mode only; fall back to the opaque header surface and lower rule. |
| Dry brush | `assets/react/styles/media/green-ink/dry-brush.webp` | `Menubar.active`, short `Heading` underline, and `Button.primary` | Both modes with component-local crop, size, and opacity; fall back to the existing inset/rule/solid primary treatment. |
| Dark ink flow | `assets/react/styles/media/green-ink/dark-ink-flow.webp` | `DashboardFrame` shell only | Dark mode only; fall back to the dark `--bg`. |

## Placement Rules

- Published component and layout CSS resolves artwork from `../../styles/media/green-ink/<asset>.webp`.
- Do not add artwork URLs to `tokens.scss`. Keep crop, position, repeat, size, opacity, and mode selection in the owning Green presentation fragment.
- Keep Card, ControlCard, DataTable, Field, Dialog, ImageCard metadata/preview, VisionStage media, Alert, and Toast surfaces free of artwork.
- The four files are a closed vocabulary for the first release. Reuse them rather than creating component-specific copies.
- Artwork may be omitted by a consumer. Missing or disabled artwork must leave a complete, readable, accessible interface.

## Optional Display Font

`LXGW WenKai TC` is the preferred optional display face for short brand text and headings. It is not bundled with the Skill and Green Ink does not issue a remote font request. Consumers may install or self-host it under that family name; otherwise `Noto Serif TC`, `Source Han Serif TC`, `PMingLiU`, and generic `serif` provide the declared fallback chain.
