# Toast

Transient feedback for saves, warnings, background work, and recoverable failures. Keep messages short and product-facing. Use a provider plus hook so pages can push feedback without owning the viewport.

## React

```tsx
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Copy, Info, X, XCircle } from "lucide-react";
import styles from "./ToastProvider.module.scss";

export type ToastTone = "danger" | "info" | "success" | "warning";

type ToastItem = {
  id: number;
  message: string;
  tone: ToastTone;
};

type ToastContextValue = {
  pushToast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const TOAST_LIFETIME_MS = 3200;

function getToastIcon(tone: ToastTone) {
  switch (tone) {
    case "danger":
      return XCircle;
    case "success":
      return CheckCircle2;
    case "warning":
      return AlertTriangle;
    case "info":
    default:
      return Info;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef(new Map<number, number>());

  const dismissToast = useCallback((id: number) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
    }

    timersRef.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pauseToast = useCallback((id: number) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const pushToast = useCallback((message: string, tone: ToastTone = "info") => {
    const id = Date.now() + Math.round(Math.random() * 1000);
    setToasts((current) => [{ id, message, tone }, ...current].slice(0, 4));

    const timer = window.setTimeout(() => {
      dismissToast(id);
    }, TOAST_LIFETIME_MS);
    timersRef.current.set(id, timer);
  }, [dismissToast]);

  useEffect(() => () => {
    for (const timer of timersRef.current.values()) {
      window.clearTimeout(timer);
    }
    timersRef.current.clear();
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.viewport} role="status" aria-live="polite" aria-atomic="false">
        {toasts.map((toast) => {
          const Icon = getToastIcon(toast.tone);

          return (
            <div
              key={toast.id}
              className={`${styles.toast} ${styles[toast.tone]}`}
              onMouseEnter={() => pauseToast(toast.id)}
              onMouseLeave={() => dismissToast(toast.id)}
            >
              <Icon size={17} aria-hidden="true" />
              <span className={styles.message}>{toast.message}</span>
              <div className={styles.actions}>
                <button
                  type="button"
                  title="Copy toast message"
                  aria-label="Copy toast message"
                  onClick={() => void navigator.clipboard?.writeText(toast.message)}
                >
                  <Copy size={14} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  title="Close toast"
                  aria-label="Close toast"
                  onClick={() => dismissToast(toast.id)}
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
```

## SCSS Module

```scss
.viewport {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 80;
  width: min(420px, calc(100vw - 36px));
  display: grid;
  gap: 8px;
  pointer-events: none;
}

.toast {
  min-height: 42px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: start;
  gap: 9px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  background: color-mix(in srgb, var(--bg-panel) 94%, transparent);
  box-shadow: var(--shadow-soft);
  font-size: 13px;
  font-weight: 850;
  pointer-events: auto;
  backdrop-filter: blur(18px);
  animation: toastIn 180ms var(--ease);

  .message {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.toast:hover,
.toast:focus-within {
  width: min(560px, calc(100vw - 36px));
}

.toast:hover .message,
.toast:focus-within .message {
  max-height: 220px;
  overflow: auto;
  text-overflow: clip;
  white-space: normal;
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  button {
    width: 26px;
    height: 26px;
    display: grid;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 9px;
    color: currentColor;
    background: transparent;
    opacity: 0.72;
    transition:
      background var(--ease),
      opacity var(--ease),
      transform var(--ease);
  }

  button:hover {
    background: color-mix(in srgb, currentColor 10%, transparent);
    opacity: 1;
    transform: translateY(-1px);
  }
}

.info {
  color: color-mix(in srgb, var(--secondary-strong) 72%, var(--text));
  border-color: color-mix(in srgb, var(--secondary) 32%, var(--border));
}

.success {
  color: var(--secondary-strong);
  border-color: color-mix(in srgb, var(--secondary) 48%, var(--border));
}

.warning {
  color: var(--accent-strong);
  border-color: color-mix(in srgb, var(--accent) 54%, var(--border));
}

.danger {
  color: var(--danger);
  border-color: color-mix(in srgb, var(--danger) 54%, var(--border));
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

## Rules

- Mount `ToastProvider` above routes or pages that call `useToast()`.
- Limit stacked items to about four and auto-dismiss them after a short delay.
- Use `info`, `success`, `warning`, and `danger` tones only; do not introduce a second primary accent.
- Keep copy brief and specific. Avoid logs, prompts, stack traces, or long explanations.
- The viewport is fixed and pointer-events neutral; individual toasts remain interactive.
- Let long messages expand on hover or focus instead of forcing tall default rows.
