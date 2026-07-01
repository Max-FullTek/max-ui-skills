# Dashboard Frame

Use for product screens with a top header, collapsible left sidebar, and main work area. Keep this layout recipe small; page-specific content belongs in page modules.

## React State

```tsx
import type { ElementType, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Menubar } from "../../components/Menubar";
import styles from "./DashboardFrame.module.scss";

const SIDEBAR_FLOATING_QUERY = "(max-width: 980px)";

type DashboardFrameProps = {
  children: ReactNode;
  items: Array<{ label: string; icon: ElementType; active?: boolean }>;
};

export function DashboardFrame({ children, items }: DashboardFrameProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarFloating, setSidebarFloating] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia(SIDEBAR_FLOATING_QUERY);
    const syncSidebarMode = () => {
      setSidebarFloating(media.matches);
      setSidebarOpen(!media.matches);
    };

    syncSidebarMode();
    media.addEventListener("change", syncSidebarMode);

    return () => media.removeEventListener("change", syncSidebarMode);
  }, []);

  return (
    <div
      className={styles.root}
      data-theme={theme}
      data-sidebar-open={sidebarOpen}
      data-sidebar-floating={sidebarFloating}
    >
      <Header
        theme={theme}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen((current) => !current)}
        onThemeChange={setTheme}
      />
      {sidebarFloating && sidebarOpen && (
        <button className={styles.backdrop} aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} />
      )}
      <Menubar open={sidebarOpen} floating={sidebarFloating} onClose={() => setSidebarOpen(false)} items={items} />
      <main className={styles.main} aria-label="Workspace">{children}</main>
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
  overflow: hidden;
  display: grid;
  grid-template:
    "header header" var(--header-height)
    "menu main" minmax(0, 1fr) / var(--sidebar-width) minmax(0, 1fr);
  color: var(--text);
  background:
    radial-gradient(circle at 12% 8%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 32%),
    radial-gradient(circle at 86% 2%, color-mix(in srgb, var(--secondary) 14%, transparent), transparent 30%),
    var(--bg);
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

- The frame owns theme synchronization, sidebar open state, and the floating breakpoint.
- When floating, the sidebar overlays main content; do not reserve a grid column for it.
- The backdrop starts after the drawer width so clicking the visible main area closes the drawer.
- Keep page content inside `main` with local scrolling. Never restore document-level scroll for app screens.
