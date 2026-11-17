import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  activeCatalogItemId,
  activeWorkshopItemId,
  equippedItem,
  selectCatalogItem,
} from "../data/workshop/equipped";
import {
  resolveInventoryTab,
  type InventoryTabId,
} from "../data/inventory/display";

type WorkshopContextValue = {
  activeCatalogItemId: string;
  activeWorkshopItemId: string;
  equippedItem: typeof equippedItem;
  inventoryTabId: InventoryTabId;
  bump: () => void;
  selectItem: (id: string) => boolean;
  setInventoryTab: (tab: InventoryTabId) => void;
};

const WorkshopContext = createContext<WorkshopContextValue | null>(null);

export function WorkshopProvider({ children }: { children: ReactNode }) {
  const [selectionTick, setSelectionTick] = useState(0);
  const [inventoryTabId, setInventoryTabId] =
    useState<InventoryTabId>("weapons");
  const bump = useCallback(() => setSelectionTick((n) => n + 1), []);

  const value = useMemo<WorkshopContextValue>(
    () => ({
      get activeCatalogItemId() {
        return activeCatalogItemId;
      },
      get activeWorkshopItemId() {
        return activeWorkshopItemId;
      },
      get equippedItem() {
        return equippedItem;
      },
      inventoryTabId,
      bump,
      selectItem: (id) => {
        const ok = selectCatalogItem(id);
        if (ok) setSelectionTick((n) => n + 1);
        return ok;
      },
      setInventoryTab: (tab: InventoryTabId) => {
        setInventoryTabId(resolveInventoryTab(tab));
      },
    }),
    [selectionTick, inventoryTabId, bump],
  );

  return <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>;
}

export function useWorkshop() {
  const ctx = useContext(WorkshopContext);
  if (!ctx) throw new Error("useWorkshop must be used within WorkshopProvider");
  return ctx;
}