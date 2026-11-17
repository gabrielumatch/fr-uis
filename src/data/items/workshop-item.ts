import type {
  ArmorSubtype,
  FashionSubtype,
  GearItemCategory,
  ItemCombatStats,
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

export type SkinPoolEntry = {
  id: string;
  icon: string;
  name: string;
  typeLabel: string;
  qty: number;
};

export type WorkshopSkinState = {
  hasSkinApplied: boolean;
  appliedLook: SkinPoolEntry | null;
  selectedSkinId: string | null;
  inventory: { purgeSkinScrolls: number; recoverSkinScrolls: number };
  skinPool: SkinPoolEntry[];
};

type WorkshopItemCore = {
  id: string;
  icon: string;
  baseIcon: string;
  name: string;
  typeLabel: string;
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

type GearItemCore<C extends GearItemCategory = GearItemCategory> = WorkshopItemCore & {
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

export type WorkshopJewelItem = WorkshopItemCore & {
  type: "jewel";
  subtype: JewelSubtype;
  upgrade: Extract<ItemUpgradeAttributes, { id: "jewel" }>;
};

export type WorkshopFashionItem = WorkshopItemCore & {
  type: "fashion";
  subtype: FashionSubtype;
  upgrade: Extract<ItemUpgradeAttributes, { id: "fashion" }>;
};

export type WorkshopItem =
  | WorkshopWeaponItem
  | WorkshopArmorItem
  | WorkshopJewelItem
  | WorkshopFashionItem;

export type { ItemType, ItemCombatStats, GearItemCategory, ItemCategory } from "./types";

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