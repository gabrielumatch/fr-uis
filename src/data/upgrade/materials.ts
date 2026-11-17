import type { WorkshopItem } from "../items/workshop-item";
import { equippedItem } from "../workshop/equipped";
import { requireConsumableById } from "../items/catalog";
import {
  getUpgradeLevelRecipe,
  UPGRADE_ATTEMPT_ICONS,
  UPGRADE_RECIPE_PAIRS,
  type UpgradeAttemptSlotIcons,
  type UpgradeLevelRecipe,
} from "./recipes";
import { isJewelryItem, isUltimateUpgradeItem } from "./rules";

export type { UpgradeLevelRecipe, UpgradeRecipeId } from "./recipes";
export { UPGRADE_RECIPE_PAIRS };

export type UpgradeMaterialDef = {
  icon: string;
  name: string;
  quantity: number;
};

function qtyForRecipe(recipe: UpgradeLevelRecipe): {
  material: number;
  protect: number;
} {
  switch (recipe.id) {
    case "jewel":
      return { material: 18, protect: 10 };
    case "ultimate":
      return { material: 25, protect: 10 };
    case "baruna":
      return { material: 10, protect: 10 };
    case "fashion":
      return { material: 10, protect: 0 };
    default:
      return { material: 25, protect: 10 };
  }
}

function materialsFromRecipe(recipe: UpgradeLevelRecipe): UpgradeMaterialDef[] {
  const qty = qtyForRecipe(recipe);
  const mats: UpgradeMaterialDef[] = [];

  const materialItem = requireConsumableById(recipe.material);
  mats.push({
    icon: materialItem.icon,
    name: materialItem.name,
    quantity: qty.material,
  });

  if (recipe.protect !== null) {
    const protectItem = requireConsumableById(recipe.protect);
    mats.push({
      icon: protectItem.icon,
      name: protectItem.name,
      quantity: qty.protect,
    });
  }

  if (recipe.smeltingMaxPlus !== null) {
    const smelting = requireConsumableById("smelting-scroll");
    mats.push({
      icon: smelting.icon,
      name: smelting.name,
      quantity: 5,
    });
  }

  return mats;
}

export function isJewelryWorkshopItem(item: WorkshopItem = equippedItem): boolean {
  return isJewelryItem(item);
}

export function isUltimateWorkshopItem(item: WorkshopItem = equippedItem): boolean {
  return isUltimateUpgradeItem(item);
}

export function getUpgradeLevelMaterials(
  item: WorkshopItem = equippedItem,
): UpgradeMaterialDef[] {
  return materialsFromRecipe(getUpgradeLevelRecipe(item));
}

export function getUpgradeLevelAttemptDefaults(
  item: WorkshopItem = equippedItem,
): UpgradeAttemptSlotIcons {
  const recipe = getUpgradeLevelRecipe(item);
  const icons = { ...UPGRADE_ATTEMPT_ICONS[recipe.id] };
  if (recipe.smeltingMaxPlus === null) {
    icons.smelting = "";
  }
  return icons;
}

export { upgradeAttributesValid as recipeMatchesCanonicalPair } from "./recipes";