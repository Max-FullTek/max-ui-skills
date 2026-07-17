import { Database, Images, ScanLine, SlidersHorizontal } from "lucide-react";
import styles from "./Menu.module.scss";

export type PageKey = "records" | "images" | "vision" | "controls";

const items = [
  { id: "records", label: "Records", icon: Database },
  { id: "images", label: "Images", icon: Images },
  { id: "vision", label: "Vision", icon: ScanLine },
  { id: "controls", label: "Controls", icon: SlidersHorizontal }
] satisfies Array<{ id: PageKey; label: string; icon: typeof Database }>;

export function getPageFromHash(hash: string): PageKey {
  const value = hash.replace(/^#\/?/, "");
  return items.some((item) => item.id === value) ? (value as PageKey) : "records";
}

type MenuProps = {
  open: boolean;
  floating: boolean;
  activePage: PageKey;
  onPageChange: (page: PageKey) => void;
  onClose: () => void;
};

export function Menu({ open, floating, activePage, onPageChange, onClose }: MenuProps) {
  const menuClassName = [
    styles.root,
    open ? styles.open : styles.closed,
    floating ? styles.floating : ""
  ].join(" ");

  const handlePageChange = (page: PageKey) => {
    onPageChange(page);
    window.history.replaceState(null, "", `#${page}`);
    if (floating) onClose();
  };

  return (
    <nav
      className={menuClassName}
      id="primary-sidebar"
      aria-label="Primary navigation"
      aria-hidden={!open}
      data-floating={floating}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.id === activePage;

        return (
          <button
            className={active ? `${styles.item} ${styles.active}` : styles.item}
            key={item.id}
            aria-label={item.label}
            aria-current={active ? "page" : undefined}
            title={item.label}
            onClick={() => handlePageChange(item.id)}
          >
            <Icon aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
