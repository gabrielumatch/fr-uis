import type {
  UpgradeMaterialKey,
  UpgradeProtectKey,
  WeaponJewelSocketRule,
} from "../items/types";

/**
 * Receita de Safe Upgrade (`+`) — gPotato v21.
 * Cada variante fixa o par material + protect no tipo.
 */
export type UpgradeRecipeId =
  | "jewel"
  | "normal"
  | "ultimate"
  | "baruna"
  | "fashion";

/** Pares canônicos material ↔ protect (referência FlyFF — validação no item). */
export const UPGRADE_RECIPE_PAIRS = {
  jewel: { material: "moonstone", protect: "aprotect" },
  normal: { material: "sunstone", protect: "sprotect" },
  ultimate: { material: "oricalkum", protect: "xprotect" },
  baruna: { material: "baruna-balance", protect: "baruna-blessing" },
  fashion: { material: "lightning-stone", protect: null },
} as const satisfies Record<
  UpgradeRecipeId,
  { material: UpgradeMaterialKey; protect: UpgradeProtectKey | null }
>;

type RecipePair<T extends UpgradeRecipeId> = (typeof UPGRADE_RECIPE_PAIRS)[T];

/** Atributos de upgrade **no próprio item** (fonte de verdade no catálogo). */
export type ItemUpgradeAttributes = {
  [K in UpgradeRecipeId]: {
    id: K;
    maxPlus: number;
    material: RecipePair<K>["material"];
    protect: RecipePair<K>["protect"];
    smeltingMaxPlus: K extends "normal" ? 7 : null;
    weaponJewelSocketRule: WeaponJewelSocketRule;
  };
}[UpgradeRecipeId];

/** @deprecated alias */
export type UpgradeLevelRecipe = ItemUpgradeAttributes;

export function recipeFromId(id: UpgradeRecipeId): ItemUpgradeAttributes {
  switch (id) {
    case "jewel":
      return {
        id: "jewel",
        maxPlus: 20,
        ...UPGRADE_RECIPE_PAIRS.jewel,
        smeltingMaxPlus: null,
        weaponJewelSocketRule: "none",
      };
    case "fashion":
      return {
        id: "fashion",
        maxPlus: 10,
        ...UPGRADE_RECIPE_PAIRS.fashion,
        smeltingMaxPlus: null,
        weaponJewelSocketRule: "none",
      };
    case "baruna":
      return {
        id: "baruna",
        maxPlus: 20,
        ...UPGRADE_RECIPE_PAIRS.baruna,
        smeltingMaxPlus: null,
        weaponJewelSocketRule: "baruna",
      };
    case "ultimate":
      return {
        id: "ultimate",
        maxPlus: 20,
        ...UPGRADE_RECIPE_PAIRS.ultimate,
        smeltingMaxPlus: null,
        weaponJewelSocketRule: "ultimate",
      };
    default:
      return {
        id: "normal",
        maxPlus: 10,
        ...UPGRADE_RECIPE_PAIRS.normal,
        smeltingMaxPlus: 7,
        weaponJewelSocketRule: "none",
      };
  }
}

/** Helper para montar o bloco `upgrade` no catálogo (gPotato padrão). */
export function upgradeProfile<T extends UpgradeRecipeId>(
  id: T,
): Extract<ItemUpgradeAttributes, { id: T }> {
  return recipeFromId(id) as Extract<ItemUpgradeAttributes, { id: T }>;
}

/** Lê os atributos gravados no item — sem inferir por nome ou kind. */
export function getUpgradeLevelRecipe(item: {
  upgrade: ItemUpgradeAttributes;
}): ItemUpgradeAttributes {
  return item.upgrade;
}

export function upgradeAttributesValid(
  upgrade: ItemUpgradeAttributes,
): boolean {
  const canonical = UPGRADE_RECIPE_PAIRS[upgrade.id];
  return (
    upgrade.material === canonical.material &&
    upgrade.protect === canonical.protect
  );
}

export type UpgradeAttemptSlotIcons = {
  material: string;
  protect: string;
  smelting: string;
};

export const UPGRADE_ATTEMPT_ICONS: Record<UpgradeRecipeId, UpgradeAttemptSlotIcons> =
  {
    jewel: { material: "🌙", protect: "📜", smelting: "" },
    normal: { material: "☀️", protect: "📜", smelting: "✨" },
    ultimate: { material: "✴️", protect: "📜", smelting: "" },
    baruna: { material: "⚖️", protect: "📜", smelting: "" },
    fashion: { material: "⚡", protect: "", smelting: "" },
  };