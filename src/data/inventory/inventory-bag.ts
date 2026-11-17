import type { InventoryTabId } from "./types";

/**
 * Bag mock: só `itemId` do `items.json`.
 * `upgradeBadge` opcional só para skins/consumíveis — **não** para raised pets (rank vem do catálogo).
 */
export type InventoryBagSlot = {
  tab: InventoryTabId;
  itemId: string;
  upgradeBadge?: string;
};

export const INVENTORY_BAG_SLOTS: InventoryBagSlot[] = [
  { tab: "weapons", itemId: "lusaka-axe" },
  { tab: "weapons", itemId: "ryvius-sword" },
  { tab: "weapons", itemId: "carnian-bow" },
  { tab: "weapons", itemId: "piecenition" },
  { tab: "weapons", itemId: "hotter-sword" },
  { tab: "weapons", itemId: "gladiator-gold-bow" },
  { tab: "weapons", itemId: "roikas-stave-baruna" },
  { tab: "weapons", itemId: "spectre-axe", upgradeBadge: "Skin" },
  { tab: "weapons", itemId: "nautilus-axe", upgradeBadge: "Skin" },
  { tab: "weapons", itemId: "bishop-axe", upgradeBadge: "Skin" },
  { tab: "weapons", itemId: "smiter-sword", upgradeBadge: "Skin" },
  { tab: "weapons", itemId: "baroness-bow", upgradeBadge: "Skin" },
  { tab: "weapons", itemId: "nemos-fury", upgradeBadge: "Skin" },

  { tab: "armor", itemId: "intelli-ring" },
  { tab: "armor", itemId: "gore-necklace" },
  { tab: "armor", itemId: "mystique-suit" },
  { tab: "armor", itemId: "vigor-helm" },
  { tab: "armor", itemId: "neo-hat" },
  { tab: "armor", itemId: "ankou-cloak" },
  { tab: "armor", itemId: "bilari-gauntlet-f" },
  { tab: "armor", itemId: "bilari-boots-f" },
  { tab: "armor", itemId: "bileire-suit", upgradeBadge: "Skin" },
  { tab: "armor", itemId: "cruentus-look", upgradeBadge: "Skin" },
  { tab: "armor", itemId: "cruentus-helm", upgradeBadge: "Skin" },
  { tab: "armor", itemId: "bilari-helm", upgradeBadge: "Skin" },
  { tab: "armor", itemId: "bileire-helm-m", upgradeBadge: "Skin" },

  { tab: "pets", itemId: "pet-lion" },
  { tab: "pets", itemId: "pet-dragon" },
  { tab: "pets", itemId: "pet-unicorn" },

  { tab: "quest", itemId: "pet-helper" },
  { tab: "quest", itemId: "sprotect" },

  { tab: "consumables", itemId: "pet-feed" },
  { tab: "consumables", itemId: "sprotect" },
];