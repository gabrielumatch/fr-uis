import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
import { getItemById } from "../data/items/catalog";
import { isWorkshopItem } from "../data/items/item";
import { useWorkshopRoute } from "../hooks/useWorkshopRoute";

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
  const {
    inventoryTab: urlInventoryTab,
    workshopItemId: urlWorkshopItemId,
    setInventoryTab: setInventoryTabUrl,
    setWorkshopItemId,
  } = useWorkshopRoute();
  const [selectionTick, setSelectionTick] = useState(0);
  const bump = useCallback(() => setSelectionTick((n) => n + 1), []);

  useEffect(() => {
    if (!urlWorkshopItemId || urlWorkshopItemId === activeWorkshopItemId) return;
    const item = getItemById(urlWorkshopItemId);
    if (item && isWorkshopItem(item)) {
      selectCatalogItem(urlWorkshopItemId);
      setSelectionTick((n) => n + 1);
    }
  }, [urlWorkshopItemId]);

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
      get inventoryTabId() {
        return urlInventoryTab;
      },
      bump,
      selectItem: (id) => {
        const ok = selectCatalogItem(id);
        if (ok) {
          setSelectionTick((n) => n + 1);
          const item = getItemById(id);
          if (item && isWorkshopItem(item) && id !== urlWorkshopItemId) {
            setWorkshopItemId(id);
          }
        }
        return ok;
      },
      setInventoryTab: (tab: InventoryTabId) => {
        setInventoryTabUrl(resolveInventoryTab(tab));
      },
    }),
    [selectionTick, urlInventoryTab, urlWorkshopItemId, bump, setInventoryTabUrl, setWorkshopItemId],
  );

  return <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>;
}

export function useWorkshop() {
  const ctx = useContext(WorkshopContext);
  if (!ctx) throw new Error("useWorkshop must be used within WorkshopProvider");
  return ctx;
}