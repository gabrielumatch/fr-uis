import { equippedItem as equippedHost } from "./inventory";
import { isWorkshopGearItem, type WorkshopHostItem, type WorkshopItem } from "../items/item";

export {
  equippedItem,
  workshopInventory,
  activeCatalogItemId,
  activeWorkshopItemId,
  getActiveCatalogItem,
  selectWorkshopItem,
  selectCatalogItem,
  getWorkshopItemById,
  getWorkshopHostById,
} from "./inventory";

export type { WorkshopHostItem, WorkshopItem } from "../items/item";

/** Item ativo no painel workshop (gear ou raised pet). */
export { equippedHost };

/** Abas de equipamento — exige gear selecionado. */
export function requireEquippedGear(): WorkshopItem {
  if (!isWorkshopGearItem(equippedHost)) {
    throw new Error("Workshop gear not selected");
  }
  return equippedHost;
}

export function getEquippedHost(): WorkshopHostItem {
  return equippedHost;
}