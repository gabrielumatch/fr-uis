import type { ConsumableItem } from "../items/item";
import type { BuffBeadGrade } from "../items/types";
import type { BuffBeadDefinition } from "./pickup-types";

type ConsumableLookup = (id: string) => ConsumableItem | undefined;
type ConsumableList = () => readonly ConsumableItem[];

let getConsumableById: ConsumableLookup = () => undefined;
let listConsumables: ConsumableList = () => [];

/** Evita ciclo catalog ↔ hydrate ↔ pickup-pet-sync. */
export function registerBuffBeadCatalogAccess(hooks: {
  getById: ConsumableLookup;
  list: ConsumableList;
}): void {
  getConsumableById = hooks.getById;
  listConsumables = hooks.list;
}

export function buffBeadDefinitionFromItem(
  item: ConsumableItem,
): BuffBeadDefinition | undefined {
  if (!item.buffBead) return undefined;
  const b = item.buffBead;
  return {
    id: item.id,
    name: item.name,
    grade: b.grade,
    family: b.family,
    tier: b.tier,
    effectSummary: b.effectSummary,
    durationLabel: b.durationLabel,
    requiresBeadIds: b.requiresBeadIds,
    icon: item.icon,
  };
}

export function getBuffBeadDefinition(id: string): BuffBeadDefinition | undefined {
  const item = getConsumableById(id);
  if (!item?.buffBead) return undefined;
  return buffBeadDefinitionFromItem(item);
}

export function listBuffBeadDefinitions(): BuffBeadDefinition[] {
  return listConsumables()
    .filter((c) => c.subtype === "buff-bead" && c.buffBead)
    .map((c) => buffBeadDefinitionFromItem(c)!)
    .sort((a, b) => {
      const gradeOrder: Record<BuffBeadGrade, number> = {
        normal: 0,
        precious: 1,
        sacred: 2,
        permanent: 3,
      };
      const g = gradeOrder[a.grade] - gradeOrder[b.grade];
      if (g !== 0) return g;
      return a.name.localeCompare(b.name);
    });
}

export const BUFF_BEAD_GRADE_LABEL: Record<BuffBeadGrade, string> = {
  normal: "Normal (blue)",
  precious: "Precious (yellow)",
  sacred: "Sacred (red)",
  permanent: "Permanent",
};

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