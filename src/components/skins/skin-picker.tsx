import { equippedItem } from "../../data/workshop/equipped";
import { getItemSkinState } from "../../data/systems/skin-management";
import { getBagSkinsForWorkshopHost } from "../../data/inventory/bag-skins";
import { ItemIcon } from "../../utils/item-icon";

export function SkinPicker() {
  const skinState = getItemSkinState();
  const selectedId = skinState.selectedSkinId;
  const compatible = getBagSkinsForWorkshopHost(equippedItem);

  if (compatible.length === 0) {
    return (
      <p className="upgrade-sub-hint muted">
        No compatible skin items in inventory for{" "}
        <strong>{equippedItem.typeLabel}</strong> ({equippedItem.subtype}). Select matching gear
        first — axe skins only for axes, sword skins only for swords.
      </p>
    );
  }

  return (
    <>
      <p className="section-title transmute-pick__title">Skin items (inventory)</p>
      <div className="transmute-pick-grid" role="listbox" aria-label="Skin items">
        {compatible.map((item) => {
          const poolQty = skinState.skinPool.find((s) => s.id === item.id)?.qty;
          const qty = poolQty ?? 1;
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
              <span className="transmute-pick__qty muted">×{qty}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}