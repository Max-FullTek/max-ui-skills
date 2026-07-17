import { useEffect, useState } from "react";
import { Header } from "@source/react/components/Header";
import { Menubar } from "@source/react/components/Menubar";
import { ToastProvider } from "@source/react/components/ToastProvider";
import { DashboardFrame } from "@source/react/layouts/DashboardFrame";
import { ControlPanels } from "./features/ControlPanels";
import { Dashboard } from "./features/Dashboard";
import { ImageDemo } from "./features/ImageDemo";
import { VisionDebug } from "./features/VisionDebug";
import { getNavigationItems, getPageFromHash } from "./navigation";
import type { PageKey } from "./navigation";

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

  const handlePageChange = (pageKey: PageKey) => {
    setActivePage(pageKey);
    window.history.replaceState(null, "", `#${pageKey}`);
  };

  return (
    <ToastProvider>
      <DashboardFrame
        theme={theme}
        sidebarOpen={sidebarOpen}
        sidebarFloating={sidebarFloating}
        onBackdropClick={() => setSidebarOpen(false)}
        header={<Header
          brandInitials="OM"
          brandName="Archive Desk"
          contextLabel="Data browser"
          theme={theme}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen((current) => !current)}
          onThemeChange={setTheme}
        />}
        sidebar={<Menubar
          items={getNavigationItems(activePage)}
          open={sidebarOpen}
          floating={sidebarFloating}
          onItemSelect={handlePageChange}
          onClose={() => setSidebarOpen(false)}
        />}
      >
        {page}
      </DashboardFrame>
    </ToastProvider>
  );
}
