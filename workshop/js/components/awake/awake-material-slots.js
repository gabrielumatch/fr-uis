/**
 * Slots de material no topo (2 slots: item já está na sidebar).
 * @param {{
 *   awakening: { icon: string; name: string; quantity: number };
 *   reversion: { icon: string; name: string; quantity: number };
 * }} props
 */
export function renderAwakeMaterialSlots({ awakening, reversion }) {
  /**
   * @param {string} label
   * @param {{ icon: string; name: string; quantity: number }} item
   */
  function slotMarkup(label, item) {
    return `
      <article class="awake-slot">
        <span class="awake-slot__label">${label}</span>
        <div class="awake-slot__box" title="${item.name}">
          <span class="awake-slot__icon" aria-hidden="true">${item.icon}</span>
          <span class="awake-slot__qty">${item.quantity}</span>
        </div>
      </article>
    `;
  }

  return `
    <div class="awake-slots" role="group" aria-label="Awake materials">
      ${slotMarkup("Awakening", awakening)}
      ${slotMarkup("Reversion", reversion)}
    </div>
  `;
}