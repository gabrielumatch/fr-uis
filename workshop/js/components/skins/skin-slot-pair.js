import { equippedItem } from "../../data/equipped-item.js";
import { getSkinById, skinState } from "../../data/skin-management.js";

/**
 * @param {{ skinSelected: boolean }} props
 */
export function renderSkinSlotPair({ skinSelected }) {
  const selected = skinState.selectedSkinId
    ? getSkinById(skinState.selectedSkinId)
    : null;

  const skinInner = selected
    ? `
      <div class="transmute-slot__icon" aria-hidden="true">${selected.icon}</div>
      <div class="transmute-slot__name">${selected.name}</div>
      <div class="transmute-slot__type muted">${selected.type}</div>
    `
    : `<span class="transmute-slot__empty muted">Pick a skin item below</span>`;

  return `
    <div class="transmute-slots" role="group" aria-label="Apply skin slots">
      <div class="transmute-slot transmute-slot--primary">
        <div class="transmute-slot__tag">Primary</div>
        <div class="transmute-slot__icon" aria-hidden="true">${equippedItem.icon}</div>
        <div class="transmute-slot__name">${equippedItem.name}</div>
        <div class="transmute-slot__type muted">${equippedItem.type}</div>
        <p class="transmute-slot__hint muted">Keeps +${equippedItem.upgradeLevel}, stats, element &amp; awake</p>
      </div>
      <div class="transmute-slot__arrow" aria-hidden="true">→</div>
      <div class="transmute-slot transmute-slot--skin${skinSelected ? " is-filled" : ""}">
        <div class="transmute-slot__tag">Skin</div>
        ${skinInner}
        <p class="transmute-slot__hint transmute-slot__hint--warn muted">Skin item consumed on apply</p>
      </div>
    </div>
  `;
}