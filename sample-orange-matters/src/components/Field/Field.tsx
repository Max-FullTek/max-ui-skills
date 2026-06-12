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
