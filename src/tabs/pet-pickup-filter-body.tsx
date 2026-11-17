import { PICKUP_FILTER_LABELS } from "./pet-pickup-filter-labels";
import { getEquippedPickupPet } from "../data/systems/pickup-pet-workshop";
import type { PickupFilterId } from "../data/pets/pickup-types";

export function PetPickupFilterBody() {
  const pet = getEquippedPickupPet();
  if (!pet) return null;

  return (
    <>
      <p className="upgrade-sub-hint muted">
        Shown when you summon the pet (v21+). Toggle which drops the pet collects.
      </p>
      <div className="frame upgrade-target">
        {(Object.keys(PICKUP_FILTER_LABELS) as PickupFilterId[]).map((id) => (
          <button
            key={id}
            type="button"
            className="upgrade-target__row btn btn--ghost"
            data-action="Toggle Pickup Filter"
            data-pickup-filter-id={id}
            aria-pressed={pet.pickupFilter[id]}
          >
            <span>{pet.pickupFilter[id] ? "☑" : "☐"}</span>{" "}
            <span>{PICKUP_FILTER_LABELS[id]}</span>
          </button>
        ))}
      </div>
    </>
  );
}