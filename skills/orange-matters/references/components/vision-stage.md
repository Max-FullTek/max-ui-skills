# Vision Stage

Use `VisionStage` for camera, image, or video inspection surfaces that layer analysis output and controls over a stable media coordinate space.

## Contract

- `label` names the stage region.
- `media` is the required base layer. It may contain an image, video, canvas, or another rendering surface.
- `overlay` occupies the analysis layer aligned to the media coordinate space, for boxes, masks, landmarks, or annotations.
- `hud` occupies a presentation layer for compact status or metrics that should not alter overlay coordinates.
- `toolbar` renders outside the stage below the media stack so controls do not disturb its aspect ratio.
- The parent owns data, playback, measurement, and interaction state; the component owns layer order and contained layout.

## Minimal usage

```tsx
<VisionStage
  label="Live inspection"
  media={<video ref={videoRef} autoPlay muted />}
  overlay={<DetectionOverlay detections={detections} />}
  hud={<span>{detections.length} objects</span>}
  toolbar={<VisionControls />}
/>
```

## Accessibility

- Use a specific `label` that identifies the media task, not a generic word such as “panel.”
- Provide media alternatives appropriate to the source; decorative overlays should be hidden from assistive technology when the same result is available as text.
- Keep toolbar controls keyboard accessible with visible focus and clear names.
- Do not rely on position, outline color, or the HUD alone to communicate critical results.

## Orange Matters guardrails

- Preserve a stable aspect-ratio stage with clipped local layers; toolbars and surrounding page content must not shift overlay coordinates.
- Use charcoal/warm neutral stage surfaces, compact glass HUD treatment, and orange focus. Keep overlays visually subordinate to the inspected media.
- Keep toolbar actions dense and inline. Avoid large feature-card framing or explanatory copy inside the stage.
- Contain media and overlay overflow within the stage; never introduce document-level scrolling.

## Asset

Use the [canonical VisionStage component](../../assets/react/components/VisionStage/). The Skill builder publishes its complete TSX, CSS Module, and barrel export under `assets/react/components/VisionStage/`.
