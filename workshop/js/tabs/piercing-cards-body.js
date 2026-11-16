import {
  piercingWeaponConfig,
  summarizeEquippedWeaponCards,
} from "../data/piercing-slots.js";
import { renderPanelSubTabBar } from "../components/upgrade/sub-tab-bar.js";
import { PIERCING_SUB_TABS } from "./piercing-sub-tabs.js";
import { renderPiercingSlotList } from "../components/piercing/slot-list.js";
import { renderCardBonusBar } from "../components/piercing/card-bonus-bar.js";
import { renderPiercingCardActions } from "../components/piercing/piercing-card-actions.js";

export const cardsMaterials = [
  { icon: "🔴", name: "Fire Card (D)", quantity: 6 },
  { icon: "🔴", name: "Fire Card (B)", quantity: 2 },
  { icon: "🟡", name: "Electric Card (C)", quantity: 4 },
];

export function renderPiercingCardsBody() {
  return `
    ${renderPanelSubTabBar({
      tabs: PIERCING_SUB_TABS,
      activeId: "cards",
      dataAttr: "piercing-sub",
      ariaLabel: "Piercing mode",
    })}
    <p class="upgrade-sub-hint muted">
      <strong>Cards</strong> only go into <strong>pierced</strong> sockets. Locked rows still need
      piercing; empty pierced rows accept <strong>letter cards</strong> (D–A…), not suit % cards.
    </p>
    ${renderPiercingSlotList(piercingWeaponConfig)}
    ${renderCardBonusBar(summarizeEquippedWeaponCards(piercingWeaponConfig))}
    ${renderPiercingCardActions()}
  `;
}