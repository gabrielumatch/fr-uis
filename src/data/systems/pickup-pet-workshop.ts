import type { PickupFilterId } from "../pets/pickup-types";
import {
  ensureBeadSlotStorage,
  isBeadActiveInPet,
  mergePickupFilterFromRecord,
  PICKUP_BUFF_SLOTS_AFTER_UPGRADE,
  syncPickupPetStats,
} from "../pets/pickup-pet-sync";
import type { WorkshopPickupPetItem } from "../items/item";
import { isPickupPetItem } from "../items/item";
import { equippedItem } from "../workshop/inventory";
import { getBuffBeadDefinition } from "../pets/bead-catalog";

const MAX_BEAD_SLOTS = 9;

export function getEquippedPickupPet(): WorkshopPickupPetItem | undefined {
  return isPickupPetItem(equippedItem) ? equippedItem : undefined;
}

export { isBeadActiveInPet, mergePickupFilterFromRecord, syncPickupPetStats };

export function convertPickupToBuff(pet: WorkshopPickupPetItem): { ok: boolean; message: string } {
  if (pet.mode !== "pickup") {
    return { ok: false, message: "Already a Buff Pet." };
  }
  const inv = pet.workshopPickup.inventory;
  if (inv.pickupUpgradeScroll < 1) {
    return { ok: false, message: "Need Pick-up Pet Upgrade scroll." };
  }
  inv.pickupUpgradeScroll -= 1;
  pet.mode = "buff";
  pet.unlockedBeadSlots = PICKUP_BUFF_SLOTS_AFTER_UPGRADE;
  pet.mailable = false;
  ensureBeadSlotStorage(pet);
  syncPickupPetStats(pet);
  return { ok: true, message: "Buff Pet — 2 bead slots unlocked." };
}

export function unlockBeadSlot(pet: WorkshopPickupPetItem): { ok: boolean; message: string } {
  if (pet.mode !== "buff") {
    return { ok: false, message: "Only Buff Pets use Bead Slot Keys." };
  }
  if (pet.unlockedBeadSlots >= MAX_BEAD_SLOTS) {
    return { ok: false, message: "All 9 bead slots are open." };
  }
  const inv = pet.workshopPickup.inventory;
  if (inv.beadSlotKeys < 1) {
    return { ok: false, message: "Need a Bead Slot Key." };
  }
  inv.beadSlotKeys -= 1;
  pet.unlockedBeadSlots += 1;
  syncPickupPetStats(pet);
  return { ok: true, message: "Unlocked one bead slot." };
}

export function togglePickupSummon(pet: WorkshopPickupPetItem): void {
  pet.summoned = !pet.summoned;
  syncPickupPetStats(pet);
}

export function setPickupFilter(
  pet: WorkshopPickupPetItem,
  id: PickupFilterId,
  enabled: boolean,
): void {
  pet.pickupFilter = { ...pet.pickupFilter, [id]: enabled };
}

export function canEquipBeadFromHand(
  pet: WorkshopPickupPetItem,
  beadId: string,
): boolean {
  const inv = pet.workshopPickup.inventory;
  if ((inv.beadsOnHand[beadId] ?? 0) < 1) return false;
  const def = getBuffBeadDefinition(beadId);
  if (!def) return false;
  if (!def.requiresBeadIds?.length) return true;
  return def.requiresBeadIds.every((id) => isBeadActiveInPet(pet, id));
}

export function equipBeadInSlot(
  pet: WorkshopPickupPetItem,
  slotIndex: number,
  beadId: string,
): { ok: boolean; message: string } {
  if (pet.mode !== "buff") {
    return { ok: false, message: "Convert to Buff Pet first." };
  }
  if (slotIndex < 0 || slotIndex >= pet.unlockedBeadSlots) {
    return { ok: false, message: "Slot locked or invalid." };
  }
  const def = getBuffBeadDefinition(beadId);
  if (!def) {
    return { ok: false, message: "Unknown bead." };
  }
  const inv = pet.workshopPickup.inventory;
  if ((inv.beadsOnHand[beadId] ?? 0) < 1) {
    return { ok: false, message: "Bead not in inventory." };
  }
  ensureBeadSlotStorage(pet);
  const prev = pet._beadSlotIds[slotIndex];
  if (prev) {
    inv.beadsOnHand[prev] = (inv.beadsOnHand[prev] ?? 0) + 1;
  }
  inv.beadsOnHand[beadId] = (inv.beadsOnHand[beadId] ?? 0) - 1;
  pet._beadSlotIds[slotIndex] = beadId;
  syncPickupPetStats(pet);
  return { ok: true, message: `Equipped ${def.name}.` };
}