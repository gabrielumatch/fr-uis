import { getEquippedPickupPet } from "../data/systems/pickup-pet-workshop";
import { pickupAwakeUiState } from "../data/systems/pickup-pet-awake";
import { AwakeTargetItem } from "../components/awake/awake-target-item";
import { AwakeResults } from "../components/awake/awake-results";
import { AwakeHighlight } from "../components/awake/awake-highlight";
import { AwakeActions } from "../components/awake/awake-actions";

export function PetPickupAwakeBody() {
  const pet = getEquippedPickupPet();
  if (!pet) return null;
  const ui = pickupAwakeUiState(pet);

  return (
    <>
      <p className="upgrade-sub-hint muted">
        Same flow as gear <strong>Awake</strong> — uses{" "}
        <strong>Scroll of Pet Blessing (Pick-up Pets)</strong>. No reversion scroll;{" "}
        <strong>Previous</strong> restores the last committed awake.
      </p>
      <AwakeTargetItem name={pet.name} />
      <AwakeResults lines={ui.lines} showColored={ui.showColoredStats} />
      <AwakeHighlight
        options={ui.highlightOptions}
        primary={ui.highlightPrimary}
        secondary={ui.highlightSecondary}
        showColored={ui.showColoredStats}
        summarize={ui.summarizeStats}
      />
      <AwakeActions />
    </>
  );
}