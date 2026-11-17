import type { GearItemCategory } from "../items/types";
import type { ItemRecord } from "../items/types";
import type { ItemUpgradeAttributes, UpgradeRecipeId } from "./recipes";
import { upgradeProfile } from "./recipes";
import type { WorkshopItem } from "../items/workshop-item";

export function gearCategoryToRecipeId(
  category: GearItemCategory,
): Exclude<UpgradeRecipeId, "jewel" | "fashion"> {
  switch (category) {
    case "ultimate":
      return "ultimate";
    case "baruna":
      return "baruna";
    default:
      return "normal";
  }
}

export function upgradeFromRecord(record: ItemRecord): ItemUpgradeAttributes {
  switch (record.type) {
    case "jewel":
      return upgradeProfile("jewel");
    case "fashion":
      return upgradeProfile("fashion");
    case "weapon":
    case "armor":
      return upgradeProfile(
        gearCategoryToRecipeId(record.category as import("../items/types").GearItemCategory),
      );
    default:
      throw new Error(`upgradeFromRecord: type "${record.type}" não tem receita +`);
  }
}

export function getMaxUpgradeLevel(item: { upgrade: ItemUpgradeAttributes }): number {
  return item.upgrade.maxPlus;
}

export function formatUpgradeProgress(
  level: number,
  item: { upgrade: ItemUpgradeAttributes },
): string {
  return `${level}/${item.upgrade.maxPlus}`;
}

export function isJewelryItem(item: Pick<WorkshopItem, "type">): boolean {
  return item.type === "jewel";
}

export function isUltimateGear(item: WorkshopItem): boolean {
  if (item.type !== "weapon" && item.type !== "armor") return false;
  return item.category === "ultimate";
}

export function isBarunaGear(item: WorkshopItem): boolean {
  if (item.type !== "weapon" && item.type !== "armor") return false;
  return item.category === "baruna";
}

export const isUltimateUpgradeItem = isUltimateGear;
export const isBarunaUpgradeItem = isBarunaGear;