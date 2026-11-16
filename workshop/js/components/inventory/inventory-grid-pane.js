import { getWorkshopItemById } from "../../data/equipped-item.js";
import { INVENTORY_TABS, getInventoryGridCells } from "../../data/inventory-display.js";
import { renderInventorySlot } from "./inventory-slot.js";

/**
 * @param {import("../../data/inventory-display.js").InventoryGridItem | null} cell
 * @param {string} activeWorkshopItemId
 */
function renderBagCell(cell, activeWorkshopItemId) {
  if (!cell?.icon) {
    return `<div class="inv-grid__cell inv-grid__cell--empty" role="gridcell" aria-label="Empty slot"></div>`;
  }

  const wsId = cell.workshopItemId;
  const item = wsId ? getWorkshopItemById(wsId) : undefined;
  const title =
    item?.name ?? (cell.skinDonor ? "Skin item (transmute donor)" : "");
  const active = Boolean(wsId && wsId === activeWorkshopItemId);

  const slotHtml = renderInventorySlot({
    icon: cell.icon,
    upgradeBadge: cell.upgradeBadge,
    workshopItemId: wsId,
    active,
    title,
    variant: "grid",
    as: wsId ? "button" : "div",
    skinDonor: Boolean(cell.skinDonor),
  });

  return `<div class="inv-grid__cell" role="gridcell">${slotHtml}</div>`;
}

/**
 * @param {{ tabId: string; activeWorkshopItemId: string }} props
 */
export function renderInventoryGridPane({ tabId, activeWorkshopItemId }) {
  const cells = getInventoryGridCells(
    /** @type {import('../../data/inventory-display.js').InventoryTabId} */ (tabId),
  );

  const tabs = INVENTORY_TABS.map((tab) => {
    const active = tab.id === tabId;
    return `
      <button
        type="button"
        class="inv-tabs__btn${active ? " is-active" : ""}"
        data-inventory-tab="${tab.id}"
        aria-selected="${active ? "true" : "false"}"
      >
        ${tab.label}
      </button>
    `;
  }).join("");

  const grid = cells
    .map((cell) => renderBagCell(cell, activeWorkshopItemId))
    .join("");

  return `
    <div class="inv-bag">
      <nav class="inv-tabs" role="tablist" aria-label="Inventory categories">${tabs}</nav>
      <div class="inv-grid" role="grid" aria-label="Item slots">
        ${grid}
      </div>
      <div class="inv-bag__tools">
        <input
          type="search"
          class="inv-bag__search"
          placeholder="Search item..."
          aria-label="Search item"
          disabled
        />
        <button type="button" class="inv-bag__trash btn btn--secondary" disabled aria-label="Delete item">🗑</button>
        <button type="button" class="inv-bag__sort btn btn--secondary" disabled>Sort</button>
      </div>
    </div>
  `;
}