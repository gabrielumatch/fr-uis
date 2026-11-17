import type { WorkshopItem } from "../items/item";
import { isWorkshopGearItem } from "../items/item";
import { equippedItem } from "../workshop/inventory";
import {
  DEFAULT_GEAR_SERVICE_INVENTORY,
  type GearServiceInventory,
  type ReductionScrollId,
} from "../gear/gear-functional-types";
import {
  applyReductionToRuntime,
  applyTransyToRuntime,
  applyUnbindToRuntime,
  removeReductionAtPeach,
  syncGearFunctionalStats,
} from "../gear/gear-functional-sync";
import {
  gearServiceCapabilities,
  transyItemForRequiredLevel,
} from "../gear/gear-service-rules";

export const gearServiceInventory: GearServiceInventory = {
  ...DEFAULT_GEAR_SERVICE_INVENTORY,
};

export function getEquippedGearForServices(): WorkshopItem | undefined {
  return isWorkshopGearItem(equippedItem) ? equippedItem : undefined;
}

function invKeyForReduction(scrollId: ReductionScrollId): keyof GearServiceInventory {
  return scrollId === "scroll-reduction-a" ? "scrollReductionA" : "scrollReductionB";
}

export function applyLevelReduction(
  item: WorkshopItem,
  scrollId: ReductionScrollId,
): { ok: boolean; message: string } {
  const cap = gearServiceCapabilities(item);
  if (!cap.levelReduction) {
    return { ok: false, message: "Baruna gear cannot use reduction scrolls." };
  }
  const key = invKeyForReduction(scrollId);
  if (gearServiceInventory[key] < 1) {
    return { ok: false, message: "You need the scroll in your bag." };
  }
  const result = applyReductionToRuntime(item.workshopGear, scrollId);
  if (!result.ok) return result;
  gearServiceInventory[key] -= 1;
  syncGearFunctionalStats(item);
  return result;
}

export function applyGenderTransy(item: WorkshopItem): { ok: boolean; message: string } {
  const cap = gearServiceCapabilities(item);
  if (!cap.genderTransy) {
    return { ok: false, message: "Only armor set pieces / suits support Transy." };
  }
  const transyId = transyItemForRequiredLevel(item.workshopGear.requiredLevel);
  const key = transyId === "item-transy-a" ? "itemTransyA" : "itemTransyB";
  if (gearServiceInventory[key] < 1) {
    return { ok: false, message: `Need ${transyId === "item-transy-a" ? "Transy A" : "Transy B"}.` };
  }
  const result = applyTransyToRuntime(item.workshopGear);
  if (!result.ok) return result;
  gearServiceInventory[key] -= 1;
  syncGearFunctionalStats(item);
  return result;
}

export function applyScrollUnbinding(item: WorkshopItem): { ok: boolean; message: string } {
  const cap = gearServiceCapabilities(item);
  if (!cap.scrollUnbinding) {
    return { ok: false, message: "This item cannot be unbound." };
  }
  if (gearServiceInventory.scrollUnbinding < 1) {
    return { ok: false, message: "Need Scroll of Unbinding." };
  }
  const result = applyUnbindToRuntime(item.workshopGear);
  if (!result.ok) return result;
  gearServiceInventory.scrollUnbinding -= 1;
  syncGearFunctionalStats(item);
  return result;
}

export function removeReductionPeach(item: WorkshopItem): { ok: boolean; message: string } {
  const cap = gearServiceCapabilities(item);
  if (!cap.peachRemoval) {
    return { ok: false, message: "Cannot remove reduction on this tier." };
  }
  const result = removeReductionAtPeach(item.workshopGear);
  if (!result.ok) return result;
  syncGearFunctionalStats(item);
  return result;
}