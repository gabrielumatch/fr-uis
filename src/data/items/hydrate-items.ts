import { WIKI } from "../assets/wiki-icons";
import { formatUpgradeProgress, gearCategoryToRecipeId } from "../upgrade/rules";
import type { ItemRecord, ItemsCatalog } from "./types";
import type {
  CatalogItem,
  ConsumableItem,
  ItemCombatStats,
  SkinItem,
  SkinPoolEntry,
  StatRow,
  WorkshopArmorItem,
  WorkshopFashionItem,
  WorkshopItem,
  WorkshopJewelItem,
  WorkshopWeaponItem,
} from "./item";
import { createSkinState } from "./item";
import type { ArmorSubtype, WeaponSubtype } from "./types";
import { upgradeProfile } from "../upgrade/recipes";

type WikiIconKey = keyof typeof WIKI;

const GEAR_UPGRADE_CATEGORIES = new Set([
  "normal",
  "green",
  "ultimate",
  "baruna",
] satisfies import("./types").GearItemCategory[]);

function isGearUpgradeCategory(category: string): category is import("./types").GearItemCategory {
  return GEAR_UPGRADE_CATEGORIES.has(category as import("./types").GearItemCategory);
}

function resolveIcon(record: ItemRecord): string {
  if (record.iconKey) {
    if (!(record.iconKey in WIKI)) {
      throw new Error(`Item "${record.id}": iconKey "${record.iconKey}" inválido`);
    }
    return WIKI[record.iconKey as WikiIconKey];
  }
  if (record.iconEmoji) return record.iconEmoji;
  throw new Error(`Item "${record.id}": informe iconKey ou iconEmoji`);
}

export function assertItemRecord(record: ItemRecord): void {
  if (!record.id || !record.name || !record.type || !record.category || !record.typeLabel) {
    throw new Error(`Item "${record.id}": faltam id/name/type/category/typeLabel`);
  }
  switch (record.type) {
    case "weapon":
      if (!record.attack) throw new Error(`Item "${record.id}": weapon exige attack`);
      if (!isGearUpgradeCategory(record.category)) {
        throw new Error(
          `Item "${record.id}": weapon.category deve ser normal|green|ultimate|baruna (receita +), recebeu "${record.category}"`,
        );
      }
      break;
    case "armor":
      if (!record.defense) throw new Error(`Item "${record.id}": armor exige defense`);
      if (!isGearUpgradeCategory(record.category)) {
        throw new Error(
          `Item "${record.id}": armor.category deve ser normal|green|ultimate|baruna (receita +), recebeu "${record.category}"`,
        );
      }
      break;
    case "jewel":
      if (!record.bonus) throw new Error(`Item "${record.id}": jewel exige bonus`);
      break;
    case "fashion":
      if (!record.info?.length) throw new Error(`Item "${record.id}": fashion exige info[]`);
      break;
    case "consumable":
      if (record.category !== "upgrade" && record.category !== "pet") {
        throw new Error(`Item "${record.id}": consumable category inválida`);
      }
      break;
    case "skin":
      if (record.category !== "skin") {
        throw new Error(`Item "${record.id}": skin exige category skin`);
      }
      break;
    case "pet":
    case "quest":
      break;
  }
}

function hydrateSimpleItem(
  record: ItemRecord,
): ConsumableItem | SkinItem | import("./item").PetItem | import("./item").QuestItem {
  const base = {
    id: record.id,
    name: record.name,
    type: record.type,
    subtype: record.subtype,
    category: record.category,
    typeLabel: record.typeLabel,
    icon: resolveIcon(record),
    stackQty: record.stackQty ?? 1,
  } as const;

  if (record.type === "consumable") {
    return {
      ...base,
      type: "consumable",
      subtype: record.subtype,
      category: record.category as ConsumableItem["category"],
      recipeSlot: record.recipeSlot,
    };
  }
  if (record.type === "pet") {
    return { ...base, type: "pet", category: "pet" };
  }
  if (record.type === "quest") {
    return { ...base, type: "quest", category: "quest" };
  }
  return {
    ...base,
    type: "skin",
    subtype: record.subtype as SkinItem["subtype"],
    category: "skin",
    hostItemId: record.hostItemId,
  };
}

function formatRange(min: number, max: number): string {
  return `${min}-${max}`;
}

function formatSlot(p: { current: number; max: number }): string {
  return `${p.current} / ${p.max}`;
}

function buildGearStats(
  record: ItemRecord,
  upgrade: ReturnType<typeof upgradeProfile>,
): StatRow[] {
  const rows: StatRow[] = [{ label: "Level", value: String(record.level ?? 0) }];
  if (record.attack) {
    rows.push({ label: "Attack", value: formatRange(record.attack.min, record.attack.max) });
  }
  if (record.defense) {
    rows.push({ label: "DEF", value: formatRange(record.defense.min, record.defense.max) });
  }
  if (record.bonus) rows.push({ label: "Bonus", value: record.bonus });
  if (record.setBonus) rows.push({ label: "Set bonus (4/4)", value: record.setBonus });
  if (record.element) {
    rows.push({
      label: "Element",
      value: `${record.element.name} ${record.element.level}/${record.element.max}`,
    });
  }
  rows.push({
    label: "Upgrade",
    value: formatUpgradeProgress(record.upgradeLevel ?? 0, { upgrade }),
  });
  if (record.piercing) rows.push({ label: "Piercing", value: formatSlot(record.piercing) });
  if (record.cards) rows.push({ label: "Cards", value: formatSlot(record.cards) });
  if (record.jewels) {
    rows.push({
      label: "Jewels",
      value: `${record.jewels.unlocked} / ${record.jewels.capacity} unlocked`,
    });
  }
  rows.push({ label: "Appearance", value: "Original" });
  return rows;
}

