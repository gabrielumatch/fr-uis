/**
 * @param {string} summary
 */
export function renderJewelBonusBar(summary) {
  return `
    <div class="jewel-bonus">
      <span class="jewel-bonus__title section-title">Total Jewel Bonus</span>
      <p class="jewel-bonus__value">${summary}</p>
    </div>
  `;
}