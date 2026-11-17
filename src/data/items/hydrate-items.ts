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
  WorkshopRaisedPetItem,
  WorkshopWeaponItem,
} from "./item";
import { createSkinState } from "./item";
import type { RaisedPetRecord } from "../pets/types";
import { PET_HP_BY_RANK } from "../pets/rank-tables";
import { speciesDef } from "../pets/species";
import { formatPetBonusTotal, statBonusForLevel } from "../pets/rank-tables";
import type { ArmorSubtype, SkinSlot, WeaponSubtype } from "./types";
import { upgradeProfile } from "../upgrade/recipes";
import {
  maxJewelSlotsForRule,
  unlockedJewelSlotCount,
} from "../systems/jewel-slot-rules";
import {
  isArmorSetPieceSubtype,
  workshopGearProfileFromParts,
  type WorkshopGearProfile,
} from "../workshop/workshop-capabilities";

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
      if (isArmorSetPieceSubtype(record.subtype)) {
        if (record.element || record.piercing || record.cards) {
          throw new Error(
            `Item "${record.id}": ${record.subtype} de set não pode ter element/piercing/cards no JSON`,
          );
        }
      }
      if (record.subtype === "suit") {
        if (record.piercing && record.piercing.max > 4) {
          throw new Error(`Item "${record.id}": suit piercing.max máximo 4`);
        }
        if (record.cards && record.cards.max > 4) {
          throw new Error(`Item "${record.id}": suit cards.max máximo 4`);
        }
        if (record.element && record.element.max > 20) {
          throw new Error(`Item "${record.id}": suit element.max máximo 20`);
        }
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
    case "wing":
      if (record.category !== "wing") {
        throw new Error(`Item "${record.id}": wing exige category wing`);
      }
      if (!record.info?.length) {
        throw new Error(`Item "${record.id}": wing exige info[]`);
      }
      break;
    case "pet":
      if (record.subtype === "raised") {
        if (!record.raisedPet) {
          throw new Error(`Item "${record.id}": pet raised exige raisedPet{}`);
        }
        const rp = record.raisedPet;
        if (rp.statLevel < 1 || rp.statLevel > 9) {
          throw new Error(`Item "${record.id}": raisedPet.statLevel 1–9`);
        }
        if (rp.statTiers.length !== rp.statLevel) {
          throw new Error(`Item "${record.id}": statTiers.length deve ser statLevel`);
        }
        if (record.upgradeLevel != null) {
          throw new Error(`Item "${record.id}": raised pet não pode ter upgradeLevel`);
        }
      } else if (record.subtype !== "pickup") {
        throw new Error(`Item "${record.id}": pet.subtype deve ser raised|pickup`);
      }
      break;
    case "quest":
      break;
  }
}

function resolveSkinSlot(
  record: ItemRecord,
  recordsById: Map<string, ItemRecord>,
): SkinSlot {
  if (record.skinSlot) return record.skinSlot;
  if (record.hostItemId) {
    const host = recordsById.get(record.hostItemId);
    if (
      host &&
      (host.type === "weapon" ||
        host.type === "armor" ||
        host.type === "fashion" ||
        host.type === "wing")
    ) {
      return host.subtype as SkinSlot;
    }
  }
  throw new Error(`Item "${record.id}": skin exige skinSlot ou hostItemId compatível`);
}

