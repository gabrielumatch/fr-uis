import { equippedItem } from "./equipped-item.js";

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
  /** Destino no modo Change Element (não usado no upgrade de nível). */
  changeTargetElementId: "water",
  targetLevel: 20,
  preview: {
    chance: "90%",
    energy: "27.5%",
  },
  inventory: {
    elementCards: 40,
    sprotect: 10,
    smeltingElements: 5,
    elementChangeScrolls: 3,
  },
};

/**
 * @param {string} id
 * @returns {ElementType | undefined}
 */
export function getElementById(id) {
  return elementTypes.find((e) => e.id === id);
}

/** Mantém stat "Element" da sidebar alinhado ao estado. */
export function syncElementToEquippedItem() {
  const el = getElementById(elementUpgradeState.appliedElementId);
  const row = equippedItem.stats.find((s) => s.label === "Element");
  if (row && el) {
    row.value = `${el.label} ${elementUpgradeState.level}/${elementUpgradeState.maxLevel}`;
  }
}

/**
 * @param {string} appliedId
 * @returns {string}
 */
function defaultChangeTargetFor(appliedId) {
  const other = elementTypes.find((e) => e.id !== appliedId);
  return other?.id ?? appliedId;
}

/** Scroll of Element Change: troca tipo, mantém nível. */
export function applyElementChange() {
  const {
    appliedElementId,
    changeTargetElementId,
    inventory,
    level,
  } = elementUpgradeState;

  if (
    !changeTargetElementId ||
    changeTargetElementId === appliedElementId
  ) {
    return { ok: false, reason: "invalid_target" };
  }
  if ((inventory.elementChangeScrolls ?? 0) <= 0) {
    return { ok: false, reason: "no_scroll" };
  }
  if (!getElementById(changeTargetElementId)) {
    return { ok: false, reason: "invalid_target" };
  }

  inventory.elementChangeScrolls -= 1;
  elementUpgradeState.appliedElementId = changeTargetElementId;
  elementUpgradeState.changeTargetElementId =
    defaultChangeTargetFor(changeTargetElementId);

  syncElementToEquippedItem();
  return { ok: true, level };
}

syncElementToEquippedItem();