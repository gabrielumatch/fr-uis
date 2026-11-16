/**
 * @param {{ index: number; jewel: import('../../data/jewel-management.js').jewelTypes[number] }} slot
 */
export function renderJewelSlotRow({ index, jewel }) {
  return `
    <div class="jewel-row jewel-row--filled" data-jewel-slot="${index}">
      <span class="jewel-row__label">Slot ${index}</span>
      <span class="jewel-row__content">
        <span class="jewel-row__icon" aria-hidden="true">${jewel.icon}</span>
        <span class="jewel-row__name">${jewel.name} · ${jewel.stat} ${jewel.bonus}</span>
      </span>
      <button type="button" class="btn btn--slot btn--slot-muted" data-action="Remove Jewel" data-jewel-slot="${index}">
        Remove
      </button>
    </div>
  `;
}