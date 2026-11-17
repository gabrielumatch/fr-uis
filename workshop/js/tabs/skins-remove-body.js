import { renderItemIcon } from "../utils/item-icon.js";
import { renderPanelSubTabBar } from "../components/upgrade/sub-tab-bar.js";
import { SKINS_SUB_TABS } from "./skins-sub-tabs.js";
import { equippedItem } from "../data/equipped-item.js";
import { getItemSkinState } from "../data/skin-management.js";

export function getSkinsRemoveMaterials() {
  const skinState = getItemSkinState();
  return [
    {
      icon: "📜",
      name: "Purge Skin Scroll",
      quantity: skinState.inventory.purgeSkinScrolls,
    },
    {
      icon: "📜",
      name: "Recover Skin Scroll",
      quantity: skinState.inventory.recoverSkinScrolls,
    },
  ];
}

export function renderSkinsRemoveBody() {
  const skinState = getItemSkinState();
  const { hasSkinApplied, appliedLook } = skinState;
  const purgeScrolls = skinState.inventory.purgeSkinScrolls;
  const recoverScrolls = skinState.inventory.recoverSkinScrolls;

  const canPurge = hasSkinApplied && purgeScrolls > 0;
  const canRecover = hasSkinApplied && recoverScrolls > 0;

  const lookName = appliedLook?.name ?? "—";
  const lookIconSrc = appliedLook?.icon ?? equippedItem.icon;
  const lookIconHtml = renderItemIcon(lookIconSrc, {
    wrapperClass: "transmute-revert-status__look-icon",
    imgClass: "item-icon__img",
  });

  let footerHints = "";
  if (!hasSkinApplied) {
    footerHints =
      '<p class="upgrade-sub-hint muted">No skin is applied — nothing to remove.</p>';
  } else if (!purgeScrolls && !recoverScrolls) {
    footerHints =
      '<p class="upgrade-sub-hint muted">You need at least one remove scroll in inventory.</p>';
  }

  return `
    ${renderPanelSubTabBar({
      tabs: SKINS_SUB_TABS,
      activeId: "remove",
      dataAttr: "skins-sub",
      ariaLabel: "Skins",
    })}
    <p class="upgrade-sub-hint muted">
      Each option needs its own scroll. Both restore the <strong>original</strong> weapon model on the primary item.
    </p>
    <div class="transmute-revert-status frame">
      <div class="transmute-revert-status__row">
        <span class="muted">Item</span>
        <strong>${equippedItem.name}</strong>
      </div>
      <div class="transmute-revert-status__row">
        <span class="muted">Current look</span>
        <span class="transmute-revert-status__look">
          ${lookIconHtml}
          ${hasSkinApplied ? lookName : "Original"}
        </span>
      </div>
      <div class="transmute-revert-status__row">
        <span class="muted">Stats / upgrade</span>
        <span>Unchanged (primary item)</span>
      </div>
    </div>

    <div class="skin-remove-options">
      <article class="skin-remove-option frame">
        <h3 class="skin-remove-option__title">Purge Skin Scroll</h3>
        <p class="skin-remove-option__desc muted">
          Original look returns. The skin item is <strong>destroyed</strong> and does not come back.
        </p>
        <button
          type="button"
          class="btn${!canPurge ? " is-disabled" : ""}"
          data-action="Purge Skin"
          data-skin-remove="destroy"
          ${!canPurge ? 'disabled aria-disabled="true"' : ""}
        >
          Purge Skin
        </button>
      </article>
      <article class="skin-remove-option frame">
        <h3 class="skin-remove-option__title">Recover Skin Scroll</h3>
        <p class="skin-remove-option__desc muted">
          Original look returns. The skin item goes back to your <strong>inventory</strong>.
        </p>
        <button
          type="button"
          class="btn${!canRecover ? " is-disabled" : ""}"
          data-action="Recover Skin"
          data-skin-remove="recover"
          ${!canRecover ? 'disabled aria-disabled="true"' : ""}
        >
          Recover Skin
        </button>
      </article>
    </div>
    ${footerHints}
  `;
}