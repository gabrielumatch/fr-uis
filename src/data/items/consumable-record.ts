import type { ConsumableSubtype, ItemCategory } from "./types";

export type ConsumableRecipeSlot = "material" | "protect" | "smelting";

export type ConsumableItemRecord = {
  id: string;
  name: string;
  type: "consumable";
  subtype: ConsumableSubtype;
  category: Extract<ItemCategory, "upgrade">;
  typeLabel: string;
  iconKey?: string;
  iconEmoji?: string;
  recipeSlot?: ConsumableRecipeSlot;
};

export type ConsumablesCatalog = {
  schemaVersion: 1;
  items: ConsumableItemRecord[];
};