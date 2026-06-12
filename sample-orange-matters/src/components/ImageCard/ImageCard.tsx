import type { ReactNode } from "react";
import styles from "./ImageCard.module.scss";

type ImageCardProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  meta?: string;
  badge?: string;
  actions?: ReactNode;
};

export function ImageCard({ title, imageSrc, imageAlt, meta, badge, actions }: ImageCardProps) {
  return (
    <article className={styles.root}>
      <div className={styles.preview}>
        <img src={imageSrc} alt={imageAlt} />
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
      <div className={styles.body}>
        <div className={styles.copy}>
          <h3>{title}</h3>
          {meta && <p>{meta}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </article>
  );
}
