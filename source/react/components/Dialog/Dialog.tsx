import type { ReactNode } from "react";
import { X } from "lucide-react";
import styles from "./Dialog.module.scss";

type DialogProps = {
  open: boolean;
  size?: "compact" | "default" | "wide";
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Dialog({ open, size = "compact", title, children, onClose }: DialogProps) {
  if (!open) return null;

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={`${styles.panel} ${styles[size]}`}
        role="dialog"
        aria-label={title}
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <h2>{title}</h2>
          <button className={styles.close} aria-label="Close" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </section>
    </div>
  );
}
