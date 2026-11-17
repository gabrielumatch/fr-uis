import type { WorkshopRaisedPetItem } from "../data/items/item";
import { getEquippedRaisedPet } from "../data/systems/raised-pet-workshop";
import { PetFeedCraftBody } from "./pet-feed-craft-body";
import { PetFeedGiveBody } from "./pet-feed-give-body";
import type { TabDefinition } from "./registry";
import { PET_FEED_SUB_TABS } from "./pet-feed-sub-tabs";

export type PetFeedSubId = (typeof PET_FEED_SUB_TABS)[number]["id"];

function feedMaterials(pet: WorkshopRaisedPetItem) {
  const inv = pet.workshopPet.inventory;
  return [
    { icon: "🍖", name: "Pet Feed", quantity: inv.petFeed },
    { icon: "💗", name: "Monster Heart", quantity: inv.questDrops.monsterHeart },
    { icon: "🌿", name: "Stem", quantity: inv.questDrops.stem },
  ];
}

export function getPetFeedPanelView(sub: PetFeedSubId) {
  if (sub === "craft") {
    const pet = getEquippedRaisedPet();
    return {
      panelTitle: "Make Pet Feed",
      panelSubtitle: "Pet Tamer — quest drops → feed.",
      materialsVariant: "list" as const,
      materialsTitle: "Materials",
      materials: pet ? feedMaterials(pet) : [],
      Body: PetFeedCraftBody,
    };
  }
  const pet = getEquippedRaisedPet();
  return {
    panelTitle: "Give Pet Feed",
    panelSubtitle: "Regain HP; rank EXP while summoned.",
    materialsVariant: "list" as const,
    materialsTitle: "On hand",
    materials: pet ? [{ icon: "🍖", name: "Pet Feed", quantity: pet.workshopPet.inventory.petFeed }] : [],
    Body: PetFeedGiveBody,
  };
}

export const feedTab: TabDefinition = {
  id: "feed",
  label: "Feed",
  icon: "🍖",
  panelTitle: "Pet Feed",
  panelSubtitle: "",
  materialsVariant: "list",
  materialsTitle: "Materials",
  materials: [],
  Body: PetFeedGiveBody,
};