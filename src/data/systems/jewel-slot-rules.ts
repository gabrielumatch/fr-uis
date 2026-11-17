import type { WeaponJewelSocketRule } from "../items/types";
import {
  BARUNA_JEWEL_UNLOCK_PLUS,
  ULTIMATE_JEWEL_FIRST_PLUS,
  ULTIMATE_JEWEL_LAST_PLUS,
} from "../upgrade/gear-upgrade-policy";

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
    return BARUNA_JEWEL_UNLOCK_PLUS.filter((plus) => upgradeLevel >= plus).length;
  }

  if (upgradeLevel < ULTIMATE_JEWEL_FIRST_PLUS) return 0;
  return Math.min(
    upgradeLevel - (ULTIMATE_JEWEL_FIRST_PLUS - 1),
    MAX_JEWEL_SLOTS,
    ULTIMATE_JEWEL_LAST_PLUS - (ULTIMATE_JEWEL_FIRST_PLUS - 1),
  );
}

export function requiredUpgradeForJewelSlot(
  slotIndex: number,
  rule: WeaponJewelSocketRule = "ultimate",
): number {
  if (rule === "none") {
    throw new Error("Normal gear has no weapon jewel sockets");
  }
  if (rule === "baruna") {
    return BARUNA_JEWEL_UNLOCK_PLUS[slotIndex - 1] ?? BARUNA_JEWEL_UNLOCK_PLUS.at(-1)!;
  }
  return ULTIMATE_JEWEL_FIRST_PLUS + slotIndex - 1;
}