function buildJewelStats(record: ItemRecord, upgrade: ReturnType<typeof upgradeProfile>): StatRow[] {
  return [
    { label: "Level", value: String(record.level ?? 0) },
    { label: "Bonus", value: record.bonus! },
    {
      label: "Upgrade",
      value: formatUpgradeProgress(record.upgradeLevel ?? 0, { upgrade }),
    },
    { label: "Appearance", value: "Original" },
  ];
}

function skinPoolFromIds(
  ids: string[] | undefined,
  qtyById: Map<string, number>,
  catalog: Map<string, CatalogItem>,
  ownerId: string,
): SkinPoolEntry[] {
  if (!ids?.length) return [];
  const pool: SkinPoolEntry[] = [];
  for (const skinId of ids) {
    const skin = catalog.get(skinId);
    if (!skin || skin.type !== "skin") {
      throw new Error(`Item "${ownerId}": skinPoolIds referencia "${skinId}" inválido`);
    }
    pool.push({
      id: skin.id,
      icon: skin.icon,
      name: skin.name,
      typeLabel: skin.typeLabel,
      qty: qtyById.get(skinId) ?? 1,
    });
  }
  return pool;
}

function upgradeBadge(record: ItemRecord): string {
  if (record.type === "fashion") return "F";
  return `+${record.upgradeLevel ?? 0}`;
}

function combatFromRecord(record: ItemRecord): ItemCombatStats | undefined {
  if (record.level === undefined && !record.attack && !record.defense) return undefined;
  return {
    level: record.level,
    attack: record.attack,
    defense: record.defense,
  };
}

function hydrateWorkshopItem(
  record: ItemRecord,
  catalog: Map<string, CatalogItem>,
): WorkshopItem {
  const icon = resolveIcon(record);
  const scrolls = record.skinScrolls ?? { purge: 2, recover: 1 };
  const qtyById = new Map((record.skinPoolIds ?? []).map((id) => [id, 1]));
  const skinPool = skinPoolFromIds(record.skinPoolIds, qtyById, catalog, record.id);

  const base = {
    id: record.id,
    name: record.name,
    type: record.type,
    subtype: record.subtype,
    category: record.category,
    typeLabel: record.typeLabel,
    icon,
    stackQty: record.stackQty ?? 1,
    baseIcon: icon,
    upgradeBadge: upgradeBadge(record),
    upgradeLevel: record.upgradeLevel ?? 0,
    awake: record.awake ?? [],
    gearScore: record.gearScore ?? 0,
    elementHost: record.elementHost ?? "suit",
    workshopSkin: createSkinState(skinPool, scrolls),
  };

  switch (record.type) {
    case "weapon": {
      const upgrade = upgradeProfile(gearCategoryToRecipeId(record.category as import("./types").GearItemCategory));
      const item: WorkshopWeaponItem = {
        ...base,
        type: "weapon",
        subtype: record.subtype as WeaponSubtype,
        category: record.category as import("./types").GearItemCategory,
        upgrade,
        stats: buildGearStats(record, upgrade),
        combat: combatFromRecord(record),
      };
      return item;
    }
    case "armor": {
      const upgrade = upgradeProfile(gearCategoryToRecipeId(record.category as import("./types").GearItemCategory));
      const item: WorkshopArmorItem = {
        ...base,
        type: "armor",
        subtype: record.subtype as ArmorSubtype,
        category: record.category as import("./types").GearItemCategory,
        upgrade,
        stats: buildGearStats(record, upgrade),
        combat: combatFromRecord(record),
      };
      return item;
    }
    case "jewel": {
      const upgrade = upgradeProfile("jewel");
      const item: WorkshopJewelItem = {
        ...base,
        type: "jewel",
        subtype: record.subtype as WorkshopJewelItem["subtype"],
        category: "accessory",
        upgrade,
        stats: buildJewelStats(record, upgrade),
        combat: combatFromRecord(record),
      };
      return item;
    }
    case "fashion": {
      const upgrade = upgradeProfile("fashion");
      const item: WorkshopFashionItem = {
        ...base,
        type: "fashion",
        subtype: record.subtype as WorkshopFashionItem["subtype"],
        category: "fashion",
        upgrade,
        stats: record.info ?? [],
      };
      return item;
    }
    default:
      throw new Error(`Item "${record.id}": type não é workshop`);
  }
}

export function parseItemsCatalog(raw: unknown): ItemsCatalog {
  if (!raw || typeof raw !== "object") throw new Error("items.json: raiz inválida");
  const catalog = raw as ItemsCatalog;
  if (catalog.schemaVersion !== 2 || !Array.isArray(catalog.items)) {
    throw new Error("items.json: schemaVersion 2 e items[] obrigatórios");
  }
  return catalog;
}

export function hydrateItemsCatalog(catalog: ItemsCatalog): CatalogItem[] {
  const seen = new Set<string>();
  for (const record of catalog.items) {
    if (seen.has(record.id)) throw new Error(`items.json: id duplicado "${record.id}"`);
    seen.add(record.id);
    assertItemRecord(record);
  }

  const byId = new Map<string, CatalogItem>();

  for (const record of catalog.items) {
    if (
      record.type === "consumable" ||
      record.type === "skin" ||
      record.type === "pet" ||
      record.type === "quest"
    ) {
      byId.set(record.id, hydrateSimpleItem(record));
    }
  }

  for (const record of catalog.items) {
    if (record.type === "weapon" || record.type === "armor" || record.type === "jewel" || record.type === "fashion") {
      byId.set(record.id, hydrateWorkshopItem(record, byId));
    }
  }

  return catalog.items.map((r) => byId.get(r.id)!);
}