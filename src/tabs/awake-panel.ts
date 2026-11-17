import { awakeManagementState } from "../data/systems/awake-management";
import { AwakeBody } from "./awake-body";
import type { TabDefinition } from "./registry";

export const awakeTab: TabDefinition = {
  id: "awake",
  label: "Awake",
  icon: "◇",
  panelTitle: "Awake Item",
  panelSubtitle: "",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  materials: (() => {
    const inv = awakeManagementState.inventory;
    return [
      { icon: "🔮", name: "Awakening Scroll", quantity: inv.awakeningScroll },
      { icon: "📜", name: "Reversion Scroll", quantity: inv.reversionScroll },
    ];
  })(),
  Body: AwakeBody,
};