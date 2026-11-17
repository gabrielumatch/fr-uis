import { buildJewelManagementState } from "../../data/systems/jewel-management";
import { JewelSlotRow } from "./jewel-slot-row";

export function JewelSlotList({
  state,
}: {
  state: ReturnType<typeof buildJewelManagementState>;
}) {
  const filled = state.slots.filter((s) => s.jewel).length;
  return (
    <>
      <div className="jewel-head">
        <span className="jewel-head__count">
          Jewel Slots: <b>
            {filled} / {state.unlockedCount}
          </b>{" "}
          unlocked <span className="muted">({state.maxSlots} max @ +10)</span>
        </span>
        <span className="jewel-head__meta muted">Item +{state.upgradeLevel}</span>
      </div>
      <div className="jewel-list" role="list">
        {state.slots.map((slot) => (
          <JewelSlotRow
            key={slot.index}
            slot={slot}
            selectedJewelId={state.selectedJewelId}
            inventory={state.inventory}
          />
        ))}
      </div>
    </>
  );
}