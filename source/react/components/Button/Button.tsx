import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonTone =
  | "primary"
  | "primaryOutline"
  | "secondary"
  | "secondaryOutline"
  | "ghost"
  | "danger"
  | "iconOnly";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone;
  icon?: ReactNode;
};

export function Button({ tone = "ghost", icon, children, className = "", ...props }: ButtonProps) {
  return (
    <button className={`${styles.root} ${styles[tone]} ${className}`} {...props}>
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
}
