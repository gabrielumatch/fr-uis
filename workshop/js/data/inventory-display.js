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
  // —— Weapons (workshop) ——
  { workshopItemId: "lusaka-axe", icon: "🪓", upgradeBadge: "+9", tab: "weapons" },
  { workshopItemId: "ryvius-sword", icon: "⚔️", upgradeBadge: "+6", tab: "weapons" },
  { workshopItemId: "carnian-bow", icon: "🏹", upgradeBadge: "+5", tab: "weapons" },
  { icon: "🪓", upgradeBadge: "+4", tab: "weapons" },
  { icon: "⚔️", upgradeBadge: "+3", tab: "weapons" },
  { icon: "🏹", upgradeBadge: "+2", tab: "weapons" },
  // Skin donors (transmute look — same type rules)
  { icon: "🌲", upgradeBadge: "Skin", tab: "weapons", skinDonor: true },
  { icon: "🔱", upgradeBadge: "Skin", tab: "weapons", skinDonor: true },
  { icon: "🌙", upgradeBadge: "Skin", tab: "weapons", skinDonor: true },
  { icon: "🗡️", upgradeBadge: "Skin", tab: "weapons", skinDonor: true },
  { icon: "🎯", upgradeBadge: "Skin", tab: "weapons", skinDonor: true },
  { icon: "🏹", upgradeBadge: "Skin", tab: "weapons", skinDonor: true },

  // —— Armor ——
  { workshopItemId: "mystique-suit", icon: "🛡️", upgradeBadge: "+7", tab: "armor" },
  { workshopItemId: "vigor-helm", icon: "⛑️", upgradeBadge: "+4", tab: "armor" },
  { workshopItemId: "neo-hat", icon: "🎩", upgradeBadge: "F", tab: "armor" },
  { workshopItemId: "ankou-cloak", icon: "🦇", upgradeBadge: "F", tab: "armor" },
  { icon: "🧤", upgradeBadge: "+2", tab: "armor" },
  { icon: "👢", upgradeBadge: "+6", tab: "armor" },
  { icon: "⚔️", upgradeBadge: "Skin", tab: "armor", skinDonor: true },
  { icon: "🔮", upgradeBadge: "Skin", tab: "armor", skinDonor: true },
  { icon: "💀", upgradeBadge: "Skin", tab: "armor", skinDonor: true },
  { icon: "🎃", upgradeBadge: "Skin", tab: "armor", skinDonor: true },
  { icon: "👼", upgradeBadge: "Skin", tab: "armor", skinDonor: true },

  { icon: "🐣", tab: "pets" },
  { icon: "🐉", upgradeBadge: "Lv12", tab: "pets" },
  { icon: "📜", tab: "quest" },
  { icon: "📜", tab: "quest" },
  { icon: "🧪", tab: "consumables" },
  { icon: "🍖", tab: "consumables" },
];

export let inventoryTabId = /** @type {InventoryTabId} */ ("weapons");

export const playerPenya = 5_671_297;

export const characterGearScore = 1118;

/** Slots equipados no boneco (só visual). */
export const characterEquippedSlots = {
  accessories: [
    { icon: "💍", upgradeBadge: "+2" },
    { icon: "📿", upgradeBadge: "+12" },
    { icon: "💍", upgradeBadge: "+2" },
    { icon: "💍", upgradeBadge: "+2" },
    {},
  ],
  left: [
    { icon: "🪓", upgradeBadge: "+9" },
    { icon: "⚔️", upgradeBadge: "+6" },
    {},
    { icon: "🏹", upgradeBadge: "+5" },
    {},
    { icon: "🎒" },
  ],
  right: [
    { icon: "🛡️", upgradeBadge: "+7" },
    { icon: "🦇", upgradeBadge: "F" },
    {},
    { icon: "👼" },
    {},
    {},
  ],
  footer: [
    { icon: "⛑️", upgradeBadge: "+4" },
    { icon: "🎩", upgradeBadge: "F" },
    {},
    { icon: "🧤", upgradeBadge: "+2" },
    { icon: "👢", upgradeBadge: "+8" },
  ],
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