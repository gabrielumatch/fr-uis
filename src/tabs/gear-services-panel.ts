import { GearServicesBody, gearServicesMaterials } from "./gear-services-body";
import type { TabDefinition } from "./registry";

export const servicesTab: TabDefinition = {
  id: "services",
  label: "Services",
  icon: "🛠",
  panelTitle: "Equipment Services",
  panelSubtitle:
    "Level reduction, gender transy, and unbinding — removal of reduction at Peach (Madrigal).",
  materialsVariant: "grid",
  materialsTitle: "Service scrolls in bag",
  materials: gearServicesMaterials(),
  Body: GearServicesBody,
};