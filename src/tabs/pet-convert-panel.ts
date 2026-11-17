import { PetConvertBody } from "./pet-convert-body";
import type { TabDefinition } from "./registry";

export const convertTab: TabDefinition = {
  id: "convert",
  label: "Convert",
  icon: "✨",
  panelTitle: "Pick-up → Buff",
  panelSubtitle: "Permanent — unlocks Beads tab",
  materialsVariant: "list",
  materialsTitle: "Materials",
  materials: [],
  Body: PetConvertBody,
};