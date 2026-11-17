import type { ComponentType } from "react";
import type { MaterialDef } from "../components/material-footer";
import { upgradeTab } from "./upgrade-panel";
import { elementTab } from "./element-panel";
import { piercingTab } from "./piercing-panel";
import { awakeTab } from "./awake-panel";
import { skinsTab } from "./skins-panel";
import { feedTab } from "./pet-feed-panel";
import { growthTab } from "./pet-growth-panel";

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
  elementTab,
  piercingTab,
  awakeTab,
  skinsTab,
  feedTab,
  growthTab,
];

export const TAB_HASH_ALIASES: Record<string, string> = {
  jewels: "upgrade",
  "upgrade-jewels": "upgrade",
  "upgrade-level": "upgrade",
  "piercing-cards": "piercing",
  "piercing-pierce": "piercing",
  "element-change": "element",
  "element-upgrade": "element",
  "skins-apply": "skins",
  "skins-remove": "skins",
  transmutation: "skins",
  "transmutation-apply": "skins",
  "transmutation-revert": "skins",
};

export function getTabById(id: string): TabDefinition | undefined {
  return tabRegistry.find((tab) => tab.id === id);
}