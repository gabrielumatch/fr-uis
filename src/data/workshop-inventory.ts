import { WIKI } from "./flyff-wiki-icons";
import { formatUpgradeProgress } from "./item-taxonomy";
import {
  upgradeAttributesValid,
  upgradeProfile,
} from "./upgrade-recipes";
import { createSkinState, type WorkshopItem } from "./workshop-item";

const rawInventory = [
  {
    id: "lusaka-axe",
    kind: "weapon",
    weaponClass: "two-handed-axe",
    upgrade: upgradeProfile("ultimate"),
    icon: WIKI.lusakaHeavyAxe,
    baseIcon: WIKI.lusakaHeavyAxe,
    name: "Ultimate Lusaka's Heavy Axe",
    type: "Two-Handed Axe",
    elementHost: "weapon",
    upgradeBadge: "+9",
    upgradeLevel: 9,
    stats: [
      { label: "Level", value: "75" },
      { label: "Attack", value: "471-664" },
      {
        label: "Bonus",
        value: "HP+12%, DEF+15%, Melee Block+11%, Wind vs Monster+3%",
      },
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
    workshopSkin: createSkinState([
      {
        id: "spectre-axe",
        icon: WIKI.spectreAxe,
        name: "Ultimate Spectre's Axe",
        type: "Two-Handed Axe",
        qty: 1,
      },
      {
        id: "nautilus-axe",
        icon: WIKI.nautilusAxe,
        name: "Ultimate Nautilus",
        type: "Two-Handed Axe",
        qty: 1,
      },
      {
        id: "bishop-axe",
        icon: WIKI.bishopAxe,
        name: "Ultimate Bishop",
        type: "Two-Handed Axe",
        qty: 1,
      },
      {
        id: "lasternition",
        icon: WIKI.lasternition,
        name: "Lasternition",
        type: "Two-Handed Axe",
        qty: 1,
      },
    ]),
  },
  {
    id: "ryvius-sword",
    kind: "weapon",
    weaponClass: "two-handed-sword",
    upgrade: upgradeProfile("ultimate"),
    icon: WIKI.lusakaHeavySword,
    baseIcon: WIKI.lusakaHeavySword,
    name: "Ultimate Lusaka's Heavy Sword",
    type: "Two-Handed Sword",
    elementHost: "weapon",
    upgradeBadge: "+6",
    upgradeLevel: 6,
    stats: [
      { label: "Level", value: "75" },
      { label: "Attack", value: "539-600" },
      {
        label: "Bonus",
        value: "ATK Speed+25%, Crit+25%, ICD+83%, Wind vs Monster+3%",
      },
      { label: "Element", value: "Fire 8/20" },
      { label: "Upgrade", value: "6/20" },
      { label: "Piercing", value: "3 / 10" },
      { label: "Cards", value: "2/10" },
      { label: "Jewels", value: "2 / 3 unlocked" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [
      { label: "STR", value: "+12", tone: "red" },
      { label: "DEX", value: "+8", tone: "blue" },
    ],
    gearScore: 78,
    workshopSkin: createSkinState([
      {
        id: "lusaka-crystal-sword",
        icon: WIKI.lusakaCrystalSword,
        name: "Ultimate Lusaka's Heavy Crystal Sword",
        type: "Two-Handed Sword",
        qty: 1,
      },
      {
        id: "smiter-sword",
        icon: WIKI.smiterSword,
        name: "Smiter Sword",
        type: "Two-Handed Sword",
        qty: 1,
      },
      {
        id: "gladiator-gold-2h-sword",
        icon: WIKI.gladiatorGold2hSword,
        name: "Gladiator's Gold 2H Sword",
        type: "Two-Handed Sword",
        qty: 1,
      },
    ]),
  },
  {
    id: "carnian-bow",
    kind: "weapon",
    weaponClass: "bow",
    upgrade: upgradeProfile("ultimate"),
    icon: WIKI.lusakaBow,
    baseIcon: WIKI.lusakaBow,
    name: "Ultimate Lusaka's Bow",
    type: "Bow",
    elementHost: "weapon",
    upgradeBadge: "+5",
    upgradeLevel: 5,
    stats: [
      { label: "Level", value: "75" },
      { label: "Attack", value: "429-474" },
      {
        label: "Bonus",
        value: "Crit+23%, ATK+16%, ICD+63%, Wind vs Monster+3%",
      },
      { label: "Element", value: "Wind 6/20" },
      { label: "Upgrade", value: "5/20" },
      { label: "Piercing", value: "2 / 10" },
      { label: "Cards", value: "1/10" },
      { label: "Jewels", value: "1 / 2 unlocked" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [{ label: "DEX", value: "+14", tone: "blue" }],
    gearScore: 62,
    workshopSkin: createSkinState([
      {
        id: "bow-of-echoes",
        icon: WIKI.bowOfEchoes,
        name: "Ultimate Bow of Echoes",
        type: "Bow",
        qty: 1,
      },
      {
        id: "nemos-fury",
        icon: WIKI.nemosFury,
        name: "Ultimate Nemo's Fury",
        type: "Bow",
        qty: 1,
      },
      {
        id: "baroness-bow",
        icon: WIKI.baronessBow,
        name: "Ultimate Baroness",
        type: "Bow",
        qty: 1,
      },
    ]),
  },
  {
    id: "mystique-suit",
    kind: "armor",
    armorSlot: "suit",
    upgrade: upgradeProfile("normal"),
    icon: WIKI.bilariSuitF,
    baseIcon: WIKI.bilariSuitF,
    name: "Bilari Suit",
    type: "Suit",
    elementHost: "suit",
    upgradeBadge: "+7",
    upgradeLevel: 7,
    stats: [
      { label: "Level", value: "125" },
      { label: "DEF", value: "1743-1749" },
      {
        label: "Set bonus (4/4)",
        value: "DEF+20%, HP+20%, Melee Block+20%, Ranged Block+20%",
      },
      { label: "Element", value: "Wind 12/20" },
      { label: "Upgrade", value: "7/10" },
      { label: "Piercing", value: "2 / 10" },
      { label: "Cards", value: "2/10" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [
      { label: "DEX", value: "+15", tone: "red" },
      { label: "HP", value: "+8%", tone: "blue" },
    ],
    gearScore: 85,
    workshopSkin: createSkinState([
      {
        id: "bileire-suit",
        icon: WIKI.bileireSuitM,
        name: "Bileire Suit",
        type: "Suit",
        qty: 1,
      },
      {
        id: "cruentus-look",
        icon: WIKI.cruentusSuitM,
        name: "(M) Cruentus Set",
        type: "Suit",
        qty: 1,
      },
    ]),
  },
  {
    id: "vigor-helm",
    kind: "armor",
    armorSlot: "helmet",
    upgrade: upgradeProfile("normal"),
    icon: WIKI.bilariHelmetF,
    baseIcon: WIKI.bilariHelmetF,
    name: "Bilari Helmet",
    type: "Helmet",
    elementHost: "suit",
    upgradeBadge: "+4",
    upgradeLevel: 4,
    stats: [
      { label: "Level", value: "125" },
      { label: "DEF", value: "1141-1146" },
      { label: "Upgrade", value: "4/10" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [{ label: "STA", value: "+6", tone: "blue" }],
    gearScore: 28,
    workshopSkin: createSkinState([
      {
        id: "cruentus-helm",
        icon: WIKI.cruentusHelmetM,
        name: "(M) Cruentus Helmet",
        type: "Helmet",
        qty: 1,
      },
    ]),
  },
  {
    id: "neo-hat",
    kind: "fashion",
    fashionSlot: "hat",
    upgrade: upgradeProfile("fashion"),
    icon: WIKI.cruentusHelmetM,
    baseIcon: WIKI.cruentusHelmetM,
    name: "(M) Cruentus Helmet",
    type: "Fashion (Hat)",
    elementHost: "suit",
    upgradeBadge: "F",
    upgradeLevel: 0,
    stats: [
      { label: "Category", value: "Rare / CS" },
      { label: "Set", value: "(M) Cruentus" },
      { label: "Source", value: "Knight Armor (Wiki)" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [],
    gearScore: 12,
    workshopSkin: createSkinState([
      {
        id: "cruentus-helm-f",
        icon: WIKI.cruentusHelmetF,
        name: "(F) Cruentus Helmet",
        type: "Fashion (Hat)",
        qty: 1,
      },
    ]),
  },
  {
    id: "intelli-ring",
    kind: "jewel",
    jewelSubtype: "ring",
    upgrade: upgradeProfile("jewel"),
    icon: WIKI.jewelryRing,
    baseIcon: WIKI.jewelryRing,
    name: "Intelli Ring",
    type: "Ring",
    elementHost: "suit",
    upgradeBadge: "+2",
    upgradeLevel: 2,
    stats: [
      { label: "Level", value: "90" },
      { label: "Bonus", value: "INT+1" },
      { label: "Upgrade", value: "2/20" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [],
    gearScore: 8,
    workshopSkin: createSkinState([]),
  },
  {
    id: "gore-necklace",
    kind: "jewel",
    jewelSubtype: "necklace",
    upgrade: upgradeProfile("jewel"),
    icon: WIKI.jewelryNecklace,
    baseIcon: WIKI.jewelryNecklace,
    name: "Gore Necklace",
    type: "Necklace",
    elementHost: "suit",
    upgradeBadge: "+12",
    upgradeLevel: 12,
    stats: [
      { label: "Level", value: "90" },
      { label: "Bonus", value: "STR+2" },
      { label: "Upgrade", value: "12/20" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [{ label: "STR", value: "+2", tone: "red" }],
    gearScore: 22,
    workshopSkin: createSkinState([]),
  },
  {
    id: "ankou-cloak",
    kind: "fashion",
    fashionSlot: "back",
    upgrade: upgradeProfile("fashion"),
    icon: WIKI.fashionWings,
    baseIcon: WIKI.fashionWings,
    name: "Fashion Wings",
    type: "Fashion (Back / Wings)",
    elementHost: "suit",
    upgradeBadge: "F",
    upgradeLevel: 0,
    stats: [
      { label: "Category", value: "Fashion / CS" },
      { label: "Slot", value: "Back (wings)" },
      { label: "Source", value: "gPotato Wiki (icon TBD)" },
      { label: "Appearance", value: "Original" },
    ],
    awake: [],
    gearScore: 18,
    workshopSkin: createSkinState([
      {
        id: "bilari-helm",
        icon: WIKI.bilariHelmetF,
        name: "Bilari Helmet",
        type: "Fashion (Hat)",
        qty: 1,
      },
    ]),
  },
] satisfies WorkshopItem[];

const inventory: WorkshopItem[] = [...rawInventory];

/** Alinha linha Upgrade das stats com `maxPlus` (gPotato v21). */
function syncUpgradeStatLines(items: WorkshopItem[]): void {
  for (const item of items) {
    const row = item.stats.find((s) => s.label === "Upgrade");
    if (row) {
      const [levelPart] = row.value.split("/");
      const level = Number.parseInt(levelPart, 10);
      if (!Number.isNaN(level)) {
        row.value = formatUpgradeProgress(level, item);
      }
    }
  }
}

syncUpgradeStatLines(inventory);

for (const item of inventory) {
  if (!upgradeAttributesValid(item.upgrade)) {
    throw new Error(
      `Invalid upgrade attributes on item "${item.id}" (material/protect mismatch)`,
    );
  }
}

export const workshopInventory: readonly WorkshopItem[] = inventory;

export let activeWorkshopItemId: string = inventory[0].id;

export let equippedItem: WorkshopItem = inventory[0];

export function selectWorkshopItem(id: string): boolean {
  if (id === activeWorkshopItemId) return false;
  const next = inventory.find((item) => item.id === id);
  if (!next) return false;
  activeWorkshopItemId = id;
  equippedItem = next;
  return true;
}

export function getWorkshopItemById(id: string): WorkshopItem | undefined {
  return inventory.find((item) => item.id === id);
}

export type { WorkshopItem };