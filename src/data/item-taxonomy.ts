/**
 * FlyFF Brasil **gPotato v21** — kind, subtipos no equipamento.
 * Regras de upgrade (`+`) ficam em `item.upgrade` — ver `upgrade-recipes.ts`.
 * @see https://flyff-wiki.gpotato.com.br/wiki/Upgrading_Equipment
 */

import type { ItemUpgradeAttributes } from "./upgrade-recipes";

export const FLYFF_RULESET_ID = "gpotato-v21" as const;

export type WorkshopItemKind = "weapon" | "armor" | "jewel" | "fashion";

/** Linha/tier FlyFF (Lusaka, Bilari, Baruna…) — metadado; materiais vêm de `upgrade`. */
export type WorkshopUpgradeCategory = "normal" | "ultimate" | "baruna";

export type JewelSubtype = "ring" | "necklace" | "earring";

export type ArmorSlot = "helmet" | "suit" | "gauntlet" | "boots" | "shield";

export type WeaponClass =
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

export type FashionSlot = "hat" | "suit" | "gloves" | "boots" | "back";

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

export type WeaponJewelSocketRule = "ultimate" | "baruna" | "none";

export interface WorkshopItemTaxonomy {
  kind: WorkshopItemKind;
  upgrade: ItemUpgradeAttributes;
  jewelSubtype?: JewelSubtype;
  armorSlot?: ArmorSlot;
  weaponClass?: WeaponClass;
  fashionSlot?: FashionSlot;
}

export const JEWEL_SUBTYPES = ["ring", "necklace", "earring"] as const satisfies readonly JewelSubtype[];

export const ARMOR_SLOTS = ["helmet", "suit", "gauntlet", "boots", "shield"] as const satisfies readonly ArmorSlot[];

export const WEAPON_CLASSES = [
  "sword",
  "two-handed-sword",
  "axe",
  "two-handed-axe",
  "bow",
  "wand",
  "staff",
  "stick",
  "knuckle",
  "yoyo",
] as const satisfies readonly WeaponClass[];

export function getMaxUpgradeLevel(item: { upgrade: ItemUpgradeAttributes }): number {
  return item.upgrade.maxPlus;
}

export function formatUpgradeProgress(
  level: number,
  item: { upgrade: ItemUpgradeAttributes },
): string {
  return `${level}/${item.upgrade.maxPlus}`;
}

export function isJewelryItem(item: WorkshopItemTaxonomy): boolean {
  return item.kind === "jewel";
}

export function isUltimateUpgradeItem(item: WorkshopItemTaxonomy): boolean {
  return item.upgrade.id === "ultimate";
}

export function isBarunaUpgradeItem(item: WorkshopItemTaxonomy): boolean {
  return item.upgrade.id === "baruna";
}

export {
  getUpgradeLevelRecipe,
  upgradeProfile,
  UPGRADE_RECIPE_PAIRS,
  upgradeAttributesValid,
  type ItemUpgradeAttributes,
  type UpgradeLevelRecipe,
  type UpgradeRecipeId,
} from "./upgrade-recipes";