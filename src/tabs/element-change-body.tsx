import { equippedItem } from "../data/workshop/equipped";
import { elementUpgradeState, getElementById } from "../data/systems/element-upgrade";
import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { ELEMENT_SUB_TABS } from "./element-sub-tabs";
import { ElementStatus } from "../components/element/element-status";
import { ElementCycleWheel } from "../components/element/element-cycle-wheel";

export function getElementChangeMaterials() {
  return [
    {
      icon: "🔄",
      name: "Scroll of Element Change",
      quantity: elementUpgradeState.inventory.elementChangeScrolls,
    },
  ];
}

export function ElementChangeBody() {
  const { appliedElementId, changeTargetElementId, level, maxLevel } =
    elementUpgradeState;
  const applied = getElementById(appliedElementId);

  return (
    <>
      <PanelSubTabBar
        tabs={[...ELEMENT_SUB_TABS]}
        activeId="change"
        dataAttr="element-sub"
        ariaLabel="Element mode"
      />
      <p className="upgrade-sub-hint muted">
        <strong>Scroll of Element Change</strong> swaps the element <em>type</em> and keeps the
        current level (
        <strong>
          {level}/{maxLevel}
        </strong>
        ). This is not an elemental level upgrade.
      </p>
      <ElementStatus
        label={applied?.label ?? "—"}
        icon={applied?.icon ?? "⚡"}
        level={level}
        max={maxLevel}
      />
      <ElementCycleWheel
        appliedId={appliedElementId}
        targetId={changeTargetElementId}
        interactive
        showChangeAction
        elementLevel={level}
        maxElementLevel={maxLevel}
        itemKind={equippedItem.elementHost}
      />
    </>
  );
}