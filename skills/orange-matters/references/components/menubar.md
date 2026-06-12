# Menubar

Left navigation for app shells. Use library icons such as `lucide-react`.

```tsx
import type { ElementType } from "react";
import styles from "./Menubar.module.scss";

type MenuItem = { label: string; icon: ElementType; active?: boolean };

type MenubarProps = {
  items: MenuItem[];
  open: boolean;
  floating?: boolean;
  onClose?: () => void;
};

export function Menubar({ items, open, floating = false, onClose }: MenubarProps) {
  const rootClassName = [
    styles.root,
    open ? styles.open : styles.closed,
    floating ? styles.floating : ""
  ].join(" ");

  return (
    <nav
      className={rootClassName}
      id="primary-sidebar"
      aria-label="Primary navigation"
      aria-hidden={!open}
      data-floating={floating}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            className={item.active ? `${styles.item} ${styles.active}` : styles.item}
            key={item.label}
            aria-label={item.label}
            title={item.label}
            onClick={floating ? onClose : undefined}
          >
            <Icon aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
```

```scss
.root {
  grid-area: menu;
  width: 264px;
  min-height: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 12px;
  border-right: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg-panel) 82%, transparent);
  backdrop-filter: blur(16px);
  transition: transform var(--ease), opacity var(--ease), box-shadow var(--ease);
}

.closed {
  transform: translateX(-100%);
  opacity: 0;
  pointer-events: none;
}

.open {
  transform: translateX(0);
  opacity: 1;
}

.floating {
  position: absolute;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  z-index: 8;
  width: min(280px, calc(100dvw - 40px));
  border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
  background: var(--bg-panel);
  box-shadow: var(--shadow);
}

.item {
  height: 42px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: 0 12px;
  color: var(--text-soft);
  background: transparent;
  transition: background var(--ease), color var(--ease), border-color var(--ease);

  &:hover { color: var(--text); background: var(--bg-elevated); }
  &:focus-visible { outline: 0; border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
}

.active {
  color: var(--text);
  border-color: color-mix(in srgb, var(--accent) 38%, transparent);
  background: var(--accent-soft);
}

@media (max-width: 980px) {
  .root {
    padding: 14px 12px;
  }
}
```

## Rules

- Put the sidebar toggle button in the header beside the brand/title cluster. Use `aria-controls="primary-sidebar"` and `aria-expanded={open}`.
- When the viewport cannot comfortably show menu and main together, set `floating` and auto-close the menu. Reopen it as a left drawer with a backdrop.
- The app shell should collapse its sidebar grid column to `0` when `open` is false or `floating` is true.
- If responsive styles hide the visible text label, keep `aria-label` on the button and use `title` or a tooltip for mouse users.
- Menu items use background/text changes only; do not lift or press rows.
