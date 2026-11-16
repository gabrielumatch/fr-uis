import { renderSkinsApplyBody, getSkinsApplyMaterials } from "./skins-apply-body.js";
import { renderSkinsRemoveBody, getSkinsRemoveMaterials } from "./skins-remove-body.js";

export { SKINS_SUB_TABS } from "./skins-sub-tabs.js";

/** @typedef {'apply' | 'remove'} SkinsSubId */

/**
 * @param {string} [sub]
 * @returns {SkinsSubId}
 */
export function resolveSkinsSub(sub) {
  if (sub === "remove" || sub === "revert") return "remove";
  return "apply";
}

/**
 * @param {SkinsSubId} sub
 */
export function getSkinsPanelView(sub) {
  const mode = resolveSkinsSub(sub);
  if (mode === "remove") {
    return {
      panelTitle: "Remove Skin",
      panelSubtitle: "Restore the item's original appearance.",
      materialsVariant: "grid",
      materialsTitle: "Materials Required / Available",
      materials: getSkinsRemoveMaterials(),
      renderBody: renderSkinsRemoveBody,
    };
  }

  return {
    panelTitle: "Apply Skin",
    panelSubtitle: "Makeup Artist — same equipment type only.",
    materialsVariant: "grid",
    materialsTitle: "Materials Required / Available",
    materials: getSkinsApplyMaterials(),
    renderBody: renderSkinsApplyBody,
  };
}

/** @type {import('./registry.js').TabDefinition} */
export const skinsTab = {
  id: "skins",
  label: "Skins",
  icon: "✨",
  panelTitle: "Apply Skin",
  panelSubtitle: "",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  materials: getSkinsApplyMaterials(),
  renderBody() {
    return renderSkinsApplyBody();
  },
};