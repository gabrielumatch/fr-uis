/**
 * @typedef {import('../../data/piercing-slots.js').PiercingSlot} PiercingSlot
 */

/**
 * @param {PiercingSlot} slot
 */
export function renderPiercingSlotRow(slot) {
  const label = `Slot ${String(slot.index).padStart(2, "0")}`;

  if (!slot.pierced) {
    return `
      <div class="pierce-row pierce-row--locked" data-slot-index="${slot.index}">
        <span class="pierce-row__label">${label}</span>
        <span class="pierce-row__content">
          <span class="pierce-row__icon" aria-hidden="true">🔒</span>
          <span>Not Pierced</span>
        </span>
        <span class="pierce-row__status">Locked</span>
      </div>
    `;
  }

  if (!slot.card) {
    return `
      <div class="pierce-row pierce-row--empty" data-slot-index="${slot.index}">
        <span class="pierce-row__label">${label}</span>
        <span class="pierce-row__content">
          <span class="pierce-row__icon" aria-hidden="true">◇</span>
          <span>Empty</span>
        </span>
        <button type="button" class="btn btn--slot" data-action="Insert" data-slot-index="${slot.index}">Insert</button>
      </div>
    `;
  }

  const effectHint = slot.card.effects.join(", ");

  return `
    <div class="pierce-row pierce-row--filled" data-slot-index="${slot.index}">
      <span class="pierce-row__label">${label}</span>
      <span class="pierce-row__content">
        <span class="pierce-row__icon pierce-row__icon--card" aria-hidden="true">${slot.card.icon}</span>
        <span class="pierce-row__card">
          <span class="pierce-row__card-name">${slot.card.label}</span>
          <span class="pierce-row__card-fx muted">${effectHint}</span>
        </span>
      </span>
      <button type="button" class="btn btn--slot btn--slot-muted" data-action="Remove" data-slot-index="${slot.index}">Remove</button>
    </div>
  `;
}