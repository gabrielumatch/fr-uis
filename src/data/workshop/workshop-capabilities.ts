import type { ArmorSubtype, ItemType } from "../items/types";
import type { WorkshopItem } from "../items/item";
import type { WorkshopMainTabId } from "./ui-rules";

export type WorkshopGearProfile = {
  mainTabs: WorkshopMainTabId[];
  upgradeSubs: readonly ("level" | "jewels")[];
  allowsElement: boolean;
  elementLevelMax: number;
  piercingSlotMax: number;
  cardSlotMax: number;
};

const SET_PIECE_ARMOR = new Set<ArmorSubtype>([
  "helmet",
  "gauntlet",
  "boots",
  "shield",
]);

const WEAPON_TABS: WorkshopMainTabId[] = [
  "upgrade",
  "element",
  "piercing",
  "awake",
  "skins",
];

const SUIT_TABS: WorkshopMainTabId[] = [
  "upgrade",
  "element",
  "piercing",
  "awake",
  "skins",
];

const SET_PIECE_TABS: WorkshopMainTabId[] = ["upgrade", "awake", "skins"];

const JEWEL_TABS: WorkshopMainTabId[] = ["upgrade"];

export function workshopGearProfileFromParts(
  type: ItemType,
  subtype: string,
): WorkshopGearProfile {
  if (type === "jewel") {
    return {
      mainTabs: JEWEL_TABS,
      upgradeSubs: ["level"],
      allowsElement: false,
      elementLevelMax: 0,
      piercingSlotMax: 0,
      cardSlotMax: 0,
    };
  }

  if (type === "weapon") {
    return {
      mainTabs: WEAPON_TABS,
      upgradeSubs: ["level", "jewels"],
      allowsElement: true,
      elementLevelMax: 20,
      piercingSlotMax: 10,
      cardSlotMax: 10,
    };
  }

  if (type === "armor") {
    if (subtype === "suit") {
      return {
        mainTabs: SUIT_TABS,
        upgradeSubs: ["level"],
        allowsElement: true,
        elementLevelMax: 20,
        piercingSlotMax: 4,
        cardSlotMax: 4,
      };
    }
    if (isArmorSetPieceSubtype(subtype)) {
      return {
        mainTabs: SET_PIECE_TABS,
        upgradeSubs: ["level"],
        allowsElement: false,
        elementLevelMax: 0,
        piercingSlotMax: 0,
        cardSlotMax: 0,
      };
    }
  }

  return {
    mainTabs: WEAPON_TABS,
    upgradeSubs: ["level"],
    allowsElement: false,
    elementLevelMax: 0,
    piercingSlotMax: 0,
    cardSlotMax: 0,
  };
}

export function workshopGearProfile(item: WorkshopItem): WorkshopGearProfile {
  return workshopGearProfileFromParts(item.type, item.subtype);
}

export function isArmorSetPieceSubtype(subtype: string): boolean {
  return SET_PIECE_ARMOR.has(subtype as ArmorSubtype);
}