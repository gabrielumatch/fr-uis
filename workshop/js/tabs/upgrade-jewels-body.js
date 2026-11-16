import { buildJewelManagementState } from "../data/jewel-management.js";
import { renderJewelSlotList } from "../components/jewels/jewel-slot-list.js";
import { renderJewelInventory } from "../components/jewels/jewel-inventory.js";
import { renderPanelSubTabBar } from "../components/upgrade/sub-tab-bar.js";
import { UPGRADE_SUB_TABS } from "./upgrade-sub-tabs.js";

export function renderUpgradeJewelsBody() {
  const state = buildJewelManagementState();

  return `
    ${renderPanelSubTabBar({
      tabs: UPGRADE_SUB_TABS,
      activeId: "jewels",
      dataAttr: "upgrade-sub",
      ariaLabel: "Upgrade mode",
    })}
    <p class="upgrade-sub-hint muted">
      Jewel sockets unlock as the item upgrades: first slot at <strong>+6</strong>, up to
      <strong>5</strong> at +10 on Ultimate weapons.
    </p>
    ${renderJewelSlotList(state)}
    ${renderJewelInventory({
      inventory: state.inventory,
      selectedId: state.selectedJewelId,
    })}
  `;
}

export function upgradeJewelsMaterials() {
  const state = buildJewelManagementState();
  return [
    {
      icon: "🌙",
      name: "Moonstone",
      quantity: state.materials.moonstone,
    },
  ];
}