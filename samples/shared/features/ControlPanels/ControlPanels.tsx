import { AlertTriangle, CheckCircle2, Info, Play, RotateCcw, Save, XCircle, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { Alert } from "@source/react/components/Alert";
import { Button } from "@source/react/components/Button";
import { ControlCard } from "@source/react/components/ControlCard";
import { SelectField, TextField } from "@source/react/components/Field";
import { Heading } from "@source/react/components/Heading";
import { useToast } from "@source/react/components/ToastProvider";
import styles from "./ControlPanels.module.scss";

type ControlPanelsProps = {
  exclusiveShowcase?: ReactNode;
};

export function ControlPanels({ exclusiveShowcase }: ControlPanelsProps) {
  const { pushToast } = useToast();

  return (
    <section className={styles.root} aria-label="Control card samples">
      <Heading
        title="Controls"
        level={1}
        actions={
          <>
            <Button tone="ghost" icon={<RotateCcw aria-hidden="true" />}>Reset</Button>
            <Button tone="primary" icon={<Save aria-hidden="true" />}>Save</Button>
          </>
        }
      />
      <div className={styles.grid}>
        <ControlCard
          title="Inference"
          description="Runtime settings for the active image pipeline."
          controls={
            <>
              <SelectField
                label="Profile"
                defaultValue="balanced"
                options={[
                  { label: "Balanced", value: "balanced" },
                  { label: "Fast", value: "fast" },
                  { label: "Precise", value: "precise" }
                ]}
              />
              <Button tone="secondary" icon={<Play aria-hidden="true" />}>Run</Button>
            </>
          }
        >
          <div className={styles.fields}>
            <label>
              Threshold
              <input type="range" min="0" max="100" defaultValue="72" />
            </label>
            <label>
              Confidence
              <input type="range" min="0" max="100" defaultValue="88" />
            </label>
          </div>
        </ControlCard>

        <ControlCard
          title="Source"
          description="Select an input and keep capture metadata compact."
          controls={
            <SelectField
              label="Input source"
              defaultValue="camera"
              options={[
                { label: "Camera", value: "camera" },
                { label: "Upload", value: "upload" },
                { label: "Stream", value: "stream" }
              ]}
            />
          }
          footer={<Button tone="primaryOutline" icon={<Zap aria-hidden="true" />}>Calibrate</Button>}
        >
          <div className={styles.inlineForm}>
            <TextField aria-label="Session name" placeholder="Session name" />
            <TextField aria-label="Frame tag" placeholder="Frame tag" />
          </div>
        </ControlCard>

        <ControlCard
          title="Status"
          description="A short operational panel for warnings and output state."
          controls={<Button tone="danger">Stop</Button>}
        >
          <div className={styles.stack}>
            <Alert tone="success">Pipeline ready</Alert>
            <Alert tone="warning">2 ROIs need review</Alert>
          </div>
        </ControlCard>

        <ControlCard
          title="Toasts"
          description="Transient feedback for saves, warnings, and background work."
        >
          <div className={styles.toastActions}>
            <Button tone="secondaryOutline" icon={<Info aria-hidden="true" />} onClick={() => pushToast("Background sync finished.", "info")}>
              Info
            </Button>
            <Button tone="secondary" icon={<CheckCircle2 aria-hidden="true" />} onClick={() => pushToast("Settings saved.", "success")}>
              Success
            </Button>
            <Button tone="primaryOutline" icon={<AlertTriangle aria-hidden="true" />} onClick={() => pushToast("Review thresholds before running.", "warning")}>
              Warning
            </Button>
            <Button tone="danger" icon={<XCircle aria-hidden="true" />} onClick={() => pushToast("Connection failed.", "danger")}>
              Danger
            </Button>
          </div>
        </ControlCard>

        {exclusiveShowcase}
      </div>
    </section>
  );
}
