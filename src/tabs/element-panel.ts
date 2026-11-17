import {
  getElementUpgradeMaterials,
  ElementUpgradeBody,
} from "./element-upgrade-body";
import { getElementChangeMaterials, ElementChangeBody } from "./element-change-body";
import { ELEMENT_SUB_TABS } from "./element-sub-tabs";
import type { TabDefinition } from "./registry";

export type ElementSubId = (typeof ELEMENT_SUB_TABS)[number]["id"];

export function resolveElementSub(sub?: string): ElementSubId {
  return sub === "change" ? "change" : "upgrade";
}

export function getElementPanelView(sub: ElementSubId) {
  if (sub === "change") {
    return {
      panelTitle: "Change Element",
      panelSubtitle: "Swap element type without losing level.",
      materialsVariant: "grid" as const,
      materialsTitle: "Materials Required / Available",
      materials: getElementChangeMaterials(),
      Body: ElementChangeBody,
    };
  }
  return {
    panelTitle: "Element Upgrade",
    panelSubtitle: "Raise level using the same element card as the item.",
    materialsVariant: "grid" as const,
    materialsTitle: "Materials Required / Available",
    materials: getElementUpgradeMaterials(),
    Body: ElementUpgradeBody,
  };
}

export const elementTab: TabDefinition = {
  id: "element",
  label: "Element",
  icon: "⚡",
  panelTitle: "Element Upgrade",
  panelSubtitle: "",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  materials: getElementUpgradeMaterials(),
  Body: ElementUpgradeBody,
};