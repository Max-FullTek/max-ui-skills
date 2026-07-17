import {
  createElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from "react";
import styles from "./RunningBorder.module.scss";

type RunningBorderMetrics = {
  width: number;
  height: number;
  borderWidth: number;
  radius: number;
};

type RunningBorderOwnProps<T extends ElementType> = {
  children: ReactNode;
  className?: string;
  as?: T;
  borderColor?: string;
  activeBorderColor?: string;
  speed?: string;
  runnerWidth?: number;
  dash?: string;
  disabled?: boolean;
};

export type RunningBorderProps<T extends ElementType = "div"> = RunningBorderOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RunningBorderOwnProps<T>>;

const DEFAULT_METRICS: RunningBorderMetrics = {
  width: 0,
  height: 0,
  borderWidth: 1,
  radius: 0
};

const useClientLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function toCssVars({
  borderColor,
  activeBorderColor,
  speed
}: Pick<RunningBorderOwnProps<ElementType>, "activeBorderColor" | "borderColor" | "speed">) {
  return {
    "--rb-border-color": borderColor ?? "#000",
    "--rb-active-border-color": activeBorderColor ?? "#c8a27a",
    "--rb-speed": speed ?? "1.15s"
  } as CSSProperties;
}

function hasMetricsChanged(current: RunningBorderMetrics, next: RunningBorderMetrics) {
  return (
    Math.abs(current.width - next.width) > 0.5 ||
    Math.abs(current.height - next.height) > 0.5 ||
    Math.abs(current.borderWidth - next.borderWidth) > 0.1 ||
    Math.abs(current.radius - next.radius) > 0.5
  );
}

export function RunningBorder<T extends ElementType = "div">({
  as,
  children,
  className = "",
  borderColor,
  activeBorderColor,
  speed,
  runnerWidth = 2.4,
  dash = "24 76",
  disabled = false,
  style,
  ...props
}: RunningBorderProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const rootRef = useRef<HTMLElement | null>(null);
  const gradientId = `rb-gradient-${useId().replace(/:/g, "")}`;
  const [metrics, setMetrics] = useState<RunningBorderMetrics>(DEFAULT_METRICS);

  useClientLayoutEffect(() => {
    const element = rootRef.current;
    if (!element) {
      return undefined;
    }

    const measure = () => {
      const rect = element.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(element);
      const width = rect.width;
      const height = rect.height;
      const borderWidth = parseFloat(computedStyle.borderTopWidth) || 1;
      const rawRadius = parseFloat(computedStyle.borderTopLeftRadius) || 0;
      const radius = Math.min(rawRadius, width / 2, height / 2);
      const next = { width, height, borderWidth, radius };

      setMetrics((current) => (hasMetricsChanged(current, next) ? next : current));
    };

    measure();
    if (typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const borderWidth = metrics.borderWidth;
  const x = borderWidth / 2;
  const y = borderWidth / 2;
  const rectWidth = Math.max(0, metrics.width - borderWidth);
  const rectHeight = Math.max(0, metrics.height - borderWidth);
  const rectRadius = Math.max(0, metrics.radius - borderWidth / 2);
  const canRenderRunner = metrics.width > borderWidth && metrics.height > borderWidth;

  const setRootElement = (node: HTMLElement | null) => {
    rootRef.current = node;
  };

  return createElement(
    Component,
    {
      ...props,
      ref: setRootElement,
      className: `${styles.root} ${className}`,
      "data-rb-disabled": disabled ? "true" : "false",
      style: { ...toCssVars({ borderColor, activeBorderColor, speed }), ...(style as CSSProperties) }
    },
    children,
    canRenderRunner ? (
        <svg
          className={styles.svg}
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="none"
          viewBox={`0 0 ${metrics.width} ${metrics.height}`}
          style={{
            top: `${-borderWidth}px`,
            left: `${-borderWidth}px`,
            width: `${metrics.width}px`,
            height: `${metrics.height}px`
          }}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0"
              y1="0"
              x2={metrics.width}
              y2={metrics.height}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--accent-strong, #ff5a00)" />
              <stop offset="22%" stopColor="var(--accent, #ff7a00)" />
              <stop offset="48%" stopColor="#ffb347" />
              <stop offset="72%" stopColor="#ff8a00" />
              <stop offset="100%" stopColor="var(--accent-strong, #ff5a00)" />
            </linearGradient>
          </defs>
          <rect
            className={styles.runner}
            x={x}
            y={y}
            width={rectWidth}
            height={rectHeight}
            rx={rectRadius}
            ry={rectRadius}
            pathLength={100}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={runnerWidth}
            strokeDasharray={dash}
            strokeDashoffset={100}
            strokeLinecap="butt"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null
  );
}
