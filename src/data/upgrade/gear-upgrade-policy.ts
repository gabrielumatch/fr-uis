import type { GearItemCategory, WeaponJewelSocketRule } from "../items/types";
import { gearCategoryToRecipeId } from "./rules";
import type { UpgradeRecipeId } from "./recipes";

/** Cap de Safe Upgrade (`+`) por receita de gear. */
export const GEAR_MAX_PLUS_BY_RECIPE: Record<
  Exclude<UpgradeRecipeId, "jewel" | "fashion">,
  number
> = {
  normal: 10,
  ultimate: 10,
  baruna: 20,
};

/** Baruna: 1 furo em cada um desses níveis (+12 … +20). */
export const BARUNA_JEWEL_UNLOCK_PLUS = [12, 14, 16, 18, 20] as const;

/** Ultimate: 1º socket em +6, depois +1 por nível até +10 (5 slots). */
export const ULTIMATE_JEWEL_FIRST_PLUS = 6;
export const ULTIMATE_JEWEL_LAST_PLUS = 10;

export function gearRecipeId(
  category: GearItemCategory,
): keyof typeof GEAR_MAX_PLUS_BY_RECIPE {
  return gearCategoryToRecipeId(category);
}

export function jewelSocketRuleForCategory(
  category: GearItemCategory,
): WeaponJewelSocketRule {
  return gearCategoryToRecipeId(category) === "baruna"
    ? "baruna"
    : gearCategoryToRecipeId(category) === "ultimate"
      ? "ultimate"
      : "none";
}