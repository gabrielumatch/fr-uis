import itemsJson from "./items.json";
import { INVENTORY_BAG_SLOTS } from "../inventory/inventory-bag";
import {
  type CatalogItem,
  type ConsumableItem,
  type WorkshopItem,
  isConsumableItem,
  isSkinItem,
  isWorkshopItem,
} from "./item";
import { skinFitsHost } from "../systems/skin-rules";
import { hydrateItemsCatalog, parseItemsCatalog } from "./hydrate-items";
import {
  UPGRADE_RECIPE_PAIRS,
  upgradeAttributesValid,
} from "../upgrade/recipes";
import { gearCategoryToRecipeId } from "../upgrade/rules";

const items: CatalogItem[] = hydrateItemsCatalog(parseItemsCatalog(itemsJson));

const byId = new Map<string, CatalogItem>(items.map((item) => [item.id, item]));

export const itemCatalog: readonly CatalogItem[] = items;

export const equipmentCatalog: readonly WorkshopItem[] = items.filter(isWorkshopItem);

export const consumableCatalog: readonly ConsumableItem[] = items.filter(isConsumableItem);

export function getItemById(id: string): CatalogItem | undefined {
  return byId.get(id);
}

export function getEquipmentById(id: string): WorkshopItem | undefined {
  const item = byId.get(id);
  return item && isWorkshopItem(item) ? item : undefined;
}

export function getConsumableById(id: string): ConsumableItem | undefined {
  const item = byId.get(id);
  return item && isConsumableItem(item) ? item : undefined;
}

export function requireConsumableById(id: string): ConsumableItem {
  const item = getConsumableById(id);
  if (!item) {
    throw new Error(`Item "${id}" não é consumable em items.json`);
  }
  return item;
}

for (const recipe of Object.values(UPGRADE_RECIPE_PAIRS)) {
  requireConsumableById(recipe.material);
  if (recipe.protect !== null) {
    requireConsumableById(recipe.protect);
  }
}
requireConsumableById("smelting-scroll");

for (const slot of INVENTORY_BAG_SLOTS) {
  if (!byId.has(slot.itemId)) {
    throw new Error(
      `Inventory bag references "${slot.itemId}" but it is missing from items.json`,
    );
  }
}

for (const item of itemCatalog) {
  if (!isSkinItem(item)) continue;
  if (!item.skinSlot) {
    throw new Error(`Skin "${item.id}": skinSlot obrigatório após hydrate`);
  }
  if (item.hostItemId) {
    const host = getEquipmentById(item.hostItemId);
    if (!host) {
      throw new Error(`Skin "${item.id}": hostItemId "${item.hostItemId}" não é gear workshop`);
    }
    if (!skinFitsHost(item, host)) {
      throw new Error(
        `Skin "${item.id}" (slot ${item.skinSlot}) incompatível com host "${host.id}" (${host.subtype})`,
      );
    }
  }
}

for (const item of equipmentCatalog) {
  if (item.type !== "weapon" && item.type !== "armor") continue;
  const recipeId = gearCategoryToRecipeId(item.category);
  if (item.upgrade.id !== recipeId) {
    throw new Error(
      `Item "${item.id}": upgrade recipe "${item.upgrade.id}" ≠ category "${item.category}" (esperado "${recipeId}")`,
    );
  }
  if (!upgradeAttributesValid(item.upgrade)) {
    const canonical = UPGRADE_RECIPE_PAIRS[recipeId];
    throw new Error(
      `Item "${item.id}": materiais de upgrade inválidos (category "${item.category}" → ${canonical.material}+${canonical.protect ?? "—"})`,
    );
  }
}