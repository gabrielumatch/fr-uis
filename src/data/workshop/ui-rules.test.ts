import { describe, expect, it } from "vitest";
import { getItemById } from "../items/catalog";
import {
  isSkinItem,
  isWorkshopHostItem,
  type SkinItem,
  type WorkshopHostItem,
} from "../items/item";
import { INVENTORY_BAG_SLOTS } from "../inventory/inventory-bag";
import { getBagSkinsForWorkshopHost } from "../inventory/bag-skins";
import {
  coerceWorkshopRoute,
  filterSkinsForWorkshopHost,
  getSkinsSubTabIds,
  getUpgradeSubTabIds,
  getWorkshopTabIds,
  isInventoryOnlyCatalogItem,
  isSkinListedInSkinsTab,
  itemOpensWorkshopUi,
  resolveWorkshopSidebarItem,
} from "./ui-rules";
import { DEFAULT_ROUTE } from "../../hooks/useWorkshopRoute";

function requireWorkshopHost(id: string): WorkshopHostItem {
  const item = getItemById(id);
  if (!item || !isWorkshopHostItem(item)) {
    throw new Error(`Expected workshop host "${id}"`);
  }
  return item;
}

function requireWorkshopItem(id: string): import("../items/item").WorkshopItem {
  const item = requireWorkshopHost(id);
  if (item.type === "pet") {
    throw new Error(`Expected gear, not pet "${id}"`);
  }
  return item;
}

function requireSkin(id: string): SkinItem {
  const item = getItemById(id);
  if (!item || !isSkinItem(item)) throw new Error(`Expected skin "${id}"`);
  return item;
}

describe("workshop UI routing", () => {
  it("weapon/armor/jewel open workshop UI from bag", () => {
    expect(itemOpensWorkshopUi(requireWorkshopItem("lusaka-axe"))).toBe(true);
    expect(itemOpensWorkshopUi(requireWorkshopItem("vigor-helm"))).toBe(true);
    expect(itemOpensWorkshopUi(requireWorkshopItem("intelli-ring"))).toBe(true);
  });

  it("raised pet opens workshop; pickup pet does not", () => {
    expect(itemOpensWorkshopUi(requireWorkshopHost("pet-lion"))).toBe(true);
    expect(itemOpensWorkshopUi(getItemById("pet-unicorn")!)).toBe(false);
  });

  it("skin, wing never open workshop UI from bag", () => {
    expect(itemOpensWorkshopUi(requireSkin("spectre-axe"))).toBe(false);
    expect(itemOpensWorkshopUi(getItemById("ankou-cloak")!)).toBe(false);
  });

  it("workshop sidebar is always the equipped gear, never a bag skin", () => {
    const axe = requireWorkshopItem("lusaka-axe");
    const sidebar = resolveWorkshopSidebarItem(axe);
    expect(sidebar.id).toBe(axe.id);
    expect(sidebar.type).toBe("weapon");
  });

  it("marks skin/wing as inventory-only catalog items", () => {
    expect(isInventoryOnlyCatalogItem(requireSkin("spectre-axe"))).toBe(true);
    expect(isInventoryOnlyCatalogItem(getItemById("ankou-cloak")!)).toBe(true);
    expect(isInventoryOnlyCatalogItem(requireWorkshopItem("hotter-sword"))).toBe(false);
  });
});

describe("accessory jewelry (ring/necklace/earring)", () => {
  it("only upgrade main tab — no element/piercing/awake/skins", () => {
    const ring = requireWorkshopItem("intelli-ring");
    expect(getWorkshopTabIds(ring)).toEqual(["upgrade"]);
    expect(getUpgradeSubTabIds(ring)).toEqual(["level"]);
    expect(ring.upgrade.material).toBe("moonstone");
    expect(ring.upgrade.protect).toBe("aprotect");
  });

  it("coerces illegal routes to accessory upgrade level", () => {
    const ring = requireWorkshopItem("intelli-ring");
    const coerced = coerceWorkshopRoute(
      { ...DEFAULT_ROUTE, tabId: "element", upgradeSub: "jewels" },
      ring,
    );
    expect(coerced.tabId).toBe("upgrade");
    expect(coerced.upgradeSub).toBe("level");
  });
});

describe("raised pet workshop tabs", () => {
  it("exposes feed, growth, awake only", () => {
    const lion = requireWorkshopHost("pet-lion");
    expect(getWorkshopTabIds(lion)).toEqual(["feed", "growth", "awake"]);
  });
});

describe("skins sub-tabs", () => {
  it("remove sub-tab not navigable until a skin is applied", () => {
    const suit = requireWorkshopItem("mystique-suit");
    expect(suit.workshopSkin.hasSkinApplied).toBe(false);
    expect(getSkinsSubTabIds(suit)).toEqual(["apply"]);

    const coerced = coerceWorkshopRoute(
      { ...DEFAULT_ROUTE, tabId: "skins", skinsSub: "remove" },
      suit,
    );
    expect(coerced.skinsSub).toBe("apply");
  });

  it("apply not navigable while a skin is applied", () => {
    const suit = requireWorkshopItem("mystique-suit");
    suit.workshopSkin.hasSkinApplied = true;
    expect(getSkinsSubTabIds(suit)).toEqual(["remove"]);

    const coerced = coerceWorkshopRoute(
      { ...DEFAULT_ROUTE, tabId: "skins", skinsSub: "apply" },
      suit,
    );
    expect(coerced.skinsSub).toBe("remove");
    suit.workshopSkin.hasSkinApplied = false;
  });
});

describe("skins tab listing by workshop item type", () => {
  it("axe skins fit lusaka-axe, not ryvius-sword", () => {
    const axe = requireWorkshopItem("lusaka-axe");
    const sword = requireWorkshopItem("ryvius-sword");
    const spectre = requireSkin("spectre-axe");
    const smiter = requireSkin("smiter-sword");

    expect(isSkinListedInSkinsTab(spectre, axe)).toBe(true);
    expect(isSkinListedInSkinsTab(spectre, sword)).toBe(false);
    expect(isSkinListedInSkinsTab(smiter, sword)).toBe(true);
    expect(isSkinListedInSkinsTab(smiter, axe)).toBe(false);
  });

  it("bag skins filtered for current workshop host subtype", () => {
    const axe = requireWorkshopItem("lusaka-axe");
    const sword = requireWorkshopItem("ryvius-sword");

    const forAxe = getBagSkinsForWorkshopHost(axe).map((s) => s.id);
    const forSword = getBagSkinsForWorkshopHost(sword).map((s) => s.id);

    expect(forAxe).toContain("spectre-axe");
    expect(forAxe).not.toContain("smiter-sword");
    expect(forSword).toContain("smiter-sword");
    expect(forSword).not.toContain("spectre-axe");
  });

  it("every bag skin itemId resolves and filter is consistent", () => {
    const bagSkins = INVENTORY_BAG_SLOTS.map((s) => s.itemId)
      .filter((id, i, arr) => arr.indexOf(id) === i)
      .map((id) => getItemById(id))
      .filter((item): item is SkinItem => Boolean(item && isSkinItem(item)));

    const axe = requireWorkshopItem("lusaka-axe");
    const listed = filterSkinsForWorkshopHost(bagSkins, axe);
    for (const skin of listed) {
      expect(isSkinListedInSkinsTab(skin, axe)).toBe(true);
    }
  });
});