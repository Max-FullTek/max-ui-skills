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

## Green Ink guardrails

- Use an opaque panel and low-radius rows; remove blur and translucent glass.
- The active row may combine the indexed `dry-brush.webp` with a narrow deep-green inset. Its label and icon stay normal accessible content, and the inset/solid fill remain the missing-art fallback.
- On narrow viewports, reopen the closed menu as a left drawer with a solid surface and backdrop rather than squeezing the workspace.
- Rows change solid fill, border, and text state without lift or press transforms.
- Keep vermilion to a sparse secondary mark or semantic state; primary navigation emphasis remains deep green.

## Asset

Use the [canonical Menubar component](../../assets/react/components/Menubar/). The Skill builder publishes its complete TSX, CSS Module, and barrel export under `assets/react/components/Menubar/`.
