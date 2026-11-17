import { equippedItem } from "../../data/workshop/equipped";
import { getItemSkinState } from "../../data/systems/skin-management";
import { ItemIcon } from "../../utils/item-icon";

export function SkinPicker() {
  const skinState = getItemSkinState();
  const selectedId = skinState.selectedSkinId;
  const { skinPool } = skinState;

  if (skinPool.length === 0) {
    return (
      <p className="upgrade-sub-hint muted">
        No compatible skin items in inventory. Same equipment type only (
        <strong>{equippedItem.typeLabel}</strong>).
      </p>
    );
  }

  return (
    <>
      <p className="section-title transmute-pick__title">Skin items</p>
      <div className="transmute-pick-grid" role="listbox" aria-label="Skin items">
        {skinPool.map((item) => {
          const active = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              className={`transmute-pick${active ? " is-selected" : ""}`}
              data-skin-id={item.id}
              aria-pressed={active}
            >
              <ItemIcon
                icon={item.icon}
                wrapperClass="transmute-pick__icon"
                imgClass="transmute-pick__icon-img"
                alt={item.name}
              />
              <span className="transmute-pick__name">{item.name}</span>
              <span className="transmute-pick__qty muted">×{item.qty}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}