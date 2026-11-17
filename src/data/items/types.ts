/** Campos comuns a **todo** item do jogo (equip, consumível, skin, …). */

export type ItemType =
  | "weapon"
  | "armor"
  | "jewel"
  | "fashion"
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
  | "upgrade"
  | "skin"
  | "pet"
  | "quest";

/** Tier de gear (weapon/armor). */
export type GearItemCategory = "normal" | "green" | "ultimate" | "baruna";

export type ConsumableSubtype = "upgrade-stone" | "upgrade-scroll" | "smelting";

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

/** Primary compatível com a skin (mesmo `subtype` do equip). */
export type SkinSlot = WeaponSubtype | ArmorSubtype | FashionSubtype;

export type ConsumableRecipeSlot = "material" | "protect" | "smelting";

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
  setBonus?: string;
  info?: InfoLine[];
  awake?: AwakeRecord[];
  skinPoolIds?: string[];
  skinScrolls?: { purge: number; recover: number };
  recipeSlot?: ConsumableRecipeSlot;
  /** Skin: gear do workshop que aceita este look. */
  hostItemId?: string;
  /** Skin: mesmo `subtype` do primary (machado→machado, espada→espada). */
  skinSlot?: SkinSlot;
};

export type ItemsCatalog = {
  schemaVersion: 2;
  items: ItemRecord[];
};