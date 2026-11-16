import { renderStatList } from "./stat-list.js";

/**
 * @param {{ label: string; value: string; tone?: 'red' | 'blue' }[]} stats
 */
export function renderAwakeAttributes(stats) {
  return `
    <section class="awake-block">
      <h2 class="section-title">Awake Attributes</h2>
      ${renderStatList(stats, {
        valueClass: (row) =>
          row.tone === "red"
            ? "stat--red"
            : row.tone === "blue"
              ? "stat--blue"
              : "",
      })}
    </section>
  `;
}