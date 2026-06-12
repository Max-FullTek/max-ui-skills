# Header

Use for app-shell headers with brand/context, sidebar toggle, search, and compact actions.

## React

```tsx
import { Bell, Menu as MenuIcon, Moon, Search, Sun } from "lucide-react";
import { Button } from "../Button";
import styles from "./Header.module.scss";

type HeaderProps = {
  brandInitials: string;
  brandName: string;
  contextLabel?: string;
  theme: "light" | "dark";
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  onThemeChange: (theme: "light" | "dark") => void;
};

export function Header({
  brandInitials,
  brandName,
  contextLabel,
  theme,
  sidebarOpen,
  onSidebarToggle,
  onThemeChange
}: HeaderProps) {
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <header className={styles.root}>
      <div className={styles.brandMark}>{brandInitials}</div>
      <div className={styles.brandText}>
        <strong>{brandName}</strong>
        {contextLabel && <span>{contextLabel}</span>}
      </div>
      <Button
        tone="iconOnly"
        className={styles.sidebarToggle}
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        aria-controls="primary-sidebar"
        aria-expanded={sidebarOpen}
        icon={<MenuIcon aria-hidden="true" />}
        onClick={onSidebarToggle}
      />
      <label className={styles.search}>
        <Search aria-hidden="true" />
        <input aria-label="Search" placeholder="Search" />
      </label>
      <div className={styles.actions}>
        <Button tone="primaryOutline" icon={<Bell aria-hidden="true" />}>Alerts</Button>
        <Button
          tone="iconOnly"
          aria-label={`Switch to ${nextTheme} mode`}
          icon={theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
          onClick={() => onThemeChange(nextTheme)}
        />
      </div>
    </header>
  );
}
```

## SCSS Module

```scss
.root {
  grid-area: header;
  min-width: 0;
  z-index: 9;
  display: grid;
  grid-template-columns: auto auto auto minmax(180px, 1fr) auto;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-elevated);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow-soft);
}

.brandMark {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  color: #fff;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  box-shadow: 0 12px 24px var(--accent-soft);
}

.brandText {
  min-width: 132px;
  display: grid;
  gap: 1px;

  strong { font-size: 16px; line-height: 1; }
  span { color: var(--text-soft); font-size: 12px; }
}

.sidebarToggle { flex: 0 0 auto; }

.search {
  min-width: 0;
  height: 42px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 0 14px;
  background: var(--bg-strong);
  transition: border-color var(--ease), box-shadow var(--ease);

  &:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }

  svg { width: 17px; color: var(--text-soft); }
  input { width: 100%; min-width: 0; border: 0; outline: 0; color: var(--text); background: transparent; }
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 820px) {
  .root {
    grid-template-columns: auto minmax(0, 1fr) auto auto;
    grid-template-areas:
      "mark title toggle actions"
      "search search search search";
  }

  .brandMark { grid-area: mark; }
  .brandText { grid-area: title; }
  .sidebarToggle { grid-area: toggle; }
  .search { grid-area: search; }
  .actions { grid-area: actions; }
}
```

## Rules

- Place the sidebar toggle immediately after the brand/title cluster.
- Use `aria-controls="primary-sidebar"` and keep `aria-expanded` in sync with sidebar state.
- Keep header actions compact; avoid large CTA styling in app shells.
- Search may become the second row on compact widths, but the header remains fixed-height via the app shell.
