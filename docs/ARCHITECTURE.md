# Repository Architecture

This document is the source of truth for the repository's long-term architecture, canonical-source boundary, publication rules, and design-token contract. Migration sequencing and current status belong in [DEVELOPMENT_PLAN.md](DEVELOPMENT_PLAN.md); component-by-component ownership belongs in [COMPONENT_MATRIX.md](COMPONENT_MATRIX.md).

## Core Invariant

Repository development may share component and foundation sources. A published Skill must not share runtime files with another Skill or depend on the repository checkout.

> Core is a build source, not a runtime dependency after installation.

Generated Skills may intentionally contain duplicate files. The maintenance source must not contain duplicate implementations of the same shared contract.

## Target Repository Boundaries

```text
source/
  foundation/                 Theme-neutral specifications and contracts
  react/                      Shared React behavior, layouts, and baseline styles
  themes/
    orange-matters/           Orange tokens, overrides, and exclusive components
    green-ink/                Green Ink tokens, overrides, and exclusive components
scripts/                      Deterministic Skill build and validation tools
skills/
  orange-matters/             Committed, generated, self-contained installable output
  green-ink/                  Committed, generated, self-contained installable output
samples/
  orange-matters/             Repository-only integration and visual demonstration app
  green-ink/                  Repository-only integration and visual demonstration app
```

The existing `sample-orange-matters/` path remains a migration input until the sample applications are reorganized. The phase plan owns that transition; it does not change the target boundary above.

### Canonical Source Ownership

| Area | Owns | Must not own |
| --- | --- | --- |
| `source/foundation/` | Theme-neutral component contracts, accessibility behavior, React conventions, and layout rules | Brand colors, theme geometry, theme-only decoration, or generated assets |
| `source/react/` | Shared TSX behavior, public props, common layout CSS, and token-driven baseline visual CSS | Theme identity, copied per-theme implementations, or sample page data |
| `source/themes/<theme>/` | Theme token values, structural visual overrides, theme specification, and theme-exclusive components | A second copy of shared TSX behavior or another theme's rules |
| `skills/<theme>/` | Installable `SKILL.md`, agent metadata, complete references, and copyable React assets | Hand-maintained canonical code, links to repository-only sources, or dependencies on another Skill |
| `samples/<theme>/` | Executable integration scenarios, demo data, regression surfaces, and documentation imagery | Installable Skill content or canonical shared component implementations |
| `scripts/` | Deterministic assembly, link checks, manifests/checksums, and isolation validation | Theme behavior or manually curated output |

Shared TSX and layout rules are maintained once. A theme uses tokens where semantics are the same, an override where visual structure differs, and a theme-exclusive component where the visual language has no honest cross-theme equivalent.

## Publication Model

Each published Skill is a complete installation unit:

```text
skills/<theme>/
  SKILL.md
  agents/
    openai.yaml
  references/
    theme-spec.md
    react-spec.md
    layouts/
    components/
  assets/
    react/
      components/
      layouts/
      styles/
        tokens.scss
        globals.scss
```

A published Skill must:

- include all references and copyable component/layout/style assets required by its recipes;
- resolve all links and relative imports inside its own directory;
- avoid references to `source/`, `samples/`, repository-root files, or sibling Skills;
- work when its directory is copied by itself into an otherwise empty Skill installation;
- contain its own theme tokens, overrides, and theme-exclusive assets;
- be reproducible from canonical sources with no manual post-build edits.

Generated Skill directories are committed so a GitHub-based installer can install one directory without first running repository build tooling. Builds must be deterministic: consecutive builds from the same inputs produce byte-identical controlled output and a clean `git diff`. Do not use symlinks in published output because installers, ZIP archives, Windows filesystems, and copy operations do not preserve them consistently.

Full sample applications remain repository-only. They may consume canonical sources or generated assets, but `package.json`, Vite configuration, demo data, and complete dashboard compositions are not copied into each Skill.

## Component Sharing Rules

Components and layouts use three sharing levels:

1. **Shared component**: public API, behavior, layout, and most CSS structure are common; theme tokens express normal visual differences.
2. **Shared behavior with theme presentation**: public API and behavior remain common, while theme overrides may change geometry, visual structure, or state presentation.
3. **Theme-exclusive**: the public visual concept belongs to one theme. Reusable low-level logic may move to foundation, but the component is not presented as a fake cross-theme equivalent.

