import { describe, expect, it } from "vitest";
import { getItemById } from "../items/catalog";
import type { WorkshopItem } from "../items/item";
import { getUpgradeSubTabIds, getWorkshopTabIds } from "./ui-rules";
import { workshopGearProfile } from "./workshop-capabilities";

function gear(id: string): WorkshopItem {
  const item = getItemById(id);
  if (!item || item.type === "skin" || item.type === "wing") {
    throw new Error(`Expected gear ${id}`);
  }
  return item as WorkshopItem;
}

describe("armor set piece vs suit workshop rules", () => {
  it("helmet/gauntlet/boots: upgrade + awake + skins only", () => {
    for (const id of ["vigor-helm", "bilari-gauntlet-f", "bilari-boots-f"]) {
      const item = gear(id);
      expect(getWorkshopTabIds(item)).toEqual(["upgrade", "services", "awake", "skins"]);
      expect(getUpgradeSubTabIds(item)).toEqual(["level"]);
      expect(workshopGearProfile(item).allowsElement).toBe(false);
    }
  });

  it("suit: element + piercing + awake + skins, sem jewels no upgrade", () => {
    const suit = gear("mystique-suit");
    expect(getWorkshopTabIds(suit)).toEqual([
      "upgrade",
      "services",
      "element",
      "piercing",
      "awake",
      "skins",
    ]);
    expect(getUpgradeSubTabIds(suit)).toEqual(["level"]);
    expect(workshopGearProfile(suit).piercingSlotMax).toBe(4);
    expect(workshopGearProfile(suit).cardSlotMax).toBe(4);
    expect(workshopGearProfile(suit).elementLevelMax).toBe(20);
  });

  it("weapon keeps full workshop + jewel sub-tab", () => {
    const axe = gear("lusaka-axe");
    expect(getWorkshopTabIds(axe)).toContain("element");
    expect(getWorkshopTabIds(axe)).toContain("piercing");
    expect(getUpgradeSubTabIds(axe)).toContain("jewels");
    expect(getWorkshopTabIds(axe)).toContain("services");
  });
});