import equipmentJson from "./equipment.json";
import consumablesJson from "./consumables.json";
import type { ConsumableItem } from "./consumable-item";
import type { WorkshopItem } from "./workshop-item";
import {
  hydrateConsumableCatalog,
  parseConsumablesCatalog,
} from "./hydrate-consumables";
import {
  hydrateEquipmentCatalog,
  parseEquipmentCatalog,
} from "./hydrate-equipment";
import { UPGRADE_RECIPE_PAIRS } from "../upgrade/recipes";

const equipment = hydrateEquipmentCatalog(parseEquipmentCatalog(equipmentJson));
const consumables = hydrateConsumableCatalog(parseConsumablesCatalog(consumablesJson));

const consumableById = new Map<string, ConsumableItem>(
  consumables.map((item) => [item.id, item]),
);

const equipmentById = new Map<string, WorkshopItem>(
  equipment.map((item) => [item.id, item]),
);

/** Equipamentos workshop (armas, armaduras, joias, fashion). */
export const equipmentCatalog: readonly WorkshopItem[] = equipment;

/** Itens de consumo — pedras, scrolls, smelting (`category: upgrade`). */
export const consumableCatalog: readonly ConsumableItem[] = consumables;

export function getEquipmentById(id: string): WorkshopItem | undefined {
  return equipmentById.get(id);
}

export function getConsumableById(id: string): ConsumableItem | undefined {
  return consumableById.get(id);
}

export function requireConsumableById(id: string): ConsumableItem {
  const item = getConsumableById(id);
  if (!item) {
    throw new Error(`Consumable "${id}" não está em consumables.json`);
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