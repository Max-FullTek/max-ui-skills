import type { ReactNode } from "react";
import styles from "./Heading.module.scss";

type HeadingProps = {
  title: string;
  level?: 1 | 2 | 3;
  actions?: ReactNode;
};

export function Heading({ title, level = 2, actions }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div className={styles.root}>
      <Tag className={styles.title}>{title}</Tag>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
