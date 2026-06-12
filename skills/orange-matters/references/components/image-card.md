# Image Card

Use for image-processing demos, generated-image previews, before/after results, and visual outputs users need to inspect.

## React

```tsx
import type { ReactNode } from "react";
import styles from "./ImageCard.module.scss";

type ImageCardProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  meta?: string;
  badge?: string;
  actions?: ReactNode;
};

export function ImageCard({ title, imageSrc, imageAlt, meta, badge, actions }: ImageCardProps) {
  return (
    <article className={styles.root}>
      <div className={styles.preview}>
        <img src={imageSrc} alt={imageAlt} />
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
      <div className={styles.body}>
        <div className={styles.copy}>
          <h3>{title}</h3>
          {meta && <p>{meta}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </article>
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

.preview {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--bg-strong);
}

.preview img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  border: 1px solid color-mix(in srgb, var(--accent) 38%, transparent);
  border-radius: var(--radius-pill);
  padding: 4px 9px;
  color: var(--accent-strong);
  font-size: 12px;
  background: color-mix(in srgb, var(--accent-soft) 70%, var(--bg-panel));
  backdrop-filter: blur(12px);
}

.body {
  min-height: 58px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
}

.copy {
  min-width: 0;

  h3 {
    margin: 0;
    font-size: 16px;
    line-height: 1.15;
  }

  p {
    margin: 3px 0 0;
    color: var(--text-soft);
    font-size: 12px;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

## Rules

- Use `object-fit: contain` for inspection outputs; do not crop algorithm results unless the product explicitly needs thumbnails.
- Keep metadata short: resolution, model/run id, status, or timestamp.
- Use one badge max by default; visual output should remain the focus.
- Put comparison controls or download/open actions in the action slot, not over the image unless they are compact icon buttons.
