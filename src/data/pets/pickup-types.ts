import type { AwakeRecord } from "../items/types";

/** Pick-up puro (só loot) ou buff (Pick-up Pet Upgrade). */
export type PickupPetMode = "pickup" | "buff";

/** Tiers de Buff Bead — nível anterior precisa estar ativo para o próximo. */
export type BuffBeadTier = 1 | 2 | 3 | 4;

export type PickupFilterId =
  | "penya"
  | "equipment"
  | "quest"
  | "food"
  | "material"
  | "card"
  | "jewel"
  | "etc";

export type PickupFilterState = Record<PickupFilterId, boolean>;

export type PickupPetRecord = {
  mode: PickupPetMode;
  mailable?: boolean;
  summoned?: boolean;
  /** Buff: 2 após upgrade; até 9 com Bead Slot Key. Pick-up: 0. */
  unlockedBeadSlots?: number;
  /** Até 9 entradas — id de bead catalog ou null. */
  beadSlotBeadIds?: (string | null)[];
  /** Scroll of Pet Blessing (Pick-up Pets) — não é awake de raised. */
  blessing?: AwakeRecord[];
  pickupFilter?: Partial<PickupFilterState>;
};

export type BuffBeadEquipped = {
  beadId: string;
  name: string;
  tier: BuffBeadTier;
  effectSummary: string;
  durationLabel: string;
  requiresBeadIds?: string[];
};

export type PickupPetWorkshopInventory = {
  pickupUpgradeScroll: number;
  beadSlotKeys: number;
  blessingScroll: number;
  beadsOnHand: Record<string, number>;
};

export type PickupPetRuntime = {
  inventory: PickupPetWorkshopInventory;
};

export type BuffBeadDefinition = {
  id: string;
  name: string;
  tier: BuffBeadTier;
  effectSummary: string;
  durationLabel: string;
  /** Tier 3+ exige estes ids também equipados no pet. */
  requiresBeadIds?: readonly string[];
};