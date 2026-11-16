/**
 * @typedef {{ index: number; material: string; protect: string; smelting: string; result: string }} AttemptRow
 */

/**
 * @param {{ rows: AttemptRow[]; title?: string }} props
 */
/**
 * @param {string} value
 */
function renderMaterialCell(value) {
  if (!value) {
    return `<span class="cell-empty muted">—</span>`;
  }
  return `<span class="cell-icon" aria-hidden="true">${value}</span>`;
}

export function renderAttemptTable({ rows, title }) {
  const body = rows
    .map(
      (row) => `
    <tr>
      <td>${row.index}</td>
      <td>${renderMaterialCell(row.material)}</td>
      <td>${renderMaterialCell(row.protect)}</td>
      <td>${renderMaterialCell(row.smelting)}</td>
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
          <th scope="col">#</th>
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