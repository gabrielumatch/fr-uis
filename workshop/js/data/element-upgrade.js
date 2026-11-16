/**
 * Element upgrade (arma/suit) — track separado do + de upgrade.
 * Cartas: Flame, River, Generator (Electric/Lightning), Desert, Cyclone.
 * @see workshop/docs/flyff-workshop-upgrade-mechanics.md
 */

/** @typedef {{
 *   id: string;
 *   label: string;
 *   icon: string;
 *   cardName: string;
 *   cardIcon: string;
 * }} ElementType */

/** @type {ElementType[]} */
export const elementTypes = [
  {
    id: "fire",
    label: "Fire",
    icon: "🔥",
    cardName: "Flame Card",
    cardIcon: "🔥",
  },
  {
    id: "water",
    label: "Water",
    icon: "💧",
    cardName: "River Card",
    cardIcon: "💧",
  },
  {
    id: "lightning",
    label: "Lightning",
    icon: "⚡",
    cardName: "Generator Card",
    cardIcon: "⚡",
  },
  {
    id: "wind",
    label: "Wind",
    icon: "🌪️",
    cardName: "Cyclone Card",
    cardIcon: "🌪️",
  },
  {
    id: "earth",
    label: "Earth",
    icon: "🌍",
    cardName: "Desert Card",
    cardIcon: "🌍",
  },
];

export const elementUpgradeState = {
  /** Elemento já aplicado no item */
  appliedElementId: "lightning",
  level: 19,
  maxLevel: 20,
  /** Elemento escolhido no picker (pode trocar tipo com Scroll of Element Change no jogo) */
  selectedElementId: "lightning",
  targetLevel: 20,
  plannedAttempts: 5,
  preview: {
    chance: "90%",
    energy: "27.5%",
  },
  inventory: {
    elementCards: 40,
    sprotect: 10,
    smeltingElements: 5,
  },
};

/**
 * @param {string} id
 * @returns {ElementType | undefined}
 */
export function getElementById(id) {
  return elementTypes.find((e) => e.id === id);
}