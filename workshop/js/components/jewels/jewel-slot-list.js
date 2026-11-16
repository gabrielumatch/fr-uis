import { renderJewelSlotRow } from "./jewel-slot-row.js";

/**
 * @param {ReturnType<typeof import('../../data/jewel-management.js').buildJewelManagementState>} state
 */
export function renderJewelSlotList(state) {
  const filled = state.slots.filter((s) => s.jewel).length;
  const rows = state.slots
    .map((slot) => renderJewelSlotRow(slot))
    .join("");

  return `
    <div class="jewel-head">
      <span class="jewel-head__count">
        Jewel Slots: <b>${filled} / ${state.unlockedCount}</b> unlocked
        <span class="muted">(${state.maxSlots} max @ +10)</span>
      </span>
      <span class="jewel-head__meta muted">Item +${state.upgradeLevel}</span>
    </div>
    <div class="jewel-list" role="list">${rows}</div>
  `;
}