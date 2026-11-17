import type {
  ArmorSlot,
  FashionSlot,
  JewelSubtype,
  WeaponClass,
} from "./item-taxonomy";
import type { ItemUpgradeAttributes } from "./upgrade-recipes";

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
  type: string;
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
  /** Rótulo legível na UI (ex.: "Two-Handed Axe", "Ring"). */
  type: string;
  upgradeBadge: string;
  upgradeLevel: number;
  /** Safe Upgrade: material, protect, max +, sockets — definido por item. */
  upgrade: ItemUpgradeAttributes;
  stats: StatRow[];
  awake: AwakeStat[];
  gearScore: number;
  elementHost: "weapon" | "suit";
  activeSkinName?: string | null;
  workshopSkin: WorkshopSkinState;
};

export type WorkshopWeaponItem = WorkshopItemCore & {
  kind: "weapon";
  weaponClass: WeaponClass;
  upgrade: Extract<
    ItemUpgradeAttributes,
    { id: "normal" | "ultimate" | "baruna" }
  >;
};

export type WorkshopArmorItem = WorkshopItemCore & {
  kind: "armor";
  armorSlot: ArmorSlot;
  upgrade: Extract<
    ItemUpgradeAttributes,
    { id: "normal" | "baruna" }
  >;
};

export type WorkshopJewelItem = WorkshopItemCore & {
  kind: "jewel";
  jewelSubtype: JewelSubtype;
  upgrade: Extract<ItemUpgradeAttributes, { id: "jewel" }>;
};

export type WorkshopFashionItem = WorkshopItemCore & {
  kind: "fashion";
  fashionSlot: FashionSlot;
  upgrade: Extract<ItemUpgradeAttributes, { id: "fashion" }>;
};

export type WorkshopItem =
  | WorkshopWeaponItem
  | WorkshopArmorItem
  | WorkshopJewelItem
  | WorkshopFashionItem;

export function createSkinState(skinPool: SkinPoolEntry[]): WorkshopSkinState {
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