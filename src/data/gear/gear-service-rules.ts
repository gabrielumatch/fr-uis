import type { GearItemCategory } from "../items/types";
import type { WorkshopItem } from "../items/item";
import { isArmorSetPieceSubtype } from "../workshop/workshop-capabilities";
import type { ReductionScrollId } from "./gear-functional-types";

export type GearServiceCapabilities = {
  /** Scroll of Reduction A/B — não em Baruna. */
  levelReduction: boolean;
  /** Item Transy A/B — peças de set / suit com gênero. */
  genderTransy: boolean;
  /** Scroll of Unbinding — não em soul-linked irreversível. */
  scrollUnbinding: boolean;
  /** Remoção do reduction na Peach (NPC Madrigal). */
  peachRemoval: boolean;
};

const TRANSY_ARMOR_SUBTYPES = new Set(["suit", "helmet", "gauntlet", "boots"]);

export function gearServiceCapabilities(item: WorkshopItem): GearServiceCapabilities {
  if (item.type === "jewel" || item.type === "fashion") {
    return {
      levelReduction: false,
      genderTransy: false,
      scrollUnbinding: false,
      peachRemoval: false,
    };
  }

  const category = item.category as GearItemCategory;
  const isBaruna = category === "baruna";

  const genderTransy =
    item.type === "armor" && TRANSY_ARMOR_SUBTYPES.has(item.subtype);

  return {
    levelReduction: !isBaruna,
    genderTransy,
    scrollUnbinding: !isBaruna,
    peachRemoval: !isBaruna,
  };
}

export function gearShowsServicesSubTab(item: WorkshopItem): boolean {
  const cap = gearServiceCapabilities(item);
  return cap.levelReduction || cap.genderTransy || cap.scrollUnbinding;
}

export function reductionScrollDelta(scrollId: ReductionScrollId): number {
  return scrollId === "scroll-reduction-a" ? 10 : 5;
}

export function transyItemForRequiredLevel(requiredLevel: number): "item-transy-a" | "item-transy-b" {
  return requiredLevel <= 60 ? "item-transy-a" : "item-transy-b";
}

export function isTransyArmorSubtype(subtype: string): boolean {
  return TRANSY_ARMOR_SUBTYPES.has(subtype) || isArmorSetPieceSubtype(subtype);
}