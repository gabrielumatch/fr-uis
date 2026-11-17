// @ts-nocheck
import { WIKI } from "./flyff-wiki-icons";

export type InventoryTabId = "weapons" | "armor" | "pets" | "quest" | "consumables";
export type InventoryGridItem = {
  workshopItemId?: string;
  icon?: string;
  upgradeBadge?: string;
  tab: InventoryTabId;
  skinDonor?: boolean;
};
export type EquipSlot = {
  icon?: string;
  upgradeBadge?: string;
  workshopItemId?: string;
  title?: string;
};

/** @typedef {'weapons' | 'armor' | 'pets' | 'quest' | 'consumables'} InventoryTabId */

/** @typedef {{
 *   workshopItemId?: string;
 *   icon?: string;
 *   upgradeBadge?: string;
 *   tab: InventoryTabId;
 *   skinDonor?: boolean;
 * }} InventoryGridItem */

export const INVENTORY_TABS = [
  { id: "weapons", label: "Weapons" },
  { id: "armor", label: "Armor" },
  { id: "pets", label: "Pets" },
  { id: "quest", label: "Quest Items" },
  { id: "consumables", label: "Consumables" },
];

/** Slots pequenos; o CSS preenche a largura com `auto-fill`. */
export const INVENTORY_SLOT_SIZE_PX = 52;
/** Células renderizadas por aba (itens + vazios). */
export const INVENTORY_GRID_CELL_COUNT = 168;

/** @type {InventoryGridItem[]} */
export const inventoryGridItems = [
  // —— Weapons (workshop) — gPotato Wiki ——
  {
    workshopItemId: "lusaka-axe",
    icon: WIKI.lusakaHeavyAxe,
    upgradeBadge: "+9",
    tab: "weapons",
  },
  {
    workshopItemId: "ryvius-sword",
    icon: WIKI.lusakaHeavySword,
    upgradeBadge: "+6",
    tab: "weapons",
  },
  {
    workshopItemId: "carnian-bow",
    icon: WIKI.lusakaBow,
    upgradeBadge: "+5",
    tab: "weapons",
  },
  {
    icon: WIKI.piecenition,
    upgradeBadge: "+4",
    tab: "weapons",
    workshopItemId: "lusaka-axe",
  },
  {
    icon: WIKI.hotterSword,
    upgradeBadge: "+3",
    tab: "weapons",
    workshopItemId: "ryvius-sword",
  },
  {
    icon: WIKI.gladiatorGoldBow,
    upgradeBadge: "+2",
    tab: "weapons",
    workshopItemId: "carnian-bow",
  },
  { icon: WIKI.spectreAxe, upgradeBadge: "Skin", tab: "weapons", skinDonor: true },
  { icon: WIKI.nautilusAxe, upgradeBadge: "Skin", tab: "weapons", skinDonor: true },
  { icon: WIKI.bishopAxe, upgradeBadge: "Skin", tab: "weapons", skinDonor: true },
  { icon: WIKI.smiterSword, upgradeBadge: "Skin", tab: "weapons", skinDonor: true },
  { icon: WIKI.baronessBow, upgradeBadge: "Skin", tab: "weapons", skinDonor: true },
  { icon: WIKI.nemosFury, upgradeBadge: "Skin", tab: "weapons", skinDonor: true },

  // —— Armor ——
  {
    workshopItemId: "intelli-ring",
    icon: WIKI.jewelryRing,
    upgradeBadge: "+2",
    tab: "armor",
  },
  {
    workshopItemId: "gore-necklace",
    icon: WIKI.jewelryNecklace,
    upgradeBadge: "+12",
    tab: "armor",
  },
  {
    workshopItemId: "mystique-suit",
    icon: WIKI.bilariSuitF,
    upgradeBadge: "+7",
    tab: "armor",
  },
  {
    workshopItemId: "vigor-helm",
    icon: WIKI.bilariHelmetF,
    upgradeBadge: "+4",
    tab: "armor",
  },
  {
    workshopItemId: "neo-hat",
    icon: WIKI.cruentusHelmetM,
    upgradeBadge: "F",
    tab: "armor",
  },
  {
    workshopItemId: "ankou-cloak",
    icon: WIKI.fashionWings,
    upgradeBadge: "F",
    tab: "armor",
  },
  {
    icon: WIKI.bilariGauntletF,
    upgradeBadge: "+2",
    tab: "armor",
    workshopItemId: "mystique-suit",
  },
  {
    icon: WIKI.bilariBootsF,
    upgradeBadge: "+6",
    tab: "armor",
    workshopItemId: "mystique-suit",
  },
  { icon: WIKI.bileireSuitM, upgradeBadge: "Skin", tab: "armor", skinDonor: true },
  { icon: WIKI.cruentusSuitM, upgradeBadge: "Skin", tab: "armor", skinDonor: true },
  { icon: WIKI.cruentusHelmetM, upgradeBadge: "Skin", tab: "armor", skinDonor: true },
  { icon: WIKI.bilariHelmetF, upgradeBadge: "Skin", tab: "armor", skinDonor: true },
  { icon: WIKI.bileireHelmetM, upgradeBadge: "Skin", tab: "armor", skinDonor: true },

  { icon: WIKI.petLion, tab: "pets" },
  { icon: WIKI.petDragon, upgradeBadge: "Lv12", tab: "pets" },
  { icon: WIKI.petUnicorn, tab: "pets" },
  { icon: WIKI.petHelper, tab: "quest" },
  { icon: WIKI.scrollSProtect, tab: "quest" },
  { icon: WIKI.petFeed, tab: "consumables" },
  { icon: WIKI.scrollSProtect, tab: "consumables" },
];

