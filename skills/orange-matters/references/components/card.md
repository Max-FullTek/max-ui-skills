# Card

Use for repeated surfaces, grouped content, and compact summaries.

## Contract

- `children: ReactNode` is required.
- `as?: "article" | "section" | "aside" | "div"` selects the semantic root and defaults to `section`.
- `compact?: boolean` defaults to `false` and reduces radius and padding for dense content.
- Native `HTMLAttributes<HTMLElement>`, including `className`, are forwarded to the selected root.
- The component supplies the surface only; content structure, headings, and actions remain the caller's responsibility.

## Minimal usage

```tsx
<Card as="article" compact>
  <h2>Queue health</h2>
  <strong>Healthy</strong>
</Card>
```

## Accessibility

- Choose `article`, `section`, or `aside` only when that landmark meaning is accurate; otherwise use `div`.
- Give a `section` or `aside` an accessible heading when it represents a distinct region.
- A Card is not a button. Put a real link or button inside it when users can act on the content.

## Orange Matters guardrails

- Use the themed gradient surface, low-contrast border, soft shadow, and rounded geometry.
- Keep one-label/one-value metrics around `48px` to `64px` tall instead of creating empty oversized cards.
- Reserve large cards for rich content such as charts, previews, forms, or multi-field summaries.
- Only an intentionally interactive card may lift on hover.

## Asset

[Canonical Card source](../../assets/react/components/Card/)
