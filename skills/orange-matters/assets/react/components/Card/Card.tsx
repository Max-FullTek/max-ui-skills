import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.scss";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "aside" | "div";
  compact?: boolean;
  children: ReactNode;
};

export function Card({ as: Tag = "section", compact = false, className = "", children, ...props }: CardProps) {
  return (
    <Tag className={`${styles.root} ${compact ? styles.compact : ""} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
