/** Tipos de item — alinhados aos JSON em `items/*.json`. */

export type ItemType = "weapon" | "armor" | "jewel" | "fashion" | "consumable";

/** Tier do equipamento ou `upgrade` para consumíveis de workshop. */
export type ItemCategory = "normal" | "green" | "ultimate" | "baruna" | "upgrade";

/** Só weapon/armor usam estas categorias. */
export type GearItemCategory = Exclude<ItemCategory, "upgrade">;

export type ConsumableSubtype = "upgrade-stone" | "upgrade-scroll" | "smelting";

/** IDs de consumíveis = chaves em `consumables.json` / receitas. */
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