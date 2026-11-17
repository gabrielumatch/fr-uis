/** Campos comuns a **todo** item do jogo (equip, consumível, skin, …). */

import type { RaisedPetRecord } from "../pets/types";
import type { PickupPetRecord } from "../pets/pickup-types";

export type ItemType =
  | "weapon"
  | "armor"
  | "jewel"
  | "fashion"
  | "wing"
  | "consumable"
  | "skin"
  | "pet"
  | "quest";

export type ItemCategory =
  | "normal"
  | "green"
  | "ultimate"
  | "baruna"
  | "accessory"
  | "fashion"
  | "wing"
  | "upgrade"
  | "skin"
  | "pet"
  | "quest";

/** Tier de gear (weapon/armor). */
export type GearItemCategory = "normal" | "green" | "ultimate" | "baruna";

export type ConsumableSubtype =
  | "upgrade-stone"
  | "upgrade-scroll"
  | "smelting"
  | "buff-bead";

/** Cor/tier visual no jogo — normal (azul), precious (amarelo), sacred (vermelho). */
export type BuffBeadGrade = "normal" | "precious" | "sacred" | "permanent";

export type SkinSubtype = "equipment-look";

export type UpgradeMaterialKey =
  | "sunstone"
  | "moonstone"
  | "oricalkum"
  | "lightning-stone"
  | "baruna-balance";

export type UpgradeProtectKey =
  | "sprotect"
  | "aprotect"
  | "xprotect"
  | "baruna-blessing";

export type JewelSubtype = "ring" | "necklace" | "earring";

export type ArmorSubtype = "helmet" | "suit" | "gauntlet" | "boots" | "shield";

export type WeaponSubtype =
  | "sword"
  | "two-handed-sword"
  | "axe"
  | "two-handed-axe"
  | "bow"
  | "wand"
  | "staff"
  | "stick"
  | "knuckle"
  | "yoyo";

export type FashionSubtype = "hat" | "suit" | "gloves" | "boots" | "back";

export type WingSubtype = "back" | "wings";

export type PetSubtype = "raised" | "pickup";

/** Primary compatível com a skin (mesmo `subtype` do equip). */
export type SkinSlot = WeaponSubtype | ArmorSubtype | FashionSubtype;

export type ConsumableRecipeSlot = "material" | "protect" | "smelting";

/**
 * Regra de furos para gemas em **armas** (diamond/sapphire/ruby):
 * - `none` — normal/green: max +10, sem sockets
 * - `ultimate` — max +10; +6…+10 libera até 5 sockets
 * - `baruna` — max +20; sockets em +12, +14, +16, +18, +20
 */
export type WeaponJewelSocketRule = "ultimate" | "baruna" | "none";

export type ItemCombatStats = {
  level?: number;
  attack?: { min: number; max: number };
  defense?: { min: number; max: number };
};

export type ElementTrack = {
  name: string;
  level: number;
  max: number;
};

export type SlotProgress = {
  current: number;
  max: number;
};

export type JewelSockets = {
  unlocked: number;
  capacity: number;
};

export type AwakeRecord = {
  label: string;
  value: string;
  tone?: "default" | "red" | "blue";
};

export type InfoLine = { label: string; value: string };

/** Entrada JSON — mesma raiz para todos os `type`. Campos extras são opcionais. */
export type ItemRecord = {
  id: string;
  name: string;
  type: ItemType;
  subtype: string;
  category: ItemCategory;
  typeLabel: string;
  iconKey?: string;
  iconEmoji?: string;
  stackQty?: number;
  elementHost?: "weapon" | "suit";
  upgradeLevel?: number;
  gearScore?: number;
  level?: number;
  attack?: { min: number; max: number };
  defense?: { min: number; max: number };
  bonus?: string;
  element?: ElementTrack;
  piercing?: SlotProgress;
  cards?: SlotProgress;
  jewels?: JewelSockets;
  setBonus?: string | string[];
  info?: InfoLine[];
  awake?: AwakeRecord[];
  skinPoolIds?: string[];
  skinScrolls?: { purge: number; recover: number };
  recipeSlot?: ConsumableRecipeSlot;
  /** Skin: gear do workshop que aceita este look. */
  hostItemId?: string;
  /** Skin: mesmo `subtype` do primary (machado→machado, espada→espada). */
  skinSlot?: SkinSlot;
  /** Pet raised: progressão D–S, feed, stat levels (subtype `raised`). */
  raisedPet?: RaisedPetRecord;
  /** Pet pick-up/buff: convert, beads, blessing, loot filter (subtype `pickup`). */
  pickupPet?: PickupPetRecord;
  /** Consumable buff-bead equipável no Buff Pet (subtype `buff-bead`). */
  buffBead?: BuffBeadRecord;
};

export type BuffBeadRecord = {
  grade: BuffBeadGrade;
  /** Linha de evolução (power, winds, tiger, …) para UI e requisitos. */
  family: string;
  tier: 1 | 2 | 3 | 4;
  effectSummary: string;
  durationLabel: string;
  /** Ids de outros beads que precisam estar equipados (ex. sacred). */
  requiresBeadIds?: string[];
};

export type ItemsCatalog = {
  schemaVersion: 2;
  items: ItemRecord[];
};