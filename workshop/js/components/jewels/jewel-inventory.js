import { jewelTypes } from "../../data/jewel-management.js";

/**
 * @param {{ inventory: Record<string, number>; selectedId: string }} props
 */
export function renderJewelInventory({ inventory, selectedId }) {
  const tiles = jewelTypes
    .map((j) => {
      const qty = inventory[j.id] ?? 0;
      const isSelected = j.id === selectedId;
      return `
        <button
          type="button"
          class="jewel-inv__tile${isSelected ? " is-selected" : ""}"
          data-jewel-type="${j.id}"
          aria-pressed="${isSelected}"
        >
          <span class="jewel-inv__orb" aria-hidden="true">${j.icon}</span>
          <span class="jewel-inv__name">${j.name.replace(" Jewel", "")}</span>
          <span class="jewel-inv__qty">× ${qty}</span>
        </button>
      `;
    })
    .join("");

  return `
    <section class="jewel-inv">
      <h3 class="section-title">Available Jewels</h3>
      <div class="jewel-inv__grid" role="group" aria-label="Available jewels">${tiles}</div>
    </section>
  `;
}