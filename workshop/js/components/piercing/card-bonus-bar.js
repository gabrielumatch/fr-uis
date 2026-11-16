/**
 * @param {string} summary — efeitos somados das letter cards (ex.: STR +16 · Crit Dmg +4%)
 */
export function renderCardBonusBar(summary) {
  return `
    <div class="pierce-bonus" role="status">
      Total Card Bonus:
      <span class="pierce-bonus__value">${summary}</span>
    </div>
  `;
}