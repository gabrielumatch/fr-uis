import type { ConsumableSubtype, ItemCategory } from "./types";
import type { ConsumableRecipeSlot } from "./consumable-record";

/** Item de consumo — mesma ideia de equipamento, `type: consumable`, `category: upgrade`. */
export type ConsumableItem = {
  id: string;
  name: string;
  type: "consumable";
  subtype: ConsumableSubtype;
  category: Extract<ItemCategory, "upgrade">;
  icon: string;
  typeLabel: string;
  recipeSlot?: ConsumableRecipeSlot;
};

export type CatalogItem = import("./workshop-item").WorkshopItem | ConsumableItem;

export function isConsumableItem(item: CatalogItem): item is ConsumableItem {
  return item.type === "consumable";
}