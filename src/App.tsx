import {
  attemptPlanCanStart,
  autoRefillAttemptPlan,
  clearAttemptPlan,
  type AttemptPlanKey,
} from "./data/systems/attempt-plans";
import {
  applyElementChange,
  elementUpgradeState,
  getElementById,
} from "./data/systems/element-upgrade";
import {
  insertJewelIntoSlot,
  removeJewelFromSlot,
  setSelectedJewelId,
} from "./data/systems/jewel-management";
import {
  applySkin,
  removeSkin,
  setSelectedSkinId,
  syncSkinToEquippedItem,
  getItemSkinState,
} from "./data/systems/skin-management";
import { WorkshopHeader } from "./components/workshop-header";
import { TabBar } from "./components/tab-bar";
import { ItemSidebar } from "./components/item-sidebar";
import { OperationPanel } from "./components/operation-panel";
import { InventorySection } from "./components/inventory-section";
import { getTabById, tabRegistry } from "./tabs/registry";
import { getUpgradePanelView } from "./tabs/upgrade-panel";
import { getPiercingPanelView } from "./tabs/piercing-panel";
import { getElementPanelView } from "./tabs/element-panel";
import { getSkinsPanelView } from "./tabs/skins-panel";
import {
  useWorkshopRoute,
  DEFAULT_ROUTE,
  type WorkshopRoute,
} from "./hooks/useWorkshopRoute";
import { useWorkshop } from "./context/WorkshopContext";

const DEFAULT_TAB = "upgrade";

function attemptPlanKeyFromRoute(route: WorkshopRoute): AttemptPlanKey | null {
  if (route.tabId === "upgrade" && route.upgradeSub === "level") {
    return "upgrade-level";
  }
  if (route.tabId === "element" && route.elementSub === "upgrade") {
    return "element-upgrade";
  }
  if (route.tabId === "piercing" && route.piercingSub === "pierce") {
    return "piercing-pierce";
  }
  return null;
}

