import { PetBlessingPickupBody } from "./pet-blessing-pickup-body";
import type { TabDefinition } from "./registry";

export const blessingPickupTab: TabDefinition = {
  id: "blessing",
  label: "Blessing",
  icon: "☆",
  panelTitle: "Pet Blessing",
  panelSubtitle: "Pick-up / Buff pets only",
  materialsVariant: "grid",
  materialsTitle: "Materials",
  materials: [],
  Body: PetBlessingPickupBody,
};