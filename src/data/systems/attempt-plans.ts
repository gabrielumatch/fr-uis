import { getUpgradeLevelAttemptDefaults } from "../upgrade/materials";

export type AttemptPlanKey = "upgrade-level" | "element-upgrade" | "piercing-pierce";

export type AttemptPlanRow = {
  index: number;
  material: string;
  protect: string;
  smelting: string;
  result: string;
};

export const ATTEMPT_ROW_COUNT = 10;

function createEmptyRows(count = ATTEMPT_ROW_COUNT): AttemptPlanRow[] {
  return Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    material: "",
    protect: "",
    smelting: "",
    result: "Waiting",
  }));
}

const plans: Record<AttemptPlanKey, AttemptPlanRow[]> = {
  "upgrade-level": createEmptyRows(),
  "element-upgrade": createEmptyRows(),
  "piercing-pierce": createEmptyRows(),
};

const planTemplates: Record<
  AttemptPlanKey,
  { material: string; protect: string; smelting: string }
> = {
  "upgrade-level": { material: "🔶", protect: "📜", smelting: "✨" },
  "element-upgrade": { material: "⚡", protect: "📜", smelting: "✨" },
  "piercing-pierce": { material: "🌙", protect: "📜", smelting: "✨" },
};

function resolvePlanTemplate(key: AttemptPlanKey) {
  if (key === "upgrade-level") {
    return getUpgradeLevelAttemptDefaults();
  }
  return planTemplates[key];
}

export function getAttemptRows(key: AttemptPlanKey): AttemptPlanRow[] {
  return plans[key];
}

export function autoRefillAttemptPlan(
  key: AttemptPlanKey,
  overrides: Partial<{
    material: string;
    protect: string;
    smelting: string;
  }> = {},
): void {
  const base = { ...resolvePlanTemplate(key), ...overrides };
  plans[key] = plans[key].map((row) => ({
    ...row,
    material: base.material,
    protect: base.protect,
    smelting: base.smelting,
    result: "Pending",
  }));
}

export function clearAttemptPlan(key: AttemptPlanKey): void {
  plans[key] = createEmptyRows();
}

export function attemptPlanCanStart(key: AttemptPlanKey): boolean {
  const rows = plans[key];
  if (!rows?.length) return false;
  return rows.some((row) => row.material.trim().length > 0);
}