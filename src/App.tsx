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
import { getPetFeedPanelView } from "./tabs/pet-feed-panel";
import { getPetGrowthPanelView } from "./tabs/pet-growth-panel";
import {
  useWorkshopRoute,
  DEFAULT_ROUTE,
  type WorkshopRoute,
} from "./hooks/useWorkshopRoute";
import { useWorkshop } from "./context/WorkshopContext";
import {
  activeWorkshopItemId,
  getWorkshopItemById,
} from "./data/workshop/equipped";
import { getItemById } from "./data/items/catalog";
import {
  isPickupPetItem,
  isRaisedPetItem,
  isWorkshopGearItem,
  opensWorkshopHost,
} from "./data/items/item";
import {
  convertPickupToBuff,
  getEquippedPickupPet,
  setPickupFilter,
  unlockBeadSlot,
} from "./data/systems/pickup-pet-workshop";
import { getPetBeadsPanelMaterials } from "./tabs/pet-beads-panel";
import { PetPickupAwakeBody } from "./tabs/pet-pickup-awake-body";
import {
  pickupAwakeAutoFill,
  pickupAwakePrevious,
  pickupAwakeStart,
} from "./data/systems/pickup-pet-awake";
import {
  advancePetStatLevel,
  craftPetFeed,
  getEquippedRaisedPet,
  givePetFeed,
  promotePetRank,
  rerollLastStatTier,
  revertLastStatLevel,
  togglePetSummoned,
} from "./data/systems/raised-pet-workshop";
import {
  coerceWorkshopRoute,
  defaultRouteForHost,
  defaultTabForHost,
  getSkinsSubTabIds,
  getWorkshopTabIds,
  itemOpensWorkshopUi,
  resolveWorkshopSidebarItem,
  workshopTabLabel,
} from "./data/workshop/ui-rules";
import { useEffect, useMemo } from "react";

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
  const equipped = workshop.equippedItem;
  const hasSkinApplied =
    isWorkshopGearItem(equipped) && equipped.workshopSkin.hasSkinApplied;

  const effectiveRoute = useMemo(
    () => coerceWorkshopRoute(route, equipped),
    [route, equipped, hasSkinApplied],
  );

  useEffect(() => {
    const next = coerceWorkshopRoute(route, equipped);
    if (
      next.tabId !== route.tabId ||
      next.upgradeSub !== route.upgradeSub ||
      next.piercingSub !== route.piercingSub ||
      next.elementSub !== route.elementSub ||
      next.skinsSub !== route.skinsSub ||
      next.feedSub !== route.feedSub ||
      next.growthSub !== route.growthSub
    ) {
      setRoute(next);
    }
    // Só realinha rota quando o host muda (evita loop com popstate / URL).
    // eslint-disable-next-line react-hooks/exhaustive-deps -- route lido no fechamento; deps = host
  }, [equipped.id, hasSkinApplied]);

  const hostFallbackTab = defaultTabForHost(equipped);
  let tab = getTabById(effectiveRoute.tabId) ?? getTabById(hostFallbackTab);
  if (!tab) {
    return (
      <div className="frame" style={{ margin: "1rem", padding: "1rem" }}>
        <p>
          Workshop tab <strong>{effectiveRoute.tabId}</strong> não encontrada. Troque o item na bag
          ou limpe os query params da URL.
        </p>
      </div>
    );
  }

  let panelTitle = tab.panelTitle;
  let panelSubtitle = tab.panelSubtitle;
  let materials = tab.materials;
  let materialsVariant = tab.materialsVariant;
  let materialsTitle = tab.materialsTitle;
  let Body = tab.Body;

  if (tab.id === "upgrade" && isWorkshopGearItem(equipped)) {
    const view = getUpgradePanelView(effectiveRoute.upgradeSub, equipped);
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    Body = view.Body;
  }
  if (tab.id === "piercing") {
    const view = getPiercingPanelView(effectiveRoute.piercingSub);
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    Body = view.Body;
  }
  if (tab.id === "element") {
    const view = getElementPanelView(effectiveRoute.elementSub);
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    Body = view.Body;
  }
  if (tab.id === "skins" && isWorkshopGearItem(equipped)) {
    const view = getSkinsPanelView(effectiveRoute.skinsSub, equipped);
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    Body = view.Body;
  }
  if (tab.id === "feed" && isRaisedPetItem(equipped)) {
    const view = getPetFeedPanelView(effectiveRoute.feedSub);
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    Body = view.Body;
  }
  if (tab.id === "growth" && isRaisedPetItem(equipped)) {
    const view = getPetGrowthPanelView(effectiveRoute.growthSub);
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    Body = view.Body;
  }
  if (tab.id === "awake" && isPickupPetItem(equipped)) {
    panelTitle = "Awake Pet";
    panelSubtitle = "Scroll of Pet Blessing (Pick-up Pets) — can roll negative.";
    materials = [
      {
        icon: "📜",
        name: "Scroll of Pet Blessing (Pick-up)",
        quantity: equipped.workshopPickup.inventory.blessingScroll,
      },
    ];
    materialsVariant = "grid";
    materialsTitle = "Materials";
    Body = PetPickupAwakeBody;
  } else if (tab.id === "awake" && isRaisedPetItem(equipped)) {
    panelTitle = "Awake Pet";
    panelSubtitle = "Scroll of Pet Awakening (Peach) — can roll negative.";
    materials = [
      {
        icon: "🔮",
        name: "Scroll of Pet Awakening",
        quantity: equipped.workshopPet.inventory.awakeningScroll,
      },
      {
        icon: "📜",
        name: "Scroll of Pet Reversion",
        quantity: equipped.workshopPet.inventory.reversionScroll,
      },
    ];
    materialsVariant = "grid";
    materialsTitle = "Materials";
  }
  if (tab.id === "beads" && isPickupPetItem(equipped) && equipped.mode === "buff") {
    materials = getPetBeadsPanelMaterials();
    materialsVariant = "list";
    materialsTitle = "On hand";
  }
  if (tab.id === "convert" && isPickupPetItem(equipped) && equipped.mode === "pickup") {
    materials = [
      {
        icon: "📜",
        name: "Pick-up Pet Upgrade",
        quantity: equipped.workshopPickup.inventory.pickupUpgradeScroll,
      },
    ];
    materialsVariant = "list";
    materialsTitle = "Materials";
  }

  const visibleTabIds = getWorkshopTabIds(equipped);
  const tabDefs = tabRegistry
    .filter((t) => visibleTabIds.includes(t.id as (typeof visibleTabIds)[number]))
    .map(({ id, label, icon }) => ({
      id,
      label:
        id === "upgrade" && isWorkshopGearItem(equipped) && equipped.type === "jewel"
          ? "Accessory Upgrade"
          : isPickupPetItem(equipped) || isRaisedPetItem(equipped)
            ? workshopTabLabel(id, equipped)
            : label,
      icon,
    }));

  const handleSelectCatalogItem = (itemId: string) => {
    const item = getItemById(itemId);
    if (!item) return;

    const ok = workshop.selectItem(itemId);
    if (!ok) return;

    if (!itemOpensWorkshopUi(item)) {
      return;
    }

    if (opensWorkshopHost(item)) {
      const panelItem = getWorkshopItemById(activeWorkshopItemId);
      if (panelItem) {
        if (isWorkshopGearItem(panelItem)) {
          clearAttemptPlan("upgrade-level");
          syncSkinToEquippedItem();
        }
        setRoute(defaultRouteForHost(panelItem));
      }
    }

    requestAnimationFrame(() => {
      document
        .getElementById("equipment-workshop")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

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

    const feedSubBtn = target.closest("[data-feed-sub]");
    if (feedSubBtn instanceof HTMLButtonElement) {
      setRoute({
        ...DEFAULT_ROUTE,
        tabId: "feed",
        feedSub: feedSubBtn.dataset.feedSub === "craft" ? "craft" : "give",
      });
      return;
    }

    const growthSubBtn = target.closest("[data-growth-sub]");
    if (growthSubBtn instanceof HTMLButtonElement) {
      setRoute({
        ...DEFAULT_ROUTE,
        tabId: "growth",
        growthSub: growthSubBtn.dataset.growthSub === "reroll" ? "reroll" : "advance",
      });
      return;
    }

    const skinsSubBtn = target.closest("[data-skins-sub]");
    if (skinsSubBtn instanceof HTMLButtonElement) {
      const skinsSub =
        skinsSubBtn.dataset.skinsSub === "remove" ? ("remove" as const) : ("apply" as const);
      if (!isWorkshopGearItem(equipped) || !getSkinsSubTabIds(equipped).includes(skinsSub)) {
        return;
      }
      setRoute({
        ...DEFAULT_ROUTE,
        tabId: "skins",
        skinsSub,
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

      const pickup = getEquippedPickupPet();
      if (pickup) {
        if (action === "Convert to Buff Pet") {
          if (convertPickupToBuff(pickup).ok) workshop.bump();
          return;
        }
        if (action === "Unlock Bead Slot") {
          if (unlockBeadSlot(pickup).ok) workshop.bump();
          return;
        }
        if (action === "Toggle Pickup Filter" && actionBtn.dataset.pickupFilterId) {
          const filterId = actionBtn.dataset
            .pickupFilterId as import("./data/pets/pickup-types").PickupFilterId;
          setPickupFilter(pickup, filterId, !pickup.pickupFilter[filterId]);
          workshop.bump();
          return;
        }
      }

      const raised = getEquippedRaisedPet();
      if (raised) {
        if (action === "Craft Pet Feed") {
          if (craftPetFeed(raised).ok) workshop.bump();
          return;
        }
        if (action === "Give Pet Feed") {
          if (givePetFeed(raised).ok) workshop.bump();
          return;
        }
        if (action === "Toggle Summon") {
          togglePetSummoned(raised);
          workshop.bump();
          return;
        }
        if (action === "Advance Stat Level") {
          if (advancePetStatLevel(raised).ok) workshop.bump();
          return;
        }
        if (action === "Promote Pet Rank") {
          if (promotePetRank(raised).ok) workshop.bump();
          return;
        }
        if (action === "Blessing Reroll") {
          if (rerollLastStatTier(raised, "blessing").ok) workshop.bump();
          return;
        }
        if (action === "Chance Reroll") {
          if (rerollLastStatTier(raised, "chance").ok) workshop.bump();
          return;
        }
        if (action === "Revert Stat Level") {
          if (revertLastStatLevel(raised).ok) workshop.bump();
          return;
        }
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

      const pickupAwake = getEquippedPickupPet();
      if (
        pickupAwake &&
        effectiveRoute.tabId === "awake"
      ) {
        if (action === "Start") {
          if (pickupAwakeStart(pickupAwake).ok) workshop.bump();
          return;
        }
        if (action === "Previous") {
          if (pickupAwakePrevious(pickupAwake).ok) workshop.bump();
          return;
        }
        if (action === "Auto Fill") {
          pickupAwakeAutoFill(pickupAwake);
          workshop.bump();
          return;
        }
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
        <TabBar tabs={tabDefs} activeId={effectiveRoute.tabId} />
        <div className="workshop__layout">
          <ItemSidebar item={resolveWorkshopSidebarItem(workshop.equippedItem)} />
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
        activeCatalogItemId={workshop.activeCatalogItemId}
        tabId={workshop.inventoryTabId}
        onInventoryTabChange={workshop.setInventoryTab}
        onSelectWorkshopItem={handleSelectCatalogItem}
      />
    </div>
  );
}