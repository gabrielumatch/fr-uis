import type { WorkshopHostItem } from "../items/item";
import { isRaisedPetItem, isWorkshopGearItem } from "../items/item";
import { workshopGearProfile, type WorkshopGearProfile } from "./workshop-capabilities";

export const GEAR_WORKSHOP_TAB_IDS = [
  "upgrade",
  "element",
  "piercing",
  "awake",
  "skins",
] as const;

export type GearWorkshopTabId = (typeof GEAR_WORKSHOP_TAB_IDS)[number];

export const RAISED_PET_TAB_IDS = ["feed", "growth", "awake"] as const;

export type RaisedPetTabId = (typeof RAISED_PET_TAB_IDS)[number];

export type WorkshopHostTabId = GearWorkshopTabId | RaisedPetTabId;

export type WorkshopHostProfile =
  | { kind: "gear"; mainTabs: GearWorkshopTabId[]; gear: WorkshopGearProfile }
  | {
      kind: "raised-pet";
      mainTabs: RaisedPetTabId[];
      feedSubs: readonly ("craft" | "give")[];
      growthSubs: readonly ("advance" | "reroll")[];
    };

export function workshopHostProfile(item: WorkshopHostItem): WorkshopHostProfile {
  if (isRaisedPetItem(item)) {
    return {
      kind: "raised-pet",
      mainTabs: [...RAISED_PET_TAB_IDS],
      feedSubs: ["craft", "give"],
      growthSubs: ["advance", "reroll"],
    };
  }
  const gear = workshopGearProfile(item);
  return {
    kind: "gear",
    mainTabs: [...gear.mainTabs] as GearWorkshopTabId[],
    gear,
  };
}

export function workshopHostTabIds(item: WorkshopHostItem): WorkshopHostTabId[] {
  return [...workshopHostProfile(item).mainTabs];
}

export function isRaisedPetTabId(tabId: string): tabId is RaisedPetTabId {
  return (RAISED_PET_TAB_IDS as readonly string[]).includes(tabId);
}

export function isGearWorkshopItem(item: WorkshopHostItem): item is import("../items/item").WorkshopItem {
  return isWorkshopGearItem(item);
}