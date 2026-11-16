import {
  jewelManagementState,
  summarizeJewelBonus,
} from "../data/jewel-management.js";
import { renderJewelSlotList } from "../components/jewels/jewel-slot-list.js";
import { renderJewelBonusBar } from "../components/jewels/jewel-bonus-bar.js";
import { renderJewelInventory } from "../components/jewels/jewel-inventory.js";
import { renderJewelActions } from "../components/jewels/jewel-actions.js";

/** @type {import('./registry.js').TabDefinition} */
export const jewelsTab = {
  id: "jewels",
  label: "Jewels",
  icon: "💠",
  panelTitle: "Jewel Management",
  panelSubtitle: "Insert or remove jewels from unlocked slots.",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  materials: [
    {
      icon: "🌙",
      name: "Moonstone",
      quantity: jewelManagementState.materials.moonstone,
    },
  ],
  renderBody() {
    const state = jewelManagementState;

    return `
      ${renderJewelSlotList(state)}
      ${renderJewelBonusBar(summarizeJewelBonus(state))}
      ${renderJewelInventory({
        inventory: state.inventory,
        selectedId: state.selectedJewelId,
      })}
      ${renderJewelActions()}
    `;
  },
};