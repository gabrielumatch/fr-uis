import { formatPenya, playerPenya, type InventoryTabId } from "../data/inventory/display";
import { SectionHeader } from "./workshop-header";
import { CharacterEquipPane } from "./inventory/character-equip-pane";
import { InventoryGridPane } from "./inventory/inventory-grid-pane";

export function InventorySection({
  activeId,
  tabId,
  onInventoryTabChange,
}: {
  activeId: string;
  tabId: InventoryTabId;
  onInventoryTabChange: (tab: InventoryTabId) => void;
}) {
  return (
    <section
      className="inventory-panel"
      id="workshop-inventory"
      aria-labelledby="inventory-section-title"
    >
      <SectionHeader id="inventory-section-title" title="INVENTORY" />
      <div className="inventory-layout">
        <div className="inventory-layout__char">
          <CharacterEquipPane />
        </div>
        <div className="inventory-layout__bag">
          <InventoryGridPane
            tabId={tabId}
            activeWorkshopItemId={activeId}
            onTabChange={onInventoryTabChange}
          />
        </div>
      </div>
      <footer className="inventory-panel__penya" aria-label="Penya">
        <span className="inventory-panel__penya-icon" aria-hidden="true">
          🪙
        </span>
        <span className="inventory-panel__penya-value">{formatPenya(playerPenya)}</span>
      </footer>
    </section>
  );
}