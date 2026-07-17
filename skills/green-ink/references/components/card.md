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

## Green Ink guardrails

- Use the shared Card asset with Green Ink tokens; do not add a presentation override unless a real product need changes its structure.
- Use an opaque paper/ink surface, low radius, a quiet border, and at most a short hard offset shadow.
- Keep compact metric cards dense. Only an intentionally interactive card changes fill or border on hover, and it never lifts.
- Do not add glass, CSS gradients, radial washes, any of the shell/brush artwork, or ornamental motifs.

## Asset

[Canonical Card source](../../assets/react/components/Card/)
