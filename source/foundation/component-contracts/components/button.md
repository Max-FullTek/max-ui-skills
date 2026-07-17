# Button

Use for commands, toolbar actions, compact calls to action, and icon controls.

## Contract

- Accepts native `ButtonHTMLAttributes<HTMLButtonElement>` and forwards them to the underlying button.
- `tone?: "primary" | "primaryOutline" | "secondary" | "secondaryOutline" | "ghost" | "danger" | "iconOnly"` defaults to `ghost`.
- `icon?: ReactNode` renders before the optional label in `children`.
- `className` is merged with the component styles; native `type`, `disabled`, event, and ARIA props remain available.
- Use `primary` for the main action, `secondary` for secondary commands, `danger` for destructive commands, and outline or ghost tones for lower emphasis.

## Minimal usage

```tsx
<Button tone="primary" icon={<Save aria-hidden="true" />} type="submit">
  Save
</Button>
```

## Accessibility

- Give icon-only buttons an `aria-label`; add a tooltip or `title` when the meaning is not obvious.
- Use the native `disabled` attribute for unavailable commands and set `type="button"` when a button inside a form must not submit it.
- Decorative icons should use `aria-hidden="true"`; the visible label or accessible name owns the command text.
- Preserve a visible focus state and a stable hit target.

## Asset

[Canonical Button source](../../../../react/components/Button/)
