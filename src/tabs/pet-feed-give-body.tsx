import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { PET_FEED_SUB_TABS } from "./pet-feed-sub-tabs";
import { getEquippedRaisedPet } from "../data/systems/raised-pet-workshop";
import { ActionButtons } from "../components/upgrade/action-buttons";

export function PetFeedGiveBody() {
  const pet = getEquippedRaisedPet();
  if (!pet) return null;
  const inv = pet.workshopPet.inventory;

  return (
    <>
      <PanelSubTabBar
        tabs={[...PET_FEED_SUB_TABS]}
        activeId="give"
        dataAttr="feed-sub"
        ariaLabel="Pet feed"
      />
      <p className="upgrade-sub-hint muted">
        While <strong>summoned</strong>, feed restores HP (+2/feed) and builds rank EXP. Un-summoning
        costs ~1 minute of EXP.
      </p>
      <div className="frame upgrade-target">
        <div className="upgrade-target__row">
          <span className="muted">Pet Feed in bag</span>
          <strong>{inv.petFeed}</strong>
        </div>
        <div className="upgrade-target__row">
          <span className="muted">Summoned</span>
          <strong>{pet.summoned ? "Yes" : "No"}</strong>
        </div>
      </div>
      <div className="btn-row">
        <button type="button" className="btn btn--secondary" data-action="Toggle Summon">
          {pet.summoned ? "Un-summon Pet" : "Summon Pet"}
        </button>
      </div>
      <ActionButtons primary="Give Pet Feed" secondary={[]} primaryDisabled={inv.petFeed < 1} />
    </>
  );
}