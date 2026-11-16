/**
 * @param {{ chance: string; energy: string; cost?: string; chanceHighlight?: boolean }} props
 */
export function renderProbabilityBar({
  chance,
  energy,
  cost,
  chanceHighlight = false,
}) {
  const chanceHtml = chanceHighlight
    ? `<span class="probability-bar__chance">${chance}</span>`
    : chance;

  const costLine = cost
    ? `<div><strong>Cost:</strong> ${cost} per attempt</div>`
    : "";

  return `
    <div class="probability-bar">
      <div><strong>Chance:</strong> ${chanceHtml} &nbsp;|&nbsp; <strong>Energy:</strong> ${energy}</div>
      ${costLine}
    </div>
  `;
}