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

## Orange Matters guardrails

- Keep the row compact and allow actions to wrap on narrow widths.
- Do not add decorative subtitles, eyebrow copy, accent rails, glow strips, oversized underlines, or filler text.
- Let weight, spacing, alignment, and restrained dividers provide hierarchy.
- Use short product-facing titles; never render prompt or agent text.

## Asset

[Canonical Heading source](../../assets/react/components/Heading/)
