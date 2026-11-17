import { getEquippedPickupPet } from "../data/systems/pickup-pet-workshop";
import { ActionButtons } from "../components/upgrade/action-buttons";
import { ItemIcon } from "../utils/item-icon";

export function PetConvertBody() {
  const pet = getEquippedPickupPet();
  if (!pet || pet.mode !== "pickup") return null;
  const inv = pet.workshopPickup.inventory;
  const canConvert = inv.pickupUpgradeScroll >= 1;

  return (
    <>
      <p className="upgrade-sub-hint muted">
        One <strong>Pick-up Pet Upgrade</strong> scroll turns this pet into a <strong>Buff Pet</strong>{" "}
        (bead slots, blessings, same loot pickup). Conversion cannot be undone.
      </p>

      <div className="pet-convert-flow frame">
        <div className="pet-convert-flow__step">
          <ItemIcon
            icon={pet.icon}
            wrapperClass="pet-convert-flow__icon-wrap"
            imgClass="pet-convert-flow__icon-img"
            alt={pet.name}
          />
          <div className="pet-convert-flow__label">{pet.name}</div>
          <div className="pet-convert-flow__kind muted">Pick-up</div>
        </div>

        <div className="pet-convert-flow__arrow" aria-hidden>
          →
        </div>

        <div className="pet-convert-flow__step pet-convert-flow__step--after">
          <ItemIcon
            icon={pet.icon}
            wrapperClass="pet-convert-flow__icon-wrap pet-convert-flow__icon-wrap--buff"
            imgClass="pet-convert-flow__icon-img"
            alt={`${pet.name} (Buff)`}
          />
          <div className="pet-convert-flow__label">Buff {pet.name}</div>
          <div className="pet-convert-flow__kind muted">2 bead slots open</div>
        </div>
      </div>

      <ul className="pet-convert-notes muted">
        <li>Up to 9 bead slots with Bead Slot Keys (Beads tab after convert).</li>
        {pet.mailable ? (
          <li>Mailable pets become non-mailable after conversion.</li>
        ) : (
          <li>Already non-mailable.</li>
        )}
      </ul>

      <ActionButtons
        primary="Use Pick-up Pet Upgrade"
        secondary={[]}
        primaryDisabled={!canConvert}
      />
    </>
  );
}