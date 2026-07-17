# Control Card

Use for one compact settings, filter, or tool-control group with optional supporting content and actions.

## Contract

- `title: string` is required and renders as the card heading.
- `description?: string` renders short supporting copy under the title.
- `controls?: ReactNode` renders compact controls at the end of the header.
- `children?: ReactNode` renders the main body for dense forms, sliders, or secondary fields.
- `footer?: ReactNode` renders a separate action row for commit, cancel, or export commands.
- The root is a semantic `section` containing a header, body, and footer only when their content exists.

## Minimal usage

```tsx
<ControlCard
  title="Capture"
  controls={<Button tone="primary">Run</Button>}
  footer={<Button tone="ghost">Reset</Button>}
>
  <TextField aria-label="Frame limit" inputMode="numeric" />
</ControlCard>
```

## Accessibility

- Keep the required title descriptive because it labels the control group visually.
- Every field, toggle, select, and icon button supplied through a slot still needs its own accessible label.
- Preserve logical keyboard order: header controls, body inputs, then footer actions.
- Do not place unrelated settings under one title merely to reduce the number of surfaces.

## Green Ink guardrails

- Preserve the dense shared header/body/footer layout on opaque paper/ink surfaces with a restrained border hierarchy.
- Place compact controls in `controls`, denser fields in `children`, and separated commit actions in `footer`; do not nest another card.
- Let header controls wrap on narrow screens and keep overflow inside intentional local regions.
- Use low radii and solid state fills; do not add glass, blur, gradient, soft floating shadow, or hover lift.

## Asset

[Canonical ControlCard source](../../assets/react/components/ControlCard/)
