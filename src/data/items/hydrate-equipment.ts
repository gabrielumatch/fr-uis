import { WIKI } from "../assets/wiki-icons";
import { formatUpgradeProgress } from "../upgrade/rules";
import { gearCategoryToRecipeId } from "../upgrade/rules";
import {
  assertItemRecord,
  type FashionItemRecord,
  type GearItemRecord,
  type JewelItemRecord,
  type EquipmentCatalog,
  type SkinPoolRecord,
  type WorkshopItemRecord,
} from "./equipment-record";
import type {
  ItemCombatStats,
  StatRow,
  WorkshopArmorItem,
  WorkshopFashionItem,
  WorkshopJewelItem,
  WorkshopItem,
  WorkshopWeaponItem,
} from "./workshop-item";
import { createSkinState, type SkinPoolEntry } from "./workshop-item";
import type { ArmorSubtype, WeaponSubtype } from "./types";
import { upgradeProfile } from "../upgrade/recipes";

type WikiIconKey = keyof typeof WIKI;

function wikiIcon(key: string, itemId: string): string {
  if (!(key in WIKI)) {
    throw new Error(`Item "${itemId}": iconKey "${key}" não existe em WIKI`);
  }
  return WIKI[key as WikiIconKey];
}

function skinPoolFromRecords(
  records: SkinPoolRecord[],
  itemId: string,
): SkinPoolEntry[] {
  return records.map((s) => ({
    id: s.id,
    icon: wikiIcon(s.iconKey, itemId),
    name: s.name,
    typeLabel: s.typeLabel,
    qty: s.qty,
  }));
}

function formatRange(min: number, max: number): string {
  return `${min}-${max}`;
}

function formatSlot(p: { current: number; max: number }): string {
  return `${p.current} / ${p.max}`;
}

function formatElement(el: GearItemRecord["element"]): string | undefined {
  if (!el) return undefined;
  return `${el.name} ${el.level}/${el.max}`;
}

function buildGearStats(
  record: GearItemRecord,
  upgrade: ReturnType<typeof upgradeProfile>,
): StatRow[] {
  const rows: StatRow[] = [{ label: "Level", value: String(record.level) }];

  if (record.attack) {
    rows.push({ label: "Attack", value: formatRange(record.attack.min, record.attack.max) });
  }
  if (record.defense) {
    rows.push({ label: "DEF", value: formatRange(record.defense.min, record.defense.max) });
  }
  if (record.bonus) {
    rows.push({ label: "Bonus", value: record.bonus });
  }
  if (record.setBonus) {
    rows.push({ label: "Set bonus (4/4)", value: record.setBonus });
  }
  const elementLine = formatElement(record.element);
  if (elementLine) {
    rows.push({ label: "Element", value: elementLine });
  }
  rows.push({
    label: "Upgrade",
    value: formatUpgradeProgress(record.upgradeLevel, { upgrade }),
  });
  if (record.piercing) {
    rows.push({ label: "Piercing", value: formatSlot(record.piercing) });
  }
  if (record.cards) {
    rows.push({ label: "Cards", value: formatSlot(record.cards) });
  }
  if (record.jewels) {
    rows.push({
      label: "Jewels",
      value: `${record.jewels.unlocked} / ${record.jewels.capacity} unlocked`,
    });
  }
  rows.push({ label: "Appearance", value: "Original" });
  return rows;
}

function buildJewelStats(
  record: JewelItemRecord,
  upgrade: ReturnType<typeof upgradeProfile>,
): StatRow[] {
  return [
    { label: "Level", value: String(record.level) },
    { label: "Bonus", value: record.bonus },
    {
      label: "Upgrade",
      value: formatUpgradeProgress(record.upgradeLevel, { upgrade }),
    },
    { label: "Appearance", value: "Original" },
  ];
}

function buildFashionStats(record: FashionItemRecord): StatRow[] {
  return [...record.info];
}

function combatFromGear(record: GearItemRecord): ItemCombatStats {
  return {
    level: record.level,
    attack: record.attack,
    defense: record.defense,
  };
}

function combatFromJewel(record: JewelItemRecord): ItemCombatStats {
  return { level: record.level };
}

function upgradeBadge(record: WorkshopItemRecord): string {
  if (record.type === "fashion") return "F";
  return `+${record.upgradeLevel}`;
}

function recordToItem(record: WorkshopItemRecord): WorkshopItem {
  assertItemRecord(record, record.id);
  const icon = wikiIcon(record.iconKey, record.id);
  const skinPool = skinPoolFromRecords(record.skinPool ?? [], record.id);
  const scrolls = record.skinScrolls ?? { purge: 2, recover: 1 };

  const base = {
    id: record.id,
    icon,
    baseIcon: icon,
    name: record.name,
    typeLabel: record.typeLabel,
    upgradeBadge: upgradeBadge(record),
    upgradeLevel: record.upgradeLevel,
    awake: record.awake,
    gearScore: record.gearScore,
    elementHost: record.elementHost,
    workshopSkin: createSkinState(skinPool, scrolls),
  };

  switch (record.type) {
    case "weapon": {
      const upgrade = upgradeProfile(gearCategoryToRecipeId(record.category));
      const item: WorkshopWeaponItem = {
        ...base,
        upgrade,
        type: "weapon",
        subtype: record.subtype as WeaponSubtype,
        category: record.category,
        stats: buildGearStats(record, upgrade),
        combat: combatFromGear(record),
      };
      return item;
    }
    case "armor": {
      const upgrade = upgradeProfile(gearCategoryToRecipeId(record.category));
      const item: WorkshopArmorItem = {
        ...base,
        upgrade,
        type: "armor",
        subtype: record.subtype as ArmorSubtype,
        category: record.category,
        stats: buildGearStats(record, upgrade),
        combat: combatFromGear(record),
      };
      return item;
    }
    case "jewel": {
      const upgrade = upgradeProfile("jewel");
      const item: WorkshopJewelItem = {
        ...base,
        upgrade,
        type: "jewel",
        subtype: record.subtype,
        stats: buildJewelStats(record, upgrade),
        combat: combatFromJewel(record),
      };
      return item;
    }
    case "fashion": {
      const upgrade = upgradeProfile("fashion");
      const item: WorkshopFashionItem = {
        ...base,
        upgrade,
        type: "fashion",
        subtype: record.subtype,
        stats: buildFashionStats(record),
      };
      return item;
    }
  }
}

export function hydrateEquipmentCatalog(catalog: EquipmentCatalog): WorkshopItem[] {
  if (catalog.schemaVersion !== 1) {
    throw new Error(`equipment.json: schemaVersion ${catalog.schemaVersion} não suportado`);
  }
  const seen = new Set<string>();
  const items: WorkshopItem[] = [];
  for (const record of catalog.items) {
    if (seen.has(record.id)) {
      throw new Error(`equipment.json: id duplicado "${record.id}"`);
    }
    seen.add(record.id);
    items.push(recordToItem(record));
  }
  return items;
}

export function parseEquipmentCatalog(raw: unknown): EquipmentCatalog {
  if (!raw || typeof raw !== "object") {
    throw new Error("equipment.json: raiz inválida");
  }
  const catalog = raw as EquipmentCatalog;
  if (!Array.isArray(catalog.items)) {
    throw new Error("equipment.json: falta items[]");
  }
  return catalog;
}

/** @deprecated */
export const hydrateWorkshopCatalog = hydrateEquipmentCatalog;
/** @deprecated */
export const parseWorkshopItemsCatalog = parseEquipmentCatalog;