export function App() {
  const { route, setRoute } = useWorkshopRoute();
  const workshop = useWorkshop();

  let tab = getTabById(route.tabId) ?? getTabById(DEFAULT_TAB);
  if (!tab) return null;

  let panelTitle = tab.panelTitle;
  let panelSubtitle = tab.panelSubtitle;
  let materials = tab.materials;
  let materialsVariant = tab.materialsVariant;
  let materialsTitle = tab.materialsTitle;
  let Body = tab.Body;

  if (tab.id === "upgrade") {
    const view = getUpgradePanelView(route.upgradeSub);
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    Body = view.Body;
  }
  if (tab.id === "piercing") {
    const view = getPiercingPanelView(route.piercingSub);
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    Body = view.Body;
  }
  if (tab.id === "element") {
    const view = getElementPanelView(route.elementSub);
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    Body = view.Body;
  }
  if (tab.id === "skins") {
    const view = getSkinsPanelView(route.skinsSub);
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    Body = view.Body;
  }

  const tabDefs = tabRegistry.map(({ id, label, icon }) => ({ id, label, icon }));

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const upgradeSubBtn = target.closest("[data-upgrade-sub]");
    if (upgradeSubBtn instanceof HTMLButtonElement) {
      setRoute({
        ...DEFAULT_ROUTE,
        tabId: "upgrade",
        upgradeSub: upgradeSubBtn.dataset.upgradeSub === "jewels" ? "jewels" : "level",
      });
      return;
    }

    const piercingSubBtn = target.closest("[data-piercing-sub]");
    if (piercingSubBtn instanceof HTMLButtonElement) {
      setRoute({
        ...DEFAULT_ROUTE,
        tabId: "piercing",
        piercingSub: piercingSubBtn.dataset.piercingSub === "cards" ? "cards" : "pierce",
      });
      return;
    }

    const elementSubBtn = target.closest("[data-element-sub]");
    if (elementSubBtn instanceof HTMLButtonElement) {
      setRoute({
        ...DEFAULT_ROUTE,
        tabId: "element",
        elementSub: elementSubBtn.dataset.elementSub === "change" ? "change" : "upgrade",
      });
      return;
    }

    const skinsSubBtn = target.closest("[data-skins-sub]");
    if (skinsSubBtn instanceof HTMLButtonElement) {
      setRoute({
        ...DEFAULT_ROUTE,
        tabId: "skins",
        skinsSub: skinsSubBtn.dataset.skinsSub === "remove" ? "remove" : "apply",
      });
      return;
    }

    const skinBtn = target.closest("[data-skin-id]");
    if (skinBtn instanceof HTMLButtonElement) {
      const id = skinBtn.dataset.skinId;
      if (id) {
        const skinState = getItemSkinState();
        setSelectedSkinId(id === skinState.selectedSkinId ? null : id);
        workshop.bump();
      }
      return;
    }

    const workshopItemBtn = target.closest("[data-workshop-item-id]");
    if (workshopItemBtn instanceof HTMLButtonElement) {
      const itemId = workshopItemBtn.dataset.workshopItemId;
      if (itemId && workshop.selectItem(itemId)) {
        clearAttemptPlan("upgrade-level");
        syncSkinToEquippedItem();
      }
      return;
    }

    const tabBtn = target.closest("[data-tab-id]");
    if (tabBtn instanceof HTMLButtonElement) {
      const tabId = tabBtn.dataset.tabId ?? DEFAULT_TAB;
      if (getTabById(tabId)) {
        setRoute({
          ...DEFAULT_ROUTE,
          tabId,
        });
      }
      return;
    }

    const changeElBtn = target.closest("[data-change-element-id]");
    if (changeElBtn instanceof HTMLElement) {
      if (changeElBtn instanceof HTMLButtonElement && changeElBtn.disabled) return;
      const nextId = changeElBtn.getAttribute("data-change-element-id");
      if (
        nextId &&
        nextId !== elementUpgradeState.appliedElementId &&
        nextId !== elementUpgradeState.changeTargetElementId
      ) {
        elementUpgradeState.changeTargetElementId = nextId;
        workshop.bump();
      }
      return;
    }

    const jewelTile = target.closest("[data-jewel-type]");
    if (jewelTile instanceof HTMLButtonElement) {
      const id = jewelTile.dataset.jewelType;
      if (id) {
        setSelectedJewelId(id);
        workshop.bump();
      }
      return;
    }

    const buyBtn = target.closest("[data-buy]");
    if (buyBtn instanceof HTMLButtonElement) {
      alert(
        `BUY NOW: ${buyBtn.dataset.buy} — connect this action to your server shop.`,
      );
      return;
    }

    const actionBtn = target.closest("[data-action]");
    if (actionBtn instanceof HTMLButtonElement) {
      const action = actionBtn.dataset.action ?? "Action";

      if (action === "Remove Jewel" && actionBtn.dataset.jewelSlot) {
        const slotIndex = Number(actionBtn.dataset.jewelSlot);
        if (Number.isFinite(slotIndex) && removeJewelFromSlot(slotIndex)) {
          workshop.bump();
        }
        return;
      }

      if (action === "Insert Jewel" && actionBtn.dataset.jewelSlot && !actionBtn.disabled) {
        const slotIndex = Number(actionBtn.dataset.jewelSlot);
        if (Number.isFinite(slotIndex)) {
          const result = insertJewelIntoSlot(slotIndex);
          if (result.ok) workshop.bump();
        }
        return;
      }

      if (action === "Change Element" && !actionBtn.disabled) {
        if (applyElementChange().ok) workshop.bump();
        return;
      }

      if (action === "Apply Skin" && !actionBtn.disabled) {
        if (applySkin().ok) workshop.bump();
        return;
      }

      if ((action === "Purge Skin" || action === "Recover Skin") && !actionBtn.disabled) {
        const mode =
          actionBtn.dataset.skinRemove === "recover" ? "recover" : "destroy";
        if (removeSkin(mode).ok) workshop.bump();
        return;
      }

      if (action === "Auto Refill") {
        const planKey = attemptPlanKeyFromRoute(route);
        if (planKey) {
          if (planKey === "element-upgrade") {
            const icon =
              getElementById(elementUpgradeState.appliedElementId)?.cardIcon ?? "⚡";
            autoRefillAttemptPlan(planKey, { material: icon });
          } else {
            autoRefillAttemptPlan(planKey);
          }
          workshop.bump();
        }
        return;
      }

      if (action === "Clear") {
        const planKey = attemptPlanKeyFromRoute(route);
        if (planKey) {
          clearAttemptPlan(planKey);
          workshop.bump();
        }
        return;
      }

      if (action === "Start") {
        const planKey =
          (actionBtn.dataset.attemptPlan as AttemptPlanKey | undefined) ??
          attemptPlanKeyFromRoute(route);
        if (planKey && !attemptPlanCanStart(planKey)) return;
        if (actionBtn.disabled || actionBtn.getAttribute("aria-disabled") === "true") {
          return;
        }
      }

      const slot = actionBtn.dataset.slotIndex ?? actionBtn.dataset.jewelSlot;
      const slotPart = slot ? ` (slot ${slot})` : "";
      const hint =
        action === "Create New Slots"
          ? "Uses Moonstone + GProtect to pierce the next locked socket."
          : action === "Insert" || action === "Insert Card"
            ? "Requires an empty pierced socket — cards insert at 100% success."
            : action === "Change Element"
              ? "Consumes Scroll of Element Change; type changes, level unchanged."
              : action === "Apply Skin"
                ? "Consumes the skin item; only when no skin is equipped."
                : action === "Purge Skin"
                  ? "Purge Skin Scroll — look removed; skin item destroyed."
                  : action === "Recover Skin"
                    ? "Recover Skin Scroll — look removed; skin item to inventory."
                    : action === "Start"
                      ? "Consumes materials for the selected operation."
                      : action === "Previous"
                        ? "Restore the last awake result if you used protection."
                        : "";
      alert(
        `Workshop preview — "${action}"${slotPart} not connected to the game server.${hint ? ` ${hint}` : ""}`,
      );
    }
  };

  return (
    <div onClick={handleClick}>
      <section className="workshop" id="equipment-workshop" aria-labelledby="equipment-workshop-title">
        <WorkshopHeader />
        <TabBar tabs={tabDefs} activeId={tab.id} />
        <div className="workshop__layout">
          <ItemSidebar item={workshop.equippedItem} />
          <OperationPanel
            title={panelTitle}
            subtitle={panelSubtitle}
            meta="Item actions"
            materials={materials}
            materialsVariant={materialsVariant}
            materialsTitle={materialsTitle}
          >
            <Body />
          </OperationPanel>
        </div>
      </section>
      <InventorySection
        activeId={workshop.activeWorkshopItemId}
        tabId={workshop.inventoryTabId}
        onInventoryTabChange={workshop.setInventoryTab}
      />
    </div>
  );
}