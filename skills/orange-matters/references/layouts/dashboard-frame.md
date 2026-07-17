# Dashboard Frame

Use for product screens with a top header, collapsible left sidebar, and main work area. Keep this layout recipe small; page-specific content belongs in page modules.

## React Slots And External State

```tsx
import { useEffect, type ReactNode } from "react";
import styles from "./DashboardFrame.module.scss";

export type DashboardTheme = "light" | "dark";

export type DashboardFrameProps = {
  theme: DashboardTheme;
  header: ReactNode;
  sidebar: ReactNode;
  sidebarOpen: boolean;
  sidebarFloating: boolean;
  children: ReactNode;
  showBackdrop?: boolean;
  backdropLabel?: string;
  onBackdropClick?: () => void;
  workspaceLabel?: string;
  className?: string;
};

export function DashboardFrame({
  theme,
  header,
  sidebar,
  sidebarOpen,
  sidebarFloating,
  children,
  showBackdrop = sidebarFloating && sidebarOpen,
  backdropLabel = "Close sidebar",
  onBackdropClick,
  workspaceLabel = "Workspace",
  className = ""
}: DashboardFrameProps) {
  useEffect(() => {
    const documentElement = document.documentElement;
    const previousTheme = documentElement.getAttribute("data-theme");
    documentElement.dataset.theme = theme;

    return () => {
      if (previousTheme === null) documentElement.removeAttribute("data-theme");
      else documentElement.setAttribute("data-theme", previousTheme);
    };
  }, [theme]);

  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <div
      className={rootClassName}
      data-theme={theme}
      data-sidebar-open={sidebarOpen}
      data-sidebar-floating={sidebarFloating}
    >
      {header}
      {showBackdrop && (
        <button
          className={styles.backdrop}
          type="button"
          aria-label={backdropLabel}
          onClick={onBackdropClick}
        />
      )}
      {sidebar}
      <main className={styles.main} aria-label={workspaceLabel}>
        {children}
      </main>
    </div>
  );
}
```

## SCSS Module

```scss
.root {
  --header-height: 72px;
  --sidebar-width: 264px;

  position: relative;
  width: 100dvw;
  height: 100dvh;
  display: grid;
  grid-template:
    "header header" var(--header-height)
    "menu main" minmax(0, 1fr) / var(--sidebar-width) minmax(0, 1fr);
  color: var(--text);
  overflow: hidden;
  background: var(--app-background, var(--bg));
  transition: grid-template-columns var(--ease);
}

.root[data-sidebar-open="false"],
.root[data-sidebar-floating="true"] {
  --sidebar-width: 0px;
}

.main {
  grid-area: main;
  min-width: 0;
  min-height: 0;
  overflow: auto;
  padding: 18px;
}

.backdrop {
  position: absolute;
  inset: var(--header-height) 0 0 min(280px, calc(100dvw - 40px));
  z-index: 7;
  border: 0;
  padding: 0;
  background: rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(6px);
}

@media (max-width: 820px) {
  .root {
    --header-height: 116px;
    grid-template:
      "header" var(--header-height)
      "main" minmax(0, 1fr) / minmax(0, 1fr);
  }

  .main { padding: 12px; }
}
```

## Rules

- The frame owns document-level theme synchronization while preserving and restoring the host's previous `data-theme` value.
- The consuming application owns theme state, sidebar state, the floating breakpoint, and the concrete Header/Menubar composition passed through slots.
- Keep shared frame CSS independent of any theme's accent/secondary background composition; themes may provide `--app-background`.
- When floating, the sidebar overlays main content; do not reserve a grid column for it.
- The backdrop starts after the drawer width so clicking the visible main area closes the drawer.
- Keep page content inside `main` with local scrolling. Never restore document-level scroll for app screens.
