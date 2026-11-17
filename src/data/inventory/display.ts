import { getItemById } from "../items/catalog";
import {
  isSkinItem,
  isWorkshopItem,
  type CatalogItem,
} from "../items/item";
import { WIKI } from "../assets/wiki-icons";
import { INVENTORY_BAG_SLOTS } from "./inventory-bag";
import type { InventoryTabId } from "./types";

export type { InventoryTabId } from "./types";

export type InventoryGridCell = {
  itemId: string;
  icon: string;
  upgradeBadge: string;
  tab: InventoryTabId;
};

export type EquipSlot = {
  icon?: string;
  upgradeBadge?: string;
  itemId?: string;
  /** @deprecated use itemId */
  workshopItemId?: string;
  title?: string;
};

export const INVENTORY_TABS = [
  { id: "weapons", label: "Weapons" },
  { id: "armor", label: "Armor" },
  { id: "pets", label: "Pets" },
  { id: "quest", label: "Quest Items" },
  { id: "consumables", label: "Consumables" },
] as const satisfies readonly { id: InventoryTabId; label: string }[];

export const INVENTORY_SLOT_SIZE_PX = 52;
export const INVENTORY_GRID_CELL_COUNT = 168;

function badgeForItem(item: CatalogItem, override?: string): string {
  if (override) return override;
  if (isSkinItem(item)) return "Skin";
  if (isWorkshopItem(item)) return item.upgradeBadge;
  return "";
}

function buildGridCell(
  slot: (typeof INVENTORY_BAG_SLOTS)[number],
): InventoryGridCell {
  const item = getItemById(slot.itemId);
  if (!item) {
    throw new Error(`Bag references unknown item "${slot.itemId}"`);
  }
  return {
    itemId: slot.itemId,
    icon: item.icon,
    upgradeBadge: badgeForItem(item, slot.upgradeBadge),
    tab: slot.tab,
  };
}

const CELLS_BY_TAB = new Map<InventoryTabId, InventoryGridCell[]>();
for (const tab of INVENTORY_TABS) {
  const cells = INVENTORY_BAG_SLOTS.filter((s) => s.tab === tab.id).map(buildGridCell);
  CELLS_BY_TAB.set(tab.id, cells);
}

export function getInventoryGridCells(tab: InventoryTabId) {
  const tabItems = CELLS_BY_TAB.get(tab) ?? [];
  const cells: (InventoryGridCell | null)[] = [];
  for (let i = 0; i < INVENTORY_GRID_CELL_COUNT; i++) {
    cells.push(tabItems[i] ?? null);
  }
  return cells;
}

export function resolveInventoryCellItemId(
  cell: InventoryGridCell | null | undefined,
): string | undefined {
  return cell?.itemId;
}

/** @deprecated use resolveInventoryCellItemId */
export const resolveInventoryCellWorkshopId = resolveInventoryCellItemId;

export const playerPenya = 5_671_297;

export const characterGearScore = 1118;

export const characterEquippedSlots = {
  accessories: [
    {
      icon: WIKI.jewelryRing,
      upgradeBadge: "+2",
      title: "Ring",
      itemId: "intelli-ring",
    },
    { icon: WIKI.jewelryEarring, upgradeBadge: "+6", title: "Earring" },
    {
      icon: WIKI.jewelryNecklace,
      upgradeBadge: "+12",
      title: "Necklace",
      itemId: "gore-necklace",
    },
    { icon: WIKI.jewelryEarring, upgradeBadge: "+6", title: "Earring" },
    {
      icon: WIKI.jewelryRing,
      upgradeBadge: "+2",
      title: "Ring",
      itemId: "intelli-ring",
    },
  ],
  left: [
    {
      icon: WIKI.lusakaHeavyAxe,
      upgradeBadge: "+9",
      title: "Weapon",
      itemId: "lusaka-axe",
    },
    { title: "Shield" },
    {},
    { title: "Cloak" },
    { title: "Mask" },
  ],
  right: [
    {
      icon: WIKI.bilariHelmetF,
      upgradeBadge: "+4",
      title: "Helmet",
      itemId: "vigor-helm",
    },
    {
      icon: WIKI.bilariSuitF,
      upgradeBadge: "+7",
      title: "Suit",
      itemId: "mystique-suit",
    },
    {
      icon: WIKI.bilariGauntletF,
      upgradeBadge: "+2",
      title: "Gauntlet",
      itemId: "bilari-gauntlet-f",
    },
    {
      icon: WIKI.bilariBootsF,
      upgradeBadge: "+8",
      title: "Boots",
      itemId: "bilari-boots-f",
    },
    {
      itemId: "ankou-cloak",
      icon: WIKI.fashionWings,
      upgradeBadge: "W",
      title: "Wings",
    },
  ],
  footer: [{}, {}, {}, {}],
};

export function resolveInventoryTab(tab: string): InventoryTabId {
  const found = INVENTORY_TABS.find((t) => t.id === tab);
  return found?.id ?? "weapons";
}

export function formatPenya(value: number) {
  return value.toLocaleString("de-DE");
}