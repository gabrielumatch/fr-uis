import { getItemById } from "../items/catalog";
import {
  isSkinItem,
  type SkinItem,
  type WorkshopItem,
} from "../items/item";
import type { SkinSlot } from "../items/types";

export type { SkinSlot };

export function skinFitsHost(skin: SkinItem, host: WorkshopItem): boolean {
  return skin.skinSlot === host.subtype;
}

export function getSkinItemById(id: string): SkinItem | undefined {
  const item = getItemById(id);
  return item && isSkinItem(item) ? item : undefined;
}

export function canApplySkinIdToEquipped(skinId: string, host: WorkshopItem): boolean {
  const skin = getSkinItemById(skinId);
  if (!skin) return false;
  return skinFitsHost(skin, host);
}