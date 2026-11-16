import { equippedItem } from "./equipped-item.js";
import {
  MAX_JEWEL_SLOTS_CLASSIC,
  unlockedJewelSlotCount,
  requiredUpgradeForJewelSlot,
} from "./jewel-slot-rules.js";

/**
 * Jewel slots vinculados ao + da arma — desbloqueiam a partir de +6.
 * @see workshop/docs/flyff-workshop-upgrade-mechanics.md
 */

/** @typedef {{
 *   id: string;
 *   name: string;
 *   icon: string;
 *   stat: string;
 *   bonus: string;
 * }} JewelType */

/** @type {JewelType[]} */
export const jewelTypes = [
  { id: "ruby", name: "Ruby Jewel", icon: "🔴", stat: "ATK", bonus: "+5%" },
  { id: "sapphire", name: "Sapphire Jewel", icon: "🔵", stat: "DEF", bonus: "+5%" },
  { id: "emerald", name: "Emerald Jewel", icon: "🟢", stat: "HP", bonus: "+5%" },
  { id: "topaz", name: "Topaz Jewel", icon: "🟡", stat: "STA", bonus: "+5%" },
  { id: "amethyst", name: "Amethyst Jewel", icon: "🟣", stat: "INT", bonus: "+5%" },
];

/** Joias equipadas no preview (só contam se o slot estiver desbloqueado). */
const equippedBySlotIndex = {
  1: jewelTypes[0],
  2: jewelTypes[1],
  3: jewelTypes[2],
  4: jewelTypes[3],
  5: jewelTypes[4],
};

/**
 * @typedef {{
 *   index: number;
 *   unlocked: boolean;
 *   requiredUpgrade: number;
 *   jewel: JewelType | null;
 * }} JewelSlotRow
 */

/**
 * @param {number} [upgradeLevel]
 * @returns {{
 *   upgradeLevel: number;
 *   maxSlots: number;
 *   unlockedCount: number;
 *   selectedJewelId: string;
 *   slots: JewelSlotRow[];
 *   inventory: Record<string, number>;
 *   materials: { moonstone: number };
 * }}
 */
export function buildJewelManagementState(upgradeLevel = equippedItem.upgradeLevel) {
  const unlockedCount = unlockedJewelSlotCount(upgradeLevel);
  /** @type {JewelSlotRow[]} */
  const slots = [];

  for (let index = 1; index <= MAX_JEWEL_SLOTS_CLASSIC; index += 1) {
    const requiredUpgrade = requiredUpgradeForJewelSlot(index);
    const unlocked = upgradeLevel >= requiredUpgrade;
    const jewel = unlocked ? (equippedBySlotIndex[index] ?? null) : null;

    slots.push({
      index,
      unlocked,
      requiredUpgrade,
      jewel,
    });
  }

  return {
    upgradeLevel,
    maxSlots: MAX_JEWEL_SLOTS_CLASSIC,
    unlockedCount,
    selectedJewelId: "ruby",
    slots,
    inventory: {
      ruby: 12,
      sapphire: 8,
      emerald: 5,
      topaz: 3,
      amethyst: 4,
    },
    materials: {
      moonstone: 40,
    },
  };
}

/**
 * @param {ReturnType<typeof buildJewelManagementState>} state
 */
export function summarizeJewelBonus(state) {
  const filled = state.slots.filter((s) => s.unlocked && s.jewel);
  if (!filled.length) return "—";
  return filled.map((s) => `${s.jewel.stat} ${s.jewel.bonus}`).join("  ");
}

/**
 * @param {number} upgradeLevel
 */
export function jewelSidebarStat(upgradeLevel = equippedItem.upgradeLevel) {
  const state = buildJewelManagementState(upgradeLevel);
  const filled = state.slots.filter((s) => s.jewel).length;
  const unlocked = state.unlockedCount;
  return `${filled} / ${unlocked} (${state.maxSlots} max @ +10)`;
}