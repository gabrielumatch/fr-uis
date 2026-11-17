import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  activeWorkshopItemId,
  equippedItem,
  selectWorkshopItem,
} from "../data/equipped-item";
import {
  inventoryTabId,
  setInventoryTab,
  type InventoryTabId,
} from "../data/inventory-display";

type WorkshopContextValue = {
  activeWorkshopItemId: string;
  equippedItem: typeof equippedItem;
  inventoryTabId: InventoryTabId;
  bump: () => void;
  selectItem: (id: string) => boolean;
  setInventoryTab: (tab: InventoryTabId) => void;
};

const WorkshopContext = createContext<WorkshopContextValue | null>(null);

export function WorkshopProvider({ children }: { children: ReactNode }) {
  const [, setTick] = useState(0);
  const bump = useCallback(() => setTick((n) => n + 1), []);

  const value = useMemo<WorkshopContextValue>(
    () => ({
      get activeWorkshopItemId() {
        return activeWorkshopItemId;
      },
      get equippedItem() {
        return equippedItem;
      },
      get inventoryTabId() {
        return inventoryTabId as InventoryTabId;
      },
      bump,
      selectItem: (id) => {
        const ok = selectWorkshopItem(id);
        if (ok) bump();
        return ok;
      },
      setInventoryTab: (tab: InventoryTabId) => {
        setInventoryTab(tab);
        bump();
      },
    }),
    [bump],
  );

  return <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>;
}

export function useWorkshop() {
  const ctx = useContext(WorkshopContext);
  if (!ctx) throw new Error("useWorkshop must be used within WorkshopProvider");
  return ctx;
}