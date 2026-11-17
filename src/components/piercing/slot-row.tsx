import type { PiercingSlot } from "../../data/piercing-slots";

export function PiercingSlotRow({ slot }: { slot: PiercingSlot }) {
  const label = `Slot ${String(slot.index).padStart(2, "0")}`;

  if (!slot.pierced) {
    return (
      <div className="pierce-row pierce-row--locked" data-slot-index={slot.index}>
        <span className="pierce-row__label">{label}</span>
        <span className="pierce-row__content">
          <span className="pierce-row__icon" aria-hidden="true">
            🔒
          </span>
          <span>Not Pierced</span>
        </span>
        <span className="pierce-row__status">Locked</span>
      </div>
    );
  }

  if (!slot.card) {
    return (
      <div className="pierce-row pierce-row--empty" data-slot-index={slot.index}>
        <span className="pierce-row__label">{label}</span>
        <span className="pierce-row__content">
          <span className="pierce-row__icon" aria-hidden="true">
            ◇
          </span>
          <span>Empty</span>
        </span>
        <button
          type="button"
          className="btn btn--slot"
          data-action="Insert"
          data-slot-index={slot.index}
        >
          Insert
        </button>
      </div>
    );
  }

  return (
    <div className="pierce-row pierce-row--filled" data-slot-index={slot.index}>
      <span className="pierce-row__label">{label}</span>
      <span className="pierce-row__content">
        <span
          className="pierce-row__icon pierce-row__icon--card"
          aria-hidden="true"
        >
          {slot.card.icon}
        </span>
        <span className="pierce-row__card">
          <span className="pierce-row__card-name">{slot.card.label}</span>
          <span className="pierce-row__card-fx muted">
            {slot.card.effects.join(", ")}
          </span>
        </span>
      </span>
      <button
        type="button"
        className="btn btn--slot btn--slot-muted"
        data-action="Remove"
        data-slot-index={slot.index}
      >
        Remove
      </button>
    </div>
  );
}