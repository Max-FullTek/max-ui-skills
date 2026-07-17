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

## Orange Matters guardrails

- Keep descriptions practical and short; never expose prompts, implementation notes, or agent explanations.
- Place short toggles, selects, segmented controls, and icon buttons in `controls`; use `children` for denser content.
- Use `footer` only when actions need separation from the control row.
- Do not nest another card inside a Control Card.
- On narrow screens, let header controls wrap below the title instead of forcing document overflow.

## Asset

[Canonical ControlCard source](../../../../react/components/ControlCard/)
