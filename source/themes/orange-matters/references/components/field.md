# Field

Use for text input and custom select controls. Do not rely on native select styling when the option list must match the theme.

## React

```tsx
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Field.module.scss";

export function TextField({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${styles.control} ${className}`} {...props} />;
}

type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  options: SelectOption[];
  defaultValue?: string;
  className?: string;
};

export function SelectField({ label, options, defaultValue, className = "" }: SelectFieldProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  const [value, setValue] = useState(defaultValue ?? options[0]?.value ?? "");
  const selected = options.find((option) => option.value === value) ?? options[0];
  const portalTheme = typeof document === "undefined" ? undefined : document.documentElement.dataset.theme;

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const syncPosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const gap = 8;
      const estimatedHeight = Math.min(240, options.length * 38 + 12);
      const spaceBelow = window.innerHeight - rect.bottom - gap;
      const placeAbove = spaceBelow < estimatedHeight && rect.top > spaceBelow;

      setPanelStyle({
        left: rect.left,
        width: rect.width,
        maxHeight: Math.max(120, placeAbove ? rect.top - gap * 2 : spaceBelow),
        ...(placeAbove ? { bottom: window.innerHeight - rect.top + gap } : { top: rect.bottom + gap })
      });
    };

    syncPosition();
    window.addEventListener("resize", syncPosition);
    window.addEventListener("scroll", syncPosition, true);

    return () => {
      window.removeEventListener("resize", syncPosition);
      window.removeEventListener("scroll", syncPosition, true);
    };
  }, [open, options.length]);

  useEffect(() => {
    if (!open) return;

    const closeOnOutside = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest("[data-select-panel]")?.getAttribute("data-select-panel") === listboxId) return;
      setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, listboxId]);

  return (
    <div className={`${styles.selectRoot} ${className}`} ref={rootRef}>
      <button
        type="button"
        className={styles.selectButton}
        ref={triggerRef}
        aria-label={label}
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected?.label}</span>
        <ChevronDown aria-hidden="true" />
      </button>
      {open &&
        createPortal(
          <div
            className={styles.optionPanel}
            data-select-panel={listboxId}
            data-theme={portalTheme}
            id={listboxId}
            role="listbox"
            aria-label={label}
            style={panelStyle}
          >
            {options.map((option) => (
              <button
                type="button"
                className={option.value === value ? `${styles.option} ${styles.selected}` : styles.option}
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  setValue(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
```

## SCSS Module

```scss
.control {
  width: 100%;
  min-height: 38px;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 0 13px;
  color: var(--text);
  background: var(--bg-strong);
  outline: 0;
  transition: border-color var(--ease), box-shadow var(--ease), background var(--ease);

  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }
}

.selectRoot {
  position: relative;
  min-width: 112px;
}

.selectButton {
  width: 100%;
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 0 11px 0 13px;
  color: var(--text);
  background: var(--bg-strong);
  transition: border-color var(--ease), box-shadow var(--ease), background var(--ease);

  svg {
    width: 16px;
    height: 16px;
    color: var(--text-soft);
  }

  &:hover {
    border-color: var(--border-strong);
    background: var(--bg-elevated);
  }

  &:focus-visible,
  &[aria-expanded="true"] {
    outline: 0;
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }

  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
}

.optionPanel {
  position: fixed;
  z-index: 40;
  min-width: 148px;
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 6px;
  color: var(--text);
  background: var(--bg-panel);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(16px);
}

.option {
  width: 100%;
  min-height: 34px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: 0 10px;
  color: var(--text-soft);
  text-align: left;
  background: transparent;
  transition: background var(--ease), color var(--ease), border-color var(--ease);

  &:hover {
    color: var(--text);
    background: var(--bg-elevated);
  }

  &:focus-visible {
    outline: 0;
    border-color: var(--accent);
  }
}

.selected {
  color: var(--text);
  background: var(--accent-soft);
  border-color: color-mix(in srgb, var(--accent) 34%, transparent);
}
```

## Rules

- Use custom select when option list styling matters.
- Use a library icon such as `ChevronDown` from `lucide-react`.
- Render custom select option lists through a portal/floating layer. Dialogs, drawers, cards, and scroll panels often use `overflow: auto` or `overflow: hidden`; option lists must not be clipped by those containers.
- Portal panels must receive the same theme tokens as their trigger. Prefer setting `data-theme` on `document.documentElement`; also copy the current theme to the portal panel when the project scopes tokens with `[data-theme]`.
- Position the option panel with fixed coordinates from the trigger and flip it above the trigger when there is not enough viewport space below.
- Select trigger and options do not use lift/press effects.
- Keep option text short and scannable.
- Short selects/status fields should sit inline with related fields when width allows.
- Do not make every field full-width by default. Let long text inputs flex and short controls keep compact fixed widths.
