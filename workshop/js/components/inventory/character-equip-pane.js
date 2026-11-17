import {
  characterEquippedSlots,
  characterGearScore,
} from "../../data/inventory-display.js";
import { activeWorkshopItemId, getWorkshopItemById } from "../../data/equipped-item.js";
import { renderInventorySlot } from "./inventory-slot.js";

/**
 * @param {import("../../data/inventory-display.js").EquipSlot | Record<string, never>} slot
 */
function slotHtml(slot) {
  const wsId = slot.workshopItemId;
  const wsItem = wsId ? getWorkshopItemById(wsId) : undefined;
  const icon = slot.icon ?? wsItem?.icon;
  const empty = !icon;
  const title = slot.title ?? wsItem?.name ?? "";

  return renderInventorySlot({
    icon,
    upgradeBadge: slot.upgradeBadge,
    workshopItemId: wsId,
    active: Boolean(wsId && wsId === activeWorkshopItemId),
    empty,
    title,
    className: "inv-slot--equip",
    as: wsId ? "button" : "div",
  });
}

export function renderCharacterEquipPane() {
  const top = characterEquippedSlots.accessories.map(slotHtml).join("");
  const left = characterEquippedSlots.left.map(slotHtml).join("");
  const right = characterEquippedSlots.right.map(slotHtml).join("");
  const foot = characterEquippedSlots.footer.map(slotHtml).join("");

  return `
    <div class="inv-char" aria-label="Character equipment">
      <div class="inv-char__accessories">${top}</div>
      <div class="inv-char__body">
        <div class="inv-char__col inv-char__col--left">${left}</div>
        <div class="inv-char__doll">
          <div class="inv-char__stage">
            <div class="inv-char__figure" aria-hidden="true">🧍</div>
          </div>
          <p class="inv-char__score">
            GEAR SCORE <strong>${characterGearScore.toLocaleString("de-DE")}</strong>
          </p>
        </div>
        <div class="inv-char__col inv-char__col--right">${right}</div>
      </div>
      <div class="inv-char__footer">${foot}</div>
    </div>
  `;
}