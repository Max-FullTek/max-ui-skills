import { Bell, Menu as MenuIcon, Moon, Search, Sun } from "lucide-react";
import { Button } from "../Button";
import styles from "./Header.module.scss";

type HeaderProps = {
  brandInitials: string;
  brandName: string;
  contextLabel?: string;
  theme: "light" | "dark";
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  onThemeChange: (theme: "light" | "dark") => void;
};

export function Header({
  brandInitials,
  brandName,
  contextLabel,
  theme,
  sidebarOpen,
  onSidebarToggle,
  onThemeChange
}: HeaderProps) {
  const nextTheme = theme === "light" ? "dark" : "light";

  return (
    <header className={styles.root}>
      <div className={styles.brandMark}>{brandInitials}</div>
      <div className={styles.brandText}>
        <strong>{brandName}</strong>
        {contextLabel && <span>{contextLabel}</span>}
      </div>
      <Button
        tone="iconOnly"
        className={styles.sidebarToggle}
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        aria-controls="primary-sidebar"
        aria-expanded={sidebarOpen}
        icon={<MenuIcon aria-hidden="true" />}
        onClick={onSidebarToggle}
      />
      <label className={styles.search}>
        <Search aria-hidden="true" />
        <input aria-label="Search records" placeholder="Search records" />
      </label>
      <div className={styles.actions}>
        <Button tone="primaryOutline" icon={<Bell aria-hidden="true" />}>
          Alerts
        </Button>
        <Button
          tone="iconOnly"
          aria-label={`Switch to ${nextTheme} mode`}
          icon={theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
          onClick={() => onThemeChange(nextTheme)}
        />
      </div>
    </header>
  );
}
