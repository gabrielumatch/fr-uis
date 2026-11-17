import { resolveTabIdAlias, isKnownWorkshopTabId } from "../../tabs/tab-ids";
import { getWorkshopHostById, workshopHostCatalog } from "../items/catalog";
import { resolveInventoryTab, type InventoryTabId } from "../inventory/display";
import type { WorkshopRoute } from "./route-types";
import { DEFAULT_ROUTE } from "./route-types";

const Q = {
  workshopTab: "workshop_tab",
  subtab: "subtab",
  inventory: "inventory",
  workshopItem: "workshop_item",
} as const;

export type WorkshopAppUrlState = {
  route: WorkshopRoute;
  inventoryTab: InventoryTabId;
  workshopItemId: string;
};

export function defaultWorkshopItemId(): string {
  return workshopHostCatalog[0]?.id ?? "";
}

function resolveWorkshopItemId(raw: string | null): string {
  const fallback = defaultWorkshopItemId();
  if (!raw?.trim()) return fallback;
  return getWorkshopHostById(raw.trim()) ? raw.trim() : fallback;
}

function normalizeUpgradeSub(raw: string): WorkshopRoute["upgradeSub"] {
  if (raw === "jewels" || raw === "jewel" || raw === "jwel") return "jewels";
  return "level";
}

function normalizePiercingSub(raw: string): WorkshopRoute["piercingSub"] {
  return raw === "cards" ? "cards" : "pierce";
}

function normalizeElementSub(raw: string): WorkshopRoute["elementSub"] {
  return raw === "change" ? "change" : "upgrade";
}

function normalizeSkinsSub(raw: string): WorkshopRoute["skinsSub"] {
  return raw === "remove" ? "remove" : "apply";
}

function normalizeFeedSub(raw: string): WorkshopRoute["feedSub"] {
  return raw === "craft" ? "craft" : "give";
}

function normalizeGrowthSub(raw: string): WorkshopRoute["growthSub"] {
  return raw === "reroll" ? "reroll" : "advance";
}

function subtabFromRoute(route: WorkshopRoute): string {
  switch (route.tabId) {
    case "upgrade":
      return route.upgradeSub;
    case "piercing":
      return route.piercingSub;
    case "element":
      return route.elementSub;
    case "skins":
      return route.skinsSub;
    case "feed":
      return route.feedSub;
    case "growth":
      return route.growthSub;
    default:
      return "level";
  }
}

function applySubtab(route: WorkshopRoute, subtab: string): WorkshopRoute {
  switch (route.tabId) {
    case "upgrade":
      return { ...route, upgradeSub: normalizeUpgradeSub(subtab) };
    case "piercing":
      return { ...route, piercingSub: normalizePiercingSub(subtab) };
    case "element":
      return { ...route, elementSub: normalizeElementSub(subtab) };
    case "skins":
      return { ...route, skinsSub: normalizeSkinsSub(subtab) };
    case "feed":
      return { ...route, feedSub: normalizeFeedSub(subtab) };
    case "growth":
      return { ...route, growthSub: normalizeGrowthSub(subtab) };
    default:
      return route;
  }
}

function routeFromLegacyHash(raw: string): WorkshopRoute | null {
  if (!raw) return null;

  if (raw === "upgrade-jewels" || raw === "jewels") {
    return { ...DEFAULT_ROUTE, tabId: "upgrade", upgradeSub: "jewels" };
  }
  if (raw === "upgrade-level") {
    return { ...DEFAULT_ROUTE, tabId: "upgrade", upgradeSub: "level" };
  }
  if (raw === "piercing-cards") {
    return { ...DEFAULT_ROUTE, tabId: "piercing", piercingSub: "cards" };
  }
  if (raw === "piercing-pierce" || raw === "piercing") {
    return { ...DEFAULT_ROUTE, tabId: "piercing", piercingSub: "pierce" };
  }
  if (raw === "element-change") {
    return { ...DEFAULT_ROUTE, tabId: "element", elementSub: "change" };
  }
  if (raw === "element-upgrade" || raw === "element") {
    return { ...DEFAULT_ROUTE, tabId: "element", elementSub: "upgrade" };
  }
  if (raw === "skins-remove" || raw === "transmutation-revert") {
    return { ...DEFAULT_ROUTE, tabId: "skins", skinsSub: "remove" };
  }
  if (
    raw === "skins-apply" ||
    raw === "skins" ||
    raw === "transmutation-apply" ||
    raw === "transmutation"
  ) {
    return { ...DEFAULT_ROUTE, tabId: "skins", skinsSub: "apply" };
  }

  const tabId = resolveTabIdAlias(raw);
  if (tabId) {
    return { ...DEFAULT_ROUTE, tabId };
  }
  return null;
}

export function parseWorkshopAppUrl(href = location.href): WorkshopAppUrlState {
  const url = new URL(href);
  const params = url.searchParams;

  let route: WorkshopRoute = { ...DEFAULT_ROUTE };

  const workshopTab = params.get(Q.workshopTab);
  if (workshopTab && isKnownWorkshopTabId(workshopTab)) {
    route = { ...DEFAULT_ROUTE, tabId: workshopTab };
    const subtab = params.get(Q.subtab);
    if (subtab) {
      route = applySubtab(route, subtab);
    }
  } else {
    const hash = url.hash.replace(/^#/, "").trim();
    const legacyTab = params.get("tab");
    const legacy = routeFromLegacyHash(hash || legacyTab || "");
    if (legacy) route = legacy;
  }

  const inventoryRaw = params.get(Q.inventory);
  const inventoryTab = inventoryRaw
    ? resolveInventoryTab(inventoryRaw === "weapon" ? "weapons" : inventoryRaw)
    : "weapons";

  const workshopItemId = resolveWorkshopItemId(params.get(Q.workshopItem));

  return { route, inventoryTab, workshopItemId };
}

export function serializeWorkshopAppUrl(
  state: WorkshopAppUrlState,
  baseHref = location.href,
): string {
  const url = new URL(baseHref);
  url.searchParams.set(Q.workshopTab, state.route.tabId);
  url.searchParams.set(Q.subtab, subtabFromRoute(state.route));
  url.searchParams.set(Q.inventory, state.inventoryTab);
  if (state.workshopItemId) {
    url.searchParams.set(Q.workshopItem, state.workshopItemId);
  } else {
    url.searchParams.delete(Q.workshopItem);
  }
  url.hash = "";
  return `${url.pathname}${url.search}`;
}

export function writeWorkshopAppUrl(state: WorkshopAppUrlState): void {
  const next = serializeWorkshopAppUrl(state);
  const current = `${location.pathname}${location.search}`;
  if (current !== next) {
    history.replaceState(null, "", next);
  }
}

export function urlSnapshotKey(): string {
  return `${location.pathname}${location.search}${location.hash}`;
}