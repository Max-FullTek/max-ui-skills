# Toast Provider

Use `ToastProvider` for brief, non-blocking feedback triggered from anywhere inside an application tree.

## Contract

- Wrap the relevant application scope with `ToastProvider`; `useToast()` throws when used outside that provider.
- `useToast()` returns `pushToast(message, tone?)`. `ToastTone` is `"danger" | "info" | "success" | "warning"`, defaulting to `info`.
- New toasts enter at the start of the queue; retain at most four and dismiss each after the component lifetime.
- Clear timers on dismissal and provider unmount. Hover pauses the current timer; leaving follows the component's dismissal behavior.
- Each toast exposes compact copy and close actions. The provider owns queue lifecycle and tone icons, not application error recovery.

## Minimal usage

```tsx
function SaveButton() {
  const { pushToast } = useToast();

  return (
    <button type="button" onClick={() => pushToast("Settings saved", "success")}>
      Save
    </button>
  );
}

<ToastProvider>
  <App />
</ToastProvider>
```

## Accessibility

- Keep the viewport a polite live region so status feedback is announced without interrupting the current task.
- Write short, self-contained messages; do not encode meaning by tone or icon alone.
- Give icon-only copy and close controls explicit accessible labels and visible focus.
- Use a dialog or inline error for blocking decisions, destructive confirmation, or feedback that must remain until resolved.

## Orange Matters guardrails

- Use compact elevated/glass surfaces with restrained depth and orange focus treatment.
- Map success/info/warning/danger to semantic tokens; teal may support secondary informational or success status but never becomes the brand primary.
- Keep entry motion short and disable non-essential movement for reduced motion.
- Do not stack verbose explanations, duplicate persistent page errors, or fill the viewport with notifications.

## Asset

Use the [canonical ToastProvider component](../../assets/react/components/ToastProvider/). The Skill builder publishes its complete TSX, CSS Module, and barrel export under `assets/react/components/ToastProvider/`.
