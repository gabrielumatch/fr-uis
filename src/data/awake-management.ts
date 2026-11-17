// @ts-nocheck
/**
 * Awake item — 5 linhas aleatórias (arma pode ter subset no tooltip); 100% no roll.
 * @see docs/flyff-workshop-upgrade-mechanics.md
 */

/** @typedef {{ label: string; value: string; tone?: 'red' | 'blue' | 'default' }} AwakeLine */

export const awakeManagementState = {
  penyaCost: 100_000,
  /** Stats exibidos em Current / Generated (preview com 3 linhas visíveis). */
  /** @type {AwakeLine[]} */
  lines: [
    { label: "STR", value: "+25", tone: "red" },
    { label: "Critical Chance", value: "+17%", tone: "blue" },
    { label: "Attack Speed", value: "+10%", tone: "blue" },
  ],
  highlightOptions: [
    "STR",
    "STA",
    "DEX",
    "INT",
    "Critical Chance",
    "Attack Speed",
    "Critical Chance",
  ],
  highlightPrimary: "STR",
  highlightSecondary: "INT",
  showColoredStats: true,
  summarizeStats: true,
  inventory: {
    awakeningScroll: 915,
    reversionScroll: 38,
  },
};