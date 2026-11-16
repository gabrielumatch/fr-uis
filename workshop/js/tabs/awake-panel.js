import { awakeManagementState } from "../data/awake-management.js";
import { equippedItem } from "../data/equipped-item.js";
import { renderAwakeTargetItem } from "../components/awake/awake-target-item.js";
import { renderAwakeMaterialSlots } from "../components/awake/awake-material-slots.js";
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
  materialsTitle: "",
  materials: [],
  renderBody() {
    const s = awakeManagementState;
    const inv = s.inventory;

    return `
      ${renderAwakeTargetItem({ name: equippedItem.name })}
      ${renderAwakeMaterialSlots({
        awakening: {
          icon: "🔮",
          name: "Awakening Scroll",
          quantity: inv.awakeningScroll,
        },
        reversion: {
          icon: "📜",
          name: "Reversion Scroll",
          quantity: inv.reversionScroll,
        },
      })}
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