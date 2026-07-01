# Image Card

Use for image-processing demos, generated-image previews, before/after results, and visual outputs users need to inspect.

## React

```tsx
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import styles from "./ImageCard.module.scss";

type ImageCardProps = {
  title: string;
  imageSrc?: string | null;
  imageAlt?: string;
  meta?: string;
  badge?: string;
  actions?: ReactNode;
  uploadEnabled?: boolean;
  uploadHint?: string;
  removeLabel?: string;
  onUploadClick?: () => void;
  onRemoveImage?: () => void;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  minHeight?: CSSProperties["minHeight"];
  aspectRatio?: CSSProperties["aspectRatio"];
  fill?: boolean;
  imageFit?: CSSProperties["objectFit"];
  infoLayout?: "below" | "overlay";
};

export function ImageCard({
  title,
  imageSrc,
  imageAlt = "",
  meta,
  badge,
  actions,
  uploadEnabled = false,
  uploadHint = "Select image",
  removeLabel = "Remove image",
  onUploadClick,
  onRemoveImage,
  width,
  height,
  minHeight,
  aspectRatio,
  fill = false,
  imageFit = "contain",
  infoLayout = "below"
}: ImageCardProps) {
  const hasImage = Boolean(imageSrc);
  const canUpload = uploadEnabled && !hasImage && Boolean(onUploadClick);
  const canRemove = uploadEnabled && hasImage && Boolean(onRemoveImage);
  const cardStyle = { width, height, minHeight, aspectRatio } as CSSProperties;

  const handleUploadKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!canUpload || !onUploadClick) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onUploadClick();
    }
  };

  return (
    <article
      className={`${styles.root} ${styles[infoLayout]} ${fill ? styles.fill : ""} ${canUpload ? styles.uploadable : ""}`}
      style={cardStyle}
    >
      <div
        className={styles.preview}
        role={canUpload ? "button" : undefined}
        tabIndex={canUpload ? 0 : undefined}
        onClick={canUpload ? onUploadClick : undefined}
        onKeyDown={handleUploadKeyDown}
      >
        {imageSrc ? <img src={imageSrc} alt={imageAlt} style={{ objectFit: imageFit }} /> : null}
        {canUpload ? <span className={styles.emptyAction}>{uploadHint}</span> : null}
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
      <div className={styles.body}>
        <div className={styles.copy}>
          <h3>{title}</h3>
          {meta && <p>{meta}</p>}
        </div>
        {(actions || canRemove) && (
          <div className={styles.actions}>
            {actions}
            {canRemove && (
              <button type="button" className={styles.iconButton} aria-label={removeLabel} onClick={onRemoveImage}>
                Remove
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
```

## SCSS Module

```scss
.root {
  width: 100%;
  min-width: 0;
  min-height: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--card-surface);
  box-shadow: var(--shadow-soft);
}

.fill {
  height: 100%;
}

.below .preview {
  flex: 0 0 auto;
}

.uploadable .preview {
  cursor: pointer;
}

.uploadable .preview:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--accent) 72%, transparent);
  outline-offset: -3px;
}

.preview {
  position: relative;
  aspect-ratio: 16 / 10;
  min-height: 0;
  overflow: hidden;
  background: var(--bg-strong);
}

.fill .preview {
  flex: 1 1 auto;
}

.overlay {
  aspect-ratio: 16 / 10;
}

.overlay .preview {
  height: 100%;
  aspect-ratio: auto;
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

.emptyAction {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--text-soft);
  font-size: 13px;
  font-weight: 800;
}

.body {
  min-height: 58px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
}

.overlay .body {
  position: absolute;
  right: -1px;
  bottom: -1px;
  left: -1px;
  min-height: 0;
  height: 54px;
  border-top: 1px solid color-mix(in srgb, var(--border) 76%, transparent);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  padding: 8px 14px;
  background: color-mix(in srgb, var(--bg-panel) 34%, transparent);
  box-shadow: 0 -10px 26px rgba(0, 0, 0, 0.04);
  transition: background var(--ease), border-color var(--ease), box-shadow var(--ease);
}

.overlay .body:hover,
.overlay .body:focus-within {
  border-top-color: color-mix(in srgb, var(--border-strong) 88%, transparent);
  background: color-mix(in srgb, var(--bg-panel) 78%, transparent);
  box-shadow: 0 -14px 34px rgba(0, 0, 0, 0.1);
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

.iconButton {
  min-height: 30px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0 9px;
  color: var(--text);
  background: color-mix(in srgb, var(--bg-panel) 72%, transparent);
}
```

## Rules

- Use `object-fit: contain` for inspection outputs; do not crop algorithm results unless the product explicitly needs thumbnails.
- Let callers control sizing. Support fixed width, fixed height, fixed width and height, aspect-ratio sizing, and fill/stretch mode for grid cells or panels.
- In dense fixed grids, make the parent define the cell size and use image-card fill mode; images should adapt inside with `object-fit: contain`.
- Keep metadata short: resolution, model/run id, status, or timestamp.
- Use one badge max by default; visual output should remain the focus.
- Default to `infoLayout="below"` so the title, metadata, and actions sit below the preview and the full image remains inspectable.
- Use `infoLayout="overlay"` only when the preview is decorative enough to tolerate a bottom bar over the image.
- Overlay info bars are fixed-height, touch the left, right, and bottom card edges, and become more opaque only when hovering/focusing the bar itself.
- Do not use `backdrop-filter` on the overlay info bar by default; use simple transparent surfaces so image details stay predictable.
- If upload is enabled, the empty image area can open file selection and show one short hint. Non-upload empty cards should stay visually quiet.
- If upload is enabled and an image exists, expose a compact remove action in the action slot.
- Put comparison controls or download/open actions in the action slot, using compact icon buttons when possible.
