import { describe, expect, it } from "vitest";
import { getItemById } from "../items/catalog";
import { isSkinItem, type SkinItem, type WorkshopItem } from "../items/item";
import { INVENTORY_BAG_SLOTS } from "../inventory/inventory-bag";
import { getBagSkinsForWorkshopHost } from "../inventory/bag-skins";
import {
  filterSkinsForWorkshopHost,
  isInventoryOnlyCatalogItem,
  isSkinListedInSkinsTab,
  itemOpensWorkshopUi,
  resolveWorkshopSidebarItem,
} from "./ui-rules";

function requireWorkshopItem(id: string): WorkshopItem {
  const item = getItemById(id);
  if (!item || item.type === "skin" || item.type === "wing" || item.type === "pet") {
    throw new Error(`Expected workshop gear "${id}"`);
  }
  return item as WorkshopItem;
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

  it("skin, wing, pet never open workshop UI from bag", () => {
    expect(itemOpensWorkshopUi(requireSkin("spectre-axe"))).toBe(false);
    expect(itemOpensWorkshopUi(getItemById("ankou-cloak")!)).toBe(false);
    expect(itemOpensWorkshopUi(getItemById("pet-lion")!)).toBe(false);
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