# Running Border

Use for a hover-only border runner on cards, pill buttons, and compact command surfaces. The normal border remains a CSS border; SVG only draws the moving orange stroke segment.

## React

```tsx
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
```

## SCSS Module

```scss
.root {
  position: relative;
  box-sizing: border-box;
  display: block;
  overflow: visible;
  border: 1px solid var(--rb-border-color, #000);
  border-radius: var(--radius-sm);
  transition:
    border-color 140ms var(--ease),
    box-shadow 140ms var(--ease),
    transform 140ms var(--ease);
}

.root:not([data-rb-disabled="true"]):hover,
.root:not([data-rb-disabled="true"]):focus-visible {
  border-color: var(--rb-active-border-color, #c8a27a);
}

.root:focus-visible {
  outline: 0;
  box-shadow: 0 0 0 4px var(--accent-soft);
}

.svg {
  position: absolute;
  z-index: 3;
  display: block;
  overflow: visible;
  pointer-events: none;
  opacity: 0;
  transition: opacity 140ms var(--ease);
}

.runner {
  stroke-dashoffset: 100;
}

.root:not([data-rb-disabled="true"]):hover .svg,
.root:not([data-rb-disabled="true"]):focus-visible .svg {
  opacity: 1;
}

.root:not([data-rb-disabled="true"]):hover .runner,
.root:not([data-rb-disabled="true"]):focus-visible .runner {
  animation: rb-run var(--rb-speed, 1.15s) linear infinite;
}

.root[data-rb-disabled="true"] {
  opacity: 0.62;
}

@keyframes rb-run {
  to {
    stroke-dashoffset: 0;
  }
}
```

## Examples

```tsx
<RunningBorder className="w-[280px] h-[150px] rounded-[14px]">
  Card hover
</RunningBorder>

<RunningBorder as="button" className="w-[220px] h-[52px] rounded-full" dash="18 82">
  Button hover
</RunningBorder>

<RunningBorder className="w-[420px] h-[88px] rounded-[10px]" speed=".95s" dash="30 70">
  Wide component hover
</RunningBorder>
```

## Rules

- Keep the base frame as `border: 1px solid var(--rb-border-color, #000)` and change only border color on hover/focus. Do not make the border transparent.
- Use SVG only for the active runner segment. Do not draw a full SVG base border.
- Measure the real DOM box with `ResizeObserver`, `getBoundingClientRect()`, and `getComputedStyle()`.
- Use `viewBox={`0 0 ${width} ${height}`}`. Never stretch a fixed `0 0 100 100` box.
- Clamp radius with `Math.min(rawRadius, width / 2, height / 2)` so cards and pill buttons both align.
- Offset the SVG by the computed border width and place the rect at `borderWidth / 2` so the runner sits on the real border path.
- Animate `stroke-dashoffset`; do not use rotating wrappers or `conic-gradient`.
- Generate a unique gradient id with `useId()` for each instance.
- Keep DOM measurement inside a client-only layout effect and disconnect the observer on unmount.
