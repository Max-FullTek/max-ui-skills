# Button

Use for command buttons, icon buttons, toolbar actions, and compact CTA controls.

## React

```tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonTone =
  | "primary"
  | "primaryOutline"
  | "secondary"
  | "secondaryOutline"
  | "ghost"
  | "danger"
  | "iconOnly";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone;
  icon?: ReactNode;
};

export function Button({ tone = "ghost", icon, children, className = "", ...props }: ButtonProps) {
  return (
    <button className={`${styles.root} ${styles[tone]} ${className}`} {...props}>
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
}
```

## SCSS Module

```scss
.root {
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0 14px;
  color: var(--text);
  background: var(--bg-elevated);
  transition:
    transform var(--ease),
    box-shadow var(--ease),
    border-color var(--ease),
    background var(--ease);

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-soft);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: inset 0 2px 5px color-mix(in srgb, #000 12%, transparent);
  }

  &:focus-visible {
    outline: 0;
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }
}

.primary {
  color: #fff;
  border-color: transparent;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  box-shadow: 0 12px 26px var(--accent-soft);
}

.primaryOutline {
  color: var(--accent-strong);
  border-color: color-mix(in srgb, var(--accent) 44%, transparent);
  background: color-mix(in srgb, var(--accent-soft) 38%, var(--bg-elevated));

  &:hover {
    color: #fff;
    border-color: transparent;
    background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  }
}

.secondary {
  color: #fff;
  border-color: transparent;
  background: linear-gradient(135deg, var(--secondary), var(--secondary-strong));
}

.secondaryOutline {
  color: var(--secondary-strong);
  border-color: color-mix(in srgb, var(--secondary) 48%, transparent);
  background: var(--secondary-soft);

  &:hover {
    color: #fff;
    border-color: transparent;
    background: linear-gradient(135deg, var(--secondary), var(--secondary-strong));
  }
}

.danger {
  color: #fff;
  border-color: transparent;
  background: var(--danger);
}

.iconOnly {
  width: 38px;
  padding: 0;
}
```

## Interaction Rules

- Hover: fill outline buttons, lift up `translateY(-1px)`, and deepen shadow.
- Active: press down `translateY(1px)` and use inset shadow.
- Focus: orange border/glow, never blue browser focus.
- Keep labels short; icon-only buttons need an accessible label and tooltip when meaning is not obvious.
