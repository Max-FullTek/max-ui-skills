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
