// @ts-nocheck
/**
 * Cartas de piercing para arma/escudo (FlyFF Universe / wiki).
 * @see https://flyffwiki.com/piercing-cards-for-weapons-shields/
 * Suit usa outro pool (Volcano/Lightning X%) — não misturar com arma.
 */

/** @typedef {'D' | 'C' | 'B' | 'A' | 'S' | 'R'} CardGrade */
/** @typedef {'fire' | 'water' | 'wind' | 'electric' | 'land'} CardElement */

/** @type {Record<CardElement, Partial<Record<CardGrade, { effects: string[] }>>>} */
export const weaponLetterCardStats = {
  fire: {
    D: { effects: ["STR +2"] },
    C: { effects: ["STR +3", "Crit Dmg +1%"] },
    B: { effects: ["STR +4", "Crit Dmg +1%"] },
    A: { effects: ["STR +7", "Crit Dmg +2%"] },
    S: { effects: ["STR +12", "Crit Dmg +4%"] },
    R: { effects: ["STR +15", "Crit Dmg +5%"] },
  },
  water: {
    D: { effects: ["INT +2"] },
    C: { effects: ["INT +3", "Cast Time -1%"] },
    B: { effects: ["INT +4", "Cast Time -1%"] },
    A: { effects: ["INT +7", "Cast Time -2%"] },
  },
  electric: {
    D: { effects: ["DEX +2"] },
    C: { effects: ["DEX +3", "Crit Chance +1%"] },
  },
  land: {
    D: { effects: ["STA +2"] },
  },
  wind: {
    D: { effects: ["Speed +2%"] },
  },
};

const elementIcon = {
  fire: "🔴",
  water: "🔵",
  wind: "🟢",
  electric: "🟡",
  land: "🟤",
};

const elementLabel = {
  fire: "Fire",
  water: "Water",
  wind: "Wind",
  electric: "Electric",
  land: "Land",
};

/**
 * @param {CardElement} element
 * @param {CardGrade} grade
 */
export function makeWeaponLetterCard(element, grade) {
  const stats = weaponLetterCardStats[element]?.[grade];
  if (!stats) {
    throw new Error(`Unknown weapon card: ${element} (${grade})`);
  }
  const name = elementLabel[element];
  return {
    element,
    grade,
    label: `${name} Card (${grade})`,
    icon: elementIcon[element],
    effects: stats.effects,
  };
}