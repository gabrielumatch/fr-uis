import { parseWorkshopAppUrl } from "./route-url";
import { activeWorkshopItemId, selectCatalogItem } from "./inventory";

/** Aplica `workshop_item` da URL ao equipamento do painel (chamar uma vez no boot). */
export function bootstrapWorkshopFromUrl(href?: string): void {
  const resolved =
    href ?? (typeof location !== "undefined" ? location.href : "http://localhost/");
  const { workshopItemId } = parseWorkshopAppUrl(resolved);
  if (!workshopItemId || workshopItemId === activeWorkshopItemId) return;
  selectCatalogItem(workshopItemId);
}