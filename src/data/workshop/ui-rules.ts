import type { CatalogItem, SkinItem, WorkshopItem } from "../items/item";
import {
  isSkinItem,
  isWingItem,
  opensWorkshopUpgrade,
} from "../items/item";
import { skinFitsHost } from "../systems/skin-rules";

/** Bag click: só gear com upgrade abre o bloco workshop (scroll + painel). */
export function itemOpensWorkshopUi(item: CatalogItem): boolean {
  return opensWorkshopUpgrade(item);
}

/** Sidebar do workshop nunca mostra skin/wing/pet — só o gear em edição. */
export function resolveWorkshopSidebarItem(equipped: WorkshopItem): WorkshopItem {
  return equipped;
}

export function isInventoryOnlyCatalogItem(item: CatalogItem): boolean {
  return isSkinItem(item) || isWingItem(item) || item.type === "pet" || item.type === "quest";
}

/** Skins na aba Skins: mesmo `skinSlot` que o `subtype` do Workshop Item. */
export function filterSkinsForWorkshopHost(
  skins: readonly SkinItem[],
  host: WorkshopItem,
): SkinItem[] {
  return skins.filter((skin) => skinFitsHost(skin, host));
}

export function isSkinListedInSkinsTab(skin: SkinItem, host: WorkshopItem): boolean {
  return skinFitsHost(skin, host);
}