import type {
  ArmorSubtype,
  ConsumableRecipeSlot,
  FashionSubtype,
  GearItemCategory,
  ItemCategory,
  ItemCombatStats,
  ItemType,
  JewelSubtype,
  WeaponSubtype,
} from "./types";
import type { ItemUpgradeAttributes } from "../upgrade/recipes";

export type StatRow = { label: string; value: string };

export type AwakeStat = {
  label: string;
  value: string;
  tone?: "default" | "red" | "blue";
};

/** Todo item hidratado compartilha isso. */
export type ItemBase = {
  id: string;
  name: string;
  type: ItemType;
  subtype: string;
  category: ItemCategory;
  typeLabel: string;
  icon: string;
  stackQty: number;
};

export type ConsumableItem = ItemBase & {
  type: "consumable";
  subtype: string;
  category: "upgrade" | "pet";
  recipeSlot?: ConsumableRecipeSlot;
};

export type SkinItem = ItemBase & {
  type: "skin";
  subtype: import("./types").SkinSubtype;
  category: "skin";
  hostItemId?: string;
};

export type PetItem = ItemBase & {
  type: "pet";
  category: "pet";
};

export type QuestItem = ItemBase & {
  type: "quest";
  category: "quest";
};

export type SkinPoolEntry = Pick<SkinItem, "id" | "icon" | "name" | "typeLabel"> & {
  qty: number;
};

export type WorkshopSkinState = {
  hasSkinApplied: boolean;
  appliedLook: SkinPoolEntry | null;
  selectedSkinId: string | null;
  inventory: { purgeSkinScrolls: number; recoverSkinScrolls: number };
  skinPool: SkinPoolEntry[];
};

type WorkshopRuntimeCore = ItemBase & {
  baseIcon: string;
  upgradeBadge: string;
  upgradeLevel: number;
  upgrade: ItemUpgradeAttributes;
  stats: StatRow[];
  awake: AwakeStat[];
  gearScore: number;
  elementHost: "weapon" | "suit";
  activeSkinName?: string | null;
  workshopSkin: WorkshopSkinState;
  combat?: ItemCombatStats;
};

type CategoryRecipeId = {
  normal: "normal";
  green: "normal";
  ultimate: "ultimate";
  baruna: "baruna";
};

type GearItemCore<C extends GearItemCategory = GearItemCategory> = WorkshopRuntimeCore & {
  category: C;
  upgrade: Extract<ItemUpgradeAttributes, { id: CategoryRecipeId[C] }>;
};

export type WorkshopWeaponItem = GearItemCore & {
  type: "weapon";
  subtype: WeaponSubtype;
};

export type WorkshopArmorItem = GearItemCore & {
  type: "armor";
  subtype: ArmorSubtype;
};

export type WorkshopJewelItem = WorkshopRuntimeCore & {
  type: "jewel";
  subtype: JewelSubtype;
  category: "accessory";
  upgrade: Extract<ItemUpgradeAttributes, { id: "jewel" }>;
};

export type WorkshopFashionItem = WorkshopRuntimeCore & {
  type: "fashion";
  subtype: FashionSubtype;
  category: "fashion";
  upgrade: Extract<ItemUpgradeAttributes, { id: "fashion" }>;
};

export type WorkshopItem =
  | WorkshopWeaponItem
  | WorkshopArmorItem
  | WorkshopJewelItem
  | WorkshopFashionItem;

export type CatalogItem =
  | WorkshopItem
  | ConsumableItem
  | SkinItem
  | PetItem
  | QuestItem;

export function isWorkshopItem(item: CatalogItem): item is WorkshopItem {
  return (
    item.type === "weapon" ||
    item.type === "armor" ||
    item.type === "jewel" ||
    item.type === "fashion"
  );
}

export function isConsumableItem(item: CatalogItem): item is ConsumableItem {
  return item.type === "consumable";
}

export function isSkinItem(item: CatalogItem): item is SkinItem {
  return item.type === "skin";
}

export function isPetItem(item: CatalogItem): item is PetItem {
  return item.type === "pet";
}

export function isQuestItem(item: CatalogItem): item is QuestItem {
  return item.type === "quest";
}

export function createSkinState(
  skinPool: SkinPoolEntry[],
  scrolls: { purge: number; recover: number } = { purge: 2, recover: 1 },
): WorkshopSkinState {
  return {
    hasSkinApplied: false,
    appliedLook: null,
    selectedSkinId: null,
    inventory: {
      purgeSkinScrolls: scrolls.purge,
      recoverSkinScrolls: scrolls.recover,
    },
    skinPool,
  };
}

export type { ItemType, ItemCombatStats, GearItemCategory } from "./types";