import { useWorkshop } from "../context/WorkshopContext";
import {
  PET_FILTER_CATEGORIES,
  petFilterSelectedCount,
  type PetFilterCategoryDef,
  type PetFilterOptionId,
  type PetFilterState,
} from "../data/pets/pet-filter-catalog";
import {
  getEquippedPickupPet,
  setAllPetFilterOptions,
  setPetFilterClassOnly,
  setPetFilterOption,
} from "../data/systems/pickup-pet-workshop";

function FilterSection({
  category,
  filter,
  onToggle,
  onClassOnly,
}: {
  category: PetFilterCategoryDef;
  filter: PetFilterState;
  onToggle: (id: PetFilterOptionId) => void;
  onClassOnly?: (on: boolean) => void;
}) {
  const { on, total } = petFilterSelectedCount(filter, category);

  return (
    <section className={`pet-filter-section pet-filter-section--${category.id}`}>
      <header className="pet-filter-section__head">
        <h3 className="pet-filter-section__title">
          {category.title}
          <span className="pet-filter-section__count">
            ({on}/{total} selected)
          </span>
        </h3>
        {category.classOnlyKey && onClassOnly ? (
          <label className="pet-filter-class-only">
            <span>My class only</span>
            <button
              type="button"
              className={[
                "pet-filter-class-only__toggle",
                filter[category.classOnlyKey] ? "is-on" : "",
              ].join(" ")}
              aria-pressed={filter[category.classOnlyKey]}
              onClick={(e) => {
                e.stopPropagation();
                const key = category.classOnlyKey;
                if (!key) return;
                onClassOnly(!filter[key]);
              }}
            >
              {filter[category.classOnlyKey] ? "On" : "Off"}
            </button>
          </label>
        ) : null}
      </header>
      <ul className="pet-filter-section__grid">
        {category.options.map((opt) => {
          const lit = filter.options[opt.id];
          return (
            <li key={opt.id}>
              <button
                type="button"
                className={["pet-filter-tile", lit ? "is-lit" : ""].filter(Boolean).join(" ")}
                aria-pressed={lit}
                title={opt.label.replace("\n", " ")}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(opt.id);
                }}
              >
                <span className="pet-filter-tile__icon" aria-hidden>
                  {opt.icon}
                </span>
                <span className="pet-filter-tile__label">
                  {opt.label.split("\n").map((line, i) => (
                    <span key={i} className={i === 1 ? "pet-filter-tile__label-sub" : undefined}>
                      {line}
                    </span>
                  ))}
                </span>
                <span className="pet-filter-tile__mark" aria-hidden>
                  {lit ? "✓" : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function PetPickupFilterBody() {
  const workshop = useWorkshop();
  const pet = getEquippedPickupPet();
  if (!pet) return null;

  const filter = pet.pickupFilter;

  const bumpToggle = (id: PetFilterOptionId) => {
    setPetFilterOption(pet, id, !filter.options[id]);
    workshop.bump();
  };

  return (
    <div className="pet-filter-board">
      <div className="pet-filter-toolbar">
        <button
          type="button"
          className="btn btn--secondary pet-filter-toolbar__btn"
          onClick={(e) => {
            e.stopPropagation();
            setAllPetFilterOptions(pet, true);
            workshop.bump();
          }}
        >
          Select all
        </button>
        <button
          type="button"
          className="btn btn--secondary pet-filter-toolbar__btn"
          onClick={(e) => {
            e.stopPropagation();
            setAllPetFilterOptions(pet, false);
            workshop.bump();
          }}
        >
          Clear all
        </button>
      </div>

      <div className="pet-filter-board__sections">
        {PET_FILTER_CATEGORIES.map((category) => (
          <FilterSection
            key={category.id}
            category={category}
            filter={filter}
            onToggle={bumpToggle}
            onClassOnly={
              category.classOnlyKey
                ? (on) => {
                    setPetFilterClassOnly(pet, category.classOnlyKey!, on);
                    workshop.bump();
                  }
                : undefined
            }
          />
        ))}
      </div>

      <p className="pet-filter-board__foot muted">
        Your pet only picks up what is lit. Changes apply right away.
      </p>
    </div>
  );
}