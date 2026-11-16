/** Bônus máximo de matchup elemental em +20 (arma: dano; suit: defesa). */
export const ELEMENT_MATCHUP_CAP_PERCENT = 15;
export const ELEMENT_LEVEL_MAX = 20;

/**
 * @param {number} level nível de elemento no item (+1 … +20)
 * @param {number} [maxLevel]
 * @param {number} [capPercent]
 */
export function elementMatchupPercent(
  level,
  maxLevel = ELEMENT_LEVEL_MAX,
  capPercent = ELEMENT_MATCHUP_CAP_PERCENT,
) {
  if (maxLevel <= 0 || level <= 0) return 0;
  const clamped = Math.min(Math.max(level, 0), maxLevel);
  return (clamped / maxLevel) * capPercent;
}

/**
 * @param {number} value
 */
export function formatMatchupPercent(value) {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}