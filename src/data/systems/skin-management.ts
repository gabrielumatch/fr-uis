// @ts-nocheck
import { equippedItem } from "../workshop/equipped";

/** @typedef {{
 *   id: string;
 *   icon: string;
 *   name: string;
 *   type: string;
 *   qty: number;
 * }} SkinItem */

/**
 * @typedef {{
 *   hasSkinApplied: boolean;
 *   appliedLook: { id: string; icon: string; name: string; type: string } | null;
 *   selectedSkinId: string | null;
 *   inventory: { purgeSkinScrolls: number; recoverSkinScrolls: number };
 *   skinPool: SkinItem[];
 * }} ItemSkinState
 */

/** @returns {ItemSkinState} */
export function getItemSkinState() {
  return equippedItem.workshopSkin;
}

/**
 * @param {string} id
 * @returns {SkinItem | undefined}
 */
export function getSkinById(id) {
  return getItemSkinState().skinPool.find((s) => s.id === id);
}

/** @param {string} equipmentType */
export function canApplySkinType(equipmentType) {
  return equipmentType === equippedItem.typeLabel;
}

/** @param {string | null} id */
export function setSelectedSkinId(id) {
  const state = getItemSkinState();
  if (state.hasSkinApplied) {
    state.selectedSkinId = null;
    return;
  }
  state.selectedSkinId = id;
}

function returnAppliedSkinToInventory() {
  const state = getItemSkinState();
  const look = state.appliedLook;
  if (!look) return;

  const existing = getSkinById(look.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.skinPool.push({
      id: look.id,
      icon: look.icon,
      name: look.name,
      typeLabel: look.typeLabel,
      qty: 1,
    });
  }
}

export function syncSkinToEquippedItem() {
  const state = getItemSkinState();
  const lookRow = equippedItem.stats.find((s) => s.label === "Appearance");
  if (state.hasSkinApplied && state.appliedLook) {
    equippedItem.icon = state.appliedLook.icon;
    equippedItem.activeSkinName = state.appliedLook.name;
    if (lookRow) {
      lookRow.value = `${state.appliedLook.name} (skin)`;
    }
  } else {
    equippedItem.icon = equippedItem.baseIcon;
    equippedItem.activeSkinName = null;
    if (lookRow) {
      lookRow.value = "Original";
    }
  }
}

export function applySkin() {
  const state = getItemSkinState();
  if (state.hasSkinApplied) {
    return { ok: false, reason: "skin_already_applied" };
  }

  const id = state.selectedSkinId;
  if (!id) return { ok: false, reason: "no_skin" };

  const skin = getSkinById(id);
  if (!skin || skin.qty <= 0) return { ok: false, reason: "no_skin" };
  if (!canApplySkinType(skin.typeLabel)) return { ok: false, reason: "type_mismatch" };

  skin.qty -= 1;
  if (skin.qty <= 0) {
    state.skinPool = state.skinPool.filter((s) => s.id !== id);
  }

  state.hasSkinApplied = true;
  state.appliedLook = {
    id: skin.id,
    icon: skin.icon,
    name: skin.name,
    typeLabel: skin.typeLabel,
  };
  state.selectedSkinId = null;

  syncSkinToEquippedItem();
  return { ok: true };
}

/**
 * @param {"destroy" | "recover"} mode
 */
export function removeSkin(mode) {
  const state = getItemSkinState();
  if (!state.hasSkinApplied) {
    return { ok: false, reason: "no_skin_applied" };
  }

  if (mode === "destroy") {
    if (state.inventory.purgeSkinScrolls <= 0) {
      return { ok: false, reason: "no_scroll" };
    }
    state.inventory.purgeSkinScrolls -= 1;
  } else if (mode === "recover") {
    if (state.inventory.recoverSkinScrolls <= 0) {
      return { ok: false, reason: "no_scroll" };
    }
    state.inventory.recoverSkinScrolls -= 1;
    returnAppliedSkinToInventory();
  } else {
    return { ok: false, reason: "invalid_mode" };
  }

  state.hasSkinApplied = false;
  state.appliedLook = null;

  syncSkinToEquippedItem();
  return { ok: true };
}

/** @deprecated use getItemSkinState — compat for templates */
export function getSkinState() {
  return getItemSkinState();
}

syncSkinToEquippedItem();