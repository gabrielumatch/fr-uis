import type { buildJewelManagementState } from "../../data/systems/jewel-management";

export function JewelSlotRow({
  slot,
  selectedJewelId,
  inventory,
}: {
  slot: ReturnType<typeof buildJewelManagementState>["slots"][number];
  selectedJewelId: string;
  inventory: Record<string, number>;
}) {
  const canInsert = (inventory[selectedJewelId] ?? 0) > 0;
  const label = `Slot ${slot.index}`;

  if (!slot.unlocked) {
    return (
      <div className="jewel-row jewel-row--locked" data-jewel-slot={slot.index}>
        <span className="jewel-row__label">{label}</span>
        <span className="jewel-row__content">
          <span className="jewel-row__icon" aria-hidden="true">
            🔒
          </span>
          <span>
            Requires upgrade <strong>+{slot.requiredUpgrade}</strong>
          </span>
        </span>
        <span className="jewel-row__status">Locked</span>
      </div>
    );
  }

  if (!slot.jewel) {
    return (
      <div className="jewel-row jewel-row--empty" data-jewel-slot={slot.index}>
        <span className="jewel-row__label">{label}</span>
        <span className="jewel-row__content">
          <span className="jewel-row__icon" aria-hidden="true">
            ◇
          </span>
          <span>Empty socket</span>
        </span>
        <button
          type="button"
          className="btn btn--slot"
          data-action="Insert Jewel"
          data-jewel-slot={slot.index}
          disabled={!canInsert}
        >
          Insert
        </button>
      </div>
    );
  }

  const { jewel } = slot;
  return (
    <div className="jewel-row jewel-row--filled" data-jewel-slot={slot.index}>
      <span className="jewel-row__label">{label}</span>
      <span className="jewel-row__content">
        <span className="jewel-row__icon" aria-hidden="true">
          {jewel.icon}
        </span>
        <span className="jewel-row__name">
          {jewel.name} · {jewel.stat} {jewel.bonus}
        </span>
      </span>
      <button
        type="button"
        className="btn btn--slot btn--slot-muted"
        data-action="Remove Jewel"
        data-jewel-slot={slot.index}
      >
        Remove
      </button>
    </div>
  );
}