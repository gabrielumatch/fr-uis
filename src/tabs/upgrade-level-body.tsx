import { equippedItem } from "../data/equipped-item";
import { getMaxUpgradeLevel } from "../data/item-taxonomy";
import { getAttemptRows } from "../data/attempt-plans";
import { UPGRADE_SUB_TABS } from "./upgrade-sub-tabs";
import { UpgradeTarget } from "../components/upgrade/upgrade-target";
import { AttemptTable } from "../components/upgrade/attempt-table";
import { ProbabilityBar } from "../components/upgrade/probability-bar";
import { ActionButtons } from "../components/upgrade/action-buttons";
import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";

export function UpgradeLevelBody() {
  
  return (
    <>
      <PanelSubTabBar {...{
            tabs: UPGRADE_SUB_TABS,
            activeId: "level",
            dataAttr: "upgrade-sub",
            ariaLabel: "Upgrade mode",
          }} />
          <UpgradeTarget {...{
            current: equippedItem.upgradeLevel,
            target: Math.min(equippedItem.upgradeLevel + 1, getMaxUpgradeLevel(equippedItem)),
            maxPlus: getMaxUpgradeLevel(equippedItem),
          }} />
          <AttemptTable {...{ rows: getAttemptRows("upgrade-level") }} />
          <ProbabilityBar {...{
            chance: "10%",
            energy: "27.5%",
            cost: "29,702 Penya",
          }} />
          <ActionButtons {...{
            primary: "Start",
            secondary: ["Auto Refill", "Clear"],
            attemptPlanKey: "upgrade-level",
          }} />
    </>
  );

}
