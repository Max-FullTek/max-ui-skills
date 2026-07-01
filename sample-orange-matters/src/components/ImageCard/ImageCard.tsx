import { X } from "lucide-react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import styles from "./ImageCard.module.scss";

type ImageCardProps = {
  title: string;
  imageSrc?: string | null;
  imageAlt?: string;
  meta?: string;
  badge?: string;
  actions?: ReactNode;
  uploadEnabled?: boolean;
  uploadHint?: string;
  removeLabel?: string;
  onUploadClick?: () => void;
  onRemoveImage?: () => void;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  minHeight?: CSSProperties["minHeight"];
  aspectRatio?: CSSProperties["aspectRatio"];
  fill?: boolean;
  imageFit?: CSSProperties["objectFit"];
  infoLayout?: "below" | "overlay";
};

export function ImageCard({
  title,
  imageSrc,
  imageAlt = "",
  meta,
  badge,
  actions,
  uploadEnabled = false,
  uploadHint = "Select image",
  removeLabel = "Remove image",
  onUploadClick,
  onRemoveImage,
  width,
  height,
  minHeight,
  aspectRatio,
  fill = false,
  imageFit = "contain",
  infoLayout = "below"
}: ImageCardProps) {
  const hasImage = Boolean(imageSrc);
  const canUpload = uploadEnabled && !hasImage && Boolean(onUploadClick);
  const canRemove = uploadEnabled && hasImage && Boolean(onRemoveImage);
  const cardStyle = { width, height, minHeight, aspectRatio } as CSSProperties;

  const handleUploadKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!canUpload || !onUploadClick) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onUploadClick();
    }
  };

  return (
    <article
      className={`${styles.root} ${styles[infoLayout]} ${fill ? styles.fill : ""} ${canUpload ? styles.uploadable : ""}`}
      style={cardStyle}
    >
      <div
        className={styles.preview}
        role={canUpload ? "button" : undefined}
        tabIndex={canUpload ? 0 : undefined}
        onClick={canUpload ? onUploadClick : undefined}
        onKeyDown={handleUploadKeyDown}
      >
        {imageSrc ? <img src={imageSrc} alt={imageAlt} style={{ objectFit: imageFit }} /> : null}
        {canUpload ? <span className={styles.emptyAction}>{uploadHint}</span> : null}
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
      <div className={styles.body}>
        <div className={styles.copy}>
          <h3>{title}</h3>
          {meta && <p>{meta}</p>}
        </div>
        {(actions || canRemove) && (
          <div className={styles.actions}>
            {actions}
            {canRemove && (
              <button type="button" className={styles.iconButton} aria-label={removeLabel} onClick={onRemoveImage}>
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
