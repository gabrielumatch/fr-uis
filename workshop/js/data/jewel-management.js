/**
 * Jewel slots na Ultimate (preview simplificado com gemas clássicas + %).
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

/**
 * @typedef {{ index: number; jewel: JewelType }} EquippedJewelSlot
 */

export const jewelManagementState = {
  maxSlots: 5,
  selectedJewelId: "ruby",
  /** @type {EquippedJewelSlot[]} */
  equipped: [
    { index: 1, jewel: jewelTypes[0] },
    { index: 2, jewel: jewelTypes[1] },
    { index: 3, jewel: jewelTypes[2] },
    { index: 4, jewel: jewelTypes[3] },
    { index: 5, jewel: jewelTypes[4] },
  ],
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

/**
 * @param {string} id
 */
export function getJewelType(id) {
  return jewelTypes.find((j) => j.id === id);
}

/**
 * @param {typeof jewelManagementState} state
 */
export function summarizeJewelBonus(state) {
  return state.equipped
    .map((s) => `${s.jewel.stat} ${s.jewel.bonus}`)
    .join("  ");
}