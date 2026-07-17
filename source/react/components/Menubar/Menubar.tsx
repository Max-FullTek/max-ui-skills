import type { ElementType } from "react";
import styles from "./Menubar.module.scss";

export type MenubarItem<ItemId extends string = string> = {
  id: ItemId;
  label: string;
  icon: ElementType;
  active: boolean;
};

export type MenubarProps<ItemId extends string = string> = {
  items: readonly MenubarItem<ItemId>[];
  open: boolean;
  floating?: boolean;
  onItemSelect: (id: ItemId) => void;
  onClose?: () => void;
};

export function Menubar<ItemId extends string>({
  items,
  open,
  floating = false,
  onItemSelect,
  onClose
}: MenubarProps<ItemId>) {
  const rootClassName = [
    styles.root,
    open ? styles.open : styles.closed,
    floating ? styles.floating : ""
  ].join(" ");

  const handleItemSelect = (id: ItemId) => {
    onItemSelect(id);
    if (floating) onClose?.();
  };

  return (
    <nav
      className={rootClassName}
      id="primary-sidebar"
      aria-label="Primary navigation"
      aria-hidden={!open}
      data-floating={floating}
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <button
            className={item.active ? `${styles.item} ${styles.active}` : styles.item}
            key={item.id}
            type="button"
            tabIndex={open ? undefined : -1}
            aria-label={item.label}
            aria-current={item.active ? "page" : undefined}
            title={item.label}
            onClick={() => handleItemSelect(item.id)}
          >
            <Icon aria-hidden="true" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
