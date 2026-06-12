# Card

Use for repeated surfaces and compact summaries. Do not use large cards for one label plus one value.

```tsx
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.scss";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "aside" | "div";
  compact?: boolean;
  children: ReactNode;
};

export function Card({ as: Tag = "section", compact = false, className = "", children, ...props }: CardProps) {
  return (
    <Tag className={`${styles.root} ${compact ? styles.compact : ""} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
```

```scss
.root {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--card-surface);
  box-shadow: var(--shadow-soft);
}

.compact {
  border-radius: var(--radius-md);
  padding: 10px 14px;
}
```
