# Alert

Use for one-line status feedback that should be announced without interrupting the current task.

## Contract

- `children: ReactNode` is required and supplies the message.
- `tone?: "info" | "success" | "warning" | "danger"` defaults to `info`.
- The component renders a non-interactive status region; actions belong beside it, not inside the message.

## Minimal usage

```tsx
<Alert tone="success">Settings saved.</Alert>
```

## Accessibility

- The asset uses `role="status"`, so keep the message brief and meaningful when announced.
- Do not repeatedly remount an unchanged alert or use it for a blocking decision that requires a dialog.
- Do not communicate success, warning, or danger by color alone; the message must name the state.

## Green Ink guardrails

- Keep copy to one concise sentence and use a solid semantic wash with an explicit text label for the state.
- Use a neutral border plus one stronger leading or top rule; do not use translucent tint, glow, gradient, or blur.
- Keep the surface compact with low-radius geometry. Vermilion may mark warning or danger, but it must not become a competing brand color.

## Asset

[Canonical Alert source](../../assets/react/components/Alert/)
