import { renderUpgradeTarget } from "../components/upgrade/upgrade-target.js";
import { renderAttemptTable } from "../components/upgrade/attempt-table.js";
import { renderProbabilityBar } from "../components/upgrade/probability-bar.js";
import { renderActionButtons } from "../components/upgrade/action-buttons.js";

const attemptRows = Array.from({ length: 10 }, (_, i) => ({
  index: i + 1,
  material: "🔶",
  protect: "📜",
  smelting: "✨",
  result: "Pending",
}));

/** @type {import('./registry.js').TabDefinition} */
export const upgradeTab = {
  id: "upgrade",
  label: "Upgrade",
  icon: "🔨",
  panelTitle: "Safe Upgrade",
  panelSubtitle: "Plan protected upgrade attempts to your target level.",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  materials: [
    { icon: "🔶", name: "Orikalkum", quantity: 25 },
    { icon: "📜", name: "SProtect", quantity: 10 },
    { icon: "✨", name: "Smelting Scroll", quantity: 5 },
  ],
  renderBody() {
    return `
      ${renderUpgradeTarget({ current: 10, target: 11 })}
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
  },
};