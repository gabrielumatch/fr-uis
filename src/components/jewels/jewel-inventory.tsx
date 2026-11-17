import { jewelTypes } from "../../data/systems/jewel-management";

export function JewelInventory({
  inventory,
  selectedId,
}: {
  inventory: Record<string, number>;
  selectedId: string;
}) {
  return (
    <section className="jewel-inv">
      <h3 className="section-title">Available Jewels</h3>
      <div className="jewel-inv__grid" role="group" aria-label="Available jewels">
        {jewelTypes.map((j) => {
          const qty = inventory[j.id] ?? 0;
          const isSelected = j.id === selectedId;
          const isEmpty = qty <= 0;
          return (
            <button
              key={j.id}
              type="button"
              className={`jewel-inv__tile${isSelected ? " is-selected" : ""}${isEmpty ? " is-empty" : ""}`}
              data-jewel-type={j.id}
              aria-pressed={isSelected}
              disabled={isEmpty}
            >
              <span className="jewel-inv__orb" aria-hidden="true">
                {j.icon}
              </span>
              <span className="jewel-inv__name">{j.name.replace(" Jewel", "")}</span>
              <span className="jewel-inv__qty">× {qty}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}