import { equipmentCatalog } from "../items/catalog";
import type { WorkshopItem } from "../items/workshop-item";

const inventory: WorkshopItem[] = [...equipmentCatalog];

export const workshopInventory: readonly WorkshopItem[] = inventory;

export let activeWorkshopItemId: string = inventory[0].id;

export let equippedItem: WorkshopItem = inventory[0];

export function selectWorkshopItem(id: string): boolean {
  if (id === activeWorkshopItemId) return false;
  const next = inventory.find((item) => item.id === id);
  if (!next) return false;
  activeWorkshopItemId = id;
  equippedItem = next;
  return true;
}

export function getWorkshopItemById(id: string): WorkshopItem | undefined {
  return inventory.find((item) => item.id === id);
}

export type { WorkshopItem } from "../items/workshop-item";