import type { CatalogItem, SkinItem, WorkshopItem } from "../items/item";
import {
  isSkinItem,
  isWingItem,
  opensWorkshopUpgrade,
} from "../items/item";
import { skinFitsHost } from "../systems/skin-rules";
import type { WorkshopRoute } from "./route-types";

export const WORKSHOP_MAIN_TAB_IDS = [
  "upgrade",
  "element",
  "piercing",
  "awake",
  "skins",
] as const;

export type WorkshopMainTabId = (typeof WORKSHOP_MAIN_TAB_IDS)[number];

export function isAccessoryJewelryItem(item: WorkshopItem): boolean {
  return item.type === "jewel";
}

/** Abas principais do workshop para o item equipado. */
export function getWorkshopTabIds(item: WorkshopItem): WorkshopMainTabId[] {
  if (isAccessoryJewelryItem(item)) {
    return ["upgrade"];
  }
  return [...WORKSHOP_MAIN_TAB_IDS];
}

/** Sub-abas em Upgrade — jewelry só Safe +, sem jewel sockets. */
export function getUpgradeSubTabIds(
  item: WorkshopItem,
): readonly ("level" | "jewels")[] {
  if (isAccessoryJewelryItem(item)) {
    return ["level"];
  }
  return ["level", "jewels"];
}

export function coerceWorkshopRoute(
  route: WorkshopRoute,
  item: WorkshopItem,
): WorkshopRoute {
  const allowed = new Set(getWorkshopTabIds(item));
  const tabId = allowed.has(route.tabId as WorkshopMainTabId)
    ? route.tabId
    : "upgrade";

  let upgradeSub = route.upgradeSub;
  if (tabId === "upgrade" && isAccessoryJewelryItem(item)) {
    upgradeSub = "level";
  }

  return {
    ...route,
    tabId,
    upgradeSub,
  };
}

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