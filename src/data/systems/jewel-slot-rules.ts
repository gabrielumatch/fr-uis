import type { WeaponJewelSocketRule } from "../items/types";

export const MAX_JEWEL_SLOTS = 5;

/** @deprecated use MAX_JEWEL_SLOTS */
export const MAX_JEWEL_SLOTS_CLASSIC = MAX_JEWEL_SLOTS;

export function maxJewelSlotsForRule(rule: WeaponJewelSocketRule): number {
  return rule === "none" ? 0 : MAX_JEWEL_SLOTS;
}

export function unlockedJewelSlotCount(
  upgradeLevel: number,
  rule: WeaponJewelSocketRule = "ultimate",
): number {
  if (rule === "none") return 0;

  if (rule === "baruna") {
    if (upgradeLevel < 12) return 0;
    if (upgradeLevel <= 13) return 1;
    if (upgradeLevel <= 15) return 2;
    if (upgradeLevel <= 17) return 3;
    if (upgradeLevel <= 19) return 4;
    return 5;
  }

  if (upgradeLevel < 6) return 0;
  return Math.min(upgradeLevel - 5, MAX_JEWEL_SLOTS);
}

export function requiredUpgradeForJewelSlot(
  slotIndex: number,
  rule: WeaponJewelSocketRule = "ultimate",
): number {
  if (rule === "baruna") {
    const thresholds = [12, 14, 16, 18, 20];
    return thresholds[slotIndex - 1] ?? 20;
  }
  return slotIndex + 5;
}