import { awakeManagementState } from "../data/awake-management.js";
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
  panelSubtitle: "Reroll bonus stats on your equipment.",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  materials: [
    {
      icon: "🔮",
      name: "Awakening Scroll",
      quantity: awakeManagementState.inventory.awakeningScroll,
    },
    {
      icon: "📜",
      name: "Reversion Scroll",
      quantity: awakeManagementState.inventory.reversionScroll,
    },
  ],
  renderBody() {
    const s = awakeManagementState;

    return `
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