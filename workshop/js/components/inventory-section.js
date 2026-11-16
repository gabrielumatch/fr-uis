import { formatPenya, inventoryTabId, playerPenya } from "../data/inventory-display.js";
import { renderSectionHeader } from "./workshop-header.js";
import { renderCharacterEquipPane } from "./inventory/character-equip-pane.js";
import { renderInventoryGridPane } from "./inventory/inventory-grid-pane.js";

/**
 * @param {{ activeId: string; tabId?: string }} props
 */
export function renderInventorySection({ activeId, tabId = inventoryTabId }) {
  return `
    <section class="inventory-panel" id="workshop-inventory" aria-labelledby="inventory-section-title">
      ${renderSectionHeader({
        id: "inventory-section-title",
        title: "INVENTORY",
      })}
      <div class="inventory-layout">
        <div class="inventory-layout__char">
          ${renderCharacterEquipPane()}
        </div>
        <div class="inventory-layout__bag">
          ${renderInventoryGridPane({
            tabId,
            activeWorkshopItemId: activeId,
          })}
        </div>
      </div>
      <footer class="inventory-panel__penya" aria-label="Penya">
        <span class="inventory-panel__penya-icon" aria-hidden="true">🪙</span>
        <span class="inventory-panel__penya-value">${formatPenya(playerPenya)}</span>
      </footer>
    </section>
  `;
}