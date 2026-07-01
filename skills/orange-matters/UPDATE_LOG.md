# Orange Matters Update Log

Durable notes for syncing local skill changes back to this source repo.

## 2026-07-01

- Renamed the full-viewport layout recipe to `dashboard-frame.md` and updated examples to use `DashboardFrame`.
- Added guidance to use a flat `services/` folder for shared business services and stateful hooks, with each service named by one business responsibility.
- Added a `ToastProvider` recipe and sample implementation based on the NSPCA admin console pattern.
- Standardized transient feedback language on `toast`.
- Updated README files and sample app references so the installable skill, docs, and demo stay aligned.

## 2026-07-01 Running Border

- Added a reusable `RunningBorder` React recipe for hover-only orange border runners.
- Added sample demos for a card, pill button, and wide component.
- Documented the measurement-based SVG approach: real DOM viewBox, computed radius clamp, unique gradient ids, and dash-offset animation only.

## 2026-07-01 ImageCard upload, sizing, and info layout

- Merged the global-skill ImageCard upload behavior into the source repo recipe.
- Added optional props for upload hints, upload click handling, remove labels, remove image handling, sizing, fill mode, and image object-fit.
- Added `infoLayout="below" | "overlay"` with `below` as the default so inspection images remain fully visible unless callers explicitly opt into a bottom overlay.
- Kept overlay behavior as an opt-in variant: fixed-height bottom bar, translucent by default, stronger only on hover/focus of the bar itself, and no default `backdrop-filter`.
