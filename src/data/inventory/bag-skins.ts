import { getItemById } from "../items/catalog";
import { isSkinItem, type SkinItem, type WorkshopItem } from "../items/item";
import { filterSkinsForWorkshopHost } from "../workshop/ui-rules";
import { INVENTORY_BAG_SLOTS } from "./inventory-bag";

export function getBagSkinItems(): SkinItem[] {
  const skins: SkinItem[] = [];
  const seen = new Set<string>();
  for (const slot of INVENTORY_BAG_SLOTS) {
    if (seen.has(slot.itemId)) continue;
    const item = getItemById(slot.itemId);
    if (item && isSkinItem(item)) {
      seen.add(slot.itemId);
      skins.push(item);
    }
  }
  return skins;
}

/** Skins no inventário compatíveis com o item atual do workshop. */
export function getBagSkinsForWorkshopHost(host: WorkshopItem): SkinItem[] {
  return filterSkinsForWorkshopHost(getBagSkinItems(), host);
}