The current classification and coverage are maintained in [COMPONENT_MATRIX.md](COMPONENT_MATRIX.md).

## Token Contract

This section is the sole repository-level source of truth for token categories and their semantics. Theme specifications own concrete light/dark values. Component styles consume semantic tokens; they must not infer another theme's values or redefine the category contract.

### Color

Color tokens name semantic roles, not pigments. Required roles cover application background, primary and elevated text, primary accent, secondary action/status, danger, and muted states. A theme may expose stepped roles such as `--accent`, `--accent-strong`, and `--accent-soft`, but components must not assume that an accent is orange, green, or a gradient.

### Surface

Surface tokens describe the treatment of application, panel, elevated, card, control, and overlay surfaces. They may contain a solid color, transparency, or gradient where CSS permits. Shared components should consume semantic surface roles such as panel/card/control; a structural treatment that cannot be represented honestly by a value belongs in a theme override. `--surface-treatment` may be used for a reusable composed treatment, but it is not a substitute for every background declaration.

### Border

Border tokens cover normal and strong colors, widths, and reusable styles. The baseline contract includes a semantic normal border, a strong border, and `--border-width`. Themes may introduce a small additional hierarchy when component states require it. Border placement or multi-line decorative structures belong in overrides rather than token strings.

### Geometry

Geometry distinguishes purpose instead of relying only on a generic radius scale. Shared consumers should prefer semantic roles including `--control-radius`, `--panel-radius`, and `--button-radius`; a theme may retain scale aliases such as `--radius-sm` through `--radius-xl`. `--radius-pill` is allowed only for components whose contract is genuinely pill-shaped. Cut corners, asymmetric shapes, and extra wrapper geometry require a theme override.

### Typography

Typography tokens cover UI font families, mono/data font families when needed, weights, line heights, and a restrained type scale. Shared code must support mixed Latin and CJK text without hard-coding a theme-specific font. Component recipes should use semantic heading/body/label roles rather than cloning full font declarations.

### Shadow

Shadow tokens express elevation roles such as panel, card, floating overlay, and `--button-shadow`. A theme may choose soft shadows, hard short shadows, or `none`. Components must not compensate for a theme with arbitrary local glow values.

### Focus

Focus tokens define accessible visible focus independently of brand implementation. The contract includes `--focus-ring` as the composed ring/shadow value and may include a focus color/offset when a component needs separate properties. Shared components use `:focus-visible`; no theme may remove visible keyboard focus.

### Motion

Motion tokens define durations, easing, and semantic state displacement. The baseline roles include a short transition, `--hover-translate-y`, and `--active-translate-y`. A theme may set displacements to `0` where movement conflicts with its language. Complex decorative animation and reduced-motion behavior remain explicit CSS, not encoded as opaque token strings.

### Component-specific

Component-specific tokens are allowed when a value is reused across a component family and cannot be named truthfully at a broader level—for example table-row hover surface, dialog backdrop, menu active indicator, or running-border timing. They must use a component prefix and remain few. A one-off declaration does not become a token merely to avoid writing CSS.

### Token vs. Override Decision

Use a token when the CSS property and semantic role are stable across themes and only the value changes. Use a theme override when selector structure, layout, pseudo-elements, border placement, or state presentation changes. Use a theme-exclusive component when the concept itself is unique. Never force a structural difference through an ever-growing list of one-off tokens.

Existing Orange Matters variables such as `--bg`, `--radius-*`, `--shadow`, and `--ease` may remain as compatibility aliases during migration. Canonical components should move toward the semantic roles above without breaking the current public component API.

## Change Rules

- Change shared behavior in canonical foundation/React sources, then regenerate every affected Skill.
- Change a theme's identity only in its theme source, then regenerate that Skill and its sample integration.
- Do not directly patch generated output after the deterministic builder owns it; fix the source or builder.
- Keep recipes focused on contracts, minimal usage, accessibility, and theme guardrails. Point to complete assets instead of maintaining a second large implementation in Markdown.
- Preserve public component APIs during migration unless an intentional breaking change is documented and accepted.
- Validate each Skill in isolation before release; visual browser QA is an explicit, separate activity rather than a default build step.
