# Development Plan

This document tracks the migration sequence, status, and acceptance gates. Durable repository boundaries, publication rules, and the token contract are defined in [ARCHITECTURE.md](ARCHITECTURE.md). Per-component sharing and coverage are tracked in [COMPONENT_MATRIX.md](COMPONENT_MATRIX.md).

Each phase is intended to end at a reviewable, independently committable boundary. A phase is complete only when its acceptance gate is met; later phases must not silently weaken an earlier gate.

## Status Summary

| Phase | Deliverable | Status | Acceptance gate |
| --- | --- | --- | --- |
| 0 | Documentation governance | Complete | The index assigns one source of truth per durable topic; repository history is outside installable Skills; README files remain user-facing. |
| 1 | Component classification and token contract | Complete | All 14 current sample components plus `DashboardFrame` are classified; recipe/sample/asset coverage is explicit; token categories and override criteria are defined in architecture. |
| 2 | Canonical source tree | Planned | Theme-neutral contracts, shared React sources, and per-theme sources exist at the documented boundaries with no duplicated shared implementation. |
| 3 | Orange Matters migration | Planned | Existing public APIs and recipes remain available; Orange is produced from canonical sources, is self-contained, and the current sample builds. |
| 4 | Deterministic Skill builder | Planned | Two consecutive builds produce identical controlled output and no diff; links resolve; each Skill directory passes isolation checks; no symlinks are used. |
| 5 | Copyable React assets | Planned | Every public component/layout recipe points to a complete asset; every asset has a recipe or is marked internal; one installed Skill contains all of its assets. |
| 6 | Green Ink visual system | Planned | The theme specification defines light/dark color roles, paper/ink surfaces, geometry, hierarchy, depth, focus, motion, typography, decoration limits, and exclusive vocabulary; representative components establish a distinct identity. |
| 7 | Green Ink Skill | Planned | The Skill has a distinct trigger description, complete references/assets, and no Orange Matters or repository-root dependency. |
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

### Phase 3 — Orange Matters first

- Move the current sample component behavior and Orange presentation into their target owners.
- Preserve current component props and recipe coverage unless review approves a breaking change.
- Make the Orange sample consume the canonical or generated source selected by the builder design.

### Phase 4 — Packaging

- Add a deterministic builder and an explicit list of controlled generated paths.
- Generate committed installable output, validate links, and produce a manifest or checksums.
- Add isolation validation that copies one Skill without the repository root.

### Phase 5 — Skill assets

- Extract reusable TSX, CSS Modules, layouts, tokens, and minimal globals into installable assets.
- Reduce Markdown recipes to contracts, minimal examples, accessibility, theme constraints, and asset pointers.
- Do not ship the Vite application or demo-only feature data as Skill assets.

### Phase 6 — Green Ink specification

- Define the visual system before expanding the full catalog.
- Calibrate `Button`, `Field`, `Card`, `Header`, and `Dialog` first.
- Confirm that geometry, surface, depth, and interaction language differ structurally where needed, rather than recoloring Orange Matters.

### Phase 7 — Green Ink Skill

- Generate the complete Skill from shared and Green-specific canonical sources.
- Keep invocation/implicit trigger language distinct from Orange Matters.
- Include Green-specific overrides and exclusive assets inside the installation directory.

### Phase 8 — Sample applications

- Reorganize samples under `samples/<theme>/`.
- Reuse comparable data and product scenarios to expose genuine API compatibility.
- Do not require pixel-identical themes or force one-to-one exclusive components.

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
