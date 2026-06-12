# Heading

Compact heading for page and panel headers. Do not add decorative subtitles.

```tsx
import type { ReactNode } from "react";
import styles from "./Heading.module.scss";

type HeadingProps = {
  title: string;
  level?: 1 | 2 | 3;
  actions?: ReactNode;
};

export function Heading({ title, level = 2, actions }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <div className={styles.root}>
      <Tag className={styles.title}>{title}</Tag>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
```

```scss
.root {
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: clamp(20px, 1.8vw, 30px);
  line-height: 1.1;
  letter-spacing: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}
```
