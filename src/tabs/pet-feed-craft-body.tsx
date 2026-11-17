import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { PET_FEED_SUB_TABS } from "./pet-feed-sub-tabs";
import { getEquippedRaisedPet } from "../data/systems/raised-pet-workshop";
import { ActionButtons } from "../components/upgrade/action-buttons";

export function PetFeedCraftBody() {
  const pet = getEquippedRaisedPet();
  if (!pet) return null;
  const inv = pet.workshopPet.inventory;

  return (
    <>
      <PanelSubTabBar
        tabs={[...PET_FEED_SUB_TABS]}
        activeId="craft"
        dataAttr="feed-sub"
        ariaLabel="Pet feed"
      />
      <p className="upgrade-sub-hint muted">
        Pet Tamer — trade monster quest drops for <strong>Pet Feed</strong> (wiki: higher mob level
        = more feed per item).
      </p>
      <div className="frame upgrade-target">
        <div className="upgrade-target__row">
          <span className="muted">Monster Heart</span>
          <strong>{inv.questDrops.monsterHeart}</strong>
        </div>
        <div className="upgrade-target__row">
          <span className="muted">Stem</span>
          <strong>{inv.questDrops.stem}</strong>
        </div>
        <div className="upgrade-target__row">
          <span className="muted">Yield per batch</span>
          <strong>50 Pet Feed</strong>
        </div>
      </div>
      <ActionButtons primary="Craft Pet Feed" secondary={[]} />
    </>
  );
}