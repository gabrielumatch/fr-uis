/** @typedef {{ label: string; value: string; tone?: 'default' | 'red' | 'blue' }} AwakeStat */
/** @typedef {{ label: string; value: string }} StatRow */

/** @typedef {'weapon' | 'armor' | 'fashion'} WorkshopCategory */

/**
 * @typedef {{
 *   id: string;
 *   category: WorkshopCategory;
 *   icon: string;
 *   baseIcon: string;
 *   name: string;
 *   type: string;
 *   upgradeBadge: string;
 *   upgradeLevel: number;
 *   stats: StatRow[];
 *   awake: AwakeStat[];
 *   gearScore: number;
 *   elementHost: 'weapon' | 'suit';
 *   activeSkinName?: string | null;
 *   workshopSkin: {
 *     hasSkinApplied: boolean;
 *     appliedLook: object | null;
 *     selectedSkinId: string | null;
 *     inventory: { purgeSkinScrolls: number; recoverSkinScrolls: number };
 *     skinPool: { id: string; icon: string; name: string; type: string; qty: number }[];
 *   };
 * }} WorkshopItem
 */

/** @param {WorkshopItem['workshopSkin']['skinPool']} skinPool */
function createSkinState(skinPool) {
  return {
    hasSkinApplied: false,
    appliedLook: null,
    selectedSkinId: null,
    inventory: {
      purgeSkinScrolls: 2,
      recoverSkinScrolls: 1,
    },
    skinPool,
  };
}

/** @type {WorkshopItem[]} */
const inventory = [
  {
    id: "lusaka-axe",
    category: "weapon",
    icon: "🪓",
    baseIcon: "🪓",
    name: "Lusaka's Axe",
    type: "Two-Handed Axe",
    elementHost: "weapon",
    upgradeBadge: "+9",
    upgradeLevel: 9,
    stats: [
      { label: "Attack", value: "190" },
      { label: "Element", value: "Lightning 19/20" },
      { label: "Upgrade", value: "9/20" },
      { label: "Piercing", value: "5 / 10" },
      { label: "Cards", value: "4/10" },
      { label: "Jewels", value: "4 / 4 unlocked" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [
      { label: "STR", value: "+25", tone: "red" },
      { label: "Critical Chance", value: "+17%", tone: "blue" },
      { label: "Attack Speed", value: "+10%", tone: "blue" },
    ],
    gearScore: 120,
    workshopSkin: createSkinState([
      {
        id: "ancient-forest-axe",
        icon: "🌲",
        name: "Ancient Forest Axe",
        type: "Two-Handed Axe",
        qty: 1,
      },
      {
        id: "voulge",
        icon: "🔱",
        name: "Voulge",
        type: "Two-Handed Axe",
        qty: 1,
      },
      {
        id: "crescent-axe",
        icon: "🌙",
        name: "Crescent Axe",
        type: "Two-Handed Axe",
        qty: 1,
      },
    ]),
  },
  {
    id: "mystique-suit",
    category: "armor",
    icon: "🛡️",
    baseIcon: "🛡️",
    name: "Mystique Set (Suit)",
    type: "Suit",
    elementHost: "suit",
    upgradeBadge: "+7",
    upgradeLevel: 7,
    stats: [
      { label: "DEF", value: "142" },
      { label: "Element", value: "Wind 12/20" },
      { label: "Upgrade", value: "7/20" },
      { label: "Piercing", value: "2 / 10" },
      { label: "Cards", value: "2/10" },
      { label: "Jewels", value: "2 / 3 unlocked" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [
      { label: "DEX", value: "+15", tone: "red" },
      { label: "HP", value: "+8%", tone: "blue" },
    ],
    gearScore: 85,
    workshopSkin: createSkinState([
      {
        id: "knight-suit",
        icon: "⚔️",
        name: "Knight Suit",
        type: "Suit",
        qty: 1,
      },
      {
        id: "psy-suit",
        icon: "🔮",
        name: "Psykeeper Suit",
        type: "Suit",
        qty: 1,
      },
    ]),
  },
  {
    id: "neo-hat",
    category: "fashion",
    icon: "🎩",
    baseIcon: "🎩",
    name: "Neo Shopping Hat",
    type: "Fashion (Hat)",
    elementHost: "suit",
    upgradeBadge: "F",
    upgradeLevel: 0,
    stats: [
      { label: "Category", value: "Fashion" },
      { label: "Set", value: "Neo Shopping" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [],
    gearScore: 12,
    workshopSkin: createSkinState([
      {
        id: "pumpkin-hat",
        icon: "🎃",
        name: "Pumpkin Hat",
        type: "Fashion (Hat)",
        qty: 1,
      },
    ]),
  },
  {
    id: "ankou-cloak",
    category: "fashion",
    icon: "🦇",
    baseIcon: "🦇",
    name: "Cloak of Ankou",
    type: "Fashion (Cloak)",
    elementHost: "suit",
    upgradeBadge: "F",
    upgradeLevel: 0,
    stats: [
      { label: "Category", value: "Fashion" },
      { label: "Set", value: "Ankou" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [],
    gearScore: 18,
    workshopSkin: createSkinState([
      {
        id: "angel-wings",
        icon: "👼",
        name: "Angel Wings",
        type: "Fashion (Cloak)",
        qty: 1,
      },
    ]),
  },
];

export const workshopInventory = inventory;

export let activeWorkshopItemId = inventory[0].id;

/** Item atualmente em edição no workshop (live binding). */
export let equippedItem = inventory[0];

/**
 * @param {string} id
 * @returns {boolean}
 */
export function selectWorkshopItem(id) {
  if (id === activeWorkshopItemId) return false;
  const next = inventory.find((item) => item.id === id);
  if (!next) return false;
  activeWorkshopItemId = id;
  equippedItem = next;
  return true;
}

/**
 * @param {string} id
 * @returns {WorkshopItem | undefined}
 */
export function getWorkshopItemById(id) {
  return inventory.find((item) => item.id === id);
}