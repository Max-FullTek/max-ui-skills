import { useEffect, type ReactNode } from "react";
import styles from "./DashboardFrame.module.scss";

export type DashboardTheme = "light" | "dark";

export type DashboardFrameProps = {
  theme: DashboardTheme;
  header: ReactNode;
  sidebar: ReactNode;
  sidebarOpen: boolean;
  sidebarFloating: boolean;
  children: ReactNode;
  showBackdrop?: boolean;
  backdropLabel?: string;
  onBackdropClick?: () => void;
  workspaceLabel?: string;
  className?: string;
};

export function DashboardFrame({
  theme,
  header,
  sidebar,
  sidebarOpen,
  sidebarFloating,
  children,
  showBackdrop = sidebarFloating && sidebarOpen,
  backdropLabel = "Close sidebar",
  onBackdropClick,
  workspaceLabel = "Workspace",
  className = ""
}: DashboardFrameProps) {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    return () => {
      if (document.documentElement.dataset.theme === theme) {
        delete document.documentElement.dataset.theme;
      }
    };
  }, [theme]);

  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <div
      className={rootClassName}
      data-theme={theme}
      data-sidebar-open={sidebarOpen}
      data-sidebar-floating={sidebarFloating}
    >
      {header}
      {showBackdrop && (
        <button
          className={styles.backdrop}
          type="button"
          aria-label={backdropLabel}
          onClick={onBackdropClick}
        />
      )}
      {sidebar}
      <main className={styles.main} aria-label={workspaceLabel}>
        {children}
      </main>
    </div>
  );
}
