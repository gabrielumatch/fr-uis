import { describe, expect, it } from "vitest";
import { getItemById } from "../items/catalog";
import { GEAR_MAX_PLUS_BY_RECIPE } from "../upgrade/gear-upgrade-policy";
import {
  BARUNA_JEWEL_UNLOCK_PLUS,
  ULTIMATE_JEWEL_FIRST_PLUS,
} from "../upgrade/gear-upgrade-policy";
import {
  maxJewelSlotsForRule,
  requiredUpgradeForJewelSlot,
  unlockedJewelSlotCount,
} from "./jewel-slot-rules";

describe("gear max plus by recipe", () => {
  it("normal and ultimate cap at +10, baruna at +20", () => {
    expect(GEAR_MAX_PLUS_BY_RECIPE.normal).toBe(10);
    expect(GEAR_MAX_PLUS_BY_RECIPE.ultimate).toBe(10);
    expect(GEAR_MAX_PLUS_BY_RECIPE.baruna).toBe(20);
  });
});

describe("normal weapons — no jewel sockets", () => {
  it("never unlocks slots", () => {
    for (const plus of [0, 5, 10]) {
      expect(unlockedJewelSlotCount(plus, "none")).toBe(0);
      expect(maxJewelSlotsForRule("none")).toBe(0);
    }
  });

  it("hotter-sword hydrates without Jewels stat", () => {
    const item = getItemById("hotter-sword");
    expect(item?.type).toBe("weapon");
    expect(item && "upgrade" in item && item.upgrade.id).toBe("normal");
    expect(item && "stats" in item && item.stats.some((s) => s.label === "Jewels")).toBe(
      false,
    );
  });
});

describe("ultimate weapons — sockets +6 through +10", () => {
  it("unlocks one slot per level from +6 to +10", () => {
    expect(unlockedJewelSlotCount(5, "ultimate")).toBe(0);
    expect(unlockedJewelSlotCount(6, "ultimate")).toBe(1);
    expect(unlockedJewelSlotCount(7, "ultimate")).toBe(2);
    expect(unlockedJewelSlotCount(10, "ultimate")).toBe(5);
    expect(unlockedJewelSlotCount(15, "ultimate")).toBe(5);
  });

  it("slot index maps to required upgrade level", () => {
    expect(requiredUpgradeForJewelSlot(1, "ultimate")).toBe(ULTIMATE_JEWEL_FIRST_PLUS);
    expect(requiredUpgradeForJewelSlot(5, "ultimate")).toBe(10);
  });
});

describe("baruna weapons — sockets at +12/+14/+16/+18/+20", () => {
  it("unlocks only at listed thresholds", () => {
    expect(unlockedJewelSlotCount(11, "baruna")).toBe(0);
    expect(unlockedJewelSlotCount(12, "baruna")).toBe(1);
    expect(unlockedJewelSlotCount(13, "baruna")).toBe(1);
    expect(unlockedJewelSlotCount(14, "baruna")).toBe(2);
    expect(unlockedJewelSlotCount(18, "baruna")).toBe(4);
    expect(unlockedJewelSlotCount(20, "baruna")).toBe(5);
  });

  it("required level per slot matches BARUNA_JEWEL_UNLOCK_PLUS", () => {
    BARUNA_JEWEL_UNLOCK_PLUS.forEach((plus, i) => {
      expect(requiredUpgradeForJewelSlot(i + 1, "baruna")).toBe(plus);
    });
  });

  it("roikas-stave-baruna at +5 shows 0/5", () => {
    const item = getItemById("roikas-stave-baruna");
    if (!item || !("upgrade" in item) || !("stats" in item)) throw new Error("missing item");
    expect(item.upgrade.maxPlus).toBe(20);
    const jewels = item.stats.find((s) => s.label === "Jewels");
    expect(jewels?.value).toBe("0 / 5 unlocked");
  });
});