import { equipmentCatalog, getItemById } from "../items/catalog";
import {
  isSkinItem,
  isWorkshopItem,
  type CatalogItem,
  type WorkshopItem,
} from "../items/item";
import { skinFitsHost } from "../systems/skin-rules";

const workshopItems: WorkshopItem[] = [...equipmentCatalog];

export const workshopInventory: readonly WorkshopItem[] = workshopItems;

export let activeCatalogItemId: string = workshopItems[0]?.id ?? "";

export let activeWorkshopItemId: string = activeCatalogItemId;

export let equippedItem: WorkshopItem = workshopItems[0];

export function getActiveCatalogItem(): CatalogItem | undefined {
  return getItemById(activeCatalogItemId);
}

export function selectCatalogItem(id: string): boolean {
  const item = getItemById(id);
  if (!item) return false;

  activeCatalogItemId = id;

  if (isWorkshopItem(item)) {
    activeWorkshopItemId = id;
    equippedItem = item;
    return true;
  }

  if (isSkinItem(item) && item.hostItemId) {
    const host = getWorkshopItemById(item.hostItemId);
    if (host && skinFitsHost(item, host)) {
      activeWorkshopItemId = host.id;
      equippedItem = host;
    }
  }

  return true;
}

/** @deprecated use selectCatalogItem */
export const selectWorkshopItem = selectCatalogItem;

export function getWorkshopItemById(id: string): WorkshopItem | undefined {
  const item = getItemById(id);
  return item && isWorkshopItem(item) ? item : undefined;
}

export type { WorkshopItem } from "../items/item";