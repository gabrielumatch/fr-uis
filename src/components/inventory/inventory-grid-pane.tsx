import { getWorkshopItemById } from "../../data/workshop/equipped";
import {
  INVENTORY_TABS,
  getInventoryGridCells,
  resolveInventoryCellWorkshopId,
  type InventoryTabId,
} from "../../data/inventory/display";
import { InventorySlot } from "./inventory-slot";

function BagCell({
  cell,
  activeWorkshopItemId,
}: {
  cell: ReturnType<typeof getInventoryGridCells>[number];
  activeWorkshopItemId: string;
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

  const wsId = resolveInventoryCellWorkshopId(cell);
  const item = wsId ? getWorkshopItemById(wsId) : undefined;
  const title =
    item?.name ??
    (cell.skinDonor ? "Skin item — opens matching gear in workshop" : "");
  const active = Boolean(wsId && wsId === activeWorkshopItemId);

  return (
    <div className="inv-grid__cell" role="gridcell">
      <InventorySlot
        icon={cell.icon}
        upgradeBadge={cell.upgradeBadge}
        workshopItemId={wsId}
        active={active}
        title={title}
        variant="grid"
        as={wsId ? "button" : "div"}
        skinDonor={Boolean(cell.skinDonor)}
      />
    </div>
  );
}

export function InventoryGridPane({
  tabId,
  activeWorkshopItemId,
  onTabChange,
}: {
  tabId: InventoryTabId;
  activeWorkshopItemId: string;
  onTabChange: (tab: InventoryTabId) => void;
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
          <BagCell key={i} cell={cell} activeWorkshopItemId={activeWorkshopItemId} />
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