import { describe, expect, it } from "vitest";
import { getItemById } from "../items/catalog";
import type { WorkshopItem } from "../items/item";
import { getWorkshopTabIds } from "../workshop/ui-rules";
import {
  gearServiceCapabilities,
  gearShowsServicesSubTab,
  reductionScrollDelta,
  transyItemForRequiredLevel,
} from "./gear-service-rules";

function gear(id: string): WorkshopItem {
  const item = getItemById(id);
  if (!item || (item.type !== "weapon" && item.type !== "armor" && item.type !== "jewel")) {
    throw new Error(`Expected gear ${id}`);
  }
  return item as WorkshopItem;
}

describe("gear service rules", () => {
  it("ultimate weapon: reduction + unbind, no transy", () => {
    const axe = gear("lusaka-axe");
    const cap = gearServiceCapabilities(axe);
    expect(cap.levelReduction).toBe(true);
    expect(cap.genderTransy).toBe(false);
    expect(cap.scrollUnbinding).toBe(true);
    expect(gearShowsServicesSubTab(axe)).toBe(true);
  });

  it("helmet with gender: transy enabled", () => {
    const helm = gear("vigor-helm");
    expect(helm.workshopGear.requiredGender).toBe("F");
    expect(gearServiceCapabilities(helm).genderTransy).toBe(true);
  });

  it("jewel: no services main tab", () => {
    const ring = gear("intelli-ring");
    expect(gearShowsServicesSubTab(ring)).toBe(false);
    expect(getWorkshopTabIds(ring)).not.toContain("services");
  });

  it("reduction deltas and transy tier", () => {
    expect(reductionScrollDelta("scroll-reduction-a")).toBe(10);
    expect(reductionScrollDelta("scroll-reduction-b")).toBe(5);
    expect(transyItemForRequiredLevel(55)).toBe("item-transy-a");
    expect(transyItemForRequiredLevel(125)).toBe("item-transy-b");
  });
});