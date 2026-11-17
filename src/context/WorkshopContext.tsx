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
} from "../data/workshop/equipped";
import {
  resolveInventoryTab,
  type InventoryTabId,
} from "../data/inventory/display";

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
  const [inventoryTabId, setInventoryTabId] =
    useState<InventoryTabId>("weapons");
  const bump = useCallback(() => setTick((n) => n + 1), []);

  const value = useMemo<WorkshopContextValue>(
    () => ({
      get activeWorkshopItemId() {
        return activeWorkshopItemId;
      },
      get equippedItem() {
        return equippedItem;
      },
      inventoryTabId,
      bump,
      selectItem: (id) => {
        const ok = selectWorkshopItem(id);
        if (ok) bump();
        return ok;
      },
      setInventoryTab: (tab: InventoryTabId) => {
        setInventoryTabId(resolveInventoryTab(tab));
      },
    }),
    [bump, inventoryTabId],
  );

  return <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>;
}

export function useWorkshop() {
  const ctx = useContext(WorkshopContext);
  if (!ctx) throw new Error("useWorkshop must be used within WorkshopProvider");
  return ctx;
}