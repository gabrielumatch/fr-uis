/** @typedef {{ label: string; value: string; tone?: 'default' | 'red' | 'blue' }} AwakeStat */
/** @typedef {{ label: string; value: string }} StatRow */

/**
 * @type {{
 *   icon: string;
 *   name: string;
 *   type: string;
 *   upgradeBadge: string;
 *   stats: StatRow[];
 *   awake: AwakeStat[];
 *   gearScore: number;
 * }}
 */
export const equippedItem = {
  icon: "🪓",
  name: "Lusaka's Axe",
  type: "Two-Handed Axe",
  upgradeBadge: "+10",
  stats: [
    { label: "Attack", value: "196" },
    { label: "Element", value: "Lightning 19/20" },
    { label: "Upgrade", value: "10/20" },
    { label: "Piercing", value: "5 / 10" },
    { label: "Cards", value: "4/10" },
    { label: "Jewels", value: "5/5" },
  ],
  awake: [
    { label: "STR", value: "+25", tone: "red" },
    { label: "Add. Chance", value: "+17%", tone: "blue" },
    { label: "Attack Speed", value: "+10%", tone: "blue" },
  ],
  gearScore: 120,
};