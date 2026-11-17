import { getEquippedRaisedPet } from "../data/systems/raised-pet-workshop";
import { PetGrowthAdvanceBody } from "./pet-growth-advance-body";
import { PetGrowthRerollBody } from "./pet-growth-reroll-body";
import type { TabDefinition } from "./registry";
import { PET_GROWTH_SUB_TABS } from "./pet-growth-sub-tabs";

export type PetGrowthSubId = (typeof PET_GROWTH_SUB_TABS)[number]["id"];

export function getPetGrowthPanelView(sub: PetGrowthSubId) {
  const pet = getEquippedRaisedPet();
  const inv = pet?.workshopPet.inventory;
  if (sub === "reroll") {
    return {
      panelTitle: "Reroll / Revert Stat",
      panelSubtitle: "Blessing, Chance, Reversion scrolls.",
      materialsVariant: "list" as const,
      materialsTitle: "Scrolls",
      materials: inv
        ? [
            { icon: "📜", name: "Blessing of the Pet Tamer", quantity: inv.blessingOfTamer },
            { icon: "📜", name: "Chance of the Pet Tamer", quantity: inv.chanceOfTamer },
            { icon: "📜", name: "Scroll of Pet Reversion", quantity: inv.reversionScroll },
          ]
        : [],
      Body: PetGrowthRerollBody,
    };
  }
  return {
    panelTitle: "Next Stat Level",
    panelSubtitle: "Pet Tamer quest at 99.99% rank EXP.",
    materialsVariant: "list" as const,
    materialsTitle: "Requirement",
    materials: [{ icon: "⭐", name: "Rank EXP %", quantity: 99 }],
    Body: PetGrowthAdvanceBody,
  };
}

export const growthTab: TabDefinition = {
  id: "growth",
  label: "Growth",
  icon: "📈",
  panelTitle: "Pet Growth",
  panelSubtitle: "",
  materialsVariant: "list",
  materialsTitle: "Scrolls",
  materials: [],
  Body: PetGrowthAdvanceBody,
};