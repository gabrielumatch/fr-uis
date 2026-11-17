import {
  getEquippedPickupPet,
  isBeadActiveInPet,
} from "../data/systems/pickup-pet-workshop";
import { ActionButtons } from "../components/upgrade/action-buttons";

export function PetBeadsBody() {
  const pet = getEquippedPickupPet();
  if (!pet || pet.mode !== "buff") return null;
  const inv = pet.workshopPickup.inventory;

  return (
    <>
      <p className="upgrade-sub-hint muted">
        Up to 9 beads. Tier 3+ beads need matching lower-tier beads equipped. Timers run in real
        time. Pet glows while beads are active.
      </p>
      <ul className="inv-slot-list">
        {pet.beadSlots.slice(0, pet.unlockedBeadSlots).map((slot, i) => {
          const active = slot ? isBeadActiveInPet(pet, slot.beadId) : false;
          return (
            <li key={i} className="upgrade-target__row">
              <span className="muted">Slot {i + 1}</span>
              <strong>
                {slot ? (
                  <>
                    {slot.name}
                    {slot.requiresBeadIds?.length
                      ? active
                        ? " ✓"
                        : " (needs lower tiers)"
                      : ""}
                  </>
                ) : (
                  "Empty"
                )}
              </strong>
            </li>
          );
        })}
      </ul>
      <div className="frame upgrade-target">
        <div className="upgrade-target__row">
          <span className="muted">Bead Slot Keys</span>
          <strong>{inv.beadSlotKeys}</strong>
        </div>
        <div className="upgrade-target__row">
          <span className="muted">Slots open</span>
          <strong>
            {pet.unlockedBeadSlots} / 9
          </strong>
        </div>
      </div>
      <ActionButtons
        primary="Unlock Bead Slot"
        secondary={[]}
        primaryDisabled={pet.unlockedBeadSlots >= 9 || inv.beadSlotKeys < 1}
      />
      <div className="btn-row" style={{ marginTop: "0.75rem" }}>
        <button
          type="button"
          className="btn btn--secondary"
          data-action="Equip Demo Bead"
          data-bead-id="bead-power-l1"
          data-bead-slot="0"
        >
          Equip Bead of Power (slot 1)
        </button>
      </div>
    </>
  );
}