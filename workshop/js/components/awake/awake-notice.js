/**
 * @param {{ penyaCost: number }} props
 */
export function renderAwakeNotice({ penyaCost }) {
  const formatted = penyaCost.toLocaleString("en-US");

  return `
    <p class="awake-notice">
      Start reverts the awakening and awakens again.
      Awakening an item costs
      <strong class="awake-notice__cost">${formatted} Penya</strong>.
    </p>
  `;
}