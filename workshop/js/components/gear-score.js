/**
 * @param {{ score: number }} props
 */
export function renderGearScore({ score }) {
  return `
    <div class="gear-score">
      <span class="gear-score__label">⚔ GEAR SCORE</span>
      <strong class="gear-score__value">${score}</strong>
    </div>
  `;
}