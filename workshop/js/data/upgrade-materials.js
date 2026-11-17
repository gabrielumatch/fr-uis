import { equippedItem } from "./equipped-item.js";
import { WIKI } from "./flyff-wiki-icons.js";

/** @typedef {{ icon: string; name: string; quantity: number }} UpgradeMaterialDef */

const JEWELRY_TYPES = new Set(["Ring", "Necklace", "Earring"]);

/**
 * @param {{ type?: string }} [item]
 */
export function isJewelryWorkshopItem(item = equippedItem) {
  return JEWELRY_TYPES.has(item?.type ?? "");
}

/**
 * @param {{ upgradeTier?: string; name?: string }} [item]
 */
export function isUltimateWorkshopItem(item = equippedItem) {
  if (item?.upgradeTier === "ultimate") return true;
  if (item?.upgradeTier === "normal") return false;
  return /Ultimate/i.test(item?.name ?? "");
}

/** @returns {UpgradeMaterialDef[]} */
export function getUpgradeLevelMaterials() {
  if (isJewelryWorkshopItem()) {
    return [
      { icon: WIKI.moonstone, name: "Moonstone", quantity: 18 },
      { icon: WIKI.scrollAProtect, name: "AProtect", quantity: 10 },
    ];
  }

  if (isUltimateWorkshopItem()) {
    return [
      { icon: WIKI.shiningOricalkum, name: "Shining Oricalkum", quantity: 25 },
      { icon: WIKI.scrollXProtect, name: "XProtect", quantity: 10 },
      { icon: "✨", name: "Smelting Scroll", quantity: 5 },
    ];
  }

  return [
    { icon: WIKI.sunstone, name: "Sunstone", quantity: 25 },
    { icon: WIKI.scrollSProtect, name: "SProtect", quantity: 10 },
    { icon: "✨", name: "Smelting Scroll", quantity: 5 },
  ];
}

/** Ícones das células da Safe Upgrade (attempt table). */
export function getUpgradeLevelAttemptDefaults() {
  if (isJewelryWorkshopItem()) {
    return { material: "🌙", protect: "📜", smelting: "" };
  }
  if (isUltimateWorkshopItem()) {
    return { material: "✴️", protect: "📜", smelting: "✨" };
  }
  return { material: "☀️", protect: "📜", smelting: "✨" };
}