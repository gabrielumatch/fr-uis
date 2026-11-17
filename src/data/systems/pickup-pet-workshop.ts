import {
  PET_FILTER_CATEGORIES,
  type PetFilterOptionId,
} from "../pets/pet-filter-catalog";
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

/** Evita dois unlocks no mesmo clique (handler local + delegação do App). */
const unlockBeadSlotInFlight = new WeakMap<WorkshopPickupPetItem, boolean>();

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
  if (unlockBeadSlotInFlight.get(pet)) {
    return { ok: false, message: "Unlock already in progress." };
  }
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
  unlockBeadSlotInFlight.set(pet, true);
  try {
    inv.beadSlotKeys -= 1;
    pet.unlockedBeadSlots += 1;
    syncPickupPetStats(pet);
    return { ok: true, message: "Unlocked one bead slot." };
  } finally {
    unlockBeadSlotInFlight.set(pet, false);
  }
}

export function togglePickupSummon(pet: WorkshopPickupPetItem): void {
  pet.summoned = !pet.summoned;
  syncPickupPetStats(pet);
}

export function setPetFilterOption(
  pet: WorkshopPickupPetItem,
  id: PetFilterOptionId,
  enabled: boolean,
): void {
  pet.pickupFilter = {
    ...pet.pickupFilter,
    options: { ...pet.pickupFilter.options, [id]: enabled },
  };
}

export function setPetFilterClassOnly(
  pet: WorkshopPickupPetItem,
  key: "armorMyClassOnly" | "weaponMyClassOnly",
  enabled: boolean,
): void {
  pet.pickupFilter = { ...pet.pickupFilter, [key]: enabled };
}

export function setAllPetFilterOptions(
  pet: WorkshopPickupPetItem,
  enabled: boolean,
): void {
  const options = { ...pet.pickupFilter.options };
  for (const cat of PET_FILTER_CATEGORIES) {
    for (const opt of cat.options) {
      options[opt.id] = enabled;
    }
  }
  pet.pickupFilter = { ...pet.pickupFilter, options };
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