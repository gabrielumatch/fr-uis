/**
 * @param {{ current: number; target: number; max: number }} props
 */
export function renderElementTarget({ current, target, max }) {
  return `
    <div class="element-target">
      <span class="element-target__label">Target Element Level</span>
      <input
        type="number"
        name="element-target"
        value="${target}"
        min="${Math.min(current + 1, max)}"
        max="${max}"
        aria-label="Target Element Level"
      />
    </div>
  `;
}