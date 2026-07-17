# Documentation Index

This index prevents duplicate or conflicting project documentation and directs maintainers to the source of truth for each durable topic. Check it before adding or expanding long-form documentation.

## Reading Order

1. `README.md` or `README.zh-TW.md` for installation and user-facing usage.
2. `docs/ARCHITECTURE.md` for repository boundaries, publication rules, and the token contract.
3. `docs/DEVELOPMENT_PLAN.md` for migration status and acceptance gates.
4. `docs/COMPONENT_MATRIX.md` when changing component sharing or theme ownership.
5. `skills/orange-matters/SKILL.md` only when applying the published Orange Matters workflow.

## Document Registry

| Path | Audience | Owns | Status | Update rule |
| --- | --- | --- | --- | --- |
| `docs/DOCUMENTATION_INDEX.md` | Humans/agents | Documentation ownership, reading order, and overlap rules | active | Update in the same change as any durable documentation addition, move, deprecation, or ownership change. |
| `README.md` | Users | English project introduction, supported installation paths, and top-level usage | active | Keep user-facing; update when install or usage behavior changes, without copying architecture details. |
| `README.zh-TW.md` | Users | Traditional Chinese project introduction, supported installation paths, and top-level usage | active | Keep aligned with `README.md`; translate user-facing guidance rather than creating a second architecture source. |
| `package.json` | Maintainers/CI | Repository entry points for Skill build, freshness checks, validation, and the Orange sample build | active | Keep scripts as thin entry points; implementation details belong in the owning script. |
| `docs/ARCHITECTURE.md` | Maintainers/agents | Long-term repository architecture, canonical-source boundaries, publication principles, self-contained output requirements, and the token contract | active | Update only when a durable architectural rule or token category/semantic changes. |
| `docs/DEVELOPMENT_PLAN.md` | Maintainers/agents | Phase 0-10 migration status, commit-sized sequencing, and acceptance gates | active | Update status and gates as phases begin or finish; link to architecture instead of repeating it. |
| `docs/COMPONENT_MATRIX.md` | Maintainers/agents | Current component/layout classification, sharing boundaries, recipe coverage, asset status, and sample coverage | active | Update whenever a component, layout, recipe, asset, or theme-ownership classification changes. |
| `source/foundation/*.md` | Maintainers/agents | Theme-neutral React conventions and full-viewport/local-overflow/portal layout rules | active | Keep framework conventions and layout behavior theme-neutral; token category semantics remain in `docs/ARCHITECTURE.md`. |
| `source/themes/orange-matters/{SKILL.md,agents/,references/}` | Builder/maintainers | Canonical Orange Matters Skill instructions, metadata, theme specification, and component/layout recipes | active | Update these canonical inputs before generated publication output once the builder owns `skills/orange-matters/`. |
| `scripts/build-skills.mjs` | Maintainers/CI | Deterministic assembly and freshness/isolation checks for generated Skill output | active | Change when canonical inputs, controlled output, or publication checks change; do not duplicate implementation details in docs. |
| `scripts/validate-skills.mjs` | Maintainers/CI | Installable Skill structure, recipe/asset coverage, and manifest integrity validation | active | Change when the published Skill contract or inventory changes. |
| `docs/history/orange-matters-update-log.md` | Maintainers | Historical Orange Matters synchronization notes through 2026-07-01 | active | Append only historical facts that must be retained; do not place current work queues or Skill runtime instructions here. |
| `skills/orange-matters/` | Codex/Skill users/installers | Generated, self-contained installable Orange Matters output, including instructions, references, and copyable assets | generated | Do not edit directly; update canonical sources or builder inputs and regenerate. |
| `skills/orange-matters/manifest.json` | Builder/CI/installers | Generated file inventory and SHA-256 integrity record for the installable Orange Matters output | generated | Owned by `scripts/build-skills.mjs`; never edit by hand or include the manifest in its own inventory. |

## Known Overlap / Pointers

| Local pointer | Source of truth | Rule |
| --- | --- | --- |
| `README.zh-TW.md` | `README.md` | Maintain a localized equivalent of user-facing guidance; neither README owns repository architecture. |
| `docs/DEVELOPMENT_PLAN.md` | `docs/ARCHITECTURE.md` | The plan may name architecture deliverables but must link to, not restate, durable architecture and publication rules. |
| `docs/COMPONENT_MATRIX.md` | `docs/ARCHITECTURE.md` | The matrix classifies usage of the token contract; token categories and semantics are defined only in architecture. |
| `skills/orange-matters/SKILL.md` | `docs/ARCHITECTURE.md` | The Skill owns execution guidance. Repository build boundaries and publication invariants stay in architecture. |
| `skills/orange-matters/` | `source/themes/orange-matters/` plus shared canonical sources | The installable Skill is deterministic generated output, not a second maintenance source; change canonical inputs and rebuild. |
| `docs/history/orange-matters-update-log.md` | Current source documents above | Historical record only; current rules belong in the relevant active source of truth. |

## Creation Rules

1. Search the registry and existing Markdown before creating a durable document.
2. Prefer updating the registered source of truth for the same topic and audience.
3. Create a document only for a distinct, durable audience or ownership boundary.
4. Register every new, moved, deprecated, or replaced durable document in this index in the same change.
5. Mark temporary planning or presentation material as temporary and keep it outside durable sources of truth.
6. Replace duplicated rules with links; delete fully superseded, unlinked documents when compatibility does not require a pointer.
