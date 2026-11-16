import {
  renderElementUpgradeBody,
  getElementUpgradeMaterials,
} from "./element-upgrade-body.js";
import {
  renderElementChangeBody,
  getElementChangeMaterials,
} from "./element-change-body.js";

export { ELEMENT_SUB_TABS } from "./element-sub-tabs.js";

/** @typedef {'upgrade' | 'change'} ElementSubId */

/**
 * @param {ElementSubId} [sub]
 */
export function resolveElementSub(sub) {
  return sub === "change" ? "change" : "upgrade";
}

/**
 * @param {ElementSubId} sub
 */
export function getElementPanelView(sub) {
  const mode = resolveElementSub(sub);
  if (mode === "change") {
    return {
      panelTitle: "Change Element",
      panelSubtitle: "Swap element type without losing level.",
      materialsVariant: "grid",
      materialsTitle: "Materials Required / Available",
      materials: getElementChangeMaterials(),
      renderBody: renderElementChangeBody,
    };
  }

  return {
    panelTitle: "Element Upgrade",
    panelSubtitle: "Raise level using the same element card as the item.",
    materialsVariant: "grid",
    materialsTitle: "Materials Required / Available",
    materials: getElementUpgradeMaterials(),
    renderBody: renderElementUpgradeBody,
  };
}

/** @type {import('./registry.js').TabDefinition} */
export const elementTab = {
  id: "element",
  label: "Element",
  icon: "⚡",
  panelTitle: "Element Upgrade",
  panelSubtitle: "",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  materials: getElementUpgradeMaterials(),
  renderBody() {
    return renderElementUpgradeBody();
  },
};