import { getPiercingCounts, piercingWeaponConfig } from "../../data/systems/piercing-slots";
import { PiercingSlotRow } from "./slot-row";

export function PiercingSlotList({
  config = piercingWeaponConfig,
}: {
  config?: typeof piercingWeaponConfig;
}) {
  const { withCard, max } = getPiercingCounts(config);
  return (
    <>
      <div className="pierce-head">
        <span className="pierce-head__count">
          Socket Slots: <b>
            {withCard} / {max}
          </b>
        </span>
        <span className="pierce-head__hint muted">Select a slot</span>
      </div>
      <div className="pierce-list" role="list">
        {config.slots.map((slot) => (
          <PiercingSlotRow key={slot.index} slot={slot} />
        ))}
      </div>
    </>
  );
}