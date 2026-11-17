import { getPiercingCounts, piercingWeaponConfig } from "../data/systems/piercing-slots";
import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { PIERCING_SUB_TABS } from "./piercing-sub-tabs";
import { AttemptTable } from "../components/upgrade/attempt-table";
import { ProbabilityBar } from "../components/upgrade/probability-bar";
import { ActionButtons } from "../components/upgrade/action-buttons";
import { getAttemptRows } from "../data/systems/attempt-plans";

export const pierceMaterials = [
  { icon: "🌙", name: "Moonstone", quantity: 40 },
  { icon: "📜", name: "GProtect", quantity: 5 },
  { icon: "✨", name: "Smelting Scroll", quantity: 5 },
];

export function PiercingPierceBody() {
  const { pierced, max } = getPiercingCounts(piercingWeaponConfig);
  const nextSlot = pierced < max ? pierced + 1 : max;

  return (
    <>
      <PanelSubTabBar
        tabs={[...PIERCING_SUB_TABS]}
        activeId="pierce"
        dataAttr="piercing-sub"
        ariaLabel="Piercing mode"
      />
      <p className="upgrade-sub-hint muted">
        <strong>Pierce</strong> opens a new socket (Moonstone + GProtect). Until the hole exists,
        cards cannot be inserted — use the <strong>Cards</strong> tab after a successful pierce.
      </p>
      <div className="pierce-pierce-meta">
        <span>
          Pierced sockets: <b>
            {pierced} / {max}
          </b>
        </span>
        <span className="muted">Next target: Slot {String(nextSlot).padStart(2, "0")}</span>
      </div>
      <AttemptTable title="Piercing Attempts" rows={getAttemptRows("piercing-pierce")} />
      <ProbabilityBar chance="12%" energy="18%" chanceHighlight />
      <ActionButtons
        primary="Start"
        secondary={["Auto Refill", "Clear"]}
        attemptPlanKey="piercing-pierce"
      />
    </>
  );
}