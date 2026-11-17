import {
  characterEquippedSlots,
  characterGearScore,
  type EquipSlot,
} from "../../data/inventory/display";
import {
  activeWorkshopItemId,
  getWorkshopItemById,
} from "../../data/workshop/equipped";
import { InventorySlot } from "./inventory-slot";

function EquipSlotCell({ slot }: { slot: EquipSlot | Record<string, never> }) {
  const wsId = slot.workshopItemId;
  const wsItem = wsId ? getWorkshopItemById(wsId) : undefined;
  const icon = slot.icon ?? wsItem?.icon;
  const empty = !icon;
  const title = slot.title ?? wsItem?.name ?? "";

  return (
    <InventorySlot
      icon={icon}
      upgradeBadge={slot.upgradeBadge}
      workshopItemId={wsId}
      active={Boolean(wsId && wsId === activeWorkshopItemId)}
      empty={empty}
      title={title}
      className="inv-slot--equip"
      as={wsId ? "button" : "div"}
    />
  );
}

export function CharacterEquipPane() {
  return (
    <div className="inv-char" aria-label="Character equipment">
      <div className="inv-char__accessories">
        {characterEquippedSlots.accessories.map((slot, i) => (
          <EquipSlotCell key={i} slot={slot} />
        ))}
      </div>
      <div className="inv-char__body">
        <div className="inv-char__col inv-char__col--left">
          {characterEquippedSlots.left.map((slot, i) => (
            <EquipSlotCell key={i} slot={slot} />
          ))}
        </div>
        <div className="inv-char__doll">
          <div className="inv-char__stage">
            <div className="inv-char__figure" aria-hidden="true">
              🧍
            </div>
          </div>
          <p className="inv-char__score">
            GEAR SCORE{" "}
            <strong>{characterGearScore.toLocaleString("de-DE")}</strong>
          </p>
        </div>
        <div className="inv-char__col inv-char__col--right">
          {characterEquippedSlots.right.map((slot, i) => (
            <EquipSlotCell key={i} slot={slot} />
          ))}
        </div>
      </div>
      <div className="inv-char__footer">
        {characterEquippedSlots.footer.map((slot, i) => (
          <EquipSlotCell key={i} slot={slot} />
        ))}
      </div>
    </div>
  );
}