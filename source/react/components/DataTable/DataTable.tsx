import type { ReactNode } from "react";
import styles from "./DataTable.module.scss";

type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  getKey: (row: T) => string;
};

export function DataTable<T>({ columns, rows, getKey }: DataTableProps<T>) {
  return (
    <section className={styles.root} aria-label="Records table">
      <div className={styles.viewport}>
        <div className={styles.table}>
          <div className={styles.head}>
            {columns.map((column) => (
              <span key={column.key}>{column.header}</span>
            ))}
          </div>
          <div className={styles.body}>
            {rows.map((row) => (
              <button className={styles.row} key={getKey(row)}>
                {columns.map((column) => (
                  <span key={column.key}>{column.render(row)}</span>
                ))}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
