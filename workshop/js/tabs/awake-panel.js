import { awakeManagementState } from "../data/awake-management.js";
import { equippedItem } from "../data/equipped-item.js";
import { renderAwakeTargetItem } from "../components/awake/awake-target-item.js";
import { renderAwakeNotice } from "../components/awake/awake-notice.js";
import { renderAwakeResults } from "../components/awake/awake-results.js";
import { renderAwakeHighlight } from "../components/awake/awake-highlight.js";
import { renderAwakeActions } from "../components/awake/awake-actions.js";

/** @type {import('./registry.js').TabDefinition} */
export const awakeTab = {
  id: "awake",
  label: "Awake",
  icon: "◇",
  panelTitle: "Awake Item",
  panelSubtitle: "",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  get materials() {
    const inv = awakeManagementState.inventory;
    return [
      {
        icon: "🔮",
        name: "Awakening Scroll",
        quantity: inv.awakeningScroll,
      },
      {
        icon: "📜",
        name: "Reversion Scroll",
        quantity: inv.reversionScroll,
      },
    ];
  },
  renderBody() {
    const s = awakeManagementState;

    return `
      ${renderAwakeTargetItem({ name: equippedItem.name })}
      ${renderAwakeNotice({ penyaCost: s.penyaCost })}
      ${renderAwakeResults({ lines: s.lines, showColored: s.showColoredStats })}
      ${renderAwakeHighlight({
        options: s.highlightOptions,
        primary: s.highlightPrimary,
        secondary: s.highlightSecondary,
        showColored: s.showColoredStats,
        summarize: s.summarizeStats,
      })}
      ${renderAwakeActions()}
    `;
  },
};