import { equippedItem } from "./equipped-item.js";

/** @typedef {{
 *   id: string;
 *   icon: string;
 *   name: string;
 *   type: string;
 *   qty: number;
 * }} SkinItem */

export const skinState = {
  hasSkinApplied: false,
  /** @type {{ id: string; icon: string; name: string; type: string } | null} */
  appliedLook: null,
  /** @type {string | null} */
  selectedSkinId: null,
  inventory: {
    /** Removes look; bonded skin item is destroyed. */
    purgeSkinScrolls: 2,
    /** Removes look; skin item returns to inventory. */
    recoverSkinScrolls: 1,
  },
  /** @type {SkinItem[]} */
  skinPool: [
    {
      id: "ancient-forest-axe",
      icon: "🌲",
      name: "Ancient Forest Axe",
      type: "Two-Handed Axe",
      qty: 1,
    },
    {
      id: "voulge",
      icon: "🔱",
      name: "Voulge",
      type: "Two-Handed Axe",
      qty: 1,
    },
    {
      id: "crescent-axe",
      icon: "🌙",
      name: "Crescent Axe",
      type: "Two-Handed Axe",
      qty: 1,
    },
  ],
};

const BASE_ICON = equippedItem.icon;

/**
 * @param {string} id
 * @returns {SkinItem | undefined}
 */
export function getSkinById(id) {
  return skinState.skinPool.find((s) => s.id === id);
}

/** @param {string} equipmentType */
export function canApplySkinType(equipmentType) {
  return equipmentType === equippedItem.type;
}

/** @param {string | null} id */
export function setSelectedSkinId(id) {
  if (skinState.hasSkinApplied) {
    skinState.selectedSkinId = null;
    return;
  }
  skinState.selectedSkinId = id;
}

function returnAppliedSkinToInventory() {
  const look = skinState.appliedLook;
  if (!look) return;

  const existing = getSkinById(look.id);
  if (existing) {
    existing.qty += 1;
  } else {
    skinState.skinPool.push({
      id: look.id,
      icon: look.icon,
      name: look.name,
      type: look.type,
      qty: 1,
    });
  }
}

export function syncSkinToEquippedItem() {
  const lookRow = equippedItem.stats.find((s) => s.label === "Appearance");
  if (skinState.hasSkinApplied && skinState.appliedLook) {
    equippedItem.icon = skinState.appliedLook.icon;
    equippedItem.activeSkinName = skinState.appliedLook.name;
    if (lookRow) {
      lookRow.value = `${skinState.appliedLook.name} (skin)`;
    }
  } else {
    equippedItem.icon = BASE_ICON;
    equippedItem.activeSkinName = null;
    if (lookRow) {
      lookRow.value = "Original";
    }
  }
}

export function applySkin() {
  if (skinState.hasSkinApplied) {
    return { ok: false, reason: "skin_already_applied" };
  }

  const id = skinState.selectedSkinId;
  if (!id) return { ok: false, reason: "no_skin" };

  const skin = getSkinById(id);
  if (!skin || skin.qty <= 0) return { ok: false, reason: "no_skin" };
  if (!canApplySkinType(skin.type)) return { ok: false, reason: "type_mismatch" };

  skin.qty -= 1;
  if (skin.qty <= 0) {
    skinState.skinPool = skinState.skinPool.filter((s) => s.id !== id);
  }

  skinState.hasSkinApplied = true;
  skinState.appliedLook = {
    id: skin.id,
    icon: skin.icon,
    name: skin.name,
    type: skin.type,
  };
  skinState.selectedSkinId = null;

  syncSkinToEquippedItem();
  return { ok: true };
}

/**
 * @param {"destroy" | "recover"} mode
 */
export function removeSkin(mode) {
  if (!skinState.hasSkinApplied) {
    return { ok: false, reason: "no_skin_applied" };
  }

  if (mode === "destroy") {
    if (skinState.inventory.purgeSkinScrolls <= 0) {
      return { ok: false, reason: "no_scroll" };
    }
    skinState.inventory.purgeSkinScrolls -= 1;
  } else if (mode === "recover") {
    if (skinState.inventory.recoverSkinScrolls <= 0) {
      return { ok: false, reason: "no_scroll" };
    }
    skinState.inventory.recoverSkinScrolls -= 1;
    returnAppliedSkinToInventory();
  } else {
    return { ok: false, reason: "invalid_mode" };
  }

  skinState.hasSkinApplied = false;
  skinState.appliedLook = null;

  syncSkinToEquippedItem();
  return { ok: true };
}

syncSkinToEquippedItem();