function hydrateSimpleItem(
  record: ItemRecord,
  recordsById: Map<string, ItemRecord>,
):
  | ConsumableItem
  | SkinItem
  | import("./item").PetItem
  | import("./item").QuestItem
  | import("./item").WingItem {
  const isSkin = record.type === "skin";
  const base = {
    id: record.id,
    name: record.name,
    type: record.type,
    subtype: record.subtype,
    category: record.category,
    typeLabel: record.typeLabel,
    icon: resolveIcon(record),
    stackQty: record.stackQty ?? 1,
    isSkin,
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
  if (record.type === "pet" && record.subtype === "pickup") {
    return { ...base, type: "pet", subtype: "pickup", category: "pet" };
  }
  if (record.type === "quest") {
    return { ...base, type: "quest", category: "quest" };
  }
  if (record.type === "wing") {
    return {
      ...base,
      type: "wing",
      subtype: record.subtype as import("./item").WingItem["subtype"],
      category: "wing",
      gearScore: record.gearScore ?? 0,
      info: record.info ?? [],
    };
  }
  return {
    ...base,
    type: "skin",
    subtype: record.subtype as SkinItem["subtype"],
    category: "skin",
    skinSlot: resolveSkinSlot(record, recordsById),
    hostItemId: record.hostItemId,
  };
}

function formatRange(min: number, max: number): string {
  return `${min}-${max}`;
}

function formatSlot(p: { current: number; max: number }): string {
  return `${p.current} / ${p.max}`;
}

function normalizeSetBonusLines(setBonus: string | string[] | undefined): string[] {
  if (!setBonus) return [];
  if (Array.isArray(setBonus)) {
    return setBonus.map((line) => line.trim()).filter(Boolean);
  }
  return setBonus
    .split(/,\s*/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildGearStats(
  record: ItemRecord,
  upgrade: ReturnType<typeof upgradeProfile>,
  profile?: WorkshopGearProfile,
): StatRow[] {
  const rows: StatRow[] = [{ label: "Level", value: String(record.level ?? 0) }];
  if (record.attack) {
    rows.push({ label: "Attack", value: formatRange(record.attack.min, record.attack.max) });
  }
  if (record.defense) {
    rows.push({ label: "DEF", value: formatRange(record.defense.min, record.defense.max) });
  }
  if (record.bonus) rows.push({ label: "Bonus", value: record.bonus });
  const setBonusLines = normalizeSetBonusLines(record.setBonus);
  if (setBonusLines.length > 0) {
    rows.push({
      label: "Set bonus (4/4)",
      value: "",
      values: setBonusLines,
    });
  }
  const showElement = profile?.allowsElement ?? Boolean(record.element);
  const showPiercing =
    (profile?.piercingSlotMax ?? 0) > 0 && Boolean(record.piercing);
  const showCards = (profile?.cardSlotMax ?? 0) > 0 && Boolean(record.cards);

  if (showElement && record.element) {
    rows.push({
      label: "Element",
      value: `${record.element.name} ${record.element.level}/${record.element.max}`,
    });
  }
  rows.push({
    label: "Upgrade",
    value: formatUpgradeProgress(record.upgradeLevel ?? 0, { upgrade }),
  });
  if (showPiercing && record.piercing) {
    rows.push({ label: "Piercing", value: formatSlot(record.piercing) });
  }
  if (showCards && record.cards) {
    rows.push({ label: "Cards", value: formatSlot(record.cards) });
  }
  if (record.type === "weapon") {
    const rule = upgrade.weaponJewelSocketRule;
    const capacity = maxJewelSlotsForRule(rule);
    if (capacity > 0) {
      const level = record.upgradeLevel ?? 0;
      const unlocked = unlockedJewelSlotCount(level, rule);
      rows.push({
        label: "Jewels",
        value: `${unlocked} / ${capacity} unlocked`,
      });
    }
  } else if (record.jewels) {
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
  hostSubtype: string,
): SkinPoolEntry[] {
  if (!ids?.length) return [];
  const pool: SkinPoolEntry[] = [];
  for (const skinId of ids) {
    const skin = catalog.get(skinId);
    if (!skin || skin.type !== "skin") {
      throw new Error(`Item "${ownerId}": skinPoolIds referencia "${skinId}" inválido`);
    }
    if (skin.skinSlot !== hostSubtype) {
      throw new Error(
        `Item "${ownerId}" (${hostSubtype}): skin "${skinId}" é slot "${skin.skinSlot}"`,
      );
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

function defaultRaisedPetInventory() {
  return {
    petFeed: 120,
    questDrops: { monsterHeart: 40, stem: 28 },
    blessingOfTamer: 2,
    chanceOfTamer: 1,
    reversionScroll: 3,
    awakeningScroll: 8,
  };
}

function buildRaisedPetStats(
  species: import("../pets/types").RaisedPetSpecies,
  rp: RaisedPetRecord,
): StatRow[] {
  const def = speciesDef(species);
  const tierLines = rp.statTiers.map((tier, i) => {
    const val = statBonusForLevel(species, i + 1, tier);
    return `Lv${i + 1} (${tier}): +${val} ${def.bonusStat}`;
  });
  const hpMax = PET_HP_BY_RANK[rp.rank];
  return [
    { label: "Species", value: def.displayName },
    { label: "Rank", value: rp.rank },
    { label: "Stat level", value: `${rp.statLevel} / 9` },
    {
      label: "Rank EXP",
      value: rp.rank === "S" ? "—" : `${rp.rankExpPercent.toFixed(2)}%`,
    },
    { label: "HP", value: `${rp.hp} / ${hpMax}` },
    { label: "Lives", value: String(rp.lives) },
    { label: "Total bonus", value: formatPetBonusTotal(species, rp.statTiers) },
    {
      label: "Stat rolls",
      value: "",
      values: tierLines.length ? tierLines : ["—"],
    },
    { label: "Summoned", value: rp.summoned ? "Yes" : "No" },
  ];
}

function hydrateRaisedPetItem(record: ItemRecord): WorkshopRaisedPetItem {
  const rp = record.raisedPet!;
  const icon = resolveIcon(record);
  const item: WorkshopRaisedPetItem = {
    id: record.id,
    name: record.name,
    type: "pet",
    subtype: "raised",
    category: "pet",
    typeLabel: record.typeLabel,
    icon,
    stackQty: record.stackQty ?? 1,
    isSkin: false,
    species: rp.species,
    rank: rp.rank,
    statLevel: rp.statLevel,
    rankExpPercent: rp.rankExpPercent,
    hp: rp.hp,
    hpMax: PET_HP_BY_RANK[rp.rank],
    lives: rp.lives,
    summoned: rp.summoned ?? false,
    statTiers: [...rp.statTiers],
    stats: buildRaisedPetStats(rp.species, rp),
    awake: record.awake ?? [],
    gearScore: record.gearScore ?? 0,
    workshopPet: { inventory: defaultRaisedPetInventory() },
  };
  return item;
}

function hydrateWorkshopItem(
  record: ItemRecord,
  catalog: Map<string, CatalogItem>,
): WorkshopItem {
  const icon = resolveIcon(record);
  const scrolls = record.skinScrolls ?? { purge: 2, recover: 1 };
  const qtyById = new Map((record.skinPoolIds ?? []).map((id) => [id, 1]));
  const skinPool = skinPoolFromIds(
    record.skinPoolIds,
    qtyById,
    catalog,
    record.id,
    record.subtype,
  );

  const base = {
    id: record.id,
    name: record.name,
    type: record.type,
    subtype: record.subtype,
    category: record.category,
    typeLabel: record.typeLabel,
    icon,
    stackQty: record.stackQty ?? 1,
    isSkin: false,
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
      const profile = workshopGearProfileFromParts("weapon", record.subtype);
      const item: WorkshopWeaponItem = {
        ...base,
        type: "weapon",
        subtype: record.subtype as WeaponSubtype,
        category: record.category as import("./types").GearItemCategory,
        upgrade,
        stats: buildGearStats(record, upgrade, profile),
        combat: combatFromRecord(record),
      };
      return item;
    }
    case "armor": {
      const upgrade = upgradeProfile(gearCategoryToRecipeId(record.category as import("./types").GearItemCategory));
      const profile = workshopGearProfileFromParts("armor", record.subtype);
      const item: WorkshopArmorItem = {
        ...base,
        type: "armor",
        subtype: record.subtype as ArmorSubtype,
        category: record.category as import("./types").GearItemCategory,
        upgrade,
        stats: buildGearStats(record, upgrade, profile),
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

  const recordsById = new Map(catalog.items.map((r) => [r.id, r]));
  const byId = new Map<string, CatalogItem>();

  for (const record of catalog.items) {
    if (record.type === "pet" && record.subtype === "raised") {
      byId.set(record.id, hydrateRaisedPetItem(record));
    } else if (
      record.type === "consumable" ||
      record.type === "skin" ||
      record.type === "pet" ||
      record.type === "quest" ||
      record.type === "wing"
    ) {
      byId.set(record.id, hydrateSimpleItem(record, recordsById));
    }
  }

  for (const record of catalog.items) {
    if (record.type === "weapon" || record.type === "armor" || record.type === "jewel" || record.type === "fashion") {
      byId.set(record.id, hydrateWorkshopItem(record, byId));
    }
  }

  return catalog.items.map((r) => byId.get(r.id)!);
}