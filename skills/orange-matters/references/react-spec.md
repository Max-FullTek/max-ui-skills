# React Spec

Use this with Orange Matters when the target project uses React.

## Rules

- Use component or feature folders.
- Every reusable component uses colocated CSS Modules:
  - `ComponentName.tsx`
  - `ComponentName.module.scss`
  - `index.ts`
- Every page or route-level screen also uses CSS Modules:
  - `UserListPage.tsx`
  - `UserListPage.module.scss`
- Do not put component-specific styles in `src/styles/globals.scss`, `reset.scss`, `tokens.scss`, `App.scss`, or any other global stylesheet.
- Global styles are only for reset, base elements, CSS variables, theme tokens, `@font-face`, and third-party global overrides.
- Do not create generic global class names such as `.title`, `.card`, `.button`, `.wrapper`, `.content`.
- Prefer local CSS Module class names: `.root`, `.header`, `.body`, `.footer`, `.action`, `.primary`, `.secondary`, `.panel`, `.list`, `.row`.
- Shared design values must be CSS variables or SCSS partials/mixins, not copied component styles.
- Do not modify global styles unless the change truly affects the entire application.
- Use an established icon library such as `lucide-react`; do not hand-code reusable UI icons as inline SVG.
- Theme state must reach portal content. If components render menus, dialogs, tooltips, toasts, or select panels under `document.body`, put `data-theme` on `document.documentElement`, `body`, or the portal host instead of scoping it only to a layout component.

## Structure

```txt
src/
  styles/
    globals.scss
    tokens.scss
  layouts/
    DashboardFrame/
      DashboardFrame.tsx
      DashboardFrame.module.scss
      index.ts
  services/
    useBackendSocketService.ts
    useDeviceConnectionService.ts
    useSettingsService.ts
  components/
    Button/
      Button.tsx
      Button.module.scss
      index.ts
    Header/
      Header.tsx
      Header.module.scss
      index.ts
    RunningBorder/
      RunningBorder.tsx
      RunningBorder.module.scss
      index.ts
    ToastProvider/
      ToastProvider.tsx
      ToastProvider.module.scss
      index.ts
  pages/
    UserListPage/
      UserListPage.tsx
      UserListPage.module.scss
      index.ts
```

## Component Pattern

```tsx
import styles from "./Button.module.scss";

type ButtonTone = "primary" | "primaryOutline" | "secondary" | "secondaryOutline" | "ghost" | "danger" | "iconOnly";

export function Button({ tone = "ghost", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: ButtonTone }) {
  return <button className={`${styles.root} ${styles[tone]} ${className}`} {...props} />;
}
```

```scss
.root {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  min-height: 36px;
  padding: 0 14px;
  transition: transform var(--ease), box-shadow var(--ease), border-color var(--ease), background var(--ease);

  &:hover {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 0;
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }
}

.primary {
  color: #fff;
  border-color: transparent;
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
}

.secondary {
  color: #fff;
  border-color: transparent;
  background: linear-gradient(135deg, var(--secondary), var(--secondary-strong));
}
```

## Globals Boundary

```scss
/* globals.scss */
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

Do not add `.button`, `.card`, `.title`, `.layout`, or page/component selectors here.

## Theme Scope

```tsx
useEffect(() => {
  document.documentElement.dataset.theme = theme;

  return () => {
    delete document.documentElement.dataset.theme;
  };
}, [theme]);
```

Keep the app root `data-theme` if it helps local styling, but mirror the active theme to a document-level node whenever themed UI is rendered through portals.
