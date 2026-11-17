import {
  characterEquippedSlots,
  characterGearScore,
  type EquipSlot,
} from "../../data/inventory/display";
import { getItemById } from "../../data/items/catalog";
import { isEquipSelectableItem } from "../../data/items/item";
import { InventorySlot } from "./inventory-slot";

function EquipSlotCell({
  slot,
  activeWorkshopItemId,
  onSelectWorkshopItem,
}: {
  slot: EquipSlot | Record<string, never>;
  activeWorkshopItemId: string;
  onSelectWorkshopItem: (id: string) => void;
}) {
  const itemId = slot.itemId ?? slot.workshopItemId;
  const catalogItem = itemId ? getItemById(itemId) : undefined;
  const icon = slot.icon ?? catalogItem?.icon;
  const empty = !icon;
  const title = slot.title ?? catalogItem?.name ?? "";
  const selectable = Boolean(itemId && catalogItem && isEquipSelectableItem(catalogItem));

  return (
    <InventorySlot
      icon={icon}
      upgradeBadge={slot.upgradeBadge}
      workshopItemId={selectable ? itemId : undefined}
      active={Boolean(itemId && itemId === activeWorkshopItemId)}
      empty={empty}
      title={title}
      className="inv-slot--equip"
      as={selectable ? "button" : "div"}
      onSelectWorkshopItem={onSelectWorkshopItem}
    />
  );
}

export function CharacterEquipPane({
  activeWorkshopItemId,
  onSelectWorkshopItem,
}: {
  activeWorkshopItemId: string;
  onSelectWorkshopItem: (id: string) => void;
}) {
  return (
    <div className="inv-char" aria-label="Character equipment">
      <div className="inv-char__accessories">
        {characterEquippedSlots.accessories.map((slot, i) => (
          <EquipSlotCell
            key={i}
            slot={slot}
            activeWorkshopItemId={activeWorkshopItemId}
            onSelectWorkshopItem={onSelectWorkshopItem}
          />
        ))}
      </div>
      <div className="inv-char__body">
        <div className="inv-char__col inv-char__col--left">
          {characterEquippedSlots.left.map((slot, i) => (
            <EquipSlotCell
              key={i}
              slot={slot}
              activeWorkshopItemId={activeWorkshopItemId}
              onSelectWorkshopItem={onSelectWorkshopItem}
            />
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
            <EquipSlotCell
              key={i}
              slot={slot}
              activeWorkshopItemId={activeWorkshopItemId}
              onSelectWorkshopItem={onSelectWorkshopItem}
            />
          ))}
        </div>
      </div>
      <div className="inv-char__footer">
        {characterEquippedSlots.footer.map((slot, i) => (
          <EquipSlotCell
            key={i}
            slot={slot}
            activeWorkshopItemId={activeWorkshopItemId}
            onSelectWorkshopItem={onSelectWorkshopItem}
          />
        ))}
      </div>
    </div>
  );
}