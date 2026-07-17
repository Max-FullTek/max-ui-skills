# Menubar

Use `Menubar` as generic primary navigation inside a dashboard frame, including a persistent sidebar or responsive floating drawer.

## Contract

- `MenubarItem<ItemId>` contains a typed `id`, visible `label`, icon component, and `active` state.
- `items` is application-owned. Keep routes, hashes, permissions, and product-specific icon choices outside the component.
- `open` controls visibility and keyboard availability. `floating` switches to drawer presentation.
- `onItemSelect(id)` reports the generic item ID. Selecting an item while floating also calls optional `onClose`.
- The navigation root uses `id="primary-sidebar"` so a header toggle can reference it.

## Minimal usage

```tsx
const items = [
  { id: "records", label: "Records", icon: Database, active: page === "records" },
  { id: "images", label: "Images", icon: Images, active: page === "images" }
] as const;

<Menubar
  items={items}
  open={sidebarOpen}
  floating={sidebarFloating}
  onItemSelect={setPage}
  onClose={() => setSidebarOpen(false)}
/>
```

## Accessibility

- Keep the root labeled as primary navigation and mark the active item with `aria-current="page"`.
- Set every item to `tabIndex={-1}` while closed so hidden navigation cannot receive keyboard focus.
- Pair the header toggle with `aria-controls="primary-sidebar"` and `aria-expanded={sidebarOpen}`.
- If responsive styling hides visible labels, retain an accessible name and a mouse-visible title or tooltip.

## Asset

Use the [canonical Menubar component](../../../react/components/Menubar/). The Skill builder publishes its complete TSX, CSS Module, and barrel export under `assets/react/components/Menubar/`.
