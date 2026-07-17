# Development Plan

This document tracks the migration sequence, status, and acceptance gates. Durable repository boundaries, publication rules, and the token contract are defined in [ARCHITECTURE.md](ARCHITECTURE.md). Per-component sharing and coverage are tracked in [COMPONENT_MATRIX.md](COMPONENT_MATRIX.md).

Each phase is intended to end at a reviewable, independently committable boundary. A phase is complete only when its acceptance gate is met; later phases must not silently weaken an earlier gate.

## Status Summary

| Phase | Deliverable | Status | Acceptance gate |
| --- | --- | --- | --- |
| 0 | Documentation governance | Complete | The index assigns one source of truth per durable topic; repository history is outside installable Skills; README files remain user-facing. |
| 1 | Component classification and token contract | Complete | All 14 current sample components plus `DashboardFrame` are classified; recipe/sample/asset coverage is explicit; token categories and override criteria are defined in architecture. |
| 2 | Canonical source tree | Complete | Theme-neutral contracts, shared React sources, and per-theme sources exist at the documented boundaries with no duplicated shared implementation. |
| 3 | Orange Matters migration | Complete | Existing public APIs and recipes remain available; Orange is produced from canonical sources, is self-contained, and the current sample builds. |
| 4 | Deterministic Skill builder | Complete | Two consecutive builds produce identical controlled output and no diff; links resolve; each Skill directory passes isolation checks; no symlinks are used. |
| 5 | Copyable React assets | Complete | Every public component/layout recipe points to a complete asset; every asset has a recipe or is marked internal; one installed Skill contains all of its assets. |
| 6 | Green Ink visual system | Complete | The theme specification defines light/dark color roles, paper/ink surfaces, geometry, hierarchy, depth, focus, motion, typography, decoration limits, and exclusive vocabulary; representative components establish a distinct identity. |
| 7 | Green Ink Skill | In progress | The Skill has a distinct trigger description, complete references/assets, and no Orange Matters or repository-root dependency. |
| 8 | Parallel sample applications | Planned | Orange and Green samples use comparable data, scenarios, and component contracts; both basic builds pass; exclusive components remain separate. |
| 9 | Installation documentation | Planned | English and Traditional Chinese READMEs cover Orange-only, Green-only, both-Skill, installer, and supported manual flows while explaining self-contained output and repository-only samples. |
| 10 | Release gates | Planned | Both Skills validate in isolation, both samples build, generated output is reproducible, relative links resolve, and no cross-Skill/repository dependency remains. |

## Phase Notes

### Phase 0 — Documentation governance

- Maintain [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) with every durable document change.
- Keep architectural rules here only as links to [ARCHITECTURE.md](ARCHITECTURE.md).
- Keep historical maintenance notes under `docs/history/`, not inside `skills/`.

### Phase 1 — Component matrix and token contract

- Treat [COMPONENT_MATRIX.md](COMPONENT_MATRIX.md) as the live inventory during extraction.
- Update the matrix in the same change whenever sharing level, recipe ownership, asset status, or sample coverage changes.
- Change category semantics only in [ARCHITECTURE.md](ARCHITECTURE.md).

### Phase 2 — Canonical source

- Establish theme-neutral foundation and React sources before adding a second theme.
- Separate theme tokens, structural overrides, and exclusive components from shared behavior.
- Use the component matrix as the extraction checklist.
- Complete: shared components, `DashboardFrame`, minimal globals, foundation contracts, and Orange theme inputs now have canonical owners under `source/`.
- Review resolution: Header and Menubar are product-neutral, DashboardFrame remains slot/external-state driven, and theme-specific frame composition lives in tokens.

### Phase 3 — Orange Matters first

- Move the current sample component behavior and Orange presentation into their target owners.
- Preserve current component props and recipe coverage unless review approves a breaking change.
- Make the Orange sample consume the canonical or generated source selected by the builder design.
- Complete: the current sample consumes canonical source directly, while the committed Orange Skill is generated as self-contained installable output and retains the existing public APIs and recipes.

### Phase 4 — Packaging

- Add a deterministic builder and an explicit list of controlled generated paths.
- Generate committed installable output, validate links, and produce a manifest or checksums.
- Add isolation validation that copies one Skill without the repository root.
- Complete: `scripts/build-skills.mjs` produces deterministic, self-contained Orange output with a checksum manifest; repository checks cover freshness, links, imports, isolation boundaries, and symlink rejection.

### Phase 5 — Skill assets

