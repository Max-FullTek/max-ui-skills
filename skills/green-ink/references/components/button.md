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

## Green Ink guardrails

- Use the Green Ink presentation override: solid fallback fills, `2px` corners, and no CSS gradient, glow, pill geometry, or hover lift.
- Use deep green for `primary`; reserve vermilion-derived secondary or danger treatment for sparse, clearly secondary emphasis.
- `primary` may layer the shared `dry-brush.webp` from `../art-assets.md`; every other tone remains artwork-free and the solid primary must remain complete when the file is absent.
- Hover changes a solid fill or border. Active feedback may press `1px` down and right while reducing the short hard offset shadow.
- Keep focus crisp and visible with a green border and hard spread ring separated by the current surface color.

## Asset

[Canonical Button source](../../assets/react/components/Button/)
