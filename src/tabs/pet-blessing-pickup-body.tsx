import { getEquippedPickupPet } from "../data/systems/pickup-pet-workshop";
import { AwakeAttributes } from "../components/awake-attributes";
import { ActionButtons } from "../components/upgrade/action-buttons";

export function PetBlessingPickupBody() {
  const pet = getEquippedPickupPet();
  if (!pet) return null;
  const inv = pet.workshopPickup.inventory;

  return (
    <>
      <p className="upgrade-sub-hint muted">
        <strong>Scroll of Pet Blessing (Pick-up Pets)</strong> — not the raised Pet Awakening at
        Peach. Blessings can roll negative; Cheirang can remove them.
      </p>
      <AwakeAttributes stats={pet.blessing} />
      <div className="frame upgrade-target">
        <div className="upgrade-target__row">
          <span className="muted">Blessing scrolls</span>
          <strong>{inv.blessingScroll}</strong>
        </div>
      </div>
      <ActionButtons
        primary="Apply Pet Blessing"
        secondary={[]}
        primaryDisabled={inv.blessingScroll < 1}
      />
    </>
  );
}