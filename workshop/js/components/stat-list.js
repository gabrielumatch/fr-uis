/**
 * @param {{ label: string; value: string; tone?: string }[]} rows
 * @param {{ valueClass?: (row: { tone?: string }) => string }} [options]
 */
export function renderStatList(rows, options = {}) {
  const valueClass = options.valueClass ?? (() => "");

  const html = rows
    .map((row) => {
      const cls = valueClass(row);
      return `
        <div class="stat-list__row">
          <span>${row.label}</span>
          <b class="${cls}">${row.value}</b>
        </div>
      `;
    })
    .join("");

  return `<div class="stat-list">${html}</div>`;
}