import {
  PiercingPierceBody,
  pierceMaterials,
} from "./piercing-pierce-body";
import { PiercingCardsBody, cardsMaterials } from "./piercing-cards-body";
import { PIERCING_SUB_TABS } from "./piercing-sub-tabs";
import type { TabDefinition } from "./registry";

export type PiercingSubId = (typeof PIERCING_SUB_TABS)[number]["id"];

export function resolvePiercingSub(sub?: string): PiercingSubId {
  return sub === "cards" ? "cards" : "pierce";
}

export function getPiercingPanelView(sub: PiercingSubId) {
  if (sub === "cards") {
    return {
      panelTitle: "Card Management",
      panelSubtitle: "Insert letter cards into pierced sockets.",
      materialsVariant: "grid" as const,
      materialsTitle: "Materials Required / Available",
      materials: cardsMaterials,
      Body: PiercingCardsBody,
    };
  }
  return {
    panelTitle: "Safe Piercing",
    panelSubtitle: "Open weapon sockets before inserting cards.",
    materialsVariant: "grid" as const,
    materialsTitle: "Materials Required / Available",
    materials: pierceMaterials,
    Body: PiercingPierceBody,
  };
}

export const piercingTab: TabDefinition = {
  id: "piercing",
  label: "Piercing & Cards",
  icon: "💎",
  panelTitle: "Safe Piercing",
  panelSubtitle: "",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  materials: pierceMaterials,
  Body: PiercingPierceBody,
};