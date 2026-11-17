import { describe, expect, it } from "vitest";
import { parseWorkshopAppUrl, serializeWorkshopAppUrl } from "./route-url";
import { DEFAULT_ROUTE } from "./route-types";

const BASE = "http://localhost:5173/";

describe("workshop URL query params", () => {
  it("parses workshop_tab, subtab, inventory, workshop_item", () => {
    const state = parseWorkshopAppUrl(
      `${BASE}?workshop_tab=upgrade&subtab=jewels&inventory=armor&workshop_item=mystique-suit`,
    );
    expect(state.route.tabId).toBe("upgrade");
    expect(state.route.upgradeSub).toBe("jewels");
    expect(state.inventoryTab).toBe("armor");
    expect(state.workshopItemId).toBe("mystique-suit");
  });

  it("falls back when workshop_item is unknown", () => {
    const state = parseWorkshopAppUrl(
      `${BASE}?workshop_item=not-a-real-item`,
    );
    expect(state.workshopItemId).not.toBe("not-a-real-item");
    expect(state.workshopItemId.length).toBeGreaterThan(0);
  });

  it("accepts subtab aliases jewel/jwel", () => {
    const fromJewel = parseWorkshopAppUrl(
      `${BASE}?workshop_tab=upgrade&subtab=jewel&inventory=weapons`,
    );
    const fromJwel = parseWorkshopAppUrl(
      `${BASE}?workshop_tab=upgrade&subtab=jwel&inventory=weapon`,
    );
    expect(fromJewel.route.upgradeSub).toBe("jewels");
    expect(fromJwel.route.upgradeSub).toBe("jewels");
    expect(fromJwel.inventoryTab).toBe("weapons");
  });

  it("round-trips serialize", () => {
    const state = {
      route: { ...DEFAULT_ROUTE, tabId: "element", elementSub: "change" as const },
      inventoryTab: "pets" as const,
      workshopItemId: "lusaka-axe",
    };
    const href = `${BASE.slice(0, -1)}${serializeWorkshopAppUrl(state, BASE)}`;
    const parsed = parseWorkshopAppUrl(href);
    expect(parsed.route.tabId).toBe("element");
    expect(parsed.route.elementSub).toBe("change");
    expect(parsed.inventoryTab).toBe("pets");
    expect(parsed.workshopItemId).toBe("lusaka-axe");
  });

  it("legacy hash still works when query missing", () => {
    const state = parseWorkshopAppUrl(`${BASE}#upgrade-jewels`);
    expect(state.route.tabId).toBe("upgrade");
    expect(state.route.upgradeSub).toBe("jewels");
  });
});