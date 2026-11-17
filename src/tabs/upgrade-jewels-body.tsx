import { buildJewelManagementState } from "../data/jewel-management";
import { JewelSlotList } from "../components/jewels/jewel-slot-list";
import { JewelInventory } from "../components/jewels/jewel-inventory";
import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { UPGRADE_SUB_TABS } from "./upgrade-sub-tabs";

export function UpgradeJewelsBody() {
  const state = buildJewelManagementState();
  return (
    <>
      <PanelSubTabBar
        tabs={[...UPGRADE_SUB_TABS]}
        activeId="jewels"
        dataAttr="upgrade-sub"
        ariaLabel="Upgrade mode"
      />
      <p className="upgrade-sub-hint muted">
        Jewel sockets unlock as the item upgrades: first slot at <strong>+6</strong>, up to{" "}
        <strong>5</strong> at +10 on Ultimate weapons.
      </p>
      <JewelSlotList state={state} />
      <JewelInventory inventory={state.inventory} selectedId={state.selectedJewelId} />
    </>
  );
}

export function upgradeJewelsMaterials() {
  const state = buildJewelManagementState();
  return [{ icon: "🌙", name: "Moonstone", quantity: state.materials.moonstone }];
}