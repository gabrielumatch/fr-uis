import { workshopHostCatalog, getItemById } from "../items/catalog";
import {
  isWorkshopHostItem,
  type CatalogItem,
  type WorkshopHostItem,
} from "../items/item";

const workshopHosts: WorkshopHostItem[] = [...workshopHostCatalog];

export const workshopInventory: readonly WorkshopHostItem[] = workshopHosts;

export let activeCatalogItemId: string = workshopHosts[0]?.id ?? "";

export let activeWorkshopItemId: string = activeCatalogItemId;

export let equippedItem: WorkshopHostItem = workshopHosts[0];

export function getActiveCatalogItem(): CatalogItem | undefined {
  return getItemById(activeCatalogItemId);
}

export function selectCatalogItem(id: string): boolean {
  const item = getItemById(id);
  if (!item) return false;

  activeCatalogItemId = id;

  if (isWorkshopHostItem(item)) {
    activeWorkshopItemId = id;
    equippedItem = item;
    return true;
  }

  return true;
}

/** @deprecated use selectCatalogItem */
export const selectWorkshopItem = selectCatalogItem;

export function getWorkshopHostById(id: string): WorkshopHostItem | undefined {
  const item = getItemById(id);
  return item && isWorkshopHostItem(item) ? item : undefined;
}

/** @deprecated use getWorkshopHostById */
export const getWorkshopItemById = getWorkshopHostById;

export type { WorkshopHostItem, WorkshopItem } from "../items/item";