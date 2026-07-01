import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { getPageFromHash, Menu } from "./components/Menu";
import type { PageKey } from "./components/Menu";
import { ToastProvider } from "./components/ToastProvider";
import { ControlPanels } from "./features/ControlPanels";
import { Dashboard } from "./features/Dashboard";
import { ImageDemo } from "./features/ImageDemo";
import { VisionDebug } from "./features/VisionDebug";
import styles from "./App.module.scss";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarFloating, setSidebarFloating] = useState(false);
  const [activePage, setActivePage] = useState<PageKey>(() => getPageFromHash(window.location.hash));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 980px)");
    const syncSidebarMode = () => {
      setSidebarFloating(media.matches);
      setSidebarOpen(!media.matches);
    };

    syncSidebarMode();
    media.addEventListener("change", syncSidebarMode);

    return () => media.removeEventListener("change", syncSidebarMode);
  }, []);

  useEffect(() => {
    const syncPageFromHash = () => setActivePage(getPageFromHash(window.location.hash));

    window.addEventListener("hashchange", syncPageFromHash);

    return () => window.removeEventListener("hashchange", syncPageFromHash);
  }, []);

  const page = {
    records: <Dashboard />,
    images: <ImageDemo />,
    vision: <VisionDebug />,
    controls: <ControlPanels />
  }[activePage];

  return (
    <ToastProvider>
      <div
        className={styles.root}
        data-theme={theme}
        data-sidebar-open={sidebarOpen}
        data-sidebar-floating={sidebarFloating}
      >
        <Header
          theme={theme}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen((current) => !current)}
          onThemeChange={setTheme}
        />
        {sidebarFloating && sidebarOpen && (
          <button className={styles.backdrop} aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} />
        )}
        <Menu
          open={sidebarOpen}
          floating={sidebarFloating}
          activePage={activePage}
          onPageChange={setActivePage}
          onClose={() => setSidebarOpen(false)}
        />
        <main className={styles.main} aria-label="Workspace">
          {page}
        </main>
      </div>
    </ToastProvider>
  );
}
