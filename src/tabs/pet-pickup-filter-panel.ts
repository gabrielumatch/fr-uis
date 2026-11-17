import { PetPickupFilterBody } from "./pet-pickup-filter-body";
import type { TabDefinition } from "./registry";

export const pickupFilterTab: TabDefinition = {
  id: "pickup",
  label: "Pickup",
  icon: "🧺",
  panelTitle: "Pickup Filter",
  panelSubtitle: "Loot categories while summoned",
  materials: [],
  Body: PetPickupFilterBody,
};