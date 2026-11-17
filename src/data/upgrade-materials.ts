import type { WorkshopItem } from "./workshop-item";
import { equippedItem } from "./equipped-item";
import { WIKI } from "./flyff-wiki-icons";
import type { UpgradeMaterialKey, UpgradeProtectKey } from "./item-taxonomy";
import {
  getUpgradeLevelRecipe,
  UPGRADE_ATTEMPT_ICONS,
  UPGRADE_RECIPE_PAIRS,
  type UpgradeAttemptSlotIcons,
  type UpgradeLevelRecipe,
} from "./upgrade-recipes";
import { isJewelryItem, isUltimateUpgradeItem } from "./item-taxonomy";

export type { UpgradeLevelRecipe, UpgradeRecipeId } from "./upgrade-recipes";
export { UPGRADE_RECIPE_PAIRS };

export type UpgradeMaterialDef = {
  icon: string;
  name: string;
  quantity: number;
};

type MaterialCatalogEntry = { icon: string; name: string };

const MATERIAL_CATALOG: Record<UpgradeMaterialKey, MaterialCatalogEntry> = {
  sunstone: { icon: WIKI.sunstone, name: "Sunstone" },
  moonstone: { icon: WIKI.moonstone, name: "Moonstone" },
  oricalkum: { icon: WIKI.shiningOricalkum, name: "Shining Oricalkum" },
  "lightning-stone": { icon: "⚡", name: "Lightning Stone" },
  "baruna-balance": { icon: "⚖️", name: "Stone of Balance" },
};

const PROTECT_CATALOG: Record<UpgradeProtectKey, MaterialCatalogEntry> = {
  sprotect: { icon: WIKI.scrollSProtect, name: "SProtect" },
  aprotect: { icon: WIKI.scrollAProtect, name: "AProtect" },
  xprotect: { icon: WIKI.scrollXProtect, name: "XProtect" },
  "baruna-blessing": { icon: "📜", name: "Blessing of Baruna" },
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

  const matEntry = MATERIAL_CATALOG[recipe.material];
  mats.push({
    icon: matEntry.icon,
    name: matEntry.name,
    quantity: qty.material,
  });

  if (recipe.protect !== null) {
    const protEntry = PROTECT_CATALOG[recipe.protect];
    mats.push({
      icon: protEntry.icon,
      name: protEntry.name,
      quantity: qty.protect,
    });
  }

  if (recipe.smeltingMaxPlus !== null) {
    mats.push({ icon: "✨", name: "Smelting Scroll", quantity: 5 });
  }

  return mats;
}

export function isJewelryWorkshopItem(item: WorkshopItem = equippedItem): boolean {
  return isJewelryItem(item);
}

export function isUltimateWorkshopItem(item: WorkshopItem = equippedItem): boolean {
  return isUltimateUpgradeItem(item);
}

/** Materiais do painel Safe Upgrade — derivados da receita tipada do item. */
export function getUpgradeLevelMaterials(
  item: WorkshopItem = equippedItem,
): UpgradeMaterialDef[] {
  return materialsFromRecipe(getUpgradeLevelRecipe(item));
}

/** Ícones das colunas na attempt table (material / protect / smelting). */
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

/** Garante em compile-time que o par bate com o catálogo gPotato. */
export { upgradeAttributesValid as recipeMatchesCanonicalPair } from "./upgrade-recipes";