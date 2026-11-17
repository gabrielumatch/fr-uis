import { elementUpgradeState, getElementById } from "../data/systems/element-upgrade";
import { PanelSubTabBar } from "../components/upgrade/sub-tab-bar";
import { ELEMENT_SUB_TABS } from "./element-sub-tabs";
import { ElementStatus } from "../components/element/element-status";
import { ElementTarget } from "../components/element/element-target";
import { AttemptTable } from "../components/upgrade/attempt-table";
import { ProbabilityBar } from "../components/upgrade/probability-bar";
import { ActionButtons } from "../components/upgrade/action-buttons";
import { getAttemptRows } from "../data/systems/attempt-plans";

export function getElementUpgradeMaterials() {
  const applied = getElementById(elementUpgradeState.appliedElementId);
  const { inventory } = elementUpgradeState;
  return [
    {
      icon: applied?.cardIcon ?? "⚡",
      name: applied?.cardName ?? "Element Card",
      quantity: inventory.elementCards,
    },
    { icon: "📜", name: "SProtect", quantity: inventory.sprotect },
    {
      icon: "✨",
      name: "Smelting Scroll (Elements)",
      quantity: inventory.smeltingElements,
    },
  ];
}

export function ElementUpgradeBody() {
  const { appliedElementId, level, maxLevel, targetLevel, preview } =
    elementUpgradeState;
  const applied = getElementById(appliedElementId);

  return (
    <>
      <PanelSubTabBar
        tabs={[...ELEMENT_SUB_TABS]}
        activeId="upgrade"
        dataAttr="element-sub"
        ariaLabel="Element mode"
      />
      <p className="upgrade-sub-hint muted">
        Use only the <strong>matching element card</strong> for the element already on this item (
        {applied?.label ?? "—"}). You cannot raise Lightning with a Water card.
      </p>
      <ElementStatus
        label={applied?.label ?? "—"}
        icon={applied?.icon ?? "⚡"}
        level={level}
        max={maxLevel}
      />
      <ElementTarget current={level} target={targetLevel} max={maxLevel} />
      <AttemptTable title="Upgrade Attempts" rows={getAttemptRows("element-upgrade")} />
      <ProbabilityBar
        chance={preview.chance}
        energy={preview.energy}
        chanceHighlight
      />
      <ActionButtons
        primary="Start"
        secondary={["Auto Refill", "Clear"]}
        attemptPlanKey="element-upgrade"
      />
    </>
  );
}