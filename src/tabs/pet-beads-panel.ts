import { getEquippedPickupPet } from "../data/systems/pickup-pet-workshop";
import { PetBeadsBody } from "./pet-beads-body";
import type { TabDefinition } from "./registry";

export function getPetBeadsPanelMaterials() {
  const pet = getEquippedPickupPet();
  if (!pet) return [];
  const inv = pet.workshopPickup.inventory;
  return [
    { icon: "🔑", name: "Bead Slot Key", quantity: inv.beadSlotKeys },
    ...Object.entries(inv.beadsOnHand).map(([id, qty]) => ({
      icon: "🔮",
      name: id.replace(/-/g, " "),
      quantity: qty,
    })),
  ];
}

export const beadsTab: TabDefinition = {
  id: "beads",
  label: "Beads",
  icon: "🔮",
  panelTitle: "Buff Beads",
  panelSubtitle: "Nine slots — keys unlock more",
  materialsVariant: "list",
  materialsTitle: "On hand",
  materials: [],
  Body: PetBeadsBody,
};