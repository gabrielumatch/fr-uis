import type { CatalogItem, SkinItem, WorkshopHostItem, WorkshopItem } from "../items/item";
import {
  isPickupPetItem,
  isRaisedPetItem,
  isSkinItem,
  isWingItem,
  isWorkshopGearItem,
  opensWorkshopHost,
} from "../items/item";
import { skinFitsHost } from "../systems/skin-rules";
import type { FeedSub, GrowthSub, SkinsSub } from "./route-types";
import type { WorkshopRoute } from "./route-types";
import { workshopGearProfile } from "./workshop-capabilities";
import {
  workshopHostProfile,
  workshopHostTabIds,
  type WorkshopHostTabId,
} from "./workshop-host-profile";

export const WORKSHOP_MAIN_TAB_IDS = [
  "upgrade",
  "element",
  "piercing",
  "awake",
  "skins",
  "feed",
  "growth",
] as const;

export type WorkshopMainTabId = (typeof WORKSHOP_MAIN_TAB_IDS)[number];

export function isAccessoryJewelryItem(item: WorkshopItem): boolean {
  return item.type === "jewel";
}

/** Abas do workshop para o host equipado (gear ou pet raised). */
export function getWorkshopTabIds(item: WorkshopHostItem): WorkshopHostTabId[] {
  return workshopHostTabIds(item);
}

export function getUpgradeSubTabIds(
  item: WorkshopHostItem,
): readonly ("level" | "jewels")[] {
  if (!isWorkshopGearItem(item)) return ["level"];
  return workshopGearProfile(item).upgradeSubs;
}

export function getFeedSubTabIds(_item: WorkshopHostItem): readonly FeedSub[] {
  return ["craft", "give"];
}

export function getGrowthSubTabIds(_item: WorkshopHostItem): readonly GrowthSub[] {
  return ["advance", "reroll"];
}

export function getSkinsSubTabIds(item: WorkshopHostItem): readonly SkinsSub[] {
  if (!isWorkshopGearItem(item)) return ["apply"];
  if (item.workshopSkin.hasSkinApplied) return ["remove"];
  return ["apply"];
}

export function defaultSkinsSub(item: WorkshopHostItem): SkinsSub {
  if (!isWorkshopGearItem(item)) return "apply";
  return item.workshopSkin.hasSkinApplied ? "remove" : "apply";
}

export function defaultTabForHost(item: WorkshopHostItem): WorkshopHostTabId {
  const profile = workshopHostProfile(item);
  return profile.mainTabs[0] ?? "upgrade";
}

export function defaultRouteForHost(item: WorkshopHostItem): WorkshopRoute {
  const tabId = defaultTabForHost(item);
  if (isRaisedPetItem(item)) {
    return {
      tabId,
      feedSub: "give",
      growthSub: "advance",
      upgradeSub: "level",
      piercingSub: "pierce",
      elementSub: "upgrade",
      skinsSub: "apply",
    };
  }
  return {
    tabId: "upgrade",
    upgradeSub: "level",
    piercingSub: "pierce",
    elementSub: "upgrade",
    skinsSub: "apply",
    feedSub: "give",
    growthSub: "advance",
  };
}

export function coerceWorkshopRoute(
  route: WorkshopRoute,
  item: WorkshopHostItem,
): WorkshopRoute {
  const allowed = new Set(getWorkshopTabIds(item));
  const fallbackTab = defaultTabForHost(item);
  const tabId = allowed.has(route.tabId as WorkshopHostTabId)
    ? route.tabId
    : fallbackTab;

  let upgradeSub = route.upgradeSub;
  if (tabId === "upgrade" && isWorkshopGearItem(item)) {
    if (!workshopGearProfile(item).upgradeSubs.includes("jewels")) {
      upgradeSub = "level";
    }
  }

  let skinsSub = route.skinsSub;
  if (tabId === "skins" && !getSkinsSubTabIds(item).includes(skinsSub)) {
    skinsSub = defaultSkinsSub(item);
  }

  let feedSub = route.feedSub;
  if (tabId === "feed" && !getFeedSubTabIds(item).includes(feedSub)) {
    feedSub = "give";
  }

  let growthSub = route.growthSub;
  if (tabId === "growth" && !getGrowthSubTabIds(item).includes(growthSub)) {
    growthSub = "advance";
  }

  return {
    ...route,
    tabId,
    upgradeSub,
    skinsSub,
    feedSub,
    growthSub,
  };
}

/** Bag click: gear safe+ ou pet raised abre o workshop. */
export function itemOpensWorkshopUi(item: CatalogItem): boolean {
  return opensWorkshopHost(item);
}

export function resolveWorkshopSidebarItem(equipped: WorkshopHostItem): WorkshopHostItem {
  return equipped;
}

export function isInventoryOnlyCatalogItem(item: CatalogItem): boolean {
  return (
    isSkinItem(item) ||
    isWingItem(item) ||
    isPickupPetItem(item) ||
    item.type === "quest"
  );
}

export function filterSkinsForWorkshopHost(
  skins: readonly SkinItem[],
  host: WorkshopHostItem,
): SkinItem[] {
  if (!isWorkshopGearItem(host)) return [];
  return skins.filter((skin) => skinFitsHost(skin, host));
}

export function isSkinListedInSkinsTab(skin: SkinItem, host: WorkshopHostItem): boolean {
  if (!isWorkshopGearItem(host)) return false;
  return skinFitsHost(skin, host);
}