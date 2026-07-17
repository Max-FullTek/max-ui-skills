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

## Orange Matters guardrails

- Fill `100dvw × 100dvh` and keep the root overflow hidden. Put scrolling in the main workspace, sidebar, tables, and other intentional local regions.
- Use a top header and left sidebar by default. On narrow screens, collapse the sidebar and reopen it as a left floating drawer with a backdrop.
- Keep layout structure theme-neutral; apply Orange Matters through semantic tokens such as the warm/charcoal application background, glass surfaces, and orange focus.
- Prefer fluid workspace width and compact padding. Do not add a narrow global max-width wrapper or restore document scrolling.
- Preserve the host's previous document theme when the frame unmounts or moves between environments.

## Asset

Use the [canonical DashboardFrame layout](../../assets/react/layouts/DashboardFrame/). The Skill builder publishes its complete TSX, CSS Module, and barrel export under `assets/react/layouts/DashboardFrame/`.
