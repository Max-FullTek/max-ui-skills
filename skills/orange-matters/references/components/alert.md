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

## Orange Matters guardrails

- Keep copy to one concise sentence or less.
- Use teal for success, orange for warning, and the danger token for destructive or failed states.
- Keep the surface compact and softly rounded; do not turn alerts into large promotional banners.

## Asset

[Canonical Alert source](../../assets/react/components/Alert/)
