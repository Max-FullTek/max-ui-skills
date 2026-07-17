# React Source Conventions

Use these conventions for shared React sources and for theme packages assembled from them.

## Rules

- Use component, layout, feature, or page folders with explicit ownership.
- Every reusable component and layout keeps its TSX, CSS Module, and public `index.ts` together.
- Route/page screens use the same colocated CSS Module pattern, but stay outside reusable component sources.
- Global styles are limited to reset, base elements, fonts, tokens, and true third-party global overrides.
- Do not put component selectors or generic classes such as `.title`, `.card`, `.button`, `.wrapper`, or `.content` in global styles.
- Prefer local CSS Module names such as `.root`, `.header`, `.body`, `.footer`, `.action`, `.panel`, `.list`, and `.row`.
- Shared design values use semantic CSS variables or shared SCSS partials/mixins; do not copy component styles.
- Use an established icon library rather than hand-coding reusable icons.
- Preserve native element attributes and accessibility behavior when wrapping controls.
- Theme state must reach portal content. Mirror the active `data-theme` to `document.documentElement`, `body`, or the portal host when menus, dialogs, tooltips, toasts, or select panels render outside the layout root.

## Canonical Structure

```text
source/react/
  styles/
    globals.scss
  layouts/
    DashboardFrame/
      DashboardFrame.tsx
      DashboardFrame.module.scss
      index.ts
  components/
    Button/
      Button.tsx
      Button.module.scss
      index.ts
    Header/
      Header.tsx
      Header.module.scss
      index.ts
```

Theme token values, structural theme overrides, and exclusive components live under `source/themes/<theme>/`, not beside the shared React contracts.

## Component Pattern

```tsx
import styles from "./Button.module.scss";

type ButtonTone =
  | "primary"
  | "primaryOutline"
  | "secondary"
  | "secondaryOutline"
  | "ghost"
  | "danger"
  | "iconOnly";

export function Button({
  tone = "ghost",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: ButtonTone }) {
  return <button className={`${styles.root} ${styles[tone]} ${className}`} {...props} />;
}
```

The public entry point re-exports values and public types deliberately. Keep internal helpers private unless they are part of the supported contract.

## Globals Boundary

```scss
html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
}

* {
  box-sizing: border-box;
}
```

Do not add component, layout, or page selectors here.

## Theme Scope

```tsx
useEffect(() => {
  document.documentElement.dataset.theme = theme;

  return () => {
    delete document.documentElement.dataset.theme;
  };
}, [theme]);
```

Keeping `data-theme` on the app root is useful for local styling, but it does not replace document-level synchronization when portals render under `document.body`.
