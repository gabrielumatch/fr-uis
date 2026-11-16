import { renderJewelSlotRow } from "./jewel-slot-row.js";
import { jewelManagementState } from "../../data/jewel-management.js";

/**
 * @param {typeof jewelManagementState} state
 */
export function renderJewelSlotList(state) {
  const filled = state.equipped.length;
  const rows = state.equipped
    .map((slot) => renderJewelSlotRow(slot))
    .join("");

  return `
    <div class="jewel-head">
      <span class="jewel-head__count">Jewel Slots: <b>${filled} / ${state.maxSlots}</b></span>
    </div>
    <div class="jewel-list" role="list">${rows}</div>
  `;
}