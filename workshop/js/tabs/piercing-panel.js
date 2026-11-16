import {
  piercingWeaponConfig,
  summarizeEquippedWeaponCards,
} from "../data/piercing-slots.js";
import { renderPiercingSlotList } from "../components/piercing/slot-list.js";
import { renderPiercingActions } from "../components/piercing/piercing-actions.js";
import { renderCardBonusBar } from "../components/piercing/card-bonus-bar.js";

/** @type {import('./registry.js').TabDefinition} */
export const piercingTab = {
  id: "piercing",
  label: "Piercing & Cards",
  icon: "⚫",
  panelTitle: "Piercing & Card Management",
  panelSubtitle: "Open sockets, then insert or remove cards.",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  materials: [
    { icon: "🌙", name: "Moonstone", quantity: 40 },
    { icon: "📜", name: "GProtect", quantity: 5 },
    { icon: "✨", name: "Smelting Scroll", quantity: 5 },
  ],
  renderBody() {
    return `
      ${renderPiercingSlotList(piercingWeaponConfig)}
      ${renderPiercingActions()}
      ${renderCardBonusBar(summarizeEquippedWeaponCards(piercingWeaponConfig))}
    `;
  },
};