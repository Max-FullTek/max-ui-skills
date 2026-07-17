# Alert

Use for short status feedback. Keep copy to one concise sentence or less.

```tsx
import type { ReactNode } from "react";
import styles from "./Alert.module.scss";

type AlertTone = "info" | "success" | "warning" | "danger";

export function Alert({ tone = "info", children }: { tone?: AlertTone; children: ReactNode }) {
  return <div className={`${styles.root} ${styles[tone]}`} role="status">{children}</div>;
}
```

```scss
.root {
  min-height: 38px;
  display: flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  color: var(--text);
  background: var(--bg-elevated);
}

.info { border-color: var(--border); }
.success { border-color: color-mix(in srgb, var(--secondary) 42%, transparent); background: var(--secondary-soft); }
.warning { border-color: color-mix(in srgb, var(--accent) 42%, transparent); background: var(--accent-soft); }
.danger { border-color: color-mix(in srgb, var(--danger) 42%, transparent); color: var(--danger); }
```
