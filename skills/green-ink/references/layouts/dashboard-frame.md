# Dashboard Frame

Use `DashboardFrame` as the full-viewport application shell that composes a header, sidebar, backdrop, and locally scrolling workspace.

## Contract

- `header`, `sidebar`, and `children` are composition slots. The frame does not create product navigation or header controls.
- The consuming application owns external `theme`, `sidebarOpen`, and `sidebarFloating` state, including responsive breakpoint decisions.
- `showBackdrop` defaults to `sidebarFloating && sidebarOpen`; `onBackdropClick` closes the drawer and `backdropLabel` names that action.
- `workspaceLabel` names the `main` region. `className` permits scoped integration without changing the frame contract.
- Synchronize `theme` to `document.documentElement.dataset.theme`, preserving the previous host value and restoring or removing it on cleanup.
- Collapse the sidebar grid column when closed or floating. A floating sidebar overlays the workspace; the frame must not reserve horizontal space for it.

## Minimal usage

```tsx
<DashboardFrame
  theme={theme}
  header={<Header sidebarOpen={sidebarOpen} onSidebarToggle={toggleSidebar} />}
  sidebar={
    <Menubar
      items={items}
      open={sidebarOpen}
      floating={sidebarFloating}
      onItemSelect={setPage}
      onClose={closeSidebar}
    />
  }
  sidebarOpen={sidebarOpen}
  sidebarFloating={sidebarFloating}
  onBackdropClick={closeSidebar}
  workspaceLabel="Operations workspace"
>
  <CurrentPage />
</DashboardFrame>
```

## Accessibility

- Give the workspace and backdrop action concise accessible labels.
- Pair the header sidebar toggle with the sidebar's stable ID through `aria-controls` and expose `aria-expanded`.
- Prevent closed navigation from receiving focus and return focus sensibly when a floating drawer closes.
- Keep source order logical: header, backdrop when present, navigation, then main workspace.

## Green Ink guardrails

- Fill `100dvw × 100dvh`, keep root overflow hidden, and preserve local scrolling in the workspace, sidebar, tables, and other intentional regions.
- Use a solid application fallback and opaque menu/drawer surfaces. The shell owns indexed `paper-grain.webp` in light mode and `dark-ink-flow.webp` in dark mode; do not place either on content panels.
- Do not add unindexed artwork, CSS gradient washes, glass, blur, or soft floating depth.
- Keep the top-header/left-sidebar structure and reopen navigation as a left floating drawer with a backdrop on narrow screens.
- Apply identity through Green Ink tokens, low geometry, ink border hierarchy, and crisp focus without changing the shared layout or theme-restoration contract.

## Asset

Use the [canonical DashboardFrame layout](../../assets/react/layouts/DashboardFrame/). The Skill builder publishes its complete TSX, CSS Module, and barrel export under `assets/react/layouts/DashboardFrame/`.
