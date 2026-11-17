/** Level / gender / trade services no Equipment Enhancement (Peach em Madrigal). */

export type GearGender = "M" | "F";

export type GearTradeLock =
  | "tradeable"
  | "reduction-locked"
  | "soul-linked"
  | "temp-unbound";

export type ReductionScrollId = "scroll-reduction-a" | "scroll-reduction-b";

export type LevelReductionState = {
  scrollId: ReductionScrollId;
  delta: number;
} | null;

/** Persistido em `items.json` (opcional). */
export type GearFunctionalRecord = {
  /** Req. level base do item (default: `level` do gear). */
  requiredLevel?: number;
  requiredGender?: GearGender;
  levelReduction?: LevelReductionState;
  trade?: GearTradeLock;
  /** Após Scroll of Unbinding até re-equipar. */
  tempUnbound?: boolean;
};

export type GearServiceInventory = {
  scrollReductionA: number;
  scrollReductionB: number;
  itemTransyA: number;
  itemTransyB: number;
  scrollUnbinding: number;
};

export type GearFunctionalRuntime = {
  requiredLevel: number;
  effectiveRequiredLevel: number;
  requiredGender: GearGender | null;
  levelReduction: LevelReductionState;
  trade: GearTradeLock;
  tempUnbound: boolean;
};

export const DEFAULT_GEAR_SERVICE_INVENTORY: GearServiceInventory = {
  scrollReductionA: 2,
  scrollReductionB: 2,
  itemTransyA: 2,
  itemTransyB: 2,
  scrollUnbinding: 2,
};