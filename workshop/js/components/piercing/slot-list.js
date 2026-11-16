import { renderPiercingSlotRow } from "./slot-row.js";
import { getPiercingCounts } from "../../data/piercing-slots.js";

/** @param {typeof import('../../data/piercing-slots.js').piercingWeaponConfig} config */
export function renderPiercingSlotList(config) {
  const { withCard, max } = getPiercingCounts(config);
  const rows = config.slots.map((slot) => renderPiercingSlotRow(slot)).join("");

  return `
    <div class="pierce-head">
      <span class="pierce-head__count">Socket Slots: <b>${withCard} / ${max}</b></span>
      <span class="pierce-head__hint muted">Select a slot</span>
    </div>
    <div class="pierce-list" role="list">${rows}</div>
  `;
}