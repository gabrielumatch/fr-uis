import { buildElementCycleWheelMarkup } from "./element-cycle-wheel-markup";

export type ElementCycleWheelProps = Parameters<
  typeof buildElementCycleWheelMarkup
>[0];

/** SVG / foreignObject wheel — markup preserved from legacy render (same CSS). */
export function ElementCycleWheel(props: ElementCycleWheelProps) {
  return (
    <div
      className="element-cycle-wheel-host"
      dangerouslySetInnerHTML={{
        __html: buildElementCycleWheelMarkup(props),
      }}
    />
  );
}