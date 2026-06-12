# Vision Stage

Use for real-time image processing, video streams, canvas/SVG overlays, ROI debugging, detections, heatmaps, and inspection tools.

## React

```tsx
import type { ReactNode } from "react";
import styles from "./VisionStage.module.scss";

type VisionStageProps = {
  label: string;
  media: ReactNode;
  overlay?: ReactNode;
  hud?: ReactNode;
  toolbar?: ReactNode;
};

export function VisionStage({ label, media, overlay, hud, toolbar }: VisionStageProps) {
  return (
    <section className={styles.root} aria-label={label}>
      <div className={styles.stage}>
        <div className={styles.media}>{media}</div>
        {overlay && <div className={styles.overlay}>{overlay}</div>}
        {hud && <div className={styles.hud}>{hud}</div>}
      </div>
      {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
    </section>
  );
}
```

## SCSS Module

```scss
.root {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--card-surface);
  box-shadow: var(--shadow-soft);
}

.stage {
  position: relative;
  min-height: 0;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background:
    linear-gradient(45deg, color-mix(in srgb, var(--text) 4%, transparent) 25%, transparent 25%),
    linear-gradient(-45deg, color-mix(in srgb, var(--text) 4%, transparent) 25%, transparent 25%),
    var(--bg-strong);
  background-size: 18px 18px;
}

.media,
.overlay {
  position: absolute;
  inset: 0;
}

.media video,
.media canvas,
.media img,
.media svg,
.overlay canvas,
.overlay svg {
  width: 100%;
  height: 100%;
  display: block;
}

.media video,
.media img {
  object-fit: contain;
}

.overlay {
  pointer-events: none;
}

.overlay svg {
  overflow: visible;
}

.hud {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 6px;
  max-width: min(420px, calc(100% - 20px));
}

.hud > * {
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 4px 8px;
  color: var(--text);
  font-size: 12px;
  background: color-mix(in srgb, var(--bg-panel) 88%, transparent);
  backdrop-filter: blur(12px);
}

.toolbar {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 10px;
  border-top: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg-panel) 74%, transparent);
}
```

## Rules

- Keep media and overlay in the same coordinate space. Size `video`, `canvas`, and `svg` to `100%` of the stage and map ROI coordinates explicitly in application logic.
- Use SVG for editable ROI boxes and vector labels; use canvas for dense masks, heatmaps, and high-frequency drawing.
- Overlay layers are `pointer-events: none` by default. Enable pointer events only on explicit editing handles.
- Keep debug HUD text short: FPS, resolution, model status, frame id, or latency.
- Do not add decorative filters that obscure the image; the user must be able to inspect processing results.
