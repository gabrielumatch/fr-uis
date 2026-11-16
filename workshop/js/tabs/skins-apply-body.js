import { renderPanelSubTabBar } from "../components/upgrade/sub-tab-bar.js";
import { SKINS_SUB_TABS } from "./skins-sub-tabs.js";
import { renderSkinSlotPair } from "../components/skins/skin-slot-pair.js";
import { renderSkinPicker } from "../components/skins/skin-picker.js";
import { getItemSkinState, getSkinById } from "../data/skin-management.js";
import { renderActionButtons } from "../components/upgrade/action-buttons.js";

export function getSkinsApplyMaterials() {
  return [];
}

export function renderSkinsApplyBody() {
  const skinState = getItemSkinState();
  const blocked = skinState.hasSkinApplied;
  const selectedId = skinState.selectedSkinId;
  const selected = selectedId ? getSkinById(selectedId) : null;
  const canApply = !blocked && Boolean(selected && selected.qty > 0);

  const statusLine = blocked
    ? `This item already has skin <strong>${skinState.appliedLook?.name ?? "—"}</strong>. Remove it on <strong>Remove Skin</strong> before applying another.`
    : "Makeup Artist — primary keeps all stats. Only one skin at a time; none equipped means you can apply.";

  return `
    ${renderPanelSubTabBar({
      tabs: SKINS_SUB_TABS,
      activeId: "apply",
      dataAttr: "skins-sub",
      ariaLabel: "Skins",
    })}
    <p class="upgrade-sub-hint muted">${statusLine}</p>
    ${
      blocked
        ? ""
        : `
      ${renderSkinSlotPair({ skinSelected: canApply })}
      ${renderSkinPicker()}
    `
    }
    ${renderActionButtons({
      primary: "Apply Skin",
      secondary: [],
      primaryDisabled: !canApply,
    })}
  `;
}