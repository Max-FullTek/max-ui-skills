import type { ReactNode } from "react";
import styles from "./VisionStage.module.scss";

type VisionStageProps = {
  label: string;
  media: ReactNode;
  overlay?: ReactNode;
  hud?: ReactNode;
  toolbar?: ReactNode;
};

export function VisionStage({ label, media, overlay, hud, toolbar }: VisionStageProps) {
  return (
    <section className={styles.root} aria-label={label}>
      <div className={styles.stage}>
        <div className={styles.media}>{media}</div>
        {overlay && <div className={styles.overlay}>{overlay}</div>}
        {hud && <div className={styles.hud}>{hud}</div>}
      </div>
      {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
    </section>
  );
}
