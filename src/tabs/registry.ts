import type { ComponentType } from "react";
import type { MaterialDef } from "../components/material-footer";
import { upgradeTab } from "./upgrade-panel";
import { elementTab } from "./element-panel";
import { piercingTab } from "./piercing-panel";
import { awakeTab } from "./awake-panel";
import { skinsTab } from "./skins-panel";
import { feedTab } from "./pet-feed-panel";
import { growthTab } from "./pet-growth-panel";
import { convertTab } from "./pet-convert-panel";
import { beadsTab } from "./pet-beads-panel";
import { pickupFilterTab } from "./pet-pickup-filter-panel";
import { servicesTab } from "./gear-services-panel";
export { TAB_HASH_ALIASES } from "./tab-ids";

export type TabDefinition = {
  id: string;
  label: string;
  icon: string;
  panelTitle: string;
  panelSubtitle?: string;
  materials: MaterialDef[];
  materialsVariant?: "grid" | "list";
  materialsTitle?: string;
  Body: ComponentType;
};

export const tabRegistry: TabDefinition[] = [
  upgradeTab,
  servicesTab,
  elementTab,
  piercingTab,
  awakeTab,
  skinsTab,
  feedTab,
  growthTab,
  convertTab,
  beadsTab,
  pickupFilterTab,
];

export function getTabById(id: string): TabDefinition | undefined {
  return tabRegistry.find((tab) => tab.id === id);
}