export let inventoryTabId = /** @type {InventoryTabId} */ ("weapons");

export const playerPenya = 5_671_297;

export const characterGearScore = 1118;

/**
 * Slots do boneco (layout FlyFF): 5 acessórios, 5 esquerda, 5 direita, 4 fashion embaixo.
 * @typedef {{ icon?: string; upgradeBadge?: string; workshopItemId?: string; title?: string }} EquipSlot
 * @export
 */

/** @type {{ accessories: EquipSlot[]; left: EquipSlot[]; right: EquipSlot[]; footer: EquipSlot[] }} */
export const characterEquippedSlots = {
  accessories: [
    {
      icon: WIKI.jewelryRing,
      upgradeBadge: "+2",
      title: "Ring",
      workshopItemId: "intelli-ring",
    },
    { icon: WIKI.jewelryEarring, upgradeBadge: "+6", title: "Earring" },
    {
      icon: WIKI.jewelryNecklace,
      upgradeBadge: "+12",
      title: "Necklace",
      workshopItemId: "gore-necklace",
    },
    { icon: WIKI.jewelryEarring, upgradeBadge: "+6", title: "Earring" },
    {
      icon: WIKI.jewelryRing,
      upgradeBadge: "+2",
      title: "Ring",
      workshopItemId: "intelli-ring",
    },
  ],
  // Esquerda: arma, escudo, (vazio), capa, máscara
  left: [
    {
      icon: WIKI.lusakaHeavyAxe,
      upgradeBadge: "+9",
      title: "Weapon",
      workshopItemId: "lusaka-axe",
    },
    { title: "Shield" },
    {},
    { title: "Cloak" },
    { title: "Mask" },
  ],
  // Direita: elmo, suit, luva, bota, asas (fashion)
  right: [
    {
      icon: WIKI.bilariHelmetF,
      upgradeBadge: "+4",
      title: "Helmet",
      workshopItemId: "vigor-helm",
    },
    {
      icon: WIKI.bilariSuitF,
      upgradeBadge: "+7",
      title: "Suit",
      workshopItemId: "mystique-suit",
    },
    {
      icon: WIKI.bilariGauntletF,
      upgradeBadge: "+2",
      title: "Gauntlet",
      workshopItemId: "mystique-suit",
    },
    {
      icon: WIKI.bilariBootsF,
      upgradeBadge: "+8",
      title: "Boots",
      workshopItemId: "mystique-suit",
    },
    {
      workshopItemId: "ankou-cloak",
      icon: WIKI.fashionWings,
      upgradeBadge: "F",
      title: "Fashion wings",
    },
  ],
  // Fashion overrides (chapéu, suit, luva, bota) — vazio = slot do jogo
  footer: [{}, {}, {}, {}],
};

