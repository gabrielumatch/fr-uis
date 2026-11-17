import { equippedItem } from "../../data/equipped-item.js";
import { getItemSkinState } from "../../data/skin-management.js";
import { renderItemIcon } from "../../utils/item-icon.js";

export function renderSkinPicker() {
  const skinState = getItemSkinState();
  const selectedId = skinState.selectedSkinId;
  const { skinPool } = skinState;

  if (skinPool.length === 0) {
    return `
      <p class="upgrade-sub-hint muted">
        No compatible skin items in inventory. Same equipment type only
        (<strong>${equippedItem.type}</strong>).
      </p>
    `;
  }

  const tiles = skinPool
    .map((item) => {
      const active = item.id === selectedId;
      return `
        <button
          type="button"
          class="transmute-pick${active ? " is-selected" : ""}"
          data-skin-id="${item.id}"
          aria-pressed="${active ? "true" : "false"}"
        >
          ${renderItemIcon(item.icon, {
            wrapperClass: "transmute-pick__icon",
            imgClass: "transmute-pick__icon-img",
            alt: item.name,
          })}
          <span class="transmute-pick__name">${item.name}</span>
          <span class="transmute-pick__qty muted">×${item.qty}</span>
        </button>
      `;
    })
    .join("");

  return `
    <p class="section-title transmute-pick__title">Skin items</p>
    <div class="transmute-pick-grid" role="listbox" aria-label="Skin items">
      ${tiles}
    </div>
  `;
}