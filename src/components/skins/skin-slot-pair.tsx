import { requireEquippedGear } from "../../data/workshop/equipped";
import { getItemSkinState, getSkinById } from "../../data/systems/skin-management";
import { ItemIcon } from "../../utils/item-icon";

export function SkinSlotPair({ skinSelected }: { skinSelected: boolean }) {
  const equippedItem = requireEquippedGear();
  const skinState = getItemSkinState();
  const selected = skinState.selectedSkinId
    ? getSkinById(skinState.selectedSkinId)
    : null;

  return (
    <div className="transmute-slots" role="group" aria-label="Apply skin slots">
      <div className="transmute-slot transmute-slot--primary">
        <div className="transmute-slot__tag">Primary</div>
        <ItemIcon
          icon={equippedItem.icon}
          wrapperClass="transmute-slot__icon"
          imgClass="transmute-slot__icon-img"
          alt={equippedItem.name}
        />
        <div className="transmute-slot__name">{equippedItem.name}</div>
        <div className="transmute-slot__type muted">{equippedItem.typeLabel}</div>
        <p className="transmute-slot__hint muted">
          Keeps +{equippedItem.upgradeLevel}, stats, element & awake
        </p>
      </div>
      <div className="transmute-slot__arrow" aria-hidden="true">
        →
      </div>
      <div
        className={`transmute-slot transmute-slot--skin${skinSelected ? " is-filled" : ""}`}
      >
        <div className="transmute-slot__tag">Skin</div>
        {selected ? (
          <>
            <ItemIcon
              icon={selected.icon}
              wrapperClass="transmute-slot__icon"
              imgClass="transmute-slot__icon-img"
              alt={selected.name}
            />
            <div className="transmute-slot__name">{selected.name}</div>
            <div className="transmute-slot__type muted">{selected.typeLabel}</div>
          </>
        ) : (
          <span className="transmute-slot__empty muted">Pick a skin item below</span>
        )}
        <p className="transmute-slot__hint transmute-slot__hint--warn muted">
          Skin item consumed on apply
        </p>
      </div>
    </div>
  );
}