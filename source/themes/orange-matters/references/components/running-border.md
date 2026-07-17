# Running Border

Use `RunningBorder` for a restrained hover/focus runner around cards, pill buttons, or compact command surfaces. The normal CSS border remains present; SVG draws only the moving orange segment.

## Contract

- The polymorphic `as` prop defaults to `div`; native props for the selected element pass through alongside `children`, `className`, and `style`.
- `borderColor`, `activeBorderColor`, and `speed` set component CSS variables. `runnerWidth` controls SVG stroke width, `dash` controls the `pathLength={100}` dash pattern, and `disabled` suppresses the effect.
- Measure the rendered element with `getBoundingClientRect()` and computed top border/radius. Re-measure with `ResizeObserver` and update state only when dimensions meaningfully change.
- Clamp radius to half the measured width/height, inset the SVG rectangle by half the CSS border width, and subtract the border width from its dimensions.
- Use a unique `useId()`-derived gradient ID, `preserveAspectRatio="none"`, `vectorEffect="non-scaling-stroke"`, and render no runner until valid measurements exist.

## Minimal usage

```tsx
<RunningBorder
  as="button"
  type="button"
  activeBorderColor="var(--accent)"
  speed="1.15s"
  dash="24 76"
  onClick={runCommand}
>
  Run
</RunningBorder>
```

## Accessibility

- Treat the SVG as decoration with `aria-hidden="true"` and `focusable="false"`; the wrapped semantic element owns the accessible name and interaction.
- Preserve a visible static border and `:focus-visible` state when animation is disabled or unavailable.
- Honor reduced-motion preferences by stopping the dash animation without hiding the focus indication.
- When `as="button"`, pass the correct `type` and native disabled semantics when applicable.

## Orange Matters guardrails

- Use the runner sparingly for high-value interactive surfaces; do not wrap every card or row.
- Keep orange as the active stroke family and retain a quiet neutral normal border.
- Animate only the dash offset. Do not rotate the whole SVG, shift content, or replace the border with glow.
- Keep the default motion short and smooth; disable it for reduced motion and non-interactive presentation.

## Asset

Use the [canonical Orange-only RunningBorder component](../../theme-components/RunningBorder/). The Skill builder publishes its complete TSX, CSS Module, and barrel export under `assets/react/components/RunningBorder/`.
