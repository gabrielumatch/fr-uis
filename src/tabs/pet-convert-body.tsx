import { getEquippedPickupPet } from "../data/systems/pickup-pet-workshop";
import { ActionButtons } from "../components/upgrade/action-buttons";

export function PetConvertBody() {
  const pet = getEquippedPickupPet();
  if (!pet || pet.mode !== "pickup") return null;
  const inv = pet.workshopPickup.inventory;

  return (
    <>
      <p className="upgrade-sub-hint muted">
        Summon the pick-up pet, then use <strong>Pick-up Pet Upgrade</strong>. Unlocks 2 bead
        slots and cannot be undone. Some mailable pets become non-mailable.
      </p>
      <div className="frame upgrade-target">
        <div className="upgrade-target__row">
          <span className="muted">Upgrade scrolls</span>
          <strong>{inv.pickupUpgradeScroll}</strong>
        </div>
        <div className="upgrade-target__row">
          <span className="muted">Summoned</span>
          <strong>{pet.summoned ? "Yes" : "No"}</strong>
        </div>
        <div className="upgrade-target__row">
          <span className="muted">Mailable</span>
          <strong>{pet.mailable ? "Yes" : "No"}</strong>
        </div>
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn--secondary" data-action="Toggle Pickup Summon">
          {pet.summoned ? "Un-summon Pet" : "Summon Pet"}
        </button>
      </div>
      <ActionButtons
        primary="Convert to Buff Pet"
        secondary={[]}
        primaryDisabled={!pet.summoned || inv.pickupUpgradeScroll < 1}
      />
    </>
  );
}