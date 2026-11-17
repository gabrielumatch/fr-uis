import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { skinsSubTabsForItem } from "./skins-sub-tabs";
import { requireEquippedGear } from "../data/workshop/equipped";
import { SkinSlotPair } from "../components/skins/skin-slot-pair";
import { SkinPicker } from "../components/skins/skin-picker";
import { getItemSkinState, getSkinById } from "../data/systems/skin-management";
import { ActionButtons } from "../components/upgrade/action-buttons";

export function getSkinsApplyMaterials() {
  return [];
}

export function SkinsApplyBody() {
  const equippedItem = requireEquippedGear();
  const skinState = getItemSkinState();
  const blocked = skinState.hasSkinApplied;
  const selectedId = skinState.selectedSkinId;
  const selected = selectedId ? getSkinById(selectedId) : null;
  const canApply = !blocked && Boolean(selected && selected.qty > 0);

  const statusLine = blocked ? (
    <>
      This item already has skin <strong>{skinState.appliedLook?.name ?? "—"}</strong>. Remove it on{" "}
      <strong>Remove Skin</strong> before applying another.
    </>
  ) : (
    <>
      Makeup Artist — primary keeps all stats. Only one skin at a time; none equipped means you can
      apply.
    </>
  );

  return (
    <>
      <PanelSubTabBar
        tabs={skinsSubTabsForItem(equippedItem)}
        activeId="apply"
        dataAttr="skins-sub"
        ariaLabel="Skins"
      />
      <p className="upgrade-sub-hint muted">{statusLine}</p>
      {!blocked ? (
        <>
          <SkinSlotPair skinSelected={canApply} />
          <SkinPicker />
        </>
      ) : null}
      <ActionButtons primary="Apply Skin" secondary={[]} primaryDisabled={!canApply} />
    </>
  );
}