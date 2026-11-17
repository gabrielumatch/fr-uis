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
import type { RaisedPetRuntime, RaisedPetSpecies, PetRank, PetStatTier } from "../pets/types";
import type {
  BuffBeadEquipped,
  PickupFilterState,
  PickupPetMode,
  PickupPetRuntime,
} from "../pets/pickup-types";
import type { ItemUpgradeAttributes } from "../upgrade/recipes";

export type StatRow = { label: string; value: string; values?: string[] };

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
  /** `true` quando `type === "skin"` — não usa aba Upgrade. */
  isSkin: boolean;
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
  skinSlot: import("./types").SkinSlot;
  hostItemId?: string;
};

/**
 * Pick-up / Buff (cash shop) — workshop com Convert ou Beads, Blessing, Pickup filter.
 * Sem safe+, rank D–S nem feed de raised.
 */
export type WorkshopPickupPetItem = ItemBase & {
  type: "pet";
  subtype: "pickup";
  category: "pet";
  mode: PickupPetMode;
  mailable: boolean;
  summoned: boolean;
  unlockedBeadSlots: number;
  /** Slots hidratados (somente leitura na UI). */
  beadSlots: (BuffBeadEquipped | null)[];
  /** Ids por slot — fonte de verdade para equipar beads. */
  _beadSlotIds: (string | null)[];
  stats: StatRow[];
  blessing: AwakeStat[];
  pickupFilter: PickupFilterState;
  workshopPickup: PickupPetRuntime;
};

/** @deprecated alias — sempre hidratado como WorkshopPickupPetItem */
export type PickupPetItem = WorkshopPickupPetItem;

/**
 * Raised pet — sem `upgradeLevel` / badge de slot (+N, LvN).
 * Rank e stat level ficam só nas linhas de stat do workshop, nunca no ícone da bag.
 */
export type WorkshopRaisedPetItem = ItemBase & {
  type: "pet";
  subtype: "raised";
  category: "pet";
  species: RaisedPetSpecies;
  rank: PetRank;
  statLevel: number;
  rankExpPercent: number;
  hp: number;
  hpMax: number;
  lives: number;
  summoned: boolean;
  statTiers: PetStatTier[];
  stats: StatRow[];
  awake: AwakeStat[];
  gearScore: number;
  workshopPet: RaisedPetRuntime;
};

export type PetItem = WorkshopPickupPetItem | WorkshopRaisedPetItem;

export type QuestItem = ItemBase & {
  type: "quest";
  category: "quest";
};

export type WingItem = ItemBase & {
  type: "wing";
  subtype: import("./types").WingSubtype;
  category: "wing";
  gearScore: number;
  info: import("./types").InfoLine[];
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

/** Gear + pets com workshop (raised ou pick-up/buff). */
export type WorkshopHostItem = WorkshopItem | WorkshopRaisedPetItem | WorkshopPickupPetItem;

export type CatalogItem =
  | WorkshopHostItem
  | ConsumableItem
  | SkinItem
  | QuestItem
  | WingItem;

export function isWorkshopItem(item: CatalogItem): item is WorkshopItem {
  return (
    item.type === "weapon" ||
    item.type === "armor" ||
    item.type === "jewel" ||
    item.type === "fashion"
  );
}

export function isWorkshopGearItem(item: CatalogItem): item is WorkshopItem {
  return isWorkshopItem(item);
}

export function isRaisedPetItem(item: CatalogItem): item is WorkshopRaisedPetItem {
  return item.type === "pet" && item.subtype === "raised";
}

export function isPickupPetItem(item: CatalogItem): item is WorkshopPickupPetItem {
  return item.type === "pet" && item.subtype === "pickup";
}

export function isBuffPetItem(
  item: CatalogItem,
): item is WorkshopPickupPetItem & { mode: "buff" } {
  return isPickupPetItem(item) && item.mode === "buff";
}

export function isPickupOnlyPetItem(
  item: CatalogItem,
): item is WorkshopPickupPetItem & { mode: "pickup" } {
  return isPickupPetItem(item) && item.mode === "pickup";
}

export function isWorkshopHostItem(item: CatalogItem): item is WorkshopHostItem {
  return isWorkshopGearItem(item) || isRaisedPetItem(item) || isPickupPetItem(item);
}

export function isConsumableItem(item: CatalogItem): item is ConsumableItem {
  return item.type === "consumable";
}

export function isSkinItem(item: CatalogItem): item is SkinItem {
  return item.isSkin || item.type === "skin";
}

export function isWingItem(item: CatalogItem): item is WingItem {
  return item.type === "wing";
}

/** Weapon/armor/jewel com Safe Upgrade — não skin, wing, fashion CS, pet, etc. */
export function opensWorkshopUpgrade(item: CatalogItem): boolean {
  return (
    item.type === "weapon" || item.type === "armor" || item.type === "jewel"
  );
}

/** Abre o bloco workshop (gear safe+, raised ou pick-up/buff). */
export function opensWorkshopHost(item: CatalogItem): boolean {
  return opensWorkshopUpgrade(item) || isRaisedPetItem(item) || isPickupPetItem(item);
}

/** @deprecated import from `../workshop/ui-rules` */
export function itemOpensWorkshopUi(item: CatalogItem): boolean {
  return opensWorkshopHost(item);
}

/** Doll / bag: seleciona no sidebar sem obrigar aba Upgrade. */
export function isEquipSelectableItem(item: CatalogItem): boolean {
  return opensWorkshopUpgrade(item) || isWingItem(item);
}

export function isPetItem(item: CatalogItem): item is PetItem {
  return item.type === "pet" && (item.subtype === "raised" || item.subtype === "pickup");
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