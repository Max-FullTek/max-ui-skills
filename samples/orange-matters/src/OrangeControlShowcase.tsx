import { ControlCard } from "@source/react/components/ControlCard";
import { RunningBorder } from "@source/themes/orange-matters/theme-components/RunningBorder";
import styles from "./OrangeControlShowcase.module.scss";

export function OrangeControlShowcase() {
  return (
    <ControlCard
      title="Running borders"
      description="Hover each surface to preview the border runner."
    >
      <div className={styles.grid}>
        <RunningBorder className={styles.card}>Card hover</RunningBorder>
        <RunningBorder as="button" type="button" className={styles.pill} dash="18 82">
          Button hover
        </RunningBorder>
        <RunningBorder className={styles.wide} speed=".95s" dash="30 70">
          Wide component hover
        </RunningBorder>
      </div>
    </ControlCard>
  );
}
