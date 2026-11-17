import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { PET_GROWTH_SUB_TABS } from "./pet-growth-sub-tabs";
import { getEquippedRaisedPet } from "../data/systems/raised-pet-workshop";
import { ActionButtons } from "../components/upgrade/action-buttons";

export function PetGrowthRerollBody() {
  const pet = getEquippedRaisedPet();
  if (!pet) return null;
  const inv = pet.workshopPet.inventory;

  return (
    <>
      <PanelSubTabBar
        tabs={[...PET_GROWTH_SUB_TABS]}
        activeId="reroll"
        dataAttr="growth-sub"
        ariaLabel="Pet growth"
      />
      <p className="upgrade-sub-hint muted">
        <strong>Blessing</strong> rerolls only the last stat level; <strong>Chance</strong> rerolls
        the last two. <strong>Reversion</strong> scroll removes the last stat level (go back one
        level).
      </p>
      <div className="frame upgrade-target">
        <div className="upgrade-target__row">
          <span className="muted">Blessing of the Pet Tamer</span>
          <strong>{inv.blessingOfTamer}</strong>
        </div>
        <div className="upgrade-target__row">
          <span className="muted">Chance of the Pet Tamer</span>
          <strong>{inv.chanceOfTamer}</strong>
        </div>
        <div className="upgrade-target__row">
          <span className="muted">Scroll of Pet Reversion</span>
          <strong>{inv.reversionScroll}</strong>
        </div>
      </div>
      <div className="btn-row">
        <button
          type="button"
          className="btn"
          data-action="Blessing Reroll"
          disabled={inv.blessingOfTamer < 1}
        >
          Use Blessing
        </button>
        <button
          type="button"
          className="btn"
          data-action="Chance Reroll"
          disabled={inv.chanceOfTamer < 1}
        >
          Use Chance
        </button>
      </div>
      <ActionButtons
        primary="Revert Stat Level"
        secondary={[]}
        primaryDisabled={inv.reversionScroll < 1 || pet.statLevel <= 1}
      />
    </>
  );
}