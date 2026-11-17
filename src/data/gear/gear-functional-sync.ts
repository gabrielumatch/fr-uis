import type { ItemRecord } from "../items/types";
import type { StatRow, WorkshopItem } from "../items/item";
import type {
  GearFunctionalRecord,
  GearFunctionalRuntime,
  GearTradeLock,
  LevelReductionState,
} from "./gear-functional-types";
import { gearServiceCapabilities } from "./gear-service-rules";
import { reductionScrollDelta } from "./gear-service-rules";

function resolveTrade(
  record: ItemRecord,
  functional: GearFunctionalRecord | undefined,
  reduction: LevelReductionState,
): GearTradeLock {
  if (functional?.trade) return functional.trade;
  if (record.category === "baruna") return "soul-linked";
  if (reduction) return "reduction-locked";
  if (functional?.tempUnbound) return "temp-unbound";
  return "tradeable";
}

export function mergeGearFunctionalFromRecord(record: ItemRecord): GearFunctionalRuntime {
  const functional = record.gearFunctional;
  const requiredLevel = functional?.requiredLevel ?? record.level ?? 0;
  const reduction = functional?.levelReduction ?? null;
  const effectiveRequiredLevel = Math.max(
    1,
    requiredLevel - (reduction ? reduction.delta : 0),
  );

  const trade = resolveTrade(record, functional, reduction);

  return {
    requiredLevel,
    effectiveRequiredLevel,
    requiredGender: functional?.requiredGender ?? null,
    levelReduction: reduction,
    trade,
    tempUnbound: functional?.tempUnbound ?? false,
  };
}

/** Item com restrição de trade ou unbind temporário ativo — vale mostrar na UI. */
export function isGearTradeRestricted(g: GearFunctionalRuntime): boolean {
  if (g.tempUnbound || g.trade === "temp-unbound") return true;
  return g.trade !== "tradeable";
}

export function canUnbindGearTrade(
  cap: { scrollUnbinding: boolean },
  g: GearFunctionalRuntime,
): boolean {
  return (
    cap.scrollUnbinding &&
    g.trade !== "soul-linked" &&
    g.trade !== "reduction-locked" &&
    !g.tempUnbound &&
    g.trade !== "temp-unbound"
  );
}

export function tradeStatusLabel(trade: GearTradeLock, tempUnbound: boolean): string {
  if (tempUnbound || trade === "temp-unbound") {
    return "Tradable (until re-equipped)";
  }
  switch (trade) {
    case "tradeable":
      return "Tradable";
    case "reduction-locked":
      return "Untradable (level reduction)";
    case "soul-linked":
      return "Soul-linked (permanent)";
    default:
      return trade;
  }
}

export function appendGearFunctionalStatRows(
  item: WorkshopItem,
  rows: StatRow[],
): StatRow[] {
  const cap = gearServiceCapabilities(item);
  if (!cap.levelReduction && !cap.genderTransy && !cap.scrollUnbinding) {
    return rows;
  }

  const g = item.workshopGear;
  const next = [...rows];

  next.push({
    label: "Req. Level",
    value: g.levelReduction
      ? `${g.effectiveRequiredLevel} (was ${g.requiredLevel}, −${g.levelReduction.delta})`
      : String(g.effectiveRequiredLevel),
  });

  if (cap.genderTransy && g.requiredGender) {
    next.push({
      label: "Gender",
      value: g.requiredGender === "F" ? "Female" : "Male",
    });
  }

  if (isGearTradeRestricted(g)) {
    next.push({
      label: "Trade",
      value: tradeStatusLabel(g.trade, g.tempUnbound),
    });
  }

  return next;
}

export function applyReductionToRuntime(
  runtime: GearFunctionalRuntime,
  scrollId: "scroll-reduction-a" | "scroll-reduction-b",
): { ok: boolean; message: string } {
  if (runtime.levelReduction) {
    return { ok: false, message: "This item already has a level reduction." };
  }
  const delta = reductionScrollDelta(scrollId);
  runtime.levelReduction = { scrollId, delta };
  runtime.effectiveRequiredLevel = Math.max(1, runtime.requiredLevel - delta);
  runtime.trade = "reduction-locked";
  runtime.tempUnbound = false;
  return { ok: true, message: `Required level −${delta}. Item is now untradable.` };
}

export function applyTransyToRuntime(
  runtime: GearFunctionalRuntime,
): { ok: boolean; message: string } {
  if (!runtime.requiredGender) {
    return { ok: false, message: "This armor has no gender lock to swap." };
  }
  runtime.requiredGender = runtime.requiredGender === "F" ? "M" : "F";
  return {
    ok: true,
    message: `Gender requirement is now ${runtime.requiredGender === "F" ? "Female" : "Male"}.`,
  };
}

export function applyUnbindToRuntime(
  runtime: GearFunctionalRuntime,
): { ok: boolean; message: string } {
  if (runtime.trade === "soul-linked") {
    return { ok: false, message: "Soul-linked Baruna gear cannot be unbound." };
  }
  if (runtime.trade === "reduction-locked") {
    return { ok: false, message: "Remove level reduction at Peach before unbinding." };
  }
  runtime.tempUnbound = true;
  runtime.trade = "temp-unbound";
  return { ok: true, message: "Temporarily tradable until you equip it again." };
}

export function removeReductionAtPeach(
  runtime: GearFunctionalRuntime,
): { ok: boolean; message: string } {
  if (!runtime.levelReduction) {
    return { ok: false, message: "No level reduction on this item." };
  }
  runtime.levelReduction = null;
  runtime.effectiveRequiredLevel = runtime.requiredLevel;
  if (!runtime.tempUnbound) {
    runtime.trade = "tradeable";
  }
  return { ok: true, message: "Level reduction removed at Peach." };
}

export function syncGearFunctionalStats(item: WorkshopItem): void {
  const baseRows = item.stats.filter(
    (r) => r.label !== "Req. Level" && r.label !== "Gender" && r.label !== "Trade",
  );
  item.stats = appendGearFunctionalStatRows(item, baseRows);
}