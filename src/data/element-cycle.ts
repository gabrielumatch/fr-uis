// @ts-nocheck
/**
 * Ciclo elemental FlyFF (forte no sentido horário).
 * Fire → Wind → Earth → Lightning → Water → Fire
 * @see https://flyff.fandom.com/wiki/Element
 */

/** Ordem no anel (cada um é forte contra o próximo). */
export const ELEMENT_CYCLE_ORDER = [
  "fire",
  "wind",
  "earth",
  "lightning",
  "water",
];

/**
 * @param {string} elementId
 * @returns {string | null}
 */
export function elementStrongAgainst(elementId) {
  const i = ELEMENT_CYCLE_ORDER.indexOf(elementId);
  if (i === -1) return null;
  return ELEMENT_CYCLE_ORDER[(i + 1) % ELEMENT_CYCLE_ORDER.length];
}

/**
 * @param {string} elementId
 * @returns {string | null}
 */
export function elementWeakAgainst(elementId) {
  const i = ELEMENT_CYCLE_ORDER.indexOf(elementId);
  if (i === -1) return null;
  return ELEMENT_CYCLE_ORDER[
    (i - 1 + ELEMENT_CYCLE_ORDER.length) % ELEMENT_CYCLE_ORDER.length
  ];
}