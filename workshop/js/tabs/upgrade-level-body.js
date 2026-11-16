import { renderUpgradeTarget } from "../components/upgrade/upgrade-target.js";
import { renderAttemptTable } from "../components/upgrade/attempt-table.js";
import { renderProbabilityBar } from "../components/upgrade/probability-bar.js";
import { renderActionButtons } from "../components/upgrade/action-buttons.js";
import { renderPanelSubTabBar } from "../components/upgrade/sub-tab-bar.js";
import { equippedItem } from "../data/equipped-item.js";
import { UPGRADE_SUB_TABS } from "./upgrade-sub-tabs.js";

const attemptRows = Array.from({ length: 10 }, (_, i) => ({
  index: i + 1,
  material: "🔶",
  protect: "📜",
  smelting: "✨",
  result: "Pending",
}));

export function renderUpgradeLevelBody() {
  return `
    ${renderPanelSubTabBar({
      tabs: UPGRADE_SUB_TABS,
      activeId: "level",
      dataAttr: "upgrade-sub",
      ariaLabel: "Upgrade mode",
    })}
    ${renderUpgradeTarget({
      current: equippedItem.upgradeLevel,
      target: equippedItem.upgradeLevel + 1,
    })}
    ${renderAttemptTable({ rows: attemptRows })}
    ${renderProbabilityBar({
      chance: "10%",
      energy: "27.5%",
      cost: "29,702 Penya",
    })}
    ${renderActionButtons({
      primary: "Start",
      secondary: ["Auto Refill", "Clear"],
    })}
  `;
}

export const upgradeLevelMaterials = [
  { icon: "🔶", name: "Orikalkum", quantity: 25 },
  { icon: "📜", name: "SProtect", quantity: 10 },
  { icon: "✨", name: "Smelting Scroll", quantity: 5 },
];