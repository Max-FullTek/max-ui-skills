import { useEffect, useState } from "react";
import { Header } from "@source/react/components/Header";
import { getPageFromHash, Menu } from "@source/react/components/Menu";
import type { PageKey } from "@source/react/components/Menu";
import { ToastProvider } from "@source/react/components/ToastProvider";
import { DashboardFrame } from "@source/react/layouts/DashboardFrame";
import { ControlPanels } from "./features/ControlPanels";
import { Dashboard } from "./features/Dashboard";
import { ImageDemo } from "./features/ImageDemo";
import { VisionDebug } from "./features/VisionDebug";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarFloating, setSidebarFloating] = useState(false);
  const [activePage, setActivePage] = useState<PageKey>(() => getPageFromHash(window.location.hash));

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
      <DashboardFrame
        theme={theme}
        sidebarOpen={sidebarOpen}
        sidebarFloating={sidebarFloating}
        onBackdropClick={() => setSidebarOpen(false)}
        header={<Header
          theme={theme}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen((current) => !current)}
          onThemeChange={setTheme}
        />}
        sidebar={<Menu
          open={sidebarOpen}
          floating={sidebarFloating}
          activePage={activePage}
          onPageChange={setActivePage}
          onClose={() => setSidebarOpen(false)}
        />}
      >
        {page}
      </DashboardFrame>
    </ToastProvider>
  );
}
