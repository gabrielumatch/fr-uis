import { useCallback, useSyncExternalStore } from "react";
import { getTabById, TAB_HASH_ALIASES } from "../tabs/registry";

const DEFAULT_TAB = "upgrade";

export type UpgradeSub = "level" | "jewels";
export type PiercingSub = "pierce" | "cards";
export type ElementSub = "upgrade" | "change";
export type SkinsSub = "apply" | "remove";

export type WorkshopRoute = {
  tabId: string;
  upgradeSub: UpgradeSub;
  piercingSub: PiercingSub;
  elementSub: ElementSub;
  skinsSub: SkinsSub;
};

export const DEFAULT_ROUTE: WorkshopRoute = {
  tabId: DEFAULT_TAB,
  upgradeSub: "level",
  piercingSub: "pierce",
  elementSub: "upgrade",
  skinsSub: "apply",
};

function routeKeyFromUrl(): string {
  const hash = location.hash.replace(/^#/, "").trim();
  const tab = new URLSearchParams(location.search).get("tab") ?? "";
  return `${hash}\0${tab}`;
}

function computeRouteFromUrl(): WorkshopRoute {
  const raw =
    location.hash.replace(/^#/, "").trim() ||
    new URLSearchParams(location.search).get("tab") ||
    "";

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

  const tabId = TAB_HASH_ALIASES[raw] ?? raw;
  if (tabId && getTabById(tabId)) {
    return { ...DEFAULT_ROUTE, tabId };
  }

  return DEFAULT_ROUTE;
}

/** Snapshot estável — useSyncExternalStore exige referência estável entre renders. */
let cachedRouteKey = "";
let cachedRoute: WorkshopRoute = DEFAULT_ROUTE;

export function readRouteFromUrl(): WorkshopRoute {
  const key = routeKeyFromUrl();
  if (key === cachedRouteKey) {
    return cachedRoute;
  }
  cachedRouteKey = key;
  cachedRoute = computeRouteFromUrl();
  return cachedRoute;
}

export function writeRouteToUrl(route: WorkshopRoute): void {
  let hash = route.tabId;

  if (route.tabId === "upgrade" && route.upgradeSub === "jewels") {
    hash = "upgrade-jewels";
  } else if (route.tabId === "upgrade") {
    hash = "upgrade";
  } else if (route.tabId === "piercing" && route.piercingSub === "cards") {
    hash = "piercing-cards";
  } else if (route.tabId === "piercing") {
    hash = "piercing";
  } else if (route.tabId === "element" && route.elementSub === "change") {
    hash = "element-change";
  } else if (route.tabId === "element") {
    hash = "element";
  } else if (route.tabId === "skins" && route.skinsSub === "remove") {
    hash = "skins-remove";
  } else if (route.tabId === "skins") {
    hash = "skins";
  }

  const next = `#${hash}`;
  if (location.hash === next) return;
  location.hash = next;
}

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getServerRouteSnapshot(): WorkshopRoute {
  return DEFAULT_ROUTE;
}

export function useWorkshopRoute() {
  const route = useSyncExternalStore(
    subscribeHash,
    readRouteFromUrl,
    getServerRouteSnapshot,
  );

  const setRoute = useCallback((next: WorkshopRoute) => {
    writeRouteToUrl(next);
  }, []);

  return { route, setRoute, DEFAULT_ROUTE };
}