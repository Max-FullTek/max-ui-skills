# Heading

Use for compact page and panel titles with optional actions on the same row.

## Contract

- `title: string` is required.
- `level?: 1 | 2 | 3` selects the semantic heading element and defaults to `2`.
- `actions?: ReactNode` renders a wrapping action group aligned opposite the title.
- The component owns title/action alignment only; subtitles, breadcrumbs, and surrounding section structure remain outside it.

## Minimal usage

```tsx
<Heading
  title="Records"
  level={1}
  actions={<Button tone="primary">New record</Button>}
/>
```

## Accessibility

- Choose `level` from the document outline rather than for visual size alone.
- Keep action labels descriptive and preserve a logical focus order after the heading.
- If the Heading labels a region, connect that region with `aria-labelledby` in the integration.

## Green Ink guardrails

- Keep the shared compact title/action alignment and allow actions to wrap on narrow widths.
- A short heading may use the optional display face and the indexed `dry-brush.webp` as one restrained underline; controls and dense supporting content remain sans-serif.
- Do not add large rails, additional brush assets, glow strips, ornamental punctuation, or filler copy. The ordinary border remains the artwork fallback.
- Choose hierarchy through weight, spacing, alignment, and border contrast rather than oversized decoration.

## Asset

[Canonical Heading source](../../assets/react/components/Heading/)
