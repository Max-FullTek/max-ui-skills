import { useState } from "react";
import { Download, Filter, Plus, RefreshCw } from "lucide-react";
import { Alert } from "@source/react/components/Alert";
import { Button } from "@source/react/components/Button";
import { Card } from "@source/react/components/Card";
import { DataTable } from "@source/react/components/DataTable";
import { Dialog } from "@source/react/components/Dialog";
import { SelectField, TextField } from "@source/react/components/Field";
import { Heading } from "@source/react/components/Heading";
import { metrics, records } from "./data";
import styles from "./Dashboard.module.scss";

export function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const columns = [
    { key: "id", header: "ID", render: (record: (typeof records)[number]) => record.id },
    { key: "name", header: "Name", render: (record: (typeof records)[number]) => <strong>{record.name}</strong> },
    { key: "owner", header: "Owner", render: (record: (typeof records)[number]) => record.owner },
    {
      key: "status",
      header: "Status",
      render: (record: (typeof records)[number]) => (
        <span className={`${styles.status} ${styles[record.status.toLowerCase()]}`}>{record.status}</span>
      )
    },
    { key: "score", header: "Score", render: (record: (typeof records)[number]) => record.score }
  ];

  return (
    <section className={styles.root} aria-label="Record dashboard">
      <Heading
        title="Records"
        level={1}
        actions={
          <>
          <Button tone="ghost" icon={<RefreshCw aria-hidden="true" />}>
            Sync
          </Button>
            <SelectField
              label="Status filter"
              className={styles.filterSelect}
              defaultValue="all"
              options={[
                { label: "All", value: "all" },
                { label: "Ready", value: "ready" },
                { label: "Review", value: "review" },
                { label: "Hold", value: "hold" }
              ]}
            />
          <Button tone="secondaryOutline" icon={<Filter aria-hidden="true" />}>
            Filter
          </Button>
            <Button tone="primary" icon={<Plus aria-hidden="true" />} onClick={() => setDialogOpen(true)}>
            New
          </Button>
          </>
        }
      />

      <Alert tone="warning">17 records need review</Alert>

      <div className={styles.metricRow}>
        {metrics.map((metric) => (
          <Card as="article" compact className={styles.metricCard} key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </Card>
        ))}
      </div>

      <div className={styles.grid}>
        <DataTable columns={columns} rows={records} getKey={(record) => record.id} />

        <Card as="aside" className={styles.inspectorPanel} aria-label="Record details">
          <div className={styles.inspectorHeader}>
            <h2>Policy Index</h2>
          </div>
          <dl>
            <div>
              <dt>Owner</dt>
              <dd>Mina</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Ready</dd>
            </div>
            <div>
              <dt>Score</dt>
              <dd>98</dd>
            </div>
          </dl>
          <Button tone="secondary" icon={<Download aria-hidden="true" />}>
            Export
          </Button>
        </Card>
      </div>

      <Dialog open={dialogOpen} size="compact" title="New record" onClose={() => setDialogOpen(false)}>
        <div className={styles.dialogForm}>
          <TextField aria-label="Name" placeholder="Name" />
          <SelectField
            label="Status"
            defaultValue="ready"
            options={[
              { label: "Ready", value: "ready" },
              { label: "Review", value: "review" },
              { label: "Hold", value: "hold" }
            ]}
          />
          <div className={styles.dialogActions}>
            <Button tone="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button tone="primary" onClick={() => setDialogOpen(false)}>
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </section>
  );
}