- Extract reusable TSX, CSS Modules, layouts, tokens, and minimal globals into installable assets.
- Reduce Markdown recipes to contracts, minimal examples, accessibility, theme constraints, and asset pointers.
- Do not ship the Vite application or demo-only feature data as Skill assets.
- Complete: all 15 component/layout recipes now keep only contracts, minimal usage, accessibility, theme guardrails, and pointers to generated assets; the complete TSX, CSS Modules, layout, token, and global-style implementations live in the self-contained Orange Skill rather than being duplicated in recipes.

### Phase 6 — Green Ink specification

- Define the visual system before expanding the full catalog.
- Calibrate `Button`, `Field`, `Card`, `Header`, and `Dialog` first.
- Confirm that geometry, surface, depth, and interaction language differ structurally where needed, rather than recoloring Orange Matters.
- Keep the shared TSX contracts unchanged. Use Green CSS Module replacements for `Button`, `Field`, `Header`, and `Dialog`; keep `Card` token-only unless calibration proves a structural need.
- Define Green Ink as dark-green ink, paper-white surfaces, ink-black text, restrained vermilion secondary emphasis, low or cut geometry, short hard depth, visible non-glowing focus, mixed CJK/Latin typography, and sparse decoration.
- Explicitly reject Orange Matters vocabulary: pill controls by default, glass/blur panels, orange glow, radial accent washes, floating soft shadows, and lift-on-hover motion.
- Treat Green-exclusive vocabulary as optional in the first release. Do not invent a counterpart to Orange Matters `RunningBorder` merely to make the catalogs symmetrical.
- Complete: the canonical Green Ink source now defines distinct light/dark paper-and-ink tokens, written visual rules, an initial no-exclusive decision, and calibrated presentation for `Button`, `Field`, `Card`, `Header`, and `Dialog` while preserving every shared TSX contract.

### Phase 7 — Green Ink Skill

- Generate the complete Skill from shared and Green-specific canonical sources.
- Keep invocation/implicit trigger language distinct from Orange Matters.
- Include Green-specific overrides and exclusive assets inside the installation directory.
- Generalize the builder and validator around explicit per-theme configuration before adding the second output; do not duplicate the Orange assembly function or validation tables.
- Assemble shared TSX and baseline modules first, then replace only the CSS Modules declared by the selected theme. Theme configuration also owns exclusive components and the expected recipe/asset inventory.
- Keep shared component contracts in `source/foundation/` and compose them with per-theme guardrails during generation so Orange and Green recipes do not become two hand-maintained copies of the same API documentation.
- Validate both generated Skills for deterministic output, isolation, relative links/imports, manifests, and forbidden sibling/repository references.

### Phase 8 — Sample applications

- Reorganize samples under `samples/<theme>/`.
- Reuse comparable data and product scenarios to expose genuine API compatibility.
- Do not require pixel-identical themes or force one-to-one exclusive components.
- Move product scenarios, data, navigation, and feature behavior into repository-only shared sample sources where practical; keep each theme entry point, token import, presentation overrides, and exclusive showcase local to its sample.
- Make both samples exercise the same shared component props and screens. Orange may demonstrate `RunningBorder`; Green must not render a fake equivalent.
- Build both sample applications with the existing basic build path. Browser inspection, Playwright, and screenshot comparison remain outside this phase unless requested explicitly.

## Second-stage Work Packages

The second stage covers Phases 6–8 and is split into three independently committable boundaries:

1. **2A — Green Ink specification and calibration:** create the canonical Green theme source, write the complete visual specification and light/dark tokens, and calibrate the five representative components without changing shared React APIs.
2. **2B — Multi-theme packaging:** make Skill assembly and validation theme-configured, compose shared contracts with theme guardrails, generate the self-contained `green-ink` Skill, and revalidate Orange output.
3. **2C — Parallel samples:** move the existing sample to `samples/orange-matters`, add `samples/green-ink`, share comparable repository-only scenarios/data, and pass the basic build for both themes.

Work package 2A must pass its written visual gate before 2B expands the full catalog. Work package 2B must prove both installable outputs before 2C uses them as integration surfaces.

### Phase 9 — Installation docs

- Update both README languages after paths and packaging behavior stabilize.
- Prefer the Skill installer, with manual paths described by supported Codex surface.
- Keep full architecture and migration detail out of README files.

### Phase 10 — Basic release validation

- Validate both Skills, both sample builds, reproducibility, links, and isolated installation.
- Keep routine validation to existing basic build/typecheck/lint and repository scripts.
- Schedule visible browser inspection, responsive QA, or screenshot comparison only as an explicit separate task.

## Phase Transition Rule

Before starting a later phase, record the prior phase gate as complete and review any matrix rows it changes. If implementation reveals an architectural conflict, update [ARCHITECTURE.md](ARCHITECTURE.md) through an explicit decision before continuing; do not hide a new durable rule in this plan.
