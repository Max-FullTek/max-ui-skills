import type { ReactNode } from "react";
import styles from "./ControlCard.module.scss";

type ControlCardProps = {
  title: string;
  description?: string;
  controls?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
};

export function ControlCard({ title, description, controls, children, footer }: ControlCardProps) {
  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <div className={styles.copy}>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {controls && <div className={styles.controls}>{controls}</div>}
      </header>
      {children && <div className={styles.body}>{children}</div>}
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </section>
  );
}
