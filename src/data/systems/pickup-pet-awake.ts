import type { AwakeStat, WorkshopPickupPetItem } from "../items/item";

export type PickupAwakeLine = AwakeStat;

const STAT_POOL: { label: string; values: string[]; negative?: string[] }[] = [
  { label: "Pickup radius", values: ["+1%", "+2%", "+3%"], negative: ["-1%", "-2%"] },
  { label: "Pickup speed", values: ["+5%", "+8%", "+11%"], negative: ["-3%"] },
  { label: "Buff duration", values: ["+3%", "+5%"], negative: ["-2%"] },
  { label: "STR", values: ["+3", "+5", "+7"], negative: ["-2", "-3"] },
  { label: "DEX", values: ["+3", "+5", "+7"], negative: ["-2"] },
];

const sessionByPetId = new Map<
  string,
  {
    preview: PickupAwakeLine[];
    previousCommitted: PickupAwakeLine[];
    highlightOptions: string[];
    highlightPrimary: string;
    highlightSecondary: string;
  }
>();

function defaultSession() {
  return {
    preview: [],
    previousCommitted: [],
    highlightOptions: STAT_POOL.map((s) => s.label),
    highlightPrimary: STAT_POOL[0]!.label,
    highlightSecondary: STAT_POOL[1]!.label,
  };
}

function sessionForPet(petId: string) {
  let s = sessionByPetId.get(petId);
  if (!s) {
    s = defaultSession();
    sessionByPetId.set(petId, s);
  }
  return s;
}

function rollLine(): PickupAwakeLine {
  const entry = STAT_POOL[Math.floor(Math.random() * STAT_POOL.length)]!;
  const negPool = entry.negative;
  const negative = Boolean(negPool?.length) && Math.random() < 0.18;
  const value = negative && negPool
    ? negPool[Math.floor(Math.random() * negPool.length)]!
    : entry.values[Math.floor(Math.random() * entry.values.length)]!;
  return {
    label: entry.label,
    value,
    tone: negative ? "red" : "blue",
  };
}

/** Linhas para AwakeResults: committed + preview (até 3). */
export function pickupAwakeDisplayLines(pet: WorkshopPickupPetItem): PickupAwakeLine[] {
  const session = sessionForPet(pet.id);
  const committed = pet.blessing;
  if (session.preview.length) {
    return [...committed, ...session.preview].slice(-3);
  }
  if (committed.length) return committed.slice(-3);
  return [
    { label: "—", value: "No awake yet — use Start", tone: "default" },
  ];
}

export function pickupAwakeUiState(pet: WorkshopPickupPetItem) {
  const session = sessionForPet(pet.id);
  return {
    lines: pickupAwakeDisplayLines(pet),
    highlightOptions: session.highlightOptions,
    highlightPrimary: session.highlightPrimary,
    highlightSecondary: session.highlightSecondary,
    showColoredStats: true,
    summarizeStats: false,
    scrolls: pet.workshopPickup.inventory.blessingScroll,
  };
}

export function pickupAwakeStart(pet: WorkshopPickupPetItem): { ok: boolean; message: string } {
  const inv = pet.workshopPickup.inventory;
  if (inv.blessingScroll < 1) {
    return { ok: false, message: "Need Scroll of Pet Blessing (Pick-up Pets)." };
  }
  const session = sessionForPet(pet.id);
  session.previousCommitted = pet.blessing.map((l) => ({ ...l }));
  inv.blessingScroll -= 1;
  session.preview = [rollLine(), rollLine(), rollLine()];
  pet.blessing = session.preview.map((l) => ({ ...l }));
  return { ok: true, message: "Awake rolled — use Previous to undo last roll." };
}

export function pickupAwakePrevious(pet: WorkshopPickupPetItem): { ok: boolean; message: string } {
  const session = sessionForPet(pet.id);
  if (!session.previousCommitted.length && !session.preview.length) {
    return { ok: false, message: "Nothing to restore." };
  }
  pet.blessing = session.previousCommitted.map((l) => ({ ...l }));
  session.preview = [];
  return { ok: true, message: "Restored previous awake." };
}

export function pickupAwakeAutoFill(pet: WorkshopPickupPetItem): void {
  const session = sessionForPet(pet.id);
  const lines = pickupAwakeDisplayLines(pet).filter((l) => l.label !== "—");
  if (lines[0]) session.highlightPrimary = lines[0].label;
  if (lines[1]) session.highlightSecondary = lines[1].label;
}