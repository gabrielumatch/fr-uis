import { ItemIcon } from "../utils/item-icon";
import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { SKINS_SUB_TABS } from "./skins-sub-tabs";
import { equippedItem } from "../data/workshop/equipped";
import { getItemSkinState } from "../data/systems/skin-management";

export function getSkinsRemoveMaterials() {
  const skinState = getItemSkinState();
  return [
    { icon: "📜", name: "Purge Skin Scroll", quantity: skinState.inventory.purgeSkinScrolls },
    { icon: "📜", name: "Recover Skin Scroll", quantity: skinState.inventory.recoverSkinScrolls },
  ];
}

export function SkinsRemoveBody() {
  const skinState = getItemSkinState();
  const { hasSkinApplied, appliedLook } = skinState;
  const purgeScrolls = skinState.inventory.purgeSkinScrolls;
  const recoverScrolls = skinState.inventory.recoverSkinScrolls;
  const canPurge = hasSkinApplied && purgeScrolls > 0;
  const canRecover = hasSkinApplied && recoverScrolls > 0;

  return (
    <>
      <PanelSubTabBar
        tabs={[...SKINS_SUB_TABS]}
        activeId="remove"
        dataAttr="skins-sub"
        ariaLabel="Skins"
      />
      <p className="upgrade-sub-hint muted">
        Each option needs its own scroll. Both restore the <strong>original</strong> weapon model on
        the primary item.
      </p>
      <div className="transmute-revert-status frame">
        <div className="transmute-revert-status__row">
          <span className="muted">Item</span>
          <strong>{equippedItem.name}</strong>
        </div>
        <div className="transmute-revert-status__row">
          <span className="muted">Current look</span>
          <span className="transmute-revert-status__look">
            <ItemIcon
              icon={appliedLook?.icon ?? equippedItem.icon}
              wrapperClass="transmute-revert-status__look-icon"
            />
            {hasSkinApplied ? appliedLook?.name : "Original"}
          </span>
        </div>
        <div className="transmute-revert-status__row">
          <span className="muted">Stats / upgrade</span>
          <span>Unchanged (primary item)</span>
        </div>
      </div>
      <div className="skin-remove-options">
        <article className="skin-remove-option frame">
          <h3 className="skin-remove-option__title">Purge Skin Scroll</h3>
          <p className="skin-remove-option__desc muted">
            Original look returns. The skin item is <strong>destroyed</strong> and does not come back.
          </p>
          <button
            type="button"
            className={`btn${!canPurge ? " is-disabled" : ""}`}
            data-action="Purge Skin"
            data-skin-remove="destroy"
            disabled={!canPurge}
            aria-disabled={!canPurge}
          >
            Purge Skin
          </button>
        </article>
        <article className="skin-remove-option frame">
          <h3 className="skin-remove-option__title">Recover Skin Scroll</h3>
          <p className="skin-remove-option__desc muted">
            Original look returns. The skin item goes back to your <strong>inventory</strong>.
          </p>
          <button
            type="button"
            className={`btn${!canRecover ? " is-disabled" : ""}`}
            data-action="Recover Skin"
            data-skin-remove="recover"
            disabled={!canRecover}
            aria-disabled={!canRecover}
          >
            Recover Skin
          </button>
        </article>
      </div>
      {!hasSkinApplied ? (
        <p className="upgrade-sub-hint muted">No skin is applied — nothing to remove.</p>
      ) : !purgeScrolls && !recoverScrolls ? (
        <p className="upgrade-sub-hint muted">You need at least one remove scroll in inventory.</p>
      ) : null}
    </>
  );
}