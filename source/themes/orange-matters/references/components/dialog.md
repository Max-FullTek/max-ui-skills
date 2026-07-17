# Dialog

Use for focused detail/edit flows. Keep dialog content compact; avoid explaining the app.

## Rules

- Header and body do not use a separating border line.
- Close control uses an icon from the icon library. It is borderless by default; hover reveals button treatment.
- `compact` dialogs are about `50vw` for simple content.
- `default` dialogs are about `72vw`.
- `wide` dialogs are about `90vw` for settings or dense content.
- Panel `max-height` is `90dvh`; body scrolls internally when content exceeds that height.
- Actions/footer do not need a divider line, but they must be visually separated from fields/content with row gap, margin, or padding.

## React

```tsx
import type { ReactNode } from "react";
import { X } from "lucide-react";
import styles from "./Dialog.module.scss";

type DialogProps = {
  open: boolean;
  size?: "compact" | "default" | "wide";
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Dialog({ open, size = "compact", title, children, onClose }: DialogProps) {
  if (!open) return null;

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={`${styles.panel} ${styles[size]}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2>{title}</h2>
          <button className={styles.close} aria-label="Close" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </section>
    </div>
  );
}
```

## SCSS Module

```scss
.backdrop {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(8px);
  z-index: 20;
}

.panel {
  width: min(50vw, 560px);
  max-width: calc(100dvw - 40px);
  max-height: 90dvh;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--bg-panel);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.compact { width: min(50vw, 560px); }
.default { width: min(72vw, 760px); }
.wide { width: min(90vw, 1080px); }

.header {
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px 6px;
}

.header h2 {
  margin: 0;
  font-size: 20px;
}

.body {
  min-height: 0;
  overflow: auto;
  padding: 8px 16px 16px;
}

.dialogForm {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 150px;
  align-items: center;
  column-gap: 10px;
  row-gap: 14px;
}

.dialogActions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 2px;
}

.close {
  width: 34px;
  height: 34px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  color: var(--text);
  background: transparent;
  transition: transform var(--ease), box-shadow var(--ease), border-color var(--ease), background var(--ease);

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    border-color: var(--border);
    background: var(--bg-elevated);
    transform: translateY(-1px);
    box-shadow: var(--shadow-soft);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: inset 0 2px 5px color-mix(in srgb, #000 10%, transparent);
  }
}

@media (max-width: 760px) {
  .compact,
  .default,
  .wide {
    width: min(100%, calc(100dvw - 24px));
  }
}
```
