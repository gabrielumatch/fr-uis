import { WIKI } from "./flyff-wiki-icons.js";

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
    icon: WIKI.lusakaHeavyAxe,
    baseIcon: WIKI.lusakaHeavyAxe,
    name: "Ultimate Lusaka's Heavy Axe",
    type: "Two-Handed Axe",
    elementHost: "weapon",
    upgradeBadge: "+9",
    upgradeLevel: 9,
    stats: [
      { label: "Level", value: "75" },
      { label: "Attack", value: "471-664" },
      {
        label: "Bonus",
        value: "HP+12%, DEF+15%, Melee Block+11%, Wind vs Monster+3%",
      },
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
        id: "spectre-axe",
        icon: WIKI.spectreAxe,
        name: "Ultimate Spectre's Axe",
        type: "Two-Handed Axe",
        qty: 1,
      },
      {
        id: "nautilus-axe",
        icon: WIKI.nautilusAxe,
        name: "Ultimate Nautilus",
        type: "Two-Handed Axe",
        qty: 1,
      },
      {
        id: "bishop-axe",
        icon: WIKI.bishopAxe,
        name: "Ultimate Bishop",
        type: "Two-Handed Axe",
        qty: 1,
      },
      {
        id: "lasternition",
        icon: WIKI.lasternition,
        name: "Lasternition",
        type: "Two-Handed Axe",
        qty: 1,
      },
    ]),
  },
  {
    id: "ryvius-sword",
    category: "weapon",
    icon: WIKI.lusakaHeavySword,
    baseIcon: WIKI.lusakaHeavySword,
    name: "Ultimate Lusaka's Heavy Sword",
    type: "Two-Handed Sword",
    elementHost: "weapon",
    upgradeBadge: "+6",
    upgradeLevel: 6,
    stats: [
      { label: "Level", value: "75" },
      { label: "Attack", value: "539-600" },
      {
        label: "Bonus",
        value: "ATK Speed+25%, Crit+25%, ICD+83%, Wind vs Monster+3%",
      },
      { label: "Element", value: "Fire 8/20" },
      { label: "Upgrade", value: "6/20" },
      { label: "Piercing", value: "3 / 10" },
      { label: "Cards", value: "2/10" },
      { label: "Jewels", value: "2 / 3 unlocked" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [
      { label: "STR", value: "+12", tone: "red" },
      { label: "DEX", value: "+8", tone: "blue" },
    ],
    gearScore: 78,
    workshopSkin: createSkinState([
      {
        id: "lusaka-crystal-sword",
        icon: WIKI.lusakaCrystalSword,
        name: "Ultimate Lusaka's Heavy Crystal Sword",
        type: "Two-Handed Sword",
        qty: 1,
      },
      {
        id: "smiter-sword",
        icon: WIKI.smiterSword,
        name: "Smiter Sword",
        type: "Two-Handed Sword",
        qty: 1,
      },
      {
        id: "gladiator-gold-2h-sword",
        icon: WIKI.gladiatorGold2hSword,
        name: "Gladiator's Gold 2H Sword",
        type: "Two-Handed Sword",
        qty: 1,
      },
    ]),
  },
  {
    id: "carnian-bow",
    category: "weapon",
    icon: WIKI.lusakaBow,
    baseIcon: WIKI.lusakaBow,
    name: "Ultimate Lusaka's Bow",
    type: "Bow",
    elementHost: "weapon",
    upgradeBadge: "+5",
    upgradeLevel: 5,
    stats: [
      { label: "Level", value: "75" },
      { label: "Attack", value: "429-474" },
      {
        label: "Bonus",
        value: "Crit+23%, ATK+16%, ICD+63%, Wind vs Monster+3%",
      },
      { label: "Element", value: "Wind 6/20" },
      { label: "Upgrade", value: "5/20" },
      { label: "Piercing", value: "2 / 10" },
      { label: "Cards", value: "1/10" },
      { label: "Jewels", value: "1 / 2 unlocked" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [{ label: "DEX", value: "+14", tone: "blue" }],
    gearScore: 62,
    workshopSkin: createSkinState([
      {
        id: "bow-of-echoes",
        icon: WIKI.bowOfEchoes,
        name: "Ultimate Bow of Echoes",
        type: "Bow",
        qty: 1,
      },
      {
        id: "nemos-fury",
        icon: WIKI.nemosFury,
        name: "Ultimate Nemo's Fury",
        type: "Bow",
        qty: 1,
      },
      {
        id: "baroness-bow",
        icon: WIKI.baronessBow,
        name: "Ultimate Baroness",
        type: "Bow",
        qty: 1,
      },
    ]),
  },
  {
    id: "mystique-suit",
    category: "armor",
    icon: WIKI.bilariSuitF,
    baseIcon: WIKI.bilariSuitF,
    name: "Bilari Suit",
    type: "Suit",
    elementHost: "suit",
    upgradeBadge: "+7",
    upgradeLevel: 7,
    stats: [
      { label: "Level", value: "125" },
      { label: "DEF", value: "1743-1749" },
      {
        label: "Set bonus (4/4)",
        value: "DEF+20%, HP+20%, Melee Block+20%, Ranged Block+20%",
      },
      { label: "Element", value: "Wind 12/20" },
      { label: "Upgrade", value: "7/20" },
      { label: "Piercing", value: "2 / 10" },
      { label: "Cards", value: "2/10" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [
      { label: "DEX", value: "+15", tone: "red" },
      { label: "HP", value: "+8%", tone: "blue" },
    ],
    gearScore: 85,
    workshopSkin: createSkinState([
      {
        id: "bileire-suit",
        icon: WIKI.bileireSuitM,
        name: "Bileire Suit",
        type: "Suit",
        qty: 1,
      },
      {
        id: "cruentus-look",
        icon: WIKI.cruentusSuitM,
        name: "(M) Cruentus Set",
        type: "Suit",
        qty: 1,
      },
    ]),
  },
  {
    id: "vigor-helm",
    category: "armor",
    icon: WIKI.bilariHelmetF,
    baseIcon: WIKI.bilariHelmetF,
    name: "Bilari Helmet",
    type: "Helmet",
    elementHost: "suit",
    upgradeBadge: "+4",
    upgradeLevel: 4,
    stats: [
      { label: "Level", value: "125" },
      { label: "DEF", value: "1141-1146" },
      { label: "Upgrade", value: "4/20" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [{ label: "STA", value: "+6", tone: "blue" }],
    gearScore: 28,
    workshopSkin: createSkinState([
      {
        id: "cruentus-helm",
        icon: WIKI.cruentusHelmetM,
        name: "(M) Cruentus Helmet",
        type: "Helmet",
        qty: 1,
      },
    ]),
  },
  {
    id: "neo-hat",
    category: "fashion",
    icon: WIKI.cruentusHelmetM,
    baseIcon: WIKI.cruentusHelmetM,
    name: "(M) Cruentus Helmet",
    type: "Fashion (Hat)",
    elementHost: "suit",
    upgradeBadge: "F",
    upgradeLevel: 0,
    stats: [
      { label: "Category", value: "Rare / CS" },
      { label: "Set", value: "(M) Cruentus" },
      { label: "Source", value: "Knight Armor (Wiki)" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [],
    gearScore: 12,
    workshopSkin: createSkinState([
      {
        id: "cruentus-helm-f",
        icon: WIKI.cruentusHelmetF,
        name: "(F) Cruentus Helmet",
        type: "Fashion (Hat)",
        qty: 1,
      },
    ]),
  },
  {
    id: "ankou-cloak",
    category: "fashion",
    icon: WIKI.fashionWings,
    baseIcon: WIKI.fashionWings,
    name: "Fashion Wings",
    type: "Fashion (Back / Wings)",
    elementHost: "suit",
    upgradeBadge: "F",
    upgradeLevel: 0,
    stats: [
      { label: "Category", value: "Fashion / CS" },
      { label: "Slot", value: "Back (wings)" },
      { label: "Source", value: "gPotato Wiki (icon TBD)" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [],
    gearScore: 18,
    workshopSkin: createSkinState([
      {
        id: "bilari-helm",
        icon: WIKI.bilariHelmetF,
        name: "Bilari Helmet",
        type: "Fashion (Hat)",
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