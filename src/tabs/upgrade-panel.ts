import { equippedItem } from "../data/workshop/equipped";
import { getUpgradeLevelMaterials } from "../data/upgrade/materials";
import { getUpgradeSubTabIds } from "../data/workshop/ui-rules";
import type { WorkshopItem } from "../data/items/item";
import { UpgradeLevelBody } from "./upgrade-level-body";
import { UpgradeJewelsBody, upgradeJewelsMaterials } from "./upgrade-jewels-body";
import { UPGRADE_SUB_TABS } from "./upgrade-sub-tabs";
import type { TabDefinition } from "./registry";

export type UpgradeSubId = (typeof UPGRADE_SUB_TABS)[number]["id"];

export function resolveUpgradeSub(sub?: string): UpgradeSubId {
  return sub === "jewels" ? "jewels" : "level";
}

export function getUpgradePanelView(
  sub: UpgradeSubId,
  item: WorkshopItem = equippedItem,
) {
  if (sub === "jewels" && !getUpgradeSubTabIds(item).includes("jewels")) {
    sub = "level";
  }
  if (sub === "jewels") {
    return {
      panelTitle: "Jewel Management",
      panelSubtitle:
        "Jewel sockets unlock with upgrade level (+6 = 1st slot, +10 = 5 slots).",
      materialsVariant: "grid" as const,
      materialsTitle: "Materials Required / Available",
      materials: upgradeJewelsMaterials(),
      Body: UpgradeJewelsBody,
    };
  }
  return {
    panelTitle: "Safe Upgrade",
    panelSubtitle: "Plan protected upgrade attempts to your target level.",
    materialsVariant: "grid" as const,
    materialsTitle: "Materials Required / Available",
    materials: getUpgradeLevelMaterials(item),
    Body: UpgradeLevelBody,
  };
}

export const upgradeTab: TabDefinition = {
  id: "upgrade",
  label: "Upgrades & Jewels",
  icon: "🔨",
  panelTitle: "Safe Upgrade",
  panelSubtitle: "",
  materialsVariant: "grid",
  materials: getUpgradeLevelMaterials(),
  materialsTitle: "Materials Required / Available",
  Body: UpgradeLevelBody,
};