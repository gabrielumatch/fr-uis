/**
 * Slots de joia em Ultimate (modelo clássico / Fandom).
 * +0–+5: nenhum slot; +6→1 … +10→5 (máx. 5 em +10).
 * Universe (+20) pode estender — ver doc.
 * @see https://flyff-global.fandom.com/wiki/Socketing_Ultimate_Weapons
 */

/** Máximo de jewel slots em +10 (ultimate clássico). */
export const MAX_JEWEL_SLOTS_CLASSIC = 5;

/**
 * @param {number} upgradeLevel nível + do item
 * @returns {number} slots desbloqueados para inserir joia
 */
export function unlockedJewelSlotCount(upgradeLevel) {
  if (upgradeLevel < 6) return 0;
  return Math.min(upgradeLevel - 5, MAX_JEWEL_SLOTS_CLASSIC);
}

/**
 * @param {number} slotIndex 1-based
 * @returns {number} nível + necessário para desbloquear o slot
 */
export function requiredUpgradeForJewelSlot(slotIndex) {
  return slotIndex + 5;
}