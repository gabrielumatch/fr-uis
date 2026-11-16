/**
 * @typedef {{ index: number; material: string; protect: string; smelting: string; result: string }} AttemptRow
 */

/**
 * @param {string} value
 * @param {string} slotLabel
 */
function renderMaterialCell(value, slotLabel) {
  const filled = Boolean(value);
  return `
    <span
      class="attempt-slot${filled ? " attempt-slot--filled" : " attempt-slot--empty"}"
      role="img"
      aria-label="${filled ? slotLabel : `${slotLabel} empty`}"
    >
      ${
        filled
          ? `<span class="attempt-slot__icon" aria-hidden="true">${value}</span>`
          : `<span class="attempt-slot__void" aria-hidden="true"></span>`
      }
    </span>
  `;
}

/**
 * @param {{ rows: AttemptRow[]; title?: string }} props
 */
export function renderAttemptTable({ rows, title }) {
  const body = rows
    .map(
      (row) => `
    <tr>
      <td>${renderMaterialCell(row.material, "Material")}</td>
      <td>${renderMaterialCell(row.protect, "Protect scroll")}</td>
      <td>${renderMaterialCell(row.smelting, "Smelting scroll")}</td>
      <td class="${row.result === "Waiting" ? "muted" : ""}">${row.result}</td>
    </tr>
  `,
    )
    .join("");

  const heading = title
    ? `<div class="attempt-table__title section-title">${title}</div>`
    : "";

  return `
    ${heading}
    <table class="attempt-table">
      <thead>
        <tr>
          <th scope="col">Material</th>
          <th scope="col">Protect</th>
          <th scope="col">Smelting</th>
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>${body}</tbody>
    </table>
  `;
}