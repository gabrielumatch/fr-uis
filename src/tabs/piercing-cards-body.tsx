import {
  piercingWeaponConfig,
  summarizeEquippedWeaponCards,
} from "../data/piercing-slots";
import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { PIERCING_SUB_TABS } from "./piercing-sub-tabs";
import { PiercingSlotList } from "../components/piercing/slot-list";
import { CardBonusBar } from "../components/piercing/card-bonus-bar";
import { PiercingCardActions } from "../components/piercing/piercing-card-actions";

export const cardsMaterials = [
  { icon: "🔴", name: "Fire Card (D)", quantity: 6 },
  { icon: "🔴", name: "Fire Card (B)", quantity: 2 },
  { icon: "🟡", name: "Electric Card (C)", quantity: 4 },
];

export function PiercingCardsBody() {
  return (
    <>
      <PanelSubTabBar
        tabs={[...PIERCING_SUB_TABS]}
        activeId="cards"
        dataAttr="piercing-sub"
        ariaLabel="Piercing mode"
      />
      <p className="upgrade-sub-hint muted">
        <strong>Cards</strong> only go into <strong>pierced</strong> sockets. Locked rows still need
        piercing; empty pierced rows accept <strong>letter cards</strong> (D–A…), not suit % cards.
      </p>
      <PiercingSlotList config={piercingWeaponConfig} />
      <CardBonusBar summary={summarizeEquippedWeaponCards(piercingWeaponConfig)} />
      <PiercingCardActions />
    </>
  );
}