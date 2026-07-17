import { Database, Images, ScanLine, SlidersHorizontal } from "lucide-react";
import type { MenubarItem } from "@source/react/components/Menubar";

export type PageKey = "records" | "images" | "vision" | "controls";

const navigationItems = [
  { id: "records", label: "Records", icon: Database },
  { id: "images", label: "Images", icon: Images },
  { id: "vision", label: "Vision", icon: ScanLine },
  { id: "controls", label: "Controls", icon: SlidersHorizontal }
] satisfies Array<Omit<MenubarItem<PageKey>, "active">>;

export function getPageFromHash(hash: string): PageKey {
  const value = hash.replace(/^#\/?/, "");
  return navigationItems.some((item) => item.id === value) ? (value as PageKey) : "records";
}

export function getNavigationItems(activePage: PageKey): MenubarItem<PageKey>[] {
  return navigationItems.map((item) => ({ ...item, active: item.id === activePage }));
}
