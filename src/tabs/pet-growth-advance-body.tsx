import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { PET_GROWTH_SUB_TABS } from "./pet-growth-sub-tabs";
import { getEquippedRaisedPet } from "../data/systems/raised-pet-workshop";
import { ActionButtons } from "../components/upgrade/action-buttons";

const EXP_NEED = 99.99;

export function PetGrowthAdvanceBody() {
  const pet = getEquippedRaisedPet();
  if (!pet) return null;
  const canAdvance = pet.statLevel < 9 && pet.rankExpPercent >= EXP_NEED;
  const canPromote = pet.rank !== "S" && pet.rankExpPercent >= EXP_NEED;

  return (
    <>
      <PanelSubTabBar
        tabs={[...PET_GROWTH_SUB_TABS]}
        activeId="advance"
        dataAttr="growth-sub"
        ariaLabel="Pet growth"
      />
      <p className="upgrade-sub-hint muted">
        At <strong>{EXP_NEED}%</strong> rank EXP, complete the Pet Tamer quest — rolls a new stat
        tier for the next level (D→S table on wiki).
      </p>
      <div className="frame upgrade-target">
        <div className="upgrade-target__row">
          <span className="muted">Rank EXP</span>
          <strong>{pet.rank === "S" ? "—" : `${pet.rankExpPercent.toFixed(2)}%`}</strong>
        </div>
        <div className="upgrade-target__row">
          <span className="muted">Next stat level</span>
          <strong>{Math.min(pet.statLevel + 1, 9)}</strong>
        </div>
      </div>
      <ActionButtons
        primary="Advance Stat Level"
        secondary={canPromote ? ["Promote Pet Rank"] : []}
        primaryDisabled={!canAdvance}
      />
    </>
  );
}