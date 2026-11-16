import {
  elementUpgradeState,
  getElementById,
} from "../data/element-upgrade.js";
import { renderPanelSubTabBar } from "../components/upgrade/sub-tab-bar.js";
import { ELEMENT_SUB_TABS } from "./element-sub-tabs.js";
import { renderElementStatus } from "../components/element/element-status.js";
import { renderElementTarget } from "../components/element/element-target.js";
import { renderAttemptTable } from "../components/upgrade/attempt-table.js";
import { renderProbabilityBar } from "../components/upgrade/probability-bar.js";
import { renderActionButtons } from "../components/upgrade/action-buttons.js";
import { getAttemptRows } from "../data/attempt-plans.js";

export function getElementUpgradeMaterials() {
  const applied = getElementById(elementUpgradeState.appliedElementId);
  const { inventory } = elementUpgradeState;
  return [
    {
      icon: applied?.cardIcon ?? "⚡",
      name: applied?.cardName ?? "Element Card",
      quantity: inventory.elementCards,
    },
    { icon: "📜", name: "SProtect", quantity: inventory.sprotect },
    {
      icon: "✨",
      name: "Smelting Scroll (Elements)",
      quantity: inventory.smeltingElements,
    },
  ];
}

export function renderElementUpgradeBody() {
  const {
    appliedElementId,
    level,
    maxLevel,
    targetLevel,
    preview,
  } = elementUpgradeState;

  const applied = getElementById(appliedElementId);

  return `
    ${renderPanelSubTabBar({
      tabs: ELEMENT_SUB_TABS,
      activeId: "upgrade",
      dataAttr: "element-sub",
      ariaLabel: "Element mode",
    })}
    <p class="upgrade-sub-hint muted">
      Use only the <strong>matching element card</strong> for the element already on this item
      (${applied?.label ?? "—"}). You cannot raise Lightning with a Water card.
    </p>
    ${renderElementStatus({
      label: applied?.label ?? "—",
      icon: applied?.icon ?? "⚡",
      level,
      max: maxLevel,
    })}
    ${renderElementTarget({ current: level, target: targetLevel, max: maxLevel })}
    ${renderAttemptTable({
      title: "Upgrade Attempts",
      rows: getAttemptRows("element-upgrade"),
    })}
    ${renderProbabilityBar({
      chance: preview.chance,
      energy: preview.energy,
      chanceHighlight: true,
    })}
    ${renderActionButtons({
      primary: "Start",
      secondary: ["Auto Refill", "Clear"],
      attemptPlanKey: "element-upgrade",
    })}
  `;
}