/**
 * @param {string} tab
 * @returns {InventoryTabId}
 */
export function resolveInventoryTab(tab) {
  const found = INVENTORY_TABS.find((t) => t.id === tab);
  return /** @type {InventoryTabId} */ (found?.id ?? "weapons");
}

/** @param {InventoryTabId} tab */
export function setInventoryTab(tab) {
  inventoryTabId = resolveInventoryTab(tab);
}

/**
 * @param {InventoryTabId} tab
 * @returns {(InventoryGridItem | null)[]}
 */
export function getInventoryGridCells(tab) {
  const tabItems = inventoryGridItems.filter((item) => item.tab === tab);
  /** @type {(InventoryGridItem | null)[]} */
  const cells = [];
  for (let i = 0; i < INVENTORY_GRID_CELL_COUNT; i++) {
    cells.push(tabItems[i] ?? null);
  }
  return cells;
}

/**
 * @param {number} value
 * @returns {string}
 */
export function formatPenya(value) {
  return value.toLocaleString("de-DE");
}

const AXE_ICONS = new Set([
  WIKI.spectreAxe,
  WIKI.nautilusAxe,
  WIKI.bishopAxe,
  WIKI.piecenition,
  WIKI.lasternition,
  WIKI.lusakaHeavyAxe,
]);

const SWORD_ICONS = new Set([
  WIKI.smiterSword,
  WIKI.hotterSword,
  WIKI.lusakaHeavySword,
  WIKI.lusakaCrystalSword,
  WIKI.gladiatorGold2hSword,
]);

const BOW_ICONS = new Set([
  WIKI.baronessBow,
  WIKI.nemosFury,
  WIKI.bowOfEchoes,
  WIKI.gladiatorGoldBow,
  WIKI.lusakaBow,
]);

const SUIT_ICONS = new Set([
  WIKI.bilariSuitF,
  WIKI.bileireSuitM,
  WIKI.cruentusSuitM,
  WIKI.bilariGauntletF,
  WIKI.bilariBootsF,
]);

const HELMET_ICONS = new Set([
  WIKI.bilariHelmetF,
  WIKI.bileireHelmetM,
  WIKI.cruentusHelmetM,
  WIKI.cruentusHelmetF,
]);

/**
 * Qual item do workshop abrir ao clicar uma célula da bag (inclui skin donors).
 * @param {InventoryGridItem | null | undefined} cell
 * @returns {string | undefined}
 */
export function resolveInventoryCellWorkshopId(cell) {
  if (!cell?.icon) return undefined;
  if (cell.workshopItemId) return cell.workshopItemId;

  if (cell.tab === "weapons" || cell.tab === "armor") {
    if (AXE_ICONS.has(cell.icon)) return "lusaka-axe";
    if (SWORD_ICONS.has(cell.icon)) return "ryvius-sword";
    if (BOW_ICONS.has(cell.icon)) return "carnian-bow";
    if (SUIT_ICONS.has(cell.icon)) return "mystique-suit";
    if (HELMET_ICONS.has(cell.icon)) return "vigor-helm";
    if (cell.icon === WIKI.fashionWings) return "ankou-cloak";
    if (cell.icon === WIKI.jewelryRing) return "intelli-ring";
    if (cell.icon === WIKI.jewelryNecklace) return "gore-necklace";
  }

  return undefined;
}