import type {
  ArmorSubtype,
  ElementTrack,
  FashionSubtype,
  GearItemCategory,
  ItemType,
  JewelSockets,
  JewelSubtype,
  SlotProgress,
  WeaponSubtype,
} from "./types";

export type AwakeRecord = {
  label: string;
  value: string;
  tone?: "default" | "red" | "blue";
};

export type SkinPoolRecord = {
  id: string;
  iconKey: string;
  name: string;
  typeLabel: string;
  qty: number;
};

export type InfoLine = { label: string; value: string };

type ItemRecordBase = {
  id: string;
  name: string;
  iconKey: string;
  typeLabel: string;
  elementHost: "weapon" | "suit";
  upgradeLevel: number;
  gearScore: number;
  awake: AwakeRecord[];
  skinPool: SkinPoolRecord[];
  skinScrolls?: { purge: number; recover: number };
};

/** JSON: arma ou armadura — upgrade vem de `category` (não vai no JSON). */
export type GearItemRecord = ItemRecordBase & {
  type: "weapon" | "armor";
  subtype: WeaponSubtype | ArmorSubtype;
  category: GearItemCategory;
  level: number;
  attack?: { min: number; max: number };
  defense?: { min: number; max: number };
  bonus?: string;
  element?: ElementTrack;
  piercing?: SlotProgress;
  cards?: SlotProgress;
  jewels?: JewelSockets;
  setBonus?: string;
};

export type JewelItemRecord = ItemRecordBase & {
  type: "jewel";
  subtype: JewelSubtype;
  level: number;
  bonus: string;
};

export type FashionItemRecord = ItemRecordBase & {
  type: "fashion";
  subtype: FashionSubtype;
  info: InfoLine[];
};

export type WorkshopItemRecord =
  | GearItemRecord
  | JewelItemRecord
  | FashionItemRecord;

export type EquipmentCatalog = {
  schemaVersion: 1;
  items: WorkshopItemRecord[];
};

/** @deprecated use EquipmentCatalog */
export type WorkshopItemsCatalog = EquipmentCatalog;

/** Compile-time: cada entrada do JSON deve ser assignable a uma variante. */
export function assertItemRecord(
  item: WorkshopItemRecord,
  ctx: string,
): void {
  if (!item.id || !item.name || !item.iconKey || !item.typeLabel) {
    throw new Error(`Item inválido (${ctx}): faltam id/name/iconKey/typeLabel`);
  }
  switch (item.type) {
    case "weapon":
    case "armor":
      if (!item.category) {
        throw new Error(`Item "${item.id}": gear exige category`);
      }
      if (item.type === "weapon" && !item.attack) {
        throw new Error(`Item "${item.id}": weapon exige attack`);
      }
      if (item.type === "armor" && !item.defense) {
        throw new Error(`Item "${item.id}": armor exige defense`);
      }
      break;
    case "jewel":
      if (!item.bonus) {
        throw new Error(`Item "${item.id}": jewel exige bonus`);
      }
      break;
    case "fashion":
      if (!item.info?.length) {
        throw new Error(`Item "${item.id}": fashion exige info[]`);
      }
      break;
    default:
      throw new Error(`Item "${(item as WorkshopItemRecord).id}": type desconhecido`);
  }
}

export type { ItemType, GearItemCategory, WeaponSubtype, ArmorSubtype, JewelSubtype, FashionSubtype };