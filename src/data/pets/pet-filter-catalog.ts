/** Layout alinhado ao Pet Filter do cliente (v21+). */

export type PetFilterCategoryId =
  | "items"
  | "armor"
  | "weapons"
  | "others"
  | "accessories"
  | "cards";

export type PetFilterOptionId =
  | "item-food-hp"
  | "item-potion-mp"
  | "item-drink-fp"
  | "item-moonstone"
  | "item-sunstone"
  | "item-jewels"
  | "item-quest"
  | "item-beads"
  | "armor-blue"
  | "armor-green"
  | "armor-shields"
  | "weapon-blue"
  | "weapon-green"
  | "other-penya"
  | "other-event"
  | "other-etc"
  | "acc-ring"
  | "acc-earring"
  | "acc-necklace"
  | "card-7-4"
  | "card-3-2"
  | "card-ab"
  | "card-cd"
  | "card-elemental";

export type PetFilterOptionDef = {
  id: PetFilterOptionId;
  label: string;
  icon: string;
};

export type PetFilterCategoryDef = {
  id: PetFilterCategoryId;
  title: string;
  options: readonly PetFilterOptionDef[];
  /** Armor / Weapons — toggle "My class only" no header. */
  classOnlyKey?: "armorMyClassOnly" | "weaponMyClassOnly";
};

export const PET_FILTER_CATEGORIES: readonly PetFilterCategoryDef[] = [
  {
    id: "items",
    title: "ITEMS",
    options: [
      { id: "item-food-hp", label: "Food [HP]", icon: "🍖" },
      { id: "item-potion-mp", label: "Potions [MP]", icon: "🧪" },
      { id: "item-drink-fp", label: "Drinks [FP]", icon: "🥤" },
      { id: "item-moonstone", label: "Moonstone", icon: "🌙" },
      { id: "item-sunstone", label: "Sunstone", icon: "☀️" },
      { id: "item-jewels", label: "Jewels", icon: "💎" },
      { id: "item-quest", label: "Quest items", icon: "📜" },
      { id: "item-beads", label: "Beads", icon: "🔮" },
    ],
  },
  {
    id: "armor",
    title: "ARMOR",
    classOnlyKey: "armorMyClassOnly",
    options: [
      { id: "armor-blue", label: "Blue\n(common)", icon: "🛡️" },
      { id: "armor-green", label: "Green\n(rare)", icon: "🛡️" },
      { id: "armor-shields", label: "Shields", icon: "🔰" },
    ],
  },
  {
    id: "weapons",
    title: "WEAPONS",
    classOnlyKey: "weaponMyClassOnly",
    options: [
      { id: "weapon-blue", label: "Blue\n(common)", icon: "⚔️" },
      { id: "weapon-green", label: "Green\n(rare)", icon: "⚔️" },
    ],
  },
  {
    id: "others",
    title: "OTHERS",
    options: [
      { id: "other-penya", label: "Penya", icon: "🪙" },
      { id: "other-event", label: "Event", icon: "🎉" },
      { id: "other-etc", label: "Other items", icon: "🎁" },
    ],
  },
  {
    id: "accessories",
    title: "ACCESSORIES",
    options: [
      { id: "acc-ring", label: "Rings", icon: "💍" },
      { id: "acc-earring", label: "Earrings", icon: "✨" },
      { id: "acc-necklace", label: "Necklaces", icon: "📿" },
    ],
  },
  {
    id: "cards",
    title: "CARDS",
    options: [
      { id: "card-7-4", label: "7% & 4%", icon: "🃏" },
      { id: "card-3-2", label: "3% & 2%", icon: "🃏" },
      { id: "card-ab", label: "[A] & [B]", icon: "🃏" },
      { id: "card-cd", label: "[C] & [D]", icon: "🃏" },
      { id: "card-elemental", label: "Elemental", icon: "🃏" },
    ],
  },
] as const;

const ALL_OPTION_IDS: PetFilterOptionId[] = PET_FILTER_CATEGORIES.flatMap((c) =>
  c.options.map((o) => o.id),
);

export type PetFilterState = {
  options: Record<PetFilterOptionId, boolean>;
  armorMyClassOnly: boolean;
  weaponMyClassOnly: boolean;
};

/** Estado padrão próximo ao print de referência. */
export function defaultPetFilterState(): PetFilterState {
  const options = Object.fromEntries(
    ALL_OPTION_IDS.map((id) => [id, true]),
  ) as Record<PetFilterOptionId, boolean>;
  options["item-food-hp"] = false;
  options["item-potion-mp"] = false;
  options["card-3-2"] = false;
  options["card-cd"] = false;
  return {
    options,
    armorMyClassOnly: false,
    weaponMyClassOnly: false,
  };
}

/** Compat: chaves antigas `pickupFilter` no JSON. */
const LEGACY_FILTER_MAP: Record<string, Partial<Record<PetFilterOptionId, boolean>>> = {
  penya: { "other-penya": true },
  quest: { "item-quest": true },
  food: { "item-food-hp": true, "item-potion-mp": true, "item-drink-fp": true },
  material: { "item-moonstone": true, "item-sunstone": true },
  card: {
    "card-7-4": true,
    "card-3-2": true,
    "card-ab": true,
    "card-cd": true,
    "card-elemental": true,
  },
  jewel: { "item-jewels": true },
  equipment: {
    "armor-blue": true,
    "armor-green": true,
    "armor-shields": true,
    "weapon-blue": true,
    "weapon-green": true,
    "acc-ring": true,
    "acc-earring": true,
    "acc-necklace": true,
  },
  etc: { "other-etc": true, "other-event": true },
};

export type PetFilterRecord = {
  options?: Partial<Record<PetFilterOptionId, boolean>>;
  armorMyClassOnly?: boolean;
  weaponMyClassOnly?: boolean;
} & Partial<Record<string, boolean>>;

export function mergePetFilterFromRecord(partial?: PetFilterRecord): PetFilterState {
  const base = defaultPetFilterState();
  if (!partial) return base;

  if (partial.options) {
    for (const [id, on] of Object.entries(partial.options)) {
      if (id in base.options && typeof on === "boolean") {
        base.options[id as PetFilterOptionId] = on;
      }
    }
  }

  for (const [key, val] of Object.entries(partial)) {
    if (key === "options" || key === "armorMyClassOnly" || key === "weaponMyClassOnly") continue;
    if (typeof val !== "boolean") continue;
    const map = LEGACY_FILTER_MAP[key];
    if (map) {
      for (const opt of Object.keys(map) as PetFilterOptionId[]) {
        base.options[opt] = val;
      }
    }
  }

  if (typeof partial.armorMyClassOnly === "boolean") {
    base.armorMyClassOnly = partial.armorMyClassOnly;
  }
  if (typeof partial.weaponMyClassOnly === "boolean") {
    base.weaponMyClassOnly = partial.weaponMyClassOnly;
  }

  return base;
}

export function petFilterSelectedCount(
  state: PetFilterState,
  category: PetFilterCategoryDef,
): { on: number; total: number } {
  const total = category.options.length;
  const on = category.options.filter((o) => state.options[o.id]).length;
  return { on, total };
}