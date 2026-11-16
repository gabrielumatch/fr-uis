import { makeWeaponLetterCard } from "./weapon-letter-cards.js";

/**
 * @typedef {ReturnType<typeof makeWeaponLetterCard>} WeaponLetterCard
 * @typedef {{
 *   index: number;
 *   pierced: boolean;
 *   card: WeaponLetterCard | null;
 * }} PiercingSlot
 */

/** 2H weapon: até 10 sockets; primeiro fura (piercing), depois insere carta por letra (D→R). */
export const piercingWeaponConfig = {
  maxSlots: 10,
  itemKind: "weapon",
  /** @type {PiercingSlot[]} */
  slots: [
    { index: 1, pierced: true, card: makeWeaponLetterCard("fire", "D") },
    { index: 2, pierced: true, card: makeWeaponLetterCard("fire", "C") },
    { index: 3, pierced: true, card: makeWeaponLetterCard("fire", "B") },
    { index: 4, pierced: true, card: makeWeaponLetterCard("fire", "A") },
    { index: 5, pierced: true, card: null },
    { index: 6, pierced: false, card: null },
    { index: 7, pierced: false, card: null },
    { index: 8, pierced: false, card: null },
    { index: 9, pierced: false, card: null },
    { index: 10, pierced: false, card: null },
  ],
};

/**
 * @param {typeof piercingWeaponConfig} config
 */
export function getPiercingCounts(config) {
  const pierced = config.slots.filter((s) => s.pierced).length;
  const withCard = config.slots.filter((s) => s.card).length;
  return { pierced, withCard, max: config.maxSlots };
}

/**
 * Soma linhas de efeito das cartas equipadas (preview simples).
 * @param {typeof piercingWeaponConfig} config
 */
export function summarizeEquippedWeaponCards(config) {
  /** @type {Map<string, { flat: number; percent: number }>} */
  const totals = new Map();

  for (const slot of config.slots) {
    if (!slot.card) continue;
    for (const line of slot.card.effects) {
      const flat = line.match(/^([A-Za-z\s]+)\s+\+(\d+)$/);
      const pct = line.match(/^(.+?)\s+\+(\d+)%$/);
      if (flat) {
        const key = flat[1].trim();
        const prev = totals.get(key) ?? { flat: 0, percent: 0 };
        prev.flat += Number(flat[2]);
        totals.set(key, prev);
      } else if (pct) {
        const key = pct[1].trim();
        const prev = totals.get(key) ?? { flat: 0, percent: 0 };
        prev.percent += Number(pct[2]);
        totals.set(key, prev);
      }
    }
  }

  const parts = [];
  for (const [stat, { flat, percent }] of totals) {
    if (flat) parts.push(`${stat} +${flat}`);
    if (percent) parts.push(`${stat} +${percent}%`);
  }
  return parts.length ? parts.join(" · ") : "—";
}