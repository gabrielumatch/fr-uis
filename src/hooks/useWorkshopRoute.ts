import { useCallback, useSyncExternalStore } from "react";
import type { InventoryTabId } from "../data/inventory/types";
import { DEFAULT_ROUTE, type WorkshopRoute } from "../data/workshop/route-types";
import {
  parseWorkshopAppUrl,
  urlSnapshotKey,
  writeWorkshopAppUrl,
  type WorkshopAppUrlState,
} from "../data/workshop/route-url";

export type {
  UpgradeSub,
  PiercingSub,
  ElementSub,
  SkinsSub,
  WorkshopRoute,
} from "../data/workshop/route-types";

export { DEFAULT_ROUTE } from "../data/workshop/route-types";

let cachedKey = "";
let cachedState: WorkshopAppUrlState = {
  route: DEFAULT_ROUTE,
  inventoryTab: "weapons",
};

function readAppStateFromUrl(): WorkshopAppUrlState {
  const key = urlSnapshotKey();
  if (key === cachedKey) return cachedState;
  cachedKey = key;
  cachedState = parseWorkshopAppUrl();
  return cachedState;
}

function invalidateUrlCache(): void {
  cachedKey = "";
}

function subscribeUrl(onChange: () => void) {
  const handler = () => {
    invalidateUrlCache();
    onChange();
  };
  window.addEventListener("hashchange", handler);
  window.addEventListener("popstate", handler);
  return () => {
    window.removeEventListener("hashchange", handler);
    window.removeEventListener("popstate", handler);
  };
}

function getServerSnapshot(): WorkshopAppUrlState {
  return { route: DEFAULT_ROUTE, inventoryTab: "weapons" };
}

export function readRouteFromUrl(): WorkshopRoute {
  return readAppStateFromUrl().route;
}

/** @deprecated hashes — use query params via writeWorkshopAppUrl */
export function writeRouteToUrl(route: WorkshopRoute): void {
  const current = readAppStateFromUrl();
  writeWorkshopAppUrl({ route, inventoryTab: current.inventoryTab });
  invalidateUrlCache();
}

export function useWorkshopRoute() {
  const appState = useSyncExternalStore(
    subscribeUrl,
    readAppStateFromUrl,
    getServerSnapshot,
  );

  const setRoute = useCallback((next: WorkshopRoute) => {
    const inventoryTab = readAppStateFromUrl().inventoryTab;
    writeWorkshopAppUrl({ route: next, inventoryTab });
    invalidateUrlCache();
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  const setInventoryTab = useCallback((inventoryTab: InventoryTabId) => {
    const route = readAppStateFromUrl().route;
    writeWorkshopAppUrl({ route, inventoryTab });
    invalidateUrlCache();
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  return {
    route: appState.route,
    inventoryTab: appState.inventoryTab,
    setRoute,
    setInventoryTab,
    DEFAULT_ROUTE,
  };
}