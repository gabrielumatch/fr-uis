import type { WorkshopHostItem } from "../items/item";
import {
  isBuffPetItem,
  isPickupOnlyPetItem,
  isPickupPetItem,
  isRaisedPetItem,
  isWorkshopGearItem,
} from "../items/item";
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

export const PICKUP_ONLY_TAB_IDS = ["convert", "blessing", "pickup"] as const;

export type PickupOnlyTabId = (typeof PICKUP_ONLY_TAB_IDS)[number];

export const BUFF_PET_TAB_IDS = ["beads", "blessing", "pickup"] as const;

export type BuffPetTabId = (typeof BUFF_PET_TAB_IDS)[number];

export type PickupWorkshopTabId = PickupOnlyTabId | BuffPetTabId;

export type WorkshopHostTabId =
  | GearWorkshopTabId
  | RaisedPetTabId
  | PickupWorkshopTabId;

export type WorkshopHostProfile =
  | { kind: "gear"; mainTabs: GearWorkshopTabId[]; gear: WorkshopGearProfile }
  | {
      kind: "raised-pet";
      mainTabs: RaisedPetTabId[];
      feedSubs: readonly ("craft" | "give")[];
      growthSubs: readonly ("advance" | "reroll")[];
    }
  | {
      kind: "pickup-pet";
      mode: "pickup";
      mainTabs: PickupOnlyTabId[];
    }
  | {
      kind: "buff-pet";
      mode: "buff";
      mainTabs: BuffPetTabId[];
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
  if (isPickupOnlyPetItem(item)) {
    return {
      kind: "pickup-pet",
      mode: "pickup",
      mainTabs: [...PICKUP_ONLY_TAB_IDS],
    };
  }
  if (isBuffPetItem(item)) {
    return {
      kind: "buff-pet",
      mode: "buff",
      mainTabs: [...BUFF_PET_TAB_IDS],
    };
  }
  if (isPickupPetItem(item)) {
    throw new Error(`Pickup pet "${item.id}": mode inválido`);
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

export function isPickupWorkshopTabId(tabId: string): tabId is PickupWorkshopTabId {
  return (
    (PICKUP_ONLY_TAB_IDS as readonly string[]).includes(tabId) ||
    (BUFF_PET_TAB_IDS as readonly string[]).includes(tabId)
  );
}

export function isGearWorkshopItem(item: WorkshopHostItem): item is import("../items/item").WorkshopItem {
  return isWorkshopGearItem(item);
}