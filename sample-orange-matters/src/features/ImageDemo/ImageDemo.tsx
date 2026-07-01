import { Download, Maximize2 } from "lucide-react";
import { Button } from "../../components/Button";
import { ImageCard } from "../../components/ImageCard";
import { Heading } from "../../components/Heading";
import styles from "./ImageDemo.module.scss";

const svgDataUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const images = [
  {
    title: "Edge Clean",
    meta: "1280x800 · denoise pass",
    badge: "After",
    imageSrc: svgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800">
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop stop-color="#241b16"/>
            <stop offset="1" stop-color="#f08a24"/>
          </linearGradient>
          <filter id="soft"><feGaussianBlur stdDeviation="18"/></filter>
        </defs>
        <rect width="1280" height="800" fill="url(#bg)"/>
        <circle cx="372" cy="384" r="210" fill="#fff4e6" opacity=".9"/>
        <circle cx="810" cy="356" r="150" fill="#ff4f0f" opacity=".72" filter="url(#soft)"/>
        <path d="M274 480c148-184 316-202 504-54 86 68 166 74 238 18" fill="none" stroke="#46cbbd" stroke-width="18" stroke-linecap="round"/>
        <rect x="122" y="96" width="1036" height="608" rx="54" fill="none" stroke="rgba(255,255,255,.42)" stroke-width="3"/>
      </svg>
    `)
  },
  {
    title: "Mask Preview",
    meta: "640x400 · segmentation",
    badge: "Mask",
    imageSrc: svgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800">
        <rect width="1280" height="800" fill="#181818"/>
        <path d="M132 620C226 286 470 170 714 240c250 72 324 252 422 386z" fill="#0f9f8f" opacity=".76"/>
        <path d="M246 602c104-234 258-318 462-280 184 34 284 134 350 280z" fill="#ff7a00" opacity=".68"/>
        <g fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="2">
          <path d="M0 160h1280M0 320h1280M0 480h1280M0 640h1280"/>
          <path d="M160 0v800M320 0v800M480 0v800M640 0v800M800 0v800M960 0v800M1120 0v800"/>
        </g>
      </svg>
    `)
  },
  {
    title: "Before Frame",
    meta: "raw capture · frame 0842",
    badge: "Before",
    imageSrc: svgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800">
        <defs>
          <linearGradient id="raw" x1="0" x2="1">
            <stop stop-color="#54483c"/>
            <stop offset="1" stop-color="#9c7a58"/>
          </linearGradient>
        </defs>
        <rect width="1280" height="800" fill="url(#raw)"/>
        <g opacity=".34">
          <circle cx="362" cy="360" r="182" fill="#fff"/>
          <circle cx="814" cy="370" r="142" fill="#fff"/>
          <path d="M280 510c178-96 372-104 646-18" fill="none" stroke="#fff" stroke-width="38" stroke-linecap="round"/>
        </g>
        <rect x="140" y="108" width="1000" height="584" rx="42" fill="rgba(0,0,0,.12)"/>
      </svg>
    `)
  }
];

export function ImageDemo() {
  return (
    <section className={styles.root} aria-label="Image result demos">
      <Heading
        title="Image Results"
        level={1}
        actions={
          <>
            <Button tone="ghost" icon={<Maximize2 aria-hidden="true" />}>Compare</Button>
            <Button tone="primary" icon={<Download aria-hidden="true" />}>Export</Button>
          </>
        }
      />
      <div className={styles.grid}>
        {images.map((image) => (
          <ImageCard
            key={image.title}
            title={image.title}
            meta={image.meta}
            badge={image.badge}
            imageSrc={image.imageSrc}
            imageAlt={`${image.title} visual output`}
            infoLayout={image.title === "Mask Preview" ? "overlay" : undefined}
            actions={<Button tone="iconOnly" aria-label={`Open ${image.title}`} icon={<Maximize2 aria-hidden="true" />} />}
          />
        ))}
      </div>
    </section>
  );
}
