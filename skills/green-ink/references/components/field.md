# Field

Use `TextField` for native text-entry behavior and `SelectField` when the option panel must match the theme and escape clipped containers.

## Contract

- `TextField` accepts and forwards native `InputHTMLAttributes<HTMLInputElement>`; `className` is merged with its themed control class.
- `SelectField` requires `label: string` and `options: Array<{ label: string; value: string }>`.
- `SelectField` accepts `defaultValue?: string` and `className?: string`; it is internally managed rather than controlled.
- When `defaultValue` is omitted, the first option becomes the initial selection; avoid unmatched defaults because the display falls back to the first option while the stored value remains unmatched.
- The select trigger toggles a listbox rendered into `document.body`; the panel follows viewport resize and ancestor scrolling, flips above when space below is insufficient, and closes on outside pointer input or `Escape`.
- Selecting an option updates internal state and closes the panel. The current API does not expose `value` or `onChange`.

## Minimal usage

```tsx
<label>
  Query
  <TextField name="query" placeholder="Search records" />
</label>

<SelectField
  label="Record status"
  defaultValue="active"
  options={[
    { label: "Active", value: "active" },
    { label: "Archived", value: "archived" }
  ]}
/>
```

## Accessibility

- Associate every `TextField` with a visible `<label>` or provide an accurate `aria-label`.
- `SelectField.label` supplies the trigger and listbox accessible name; keep it task-specific.
- The asset exposes expanded state, listbox ownership, option roles, and selected state, and supports pointer/Tab interaction plus `Escape` dismissal.
- Add full arrow-key, Home/End, and type-ahead behavior before using the custom select where complete listbox keyboard interaction is required.
- Keep the active theme on `document.documentElement` so the portal receives matching light/dark tokens.

## Green Ink guardrails

- Use the Green Ink presentation override with rectangular solid controls, low radii, and a solid portal panel.
- Focus uses a deep-green border and crisp hard spread ring; never use glow or the browser-blue default.
- Indicate the selected option with a solid fill and narrow inset rule. Triggers and options do not lift or press.
- Keep the active theme on `document.documentElement`, portal the panel beyond clipped containers, and keep option copy short.

## Asset

[Canonical Field source](../../assets/react/components/Field/)
