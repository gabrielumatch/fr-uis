import { getItemById } from "../../data/items/catalog";
import { equippedItem } from "../../data/workshop/equipped";
import { isSkinItem, isWingItem } from "../../data/items/item";
import { isSkinListedInSkinsTab } from "../../data/workshop/ui-rules";
import { ItemCard } from "../item-card";
import { StatList } from "../stat-list";

export function InventorySelectionHint({ activeCatalogItemId }: { activeCatalogItemId: string }) {
  const item = getItemById(activeCatalogItemId);
  if (!item) return null;

  if (isWingItem(item)) {
    return (
      <aside className="inv-selection-hint frame" aria-live="polite">
        <h3 className="section-title">Selected — inventory only</h3>
        <ItemCard icon={item.icon} name={item.name} typeLabel={item.typeLabel} upgradeBadge="W" />
        <StatList rows={item.info.map((row) => ({ label: row.label, value: row.value }))} />
        <p className="muted">Wings never open the workshop.</p>
      </aside>
    );
  }

  if (isSkinItem(item)) {
    const listed = isSkinListedInSkinsTab(item, equippedItem);
    return (
      <aside className="inv-selection-hint frame" aria-live="polite">
        <h3 className="section-title">Selected — inventory only</h3>
        <ItemCard icon={item.icon} name={item.name} typeLabel={item.typeLabel} upgradeBadge="Skin" />
        <p className="muted">
          Skins do not open the workshop or replace Workshop Item.{" "}
          {listed ? (
            <>
              Visible in the <strong>Skins</strong> tab while{" "}
              <strong>{equippedItem.name}</strong> ({equippedItem.subtype}) is selected.
            </>
          ) : (
            <>
              Not shown in Skins tab — current workshop item is{" "}
              <strong>{equippedItem.name}</strong> ({equippedItem.subtype}), this skin is{" "}
              <strong>{item.skinSlot}</strong>.
            </>
          )}
        </p>
      </aside>
    );
  }

  return null;
}