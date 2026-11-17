import type { SubTabDef } from "../components/upgrade/sub-tab-bar";
import type { WorkshopItem } from "../data/items/item";

export const SKINS_SUB_TABS = [
  { id: "apply", label: "Apply Skin" },
  { id: "remove", label: "Remove Skin" },
] as const;

export function skinsSubTabsForItem(item: WorkshopItem): SubTabDef[] {
  const hasSkin = item.workshopSkin.hasSkinApplied;
  return SKINS_SUB_TABS.map((t) => {
    if (t.id === "apply") {
      return {
        ...t,
        disabled: hasSkin,
        title: hasSkin ? "Remove the current skin before applying another" : undefined,
      };
    }
    return {
      ...t,
      disabled: !hasSkin,
      title: !hasSkin ? "No skin applied on this item" : undefined,
    };
  });
}