import {
  getSkinsApplyMaterials,
  SkinsApplyBody,
} from "./skins-apply-body";
import { getSkinsRemoveMaterials, SkinsRemoveBody } from "./skins-remove-body";
import { SKINS_SUB_TABS } from "./skins-sub-tabs";
import type { TabDefinition } from "./registry";

export type SkinsSubId = (typeof SKINS_SUB_TABS)[number]["id"];

export function resolveSkinsSub(sub?: string): SkinsSubId {
  return sub === "remove" ? "remove" : "apply";
}

export function getSkinsPanelView(sub: SkinsSubId) {
  if (sub === "remove") {
    return {
      panelTitle: "Remove Skin",
      panelSubtitle: "Purge or recover applied weapon look.",
      materialsVariant: "list" as const,
      materialsTitle: "Materials Required / Available",
      materials: getSkinsRemoveMaterials(),
      Body: SkinsRemoveBody,
    };
  }
  return {
    panelTitle: "Apply Skin",
    panelSubtitle: "Makeup Artist — visual only.",
    materialsVariant: "grid" as const,
    materialsTitle: "Materials Required / Available",
    materials: getSkinsApplyMaterials(),
    Body: SkinsApplyBody,
  };
}

export const skinsTab: TabDefinition = {
  id: "skins",
  label: "Skins",
  icon: "✨",
  panelTitle: "Apply Skin",
  panelSubtitle: "",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  materials: getSkinsApplyMaterials(),
  Body: SkinsApplyBody,
};