import {
  elementUpgradeState,
  elementTypes,
  getElementById,
} from "../data/element-upgrade.js";
import { renderElementStatus } from "../components/element/element-status.js";
import { renderElementPicker } from "../components/element/element-picker.js";
import { renderElementTarget } from "../components/element/element-target.js";
import { renderAttemptTable } from "../components/upgrade/attempt-table.js";
import { renderProbabilityBar } from "../components/upgrade/probability-bar.js";
import { renderActionButtons } from "../components/upgrade/action-buttons.js";

function buildAttemptRows(count, cardIcon) {
  return Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    material: cardIcon,
    protect: "📜",
    smelting: "✨",
    result: "Pending",
  }));
}

/** @type {import('./registry.js').TabDefinition} */
export const elementTab = {
  id: "element",
  label: "Element",
  icon: "⚡",
  panelTitle: "Element Upgrade",
  panelSubtitle: "Raise elemental level with element cards.",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  get materials() {
    const el = getElementById(elementUpgradeState.selectedElementId);
    const cardName = el?.cardName ?? "Element Card";
    const cardIcon = el?.cardIcon ?? "⚡";
    const { inventory } = elementUpgradeState;
    return [
      { icon: cardIcon, name: cardName, quantity: inventory.elementCards },
      { icon: "📜", name: "SProtect", quantity: inventory.sprotect },
      {
        icon: "✨",
        name: "Smelting Scroll (Elements)",
        quantity: inventory.smeltingElements,
      },
    ];
  },
  renderBody() {
    const { appliedElementId, level, maxLevel, selectedElementId, targetLevel, plannedAttempts, preview } =
      elementUpgradeState;

    const applied = getElementById(appliedElementId) ?? elementTypes[2];
    const selected = getElementById(selectedElementId) ?? applied;

    return `
      ${renderElementStatus({
        label: applied.label,
        icon: applied.icon,
        level,
        max: maxLevel,
      })}
      ${renderElementPicker({ elements: elementTypes, selectedId: selectedElementId })}
      ${renderElementTarget({ current: level, target: targetLevel, max: maxLevel })}
      ${renderAttemptTable({
        title: "Upgrade Attempts",
        rows: buildAttemptRows(plannedAttempts, selected.cardIcon),
      })}
      ${renderProbabilityBar({
        chance: preview.chance,
        energy: preview.energy,
        chanceHighlight: true,
      })}
      ${renderActionButtons({
        primary: "Start",
        secondary: ["Auto Refill", "Clear"],
      })}
    `;
  },
};