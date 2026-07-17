# Dialog

Use for focused detail, confirmation, or edit flows that temporarily sit above the workspace.

## Contract

- `open: boolean` controls rendering; a closed dialog returns `null`.
- `title: string` is required and labels both the visible heading and dialog region.
- `children: ReactNode` supplies the scrollable dialog body.
- `onClose: () => void` runs from the close button or a pointer press on the backdrop.
- `size?: "compact" | "default" | "wide"` defaults to `compact`; use `default` or `wide` only for denser content.
- Pointer events inside the panel do not propagate to the backdrop.

## Minimal usage

```tsx
<Dialog open={editing} title="Edit record" size="default" onClose={() => setEditing(false)}>
  <RecordForm />
</Dialog>
```

## Accessibility

- The asset provides `role="dialog"`, `aria-modal="true"`, a title-derived accessible name, and a labeled close button.
- Integrations must move focus into the dialog, contain focus while open, close on `Escape`, and restore focus to the trigger when closed.
- Use an icon-library close icon and keep it decorative; its button label carries the accessible name.
- Do not rely on backdrop clicking as the only way to close the dialog.

## Asset

[Canonical Dialog source](../../../react/components/Dialog/)
