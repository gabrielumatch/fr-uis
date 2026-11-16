/** @typedef {'upgrade-level' | 'element-upgrade' | 'piercing-pierce'} AttemptPlanKey */

/** @typedef {{
 *   index: number;
 *   material: string;
 *   protect: string;
 *   smelting: string;
 *   result: string;
 * }} AttemptPlanRow */

export const ATTEMPT_ROW_COUNT = 10;

/** @param {number} count */
function createEmptyRows(count = ATTEMPT_ROW_COUNT) {
  return Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    material: "",
    protect: "",
    smelting: "",
    result: "Waiting",
  }));
}

/** @type {Record<AttemptPlanKey, AttemptPlanRow[]>} */
const plans = {
  "upgrade-level": createEmptyRows(),
  "element-upgrade": createEmptyRows(),
  "piercing-pierce": createEmptyRows(),
};

/** @type {Record<AttemptPlanKey, { material: string; protect: string; smelting: string }>} */
const planTemplates = {
  "upgrade-level": { material: "🔶", protect: "📜", smelting: "✨" },
  "element-upgrade": { material: "⚡", protect: "📜", smelting: "✨" },
  "piercing-pierce": { material: "🌙", protect: "📜", smelting: "✨" },
};

/**
 * @param {AttemptPlanKey} key
 * @returns {AttemptPlanRow[]}
 */
export function getAttemptRows(key) {
  return plans[key];
}

/**
 * @param {AttemptPlanKey} key
 * @param {Partial<{ material: string; protect: string; smelting: string }>} [overrides]
 */
export function autoRefillAttemptPlan(key, overrides = {}) {
  const base = { ...planTemplates[key], ...overrides };
  plans[key] = plans[key].map((row) => ({
    ...row,
    material: base.material,
    protect: base.protect,
    smelting: base.smelting,
    result: "Pending",
  }));
}

/** @param {AttemptPlanKey} key */
export function clearAttemptPlan(key) {
  plans[key] = createEmptyRows();
}

/**
 * @param {AttemptPlanKey} key
 */
export function attemptPlanCanStart(key) {
  const rows = plans[key];
  if (!rows?.length) return false;
  return rows.some((row) => row.material.trim().length > 0);
}