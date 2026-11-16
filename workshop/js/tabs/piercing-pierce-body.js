import { piercingWeaponConfig, getPiercingCounts } from "../data/piercing-slots.js";
import { renderPanelSubTabBar } from "../components/upgrade/sub-tab-bar.js";
import { PIERCING_SUB_TABS } from "./piercing-sub-tabs.js";
import { renderAttemptTable } from "../components/upgrade/attempt-table.js";
import { renderProbabilityBar } from "../components/upgrade/probability-bar.js";
import { renderActionButtons } from "../components/upgrade/action-buttons.js";

const pierceAttempts = Array.from({ length: 10 }, (_, i) => ({
  index: i + 1,
  material: "🌙",
  protect: "📜",
  smelting: "✨",
  result: "Pending",
}));

export const pierceMaterials = [
  { icon: "🌙", name: "Moonstone", quantity: 40 },
  { icon: "📜", name: "GProtect", quantity: 5 },
  { icon: "✨", name: "Smelting Scroll", quantity: 5 },
];

export function renderPiercingPierceBody() {
  const { pierced, max } = getPiercingCounts(piercingWeaponConfig);
  const nextSlot = pierced < max ? pierced + 1 : max;

  return `
    ${renderPanelSubTabBar({
      tabs: PIERCING_SUB_TABS,
      activeId: "pierce",
      dataAttr: "piercing-sub",
      ariaLabel: "Piercing mode",
    })}
    <p class="upgrade-sub-hint muted">
      <strong>Pierce</strong> opens a new socket (Moonstone + GProtect). Until the hole exists,
      cards cannot be inserted — use the <strong>Cards</strong> tab after a successful pierce.
    </p>
    <div class="pierce-pierce-meta">
      <span>Pierced sockets: <b>${pierced} / ${max}</b></span>
      <span class="muted">Next target: Slot ${String(nextSlot).padStart(2, "0")}</span>
    </div>
    ${renderAttemptTable({ title: "Piercing Attempts", rows: pierceAttempts })}
    ${renderProbabilityBar({
      chance: "12%",
      energy: "18%",
      chanceHighlight: true,
    })}
    ${renderActionButtons({
      primary: "Start",
      secondary: ["Auto Refill", "Clear"],
    })}
  `;
}