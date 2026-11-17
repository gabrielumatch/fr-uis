import { WIKI } from "../assets/wiki-icons";
import type { ConsumableItem } from "./consumable-item";
import {
  type ConsumableItemRecord,
  type ConsumablesCatalog,
} from "./consumable-record";

type WikiIconKey = keyof typeof WIKI;

function resolveIcon(record: ConsumableItemRecord): string {
  if (record.iconKey) {
    if (!(record.iconKey in WIKI)) {
      throw new Error(
        `Consumable "${record.id}": iconKey "${record.iconKey}" não existe em WIKI`,
      );
    }
    return WIKI[record.iconKey as WikiIconKey];
  }
  if (record.iconEmoji) return record.iconEmoji;
  throw new Error(`Consumable "${record.id}": informe iconKey ou iconEmoji`);
}

function recordToConsumable(record: ConsumableItemRecord): ConsumableItem {
  if (record.type !== "consumable" || record.category !== "upgrade") {
    throw new Error(`Consumable "${record.id}": type/category inválidos`);
  }
  return {
    id: record.id,
    name: record.name,
    type: "consumable",
    subtype: record.subtype,
    category: "upgrade",
    icon: resolveIcon(record),
    typeLabel: record.typeLabel,
    recipeSlot: record.recipeSlot,
  };
}

export function parseConsumablesCatalog(raw: unknown): ConsumablesCatalog {
  if (!raw || typeof raw !== "object") {
    throw new Error("consumables.json: raiz inválida");
  }
  const catalog = raw as ConsumablesCatalog;
  if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.items)) {
    throw new Error("consumables.json: schemaVersion ou items[] inválidos");
  }
  return catalog;
}

export function hydrateConsumableCatalog(catalog: ConsumablesCatalog): ConsumableItem[] {
  const seen = new Set<string>();
  const items: ConsumableItem[] = [];
  for (const record of catalog.items) {
    if (seen.has(record.id)) {
      throw new Error(`consumables.json: id duplicado "${record.id}"`);
    }
    seen.add(record.id);
    items.push(recordToConsumable(record));
  }
  return items;
}