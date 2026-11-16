/**
 * @param {import('../../data/jewel-management.js').buildJewelManagementState extends (...args: unknown[]) => infer R ? R['slots'][number] : never} slot
 */
export function renderJewelSlotRow(slot) {
  const label = `Slot ${slot.index}`;

  if (!slot.unlocked) {
    return `
      <div class="jewel-row jewel-row--locked" data-jewel-slot="${slot.index}">
        <span class="jewel-row__label">${label}</span>
        <span class="jewel-row__content">
          <span class="jewel-row__icon" aria-hidden="true">🔒</span>
          <span>Requires upgrade <strong>+${slot.requiredUpgrade}</strong></span>
        </span>
        <span class="jewel-row__status">Locked</span>
      </div>
    `;
  }

  if (!slot.jewel) {
    return `
      <div class="jewel-row jewel-row--empty" data-jewel-slot="${slot.index}">
        <span class="jewel-row__label">${label}</span>
        <span class="jewel-row__content">
          <span class="jewel-row__icon" aria-hidden="true">◇</span>
          <span>Empty socket</span>
        </span>
        <button type="button" class="btn btn--slot" data-action="Insert Jewel" data-jewel-slot="${slot.index}">
          Insert
        </button>
      </div>
    `;
  }

  const { jewel } = slot;

  return `
    <div class="jewel-row jewel-row--filled" data-jewel-slot="${slot.index}">
      <span class="jewel-row__label">${label}</span>
      <span class="jewel-row__content">
        <span class="jewel-row__icon" aria-hidden="true">${jewel.icon}</span>
        <span class="jewel-row__name">${jewel.name} · ${jewel.stat} ${jewel.bonus}</span>
      </span>
      <button type="button" class="btn btn--slot btn--slot-muted" data-action="Remove Jewel" data-jewel-slot="${slot.index}">
        Remove
      </button>
    </div>
  `;
}