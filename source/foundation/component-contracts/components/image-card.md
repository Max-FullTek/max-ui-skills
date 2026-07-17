# Image Card

Use `ImageCard` for generated-image previews, uploads, before/after results, and other visual output users need to inspect.

## Contract

- `title` is required. `imageSrc`, `imageAlt`, `meta`, `badge`, and `actions` describe the current result without owning application state.
- Enable empty-state upload behavior with `uploadEnabled`, `uploadHint`, and `onUploadClick`. When an image exists, `onRemoveImage` exposes a compact action labeled by `removeLabel`.
- Control sizing with `width`, `height`, `minHeight`, `aspectRatio`, and `fill`. The parent owns grid or panel dimensions; `fill` lets the card stretch into that space.
- `imageFit` accepts CSS `object-fit` values and defaults to `contain`.
- `infoLayout="below"` keeps metadata outside the preview. Use `"overlay"` only when a fixed bottom information bar may cover part of the image.

## Minimal usage

```tsx
<ImageCard
  title="Detection result"
  imageSrc={resultUrl}
  imageAlt="Detected objects with bounding boxes"
  meta="1920 × 1080"
  uploadEnabled
  onUploadClick={openFilePicker}
  onRemoveImage={clearResult}
  aspectRatio="16 / 10"
  infoLayout="below"
/>
```

## Accessibility

- Provide meaningful `imageAlt` for informative output; use an empty string only when the image is decorative and nearby text is equivalent.
- When upload is available, the empty preview must behave as a keyboard-operable button for Enter and Space.
- Give the remove action a specific `removeLabel`; do not rely on an icon alone.
- Keep essential status out of a badge alone when it is needed to understand or operate the result.

## Asset

Use the [canonical ImageCard component](../../../../react/components/ImageCard/). The Skill builder publishes its complete TSX, CSS Module, and barrel export under `assets/react/components/ImageCard/`.
