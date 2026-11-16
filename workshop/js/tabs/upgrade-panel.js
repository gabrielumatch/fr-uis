import { renderUpgradeLevelBody, upgradeLevelMaterials } from "./upgrade-level-body.js";
import {
  renderUpgradeJewelsBody,
  upgradeJewelsMaterials,
} from "./upgrade-jewels-body.js";

/** @typedef {'level' | 'jewels'} UpgradeSubId */

import { UPGRADE_SUB_TABS } from "./upgrade-sub-tabs.js";

export { UPGRADE_SUB_TABS };

/**
 * @param {UpgradeSubId} [sub]
 */
export function resolveUpgradeSub(sub) {
  return sub === "jewels" ? "jewels" : "level";
}

/**
 * @param {UpgradeSubId} sub
 */
export function getUpgradePanelView(sub) {
  const mode = resolveUpgradeSub(sub);
  if (mode === "jewels") {
    return {
      panelTitle: "Jewel Management",
      panelSubtitle:
        "Jewel sockets unlock with upgrade level (+6 = 1st slot, +10 = 5 slots).",
      materialsVariant: "grid",
      materialsTitle: "Materials Required / Available",
      materials: upgradeJewelsMaterials(),
      renderBody: renderUpgradeJewelsBody,
    };
  }

  return {
    panelTitle: "Safe Upgrade",
    panelSubtitle: "Plan protected upgrade attempts to your target level.",
    materialsVariant: "grid",
    materialsTitle: "Materials Required / Available",
    materials: upgradeLevelMaterials,
    renderBody: renderUpgradeLevelBody,
  };
}

/** @type {import('./registry.js').TabDefinition} */
export const upgradeTab = {
  id: "upgrade",
  label: "Upgrades & Jewels",
  icon: "🔨",
  panelTitle: "Safe Upgrade",
  panelSubtitle: "",
  materialsVariant: "grid",
  materials: upgradeLevelMaterials,
  materialsTitle: "Materials Required / Available",
  renderBody() {
    return renderUpgradeLevelBody();
  },
};