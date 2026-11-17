import { requireEquippedGear } from "../data/workshop/equipped";
import { getUpgradeSubTabIds } from "../data/workshop/ui-rules";
import { buildJewelManagementState } from "../data/systems/jewel-management";
import { JewelSlotList } from "../components/jewels/jewel-slot-list";
import { JewelInventory } from "../components/jewels/jewel-inventory";
import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { UPGRADE_SUB_TABS } from "./upgrade-sub-tabs";

export function UpgradeJewelsBody() {
  const equippedItem = requireEquippedGear();
  const state = buildJewelManagementState();
  return (
    <>
      <PanelSubTabBar
        tabs={[...UPGRADE_SUB_TABS.filter((t) => getUpgradeSubTabIds(equippedItem).includes(t.id))]}
        activeId="jewels"
        dataAttr="upgrade-sub"
        ariaLabel="Upgrade mode"
      />
      <p className="upgrade-sub-hint muted">
        {equippedItem.upgrade.weaponJewelSocketRule === "baruna" ? (
          <>
            Baruna weapons: sockets at <strong>+12</strong>, <strong>+14</strong>,{" "}
            <strong>+16</strong>, <strong>+18</strong>, <strong>+20</strong> (max +20).
          </>
        ) : (
          <>
            Ultimate weapons: first socket at <strong>+6</strong>, up to <strong>5</strong> at{" "}
            <strong>+10</strong>.
          </>
        )}
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