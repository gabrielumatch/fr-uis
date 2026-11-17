import { getItemById } from "../../data/items/catalog";
import {
  INVENTORY_TABS,
  getInventoryGridCells,
  type InventoryTabId,
} from "../../data/inventory/display";
import { InventorySlot } from "./inventory-slot";

function BagCell({
  cell,
  activeCatalogItemId,
  onSelectCatalogItem,
}: {
  cell: ReturnType<typeof getInventoryGridCells>[number];
  activeCatalogItemId: string;
  onSelectCatalogItem: (id: string) => void;
}) {
  if (!cell?.icon) {
    return (
      <div
        className="inv-grid__cell inv-grid__cell--empty"
        role="gridcell"
        aria-label="Empty slot"
      />
    );
  }

  const item = getItemById(cell.itemId);
  const title = item?.name ?? cell.itemId;
  const active = cell.itemId === activeCatalogItemId;

  return (
    <div className="inv-grid__cell" role="gridcell">
      <InventorySlot
        icon={cell.icon}
        upgradeBadge={cell.upgradeBadge}
        workshopItemId={cell.itemId}
        active={active}
        title={title}
        variant="grid"
        as="button"
        onSelectWorkshopItem={onSelectCatalogItem}
      />
    </div>
  );
}

export function InventoryGridPane({
  tabId,
  activeCatalogItemId,
  onTabChange,
  onSelectCatalogItem,
}: {
  tabId: InventoryTabId;
  activeCatalogItemId: string;
  onTabChange: (tab: InventoryTabId) => void;
  onSelectCatalogItem: (id: string) => void;
}) {
  const cells = getInventoryGridCells(tabId);

  return (
    <div className="inv-bag">
      <nav className="inv-tabs" role="tablist" aria-label="Inventory categories">
        {INVENTORY_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`inv-tabs__btn${tab.id === tabId ? " is-active" : ""}`}
            aria-selected={tab.id === tabId}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="inv-grid" role="grid" aria-label="Item slots">
        {cells.map((cell, i) => (
          <BagCell
            key={i}
            cell={cell}
            activeCatalogItemId={activeCatalogItemId}
            onSelectCatalogItem={onSelectCatalogItem}
          />
        ))}
      </div>
      <div className="inv-bag__tools">
        <input
          type="search"
          className="inv-bag__search"
          placeholder="Search item..."
          aria-label="Search item"
          disabled
        />
        <button
          type="button"
          className="inv-bag__trash btn btn--secondary"
          disabled
          aria-label="Delete item"
        >
          🗑
        </button>
        <button type="button" className="inv-bag__sort btn btn--secondary" disabled>
          Sort
        </button>
      </div>
    </div>
  );
}