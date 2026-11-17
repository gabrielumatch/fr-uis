import { getBuffBeadDefinition, defaultPickupFilter } from "./bead-catalog";
import type { BuffBeadEquipped, PickupFilterState } from "./pickup-types";
import type { AwakeStat, WorkshopPickupPetItem } from "../items/item";

const MAX_BEAD_SLOTS = 9;
export const PICKUP_BUFF_SLOTS_AFTER_UPGRADE = 2;

function assertPickupPet(pet: WorkshopPickupPetItem): void {
  if (pet.mode === "buff") {
    if (
      pet.unlockedBeadSlots < PICKUP_BUFF_SLOTS_AFTER_UPGRADE ||
      pet.unlockedBeadSlots > MAX_BEAD_SLOTS
    ) {
      throw new Error(`Pet "${pet.id}": unlockedBeadSlots inválido para buff`);
    }
  } else if (pet.unlockedBeadSlots !== 0) {
    throw new Error(`Pet "${pet.id}": pick-up puro não tem slots de bead`);
  }
}

function beadFromSlotId(beadId: string | null): BuffBeadEquipped | null {
  if (!beadId) return null;
  const def = getBuffBeadDefinition(beadId);
  if (!def) return null;
  return {
    beadId: def.id,
    name: def.name,
    tier: def.tier,
    effectSummary: def.effectSummary,
    durationLabel: def.durationLabel,
    requiresBeadIds: def.requiresBeadIds ? [...def.requiresBeadIds] : undefined,
  };
}

function equippedBeadIds(pet: WorkshopPickupPetItem): Set<string> {
  return new Set(
    pet._beadSlotIds.filter((id): id is string => Boolean(id)),
  );
}

export function isBeadActiveInPet(pet: WorkshopPickupPetItem, beadId: string): boolean {
  const def = getBuffBeadDefinition(beadId);
  if (!def) return false;
  const equipped = equippedBeadIds(pet);
  if (!equipped.has(beadId)) return false;
  if (!def.requiresBeadIds?.length) return true;
  return def.requiresBeadIds.every((req) => equipped.has(req));
}

export function syncPickupPetStats(pet: WorkshopPickupPetItem): void {
  assertPickupPet(pet);
  pet.beadSlots = Array.from({ length: MAX_BEAD_SLOTS }, (_, i) => {
    if (i >= pet.unlockedBeadSlots) return null;
    const raw = pet._beadSlotIds[i] ?? null;
    return beadFromSlotId(raw);
  });

  const activeBeads = pet._beadSlotIds
    .filter((id): id is string => Boolean(id))
    .filter((id) => isBeadActiveInPet(pet, id));

  pet.stats = [
    { label: "Kind", value: pet.mode === "buff" ? "Buff Pet" : "Pick-up Pet" },
    { label: "Mailable", value: pet.mailable ? "Yes" : "No" },
    { label: "Summoned", value: pet.summoned ? "Yes" : "No" },
    {
      label: "Bead slots",
      value:
        pet.mode === "buff"
          ? `${pet.unlockedBeadSlots} / ${MAX_BEAD_SLOTS}`
          : "— (use Pick-up Pet Upgrade)",
    },
    {
      label: "Active beads",
      value: pet.mode === "buff" ? String(activeBeads.length) : "—",
    },
  ];
}

export function ensureBeadSlotStorage(pet: WorkshopPickupPetItem): void {
  while (pet._beadSlotIds.length < MAX_BEAD_SLOTS) {
    pet._beadSlotIds.push(null);
  }
}

export function mergePickupFilterFromRecord(
  partial?: Partial<PickupFilterState>,
): PickupFilterState {
  return { ...defaultPickupFilter(), ...partial };
}

export function defaultPickupWorkshopInventory(): import("./pickup-types").PickupPetWorkshopInventory {
  return {
    pickupUpgradeScroll: 1,
    beadSlotKeys: 2,
    blessingScroll: 3,
    beadsOnHand: {
      "bead-power-l1": 2,
      "bead-power-l2": 1,
      "bead-protector-l1": 1,
      "bead-grizzled-perm": 1,
    },
  };
}

export type PickupBlessingRoll = AwakeStat;

export { MAX_BEAD_SLOTS };