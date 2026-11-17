import type { BuffBeadDefinition } from "./pickup-types";

export const BUFF_BEAD_CATALOG: readonly BuffBeadDefinition[] = [
  {
    id: "bead-power-l1",
    name: "Bead of Power",
    tier: 1,
    effectSummary: "ATK +20",
    durationLabel: "1 hour",
  },
  {
    id: "bead-power-l2",
    name: "Precious Bead of Power",
    tier: 2,
    effectSummary: "ATK +60",
    durationLabel: "1–3 days",
    requiresBeadIds: ["bead-power-l1"],
  },
  {
    id: "bead-gladiator-l3",
    name: "Sacred Bead of the Gladiator",
    tier: 3,
    effectSummary: "ATK +3%, Attack Speed +9%",
    durationLabel: "7 days",
    requiresBeadIds: ["bead-power-l1", "bead-power-l2"],
  },
  {
    id: "bead-protector-l1",
    name: "Bead of the Protector",
    tier: 1,
    effectSummary: "DEF +20",
    durationLabel: "1 hour",
  },
  {
    id: "bead-protector-l2",
    name: "Precious Bead of the Protector",
    tier: 2,
    effectSummary: "DEF +60",
    durationLabel: "1–3 days",
    requiresBeadIds: ["bead-protector-l1"],
  },
  {
    id: "bead-guardian-l3",
    name: "Sacred Bead of the Guardian",
    tier: 3,
    effectSummary: "DEF +5%, Max HP +8%",
    durationLabel: "7 days",
    requiresBeadIds: ["bead-protector-l1", "bead-protector-l2"],
  },
  {
    id: "bead-grizzled-perm",
    name: "Bead of the Grizzled Warrior (PERM)",
    tier: 4,
    effectSummary: "ATK +1%, Attack Speed +3%",
    durationLabel: "Permanent",
  },
] as const;

const beadById = new Map(BUFF_BEAD_CATALOG.map((b) => [b.id, b]));

export function getBuffBeadDefinition(id: string): BuffBeadDefinition | undefined {
  return beadById.get(id);
}

export function defaultPickupFilter(): import("./pickup-types").PickupFilterState {
  return {
    penya: true,
    equipment: true,
    quest: true,
    food: true,
    material: true,
    card: true,
    jewel: false,
    etc: true,
  };
}