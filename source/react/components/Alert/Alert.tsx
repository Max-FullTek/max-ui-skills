import type { ReactNode } from "react";
import styles from "./Alert.module.scss";

type AlertTone = "info" | "success" | "warning" | "danger";

export function Alert({ tone = "info", children }: { tone?: AlertTone; children: ReactNode }) {
  return (
    <div className={`${styles.root} ${styles[tone]}`} role="status">
      {children}
    </div>
  );
}
