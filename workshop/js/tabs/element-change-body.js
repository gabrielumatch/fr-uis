import { elementUpgradeState, getElementById } from "../data/element-upgrade.js";
import { renderPanelSubTabBar } from "../components/upgrade/sub-tab-bar.js";
import { ELEMENT_SUB_TABS } from "./element-sub-tabs.js";
import { renderElementStatus } from "../components/element/element-status.js";
import { renderElementCycleWheel } from "../components/element/element-cycle-wheel.js";

export function getElementChangeMaterials() {
  return [
    {
      icon: "🔄",
      name: "Scroll of Element Change",
      quantity: elementUpgradeState.inventory.elementChangeScrolls,
    },
  ];
}

export function renderElementChangeBody() {
  const { appliedElementId, changeTargetElementId, level, maxLevel } =
    elementUpgradeState;
  const applied = getElementById(appliedElementId);

  return `
    ${renderPanelSubTabBar({
      tabs: ELEMENT_SUB_TABS,
      activeId: "change",
      dataAttr: "element-sub",
      ariaLabel: "Element mode",
    })}
    <p class="upgrade-sub-hint muted">
      <strong>Scroll of Element Change</strong> swaps the element <em>type</em> and keeps the
      current level (<strong>${level}/${maxLevel}</strong>). This is not an elemental level upgrade.
    </p>
    ${renderElementStatus({
      label: applied?.label ?? "—",
      icon: applied?.icon ?? "⚡",
      level,
      max: maxLevel,
    })}
    ${renderElementCycleWheel({
      appliedId: appliedElementId,
      targetId: changeTargetElementId,
      interactive: true,
      showChangeAction: true,
    })}
  `;
}