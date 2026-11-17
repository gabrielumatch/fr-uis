import itemsJson from "./items.json";
import { INVENTORY_BAG_SLOTS } from "../inventory/inventory-bag";
import {
  type CatalogItem,
  type ConsumableItem,
  type WorkshopHostItem,
  type WorkshopItem,
  isConsumableItem,
  isSkinItem,
  isRaisedPetItem,
  isWorkshopHostItem,
  isWorkshopItem,
} from "./item";
import { skinFitsHost } from "../systems/skin-rules";
import { workshopGearProfile } from "../workshop/workshop-capabilities";
import { hydrateItemsCatalog, parseItemsCatalog } from "./hydrate-items";
import {
  UPGRADE_RECIPE_PAIRS,
  upgradeAttributesValid,
} from "../upgrade/recipes";
import { gearCategoryToRecipeId } from "../upgrade/rules";
import { GEAR_MAX_PLUS_BY_RECIPE } from "../upgrade/gear-upgrade-policy";
import {
  maxJewelSlotsForRule,
  unlockedJewelSlotCount,
} from "../systems/jewel-slot-rules";

const items: CatalogItem[] = hydrateItemsCatalog(parseItemsCatalog(itemsJson));

const byId = new Map<string, CatalogItem>(items.map((item) => [item.id, item]));

export const itemCatalog: readonly CatalogItem[] = items;

export const equipmentCatalog: readonly WorkshopItem[] = items.filter(isWorkshopItem);

export const workshopHostCatalog: readonly WorkshopHostItem[] = items.filter(isWorkshopHostItem);

export const consumableCatalog: readonly ConsumableItem[] = items.filter(isConsumableItem);

export function getItemById(id: string): CatalogItem | undefined {
  return byId.get(id);
}

export function getEquipmentById(id: string): WorkshopItem | undefined {
  const item = byId.get(id);
  return item && isWorkshopItem(item) ? item : undefined;
}

export function getWorkshopHostById(id: string): WorkshopHostItem | undefined {
  const item = byId.get(id);
  return item && isWorkshopHostItem(item) ? item : undefined;
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
  const bagItem = byId.get(slot.itemId)!;
  if (isRaisedPetItem(bagItem) && slot.upgradeBadge) {
    throw new Error(
      `Bag "${slot.itemId}": raised pet não usa upgradeBadge — só ícone na bag`,
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

  const profile = workshopGearProfile(item);

  if (item.type === "armor" && profile.piercingSlotMax === 0) {
    if (item.stats.some((s) => s.label === "Element")) {
      throw new Error(`Item "${item.id}": peça de set não deve exibir Element`);
    }
    if (item.stats.some((s) => s.label === "Piercing" || s.label === "Cards")) {
      throw new Error(`Item "${item.id}": peça de set não deve exibir Piercing/Cards`);
    }
  }

  if (item.type === "armor" && item.subtype === "suit") {
    const pierce = item.stats.find((s) => s.label === "Piercing");
    const cards = item.stats.find((s) => s.label === "Cards");
    if (pierce && !pierce.value.includes("/ 4")) {
      throw new Error(`Item "${item.id}": suit piercing deve ter max 4`);
    }
    if (cards && !cards.value.includes("/ 4")) {
      throw new Error(`Item "${item.id}": suit cards deve ter max 4`);
    }
  }

  if (item.type === "weapon") {
    const recipeKey = item.upgrade.id;
    if (recipeKey in GEAR_MAX_PLUS_BY_RECIPE) {
      const expectedMax =
        GEAR_MAX_PLUS_BY_RECIPE[
          recipeKey as keyof typeof GEAR_MAX_PLUS_BY_RECIPE
        ];
      if (item.upgrade.maxPlus !== expectedMax) {
        throw new Error(
          `Item "${item.id}": maxPlus ${item.upgrade.maxPlus} ≠ ${expectedMax} para ${recipeKey}`,
        );
      }
    }

    const rule = item.upgrade.weaponJewelSocketRule;
    const jewelsRow = item.stats.find((s) => s.label === "Jewels");
    if (rule === "none" && jewelsRow) {
      throw new Error(`Item "${item.id}": normal/ultimate-tier rule "none" não exibe Jewels`);
    }
    if (rule !== "none") {
      if (!jewelsRow) {
        throw new Error(`Item "${item.id}": esperado stat Jewels para rule "${rule}"`);
      }
      const unlocked = unlockedJewelSlotCount(item.upgradeLevel, rule);
      const capacity = maxJewelSlotsForRule(rule);
      const expected = `${unlocked} / ${capacity} unlocked`;
      if (jewelsRow.value !== expected) {
        throw new Error(
          `Item "${item.id}": Jewels "${jewelsRow.value}" ≠ "${expected}" (+${item.upgradeLevel}, ${rule})`,
        );
      }
    }
  }
}