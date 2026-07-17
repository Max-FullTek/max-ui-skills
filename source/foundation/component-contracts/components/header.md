# Header

Use for the compact top row of a dashboard frame: brand context, sidebar control, search, and primary workspace actions.

## Contract

- `brandInitials: string` and `brandName: string` render the brand mark and primary identity.
- `contextLabel?: string` adds one short line of product context.
- `theme: "light" | "dark"` controls the current theme indicator.
- `sidebarOpen: boolean` controls the sidebar button's accessible expanded state.
- `onSidebarToggle: () => void` toggles the element identified by `primary-sidebar`.
- `onThemeChange: (theme: "light" | "dark") => void` receives the opposite theme when the theme button is pressed.
- The canonical asset includes a record search field and compact Alerts action; adapt product copy when integrating it into another application.

## Minimal usage

```tsx
<Header
  brandInitials="OM"
  brandName="Archive Desk"
  contextLabel="Data browser"
  theme={theme}
  sidebarOpen={sidebarOpen}
  onSidebarToggle={() => setSidebarOpen((open) => !open)}
  onThemeChange={setTheme}
/>
```

## Accessibility

- Keep `aria-controls="primary-sidebar"` aligned with the actual sidebar id and `aria-expanded` synchronized with state.
- Icon-only sidebar and theme buttons require accurate state-aware labels; decorative icons stay hidden from assistive technology.
- Give search an application-specific visible or accessible label.
- Preserve keyboard access and visible focus for every header action.

## Asset

[Canonical Header source](../../../react/components/Header/)
