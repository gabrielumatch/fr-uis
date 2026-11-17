import { useCallback, useSyncExternalStore } from "react";
import type { InventoryTabId } from "../data/inventory/types";
import { DEFAULT_ROUTE, type WorkshopRoute } from "../data/workshop/route-types";
import {
  defaultWorkshopItemId,
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
  workshopItemId: defaultWorkshopItemId(),
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
  return {
    route: DEFAULT_ROUTE,
    inventoryTab: "weapons",
    workshopItemId: defaultWorkshopItemId(),
  };
}

function mergeAndWriteUrl(partial: Partial<WorkshopAppUrlState>): void {
  const current = readAppStateFromUrl();
  writeWorkshopAppUrl({ ...current, ...partial });
  invalidateUrlCache();
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function readRouteFromUrl(): WorkshopRoute {
  return readAppStateFromUrl().route;
}

/** @deprecated hashes — use query params via writeWorkshopAppUrl */
export function writeRouteToUrl(route: WorkshopRoute): void {
  mergeAndWriteUrl({ route });
}

export function useWorkshopRoute() {
  const appState = useSyncExternalStore(
    subscribeUrl,
    readAppStateFromUrl,
    getServerSnapshot,
  );

  const setRoute = useCallback((next: WorkshopRoute) => {
    mergeAndWriteUrl({ route: next });
  }, []);

  const setInventoryTab = useCallback((inventoryTab: InventoryTabId) => {
    mergeAndWriteUrl({ inventoryTab });
  }, []);

  const setWorkshopItemId = useCallback((workshopItemId: string) => {
    mergeAndWriteUrl({ workshopItemId });
  }, []);

  return {
    route: appState.route,
    inventoryTab: appState.inventoryTab,
    workshopItemId: appState.workshopItemId,
    setRoute,
    setInventoryTab,
    setWorkshopItemId,
    DEFAULT_ROUTE,
  };
}