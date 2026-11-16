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

/** @type {Record<number, JewelType | null>} Joias no item (preview). */
const equippedBySlotIndex = {
  1: jewelTypes[0],
  2: jewelTypes[1],
  3: jewelTypes[2],
  4: jewelTypes[3],
  5: null,
};

/** @type {string} */
let selectedJewelId = "ruby";

/** @type {Record<string, number>} */
const jewelInventory = {
  ruby: 12,
  sapphire: 8,
  emerald: 5,
  topaz: 3,
  amethyst: 0,
};

/**
 * @param {string} id
 * @returns {JewelType | null}
 */
export function getJewelById(id) {
  return jewelTypes.find((j) => j.id === id) ?? null;
}

/** @param {string} id */
export function setSelectedJewelId(id) {
  if (!getJewelById(id)) return;
  if ((jewelInventory[id] ?? 0) <= 0) return;
  selectedJewelId = id;
}

/**
 * @param {number} slotIndex
 * @returns {boolean}
 */
export function removeJewelFromSlot(slotIndex) {
  const jewel = equippedBySlotIndex[slotIndex];
  if (!jewel) return false;
  equippedBySlotIndex[slotIndex] = null;
  jewelInventory[jewel.id] = (jewelInventory[jewel.id] ?? 0) + 1;
  return true;
}

/**
 * @param {number} slotIndex
 * @param {number} [upgradeLevel]
 */
export function insertJewelIntoSlot(
  slotIndex,
  upgradeLevel = equippedItem.upgradeLevel,
) {
  const required = requiredUpgradeForJewelSlot(slotIndex);
  if (upgradeLevel < required) return { ok: false, reason: "locked" };
  if (equippedBySlotIndex[slotIndex]) return { ok: false, reason: "occupied" };

  const jewel = getJewelById(selectedJewelId);
  if (!jewel) return { ok: false, reason: "invalid" };
  if ((jewelInventory[selectedJewelId] ?? 0) <= 0) {
    return { ok: false, reason: "no_stock" };
  }

  jewelInventory[selectedJewelId] -= 1;
  equippedBySlotIndex[slotIndex] = jewel;
  return { ok: true };
}

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
    selectedJewelId,
    slots,
    inventory: { ...jewelInventory },
    materials: {
      moonstone: 40,
    },
  };
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