/**
 * @param {{ lines: import('../../data/awake-management.js').awakeManagementState.lines extends infer L ? L : never; showColored: boolean }} props
 */
export function renderAwakeResults({ lines, showColored }) {
  const rows = lines
    .map((line) => {
      const toneClass =
        showColored && line.tone === "red"
          ? " awake-line--red"
          : showColored && line.tone === "blue"
            ? " awake-line--blue"
            : "";
      return `<div class="awake-line${toneClass}"><strong>${line.label}</strong> ${line.value}</div>`;
    })
    .join("");

  return `
    <section class="awake-results" aria-labelledby="awake-results-title">
      <h3 class="section-title" id="awake-results-title">Current / Generated Awake</h3>
      <div class="awake-results__panel">${rows}</div>
    </section>
  `;
}