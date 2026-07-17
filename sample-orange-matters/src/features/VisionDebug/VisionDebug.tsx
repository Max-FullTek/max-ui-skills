import { Pause, ScanLine, SlidersHorizontal } from "lucide-react";
import { Button } from "@source/react/components/Button";
import { SelectField } from "@source/react/components/Field";
import { Heading } from "@source/react/components/Heading";
import { VisionStage } from "@source/react/components/VisionStage";
import styles from "./VisionDebug.module.scss";

function DemoFrame() {
  return (
    <svg viewBox="0 0 1280 720" role="img" aria-label="Simulated inspection stream">
      <defs>
        <linearGradient id="frameBg" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#201a16" />
          <stop offset="1" stopColor="#7a4c2a" />
        </linearGradient>
        <radialGradient id="warmSpot" cx="52%" cy="44%" r="45%">
          <stop stopColor="#ffd7aa" stopOpacity=".84" />
          <stop offset="1" stopColor="#ff7a00" stopOpacity=".08" />
        </radialGradient>
      </defs>
      <rect width="1280" height="720" fill="url(#frameBg)" />
      <rect x="92" y="76" width="1096" height="568" rx="42" fill="rgba(255,255,255,.06)" />
      <circle cx="450" cy="358" r="118" fill="url(#warmSpot)" />
      <rect x="674" y="230" width="248" height="232" rx="48" fill="#0f9f8f" opacity=".42" />
      <path d="M218 536c178-118 426-144 844-42" fill="none" stroke="#fff4e6" strokeOpacity=".34" strokeWidth="22" strokeLinecap="round" />
      <g stroke="rgba(255,255,255,.14)" strokeWidth="1">
        <path d="M0 120h1280M0 240h1280M0 360h1280M0 480h1280M0 600h1280" />
        <path d="M160 0v720M320 0v720M480 0v720M640 0v720M800 0v720M960 0v720M1120 0v720" />
      </g>
    </svg>
  );
}

function RoiOverlay() {
  return (
    <svg viewBox="0 0 1280 720" role="img" aria-label="ROI overlay">
      <rect className={styles.roiPrimary} x="328" y="218" width="260" height="256" rx="18" />
      <rect className={styles.roiSecondary} x="640" y="196" width="332" height="310" rx="18" />
      <path className={styles.scanLine} d="M140 520c228-106 492-132 1000-40" />
      <text className={styles.label} x="344" y="202">ROI A · 0.94</text>
      <text className={styles.label} x="656" y="180">ROI B · 0.87</text>
      <circle className={styles.anchor} cx="328" cy="218" r="7" />
      <circle className={styles.anchor} cx="972" cy="506" r="7" />
    </svg>
  );
}

export function VisionDebug() {
  return (
    <section className={styles.root} aria-label="Vision debug surface">
      <Heading
        title="Vision Debug"
        level={1}
        actions={
          <>
            <SelectField
              label="Overlay mode"
              defaultValue="roi"
              options={[
                { label: "ROI", value: "roi" },
                { label: "Mask", value: "mask" },
                { label: "Boxes", value: "boxes" }
              ]}
            />
            <Button tone="secondaryOutline" icon={<SlidersHorizontal aria-hidden="true" />}>Tune</Button>
          </>
        }
      />
      <VisionStage
        label="Live stream analysis"
        media={<DemoFrame />}
        overlay={<RoiOverlay />}
        hud={
          <>
            <span>FPS 29.8</span>
            <span>17ms</span>
            <span>1280x720</span>
          </>
        }
        toolbar={
          <>
            <Button tone="ghost" icon={<Pause aria-hidden="true" />}>Pause</Button>
            <Button tone="primary" icon={<ScanLine aria-hidden="true" />}>Capture</Button>
          </>
        }
      />
    </section>
  );
}
