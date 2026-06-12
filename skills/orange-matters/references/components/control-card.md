# Control Card

Use for compact settings, filters, tool controls, and small explanatory panels with actions.

## React

```tsx
import type { ReactNode } from "react";
import styles from "./ControlCard.module.scss";

type ControlCardProps = {
  title: string;
  description?: string;
  controls?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
};

export function ControlCard({ title, description, controls, children, footer }: ControlCardProps) {
  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <div className={styles.copy}>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {controls && <div className={styles.controls}>{controls}</div>}
      </header>
      {children && <div className={styles.body}>{children}</div>}
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </section>
  );
}
```

## SCSS Module

```scss
.root {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--card-surface);
  box-shadow: var(--shadow-soft);
}

.header {
  min-height: 58px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
}

.copy {
  min-width: 0;

  h2 {
    margin: 0;
    font-size: 18px;
    line-height: 1.15;
    letter-spacing: 0;
  }

  p {
    max-width: 68ch;
    margin: 4px 0 0;
    color: var(--text-soft);
    font-size: 13px;
    line-height: 1.35;
  }
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.body {
  min-width: 0;
  padding: 0 14px 14px;
}

.footer {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px 14px 12px;
}

@media (max-width: 640px) {
  .header {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .controls {
    justify-content: flex-start;
  }
}
```

## Rules

- Use this for one control group or one short settings section. Do not nest cards inside it.
- Keep descriptions practical and short; avoid explaining implementation constraints in the UI.
- Put short toggles, selects, segmented controls, and icon buttons in `controls`.
- Put dense forms, sliders, and secondary fields in `body`.
- Use `footer` only for commit/cancel/export actions that need separation from controls.
