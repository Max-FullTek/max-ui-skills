# Data Table

Use `DataTable<T>` for dense record collections whose columns and row rendering are supplied by the consuming application.

## Contract

- `columns` is an array of `{ key, header, render(row) }`; `key` must be stable and unique within the column set.
- `rows` contains application-owned records. `getKey(row)` returns a stable string key for each record.
- The component owns the table viewport, header/body layout, and row presentation; it does not own sorting, filtering, pagination, routing, or data fetching.
- Column renderers return `ReactNode`, allowing text, compact status, or actions while preserving the generic `T` contract.
- Current rows are interactive buttons. If a consumer needs non-interactive rows or richer grid semantics, evolve that public contract explicitly rather than nesting controls inside a button.

## Minimal usage

```tsx
<DataTable
  columns={[
    { key: "name", header: "Name", render: (row) => row.name },
    { key: "status", header: "Status", render: (row) => <Status tone={row.tone}>{row.status}</Status> }
  ]}
  rows={records}
  getKey={(row) => row.id}
/>
```

## Accessibility

- Give the table region a concise accessible label that matches its content.
- Keep headers visible and text contrast sufficient in both themes.
- Ensure interactive rows have an understandable action and visible keyboard focus; do not place nested buttons or links inside a button row.
- Preserve an internal horizontal scroll viewport when columns cannot collapse cleanly on small screens.

## Asset

Use the [canonical DataTable component](../../../react/components/DataTable/). The Skill builder publishes its complete TSX, CSS Module, and barrel export under `assets/react/components/DataTable/`.
