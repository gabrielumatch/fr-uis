import { PetPickupFilterBody } from "./pet-pickup-filter-body";
import type { TabDefinition } from "./registry";

export const pickupFilterTab: TabDefinition = {
  id: "pickup",
  label: "Filter",
  icon: "🧺",
  panelTitle: "Pet Filter",
  panelSubtitle: "What your summoned pet picks up",
  materials: [],
  Body: PetPickupFilterBody,
};