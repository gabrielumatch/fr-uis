import {
  elementUpgradeState,
  elementTypes,
  getElementById,
} from "../data/element-upgrade.js";
import { renderPanelSubTabBar } from "../components/upgrade/sub-tab-bar.js";
import { ELEMENT_SUB_TABS } from "./element-sub-tabs.js";
import { renderElementStatus } from "../components/element/element-status.js";
import { renderElementPicker } from "../components/element/element-picker.js";
import { renderActionButtons } from "../components/upgrade/action-buttons.js";

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
  const target = getElementById(changeTargetElementId);

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
    ${renderElementPicker({
      elements: elementTypes,
      selectedId: changeTargetElementId,
      title: "New Element",
      pickAttr: "change-element-id",
      disabledId: appliedElementId,
    })}
    <div class="element-change-summary">
      ${applied?.icon ?? ""} ${applied?.label ?? "—"} ${level}/${maxLevel}
      <span aria-hidden="true">→</span>
      ${target?.icon ?? ""} ${target?.label ?? "—"} ${level}/${maxLevel}
    </div>
    ${renderActionButtons({
      primary: "Change Element",
      secondary: [],
    })}
  `;
}