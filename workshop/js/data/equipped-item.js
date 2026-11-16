/** @typedef {{ label: string; value: string; tone?: 'default' | 'red' | 'blue' }} AwakeStat */
/** @typedef {{ label: string; value: string }} StatRow */

/**
 * @type {{
 *   icon: string;
 *   name: string;
 *   type: string;
 *   upgradeBadge: string;
 *   upgradeLevel: number;
 *   stats: StatRow[];
 *   awake: AwakeStat[];
 *   gearScore: number;
 *   elementHost: 'weapon' | 'suit';
 *   activeSkinName?: string | null;
 * }}
 */
export const equippedItem = {
  icon: "🪓",
  name: "Lusaka's Axe",
  type: "Two-Handed Axe",
  /** Arma = bônus de dano no matchup; suit = tomar menos/mais dano. */
  elementHost: "weapon",
  upgradeBadge: "+9",
  upgradeLevel: 9,
  stats: [
    { label: "Attack", value: "190" },
    { label: "Element", value: "Lightning 19/20" },
    { label: "Upgrade", value: "9/20" },
    { label: "Piercing", value: "5 / 10" },
    { label: "Cards", value: "4/10" },
    { label: "Jewels", value: "4 / 4 unlocked" },
    { label: "Appearance", value: "Original" },
  ],
  awake: [
    { label: "STR", value: "+25", tone: "red" },
    { label: "Critical Chance", value: "+17%", tone: "blue" },
    { label: "Attack Speed", value: "+10%", tone: "blue" },
  ],
  gearScore: 120,
};