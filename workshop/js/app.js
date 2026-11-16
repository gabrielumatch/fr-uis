import {
  activeWorkshopItemId,
  equippedItem,
  selectWorkshopItem,
} from "./data/equipped-item.js";
import {
  attemptPlanCanStart,
  autoRefillAttemptPlan,
  clearAttemptPlan,
} from "./data/attempt-plans.js";
import {
  applyElementChange,
  elementUpgradeState,
  getElementById,
} from "./data/element-upgrade.js";
import { renderWorkshopHeader } from "./components/workshop-header.js";
import { renderInventorySection } from "./components/inventory-section.js";
import { inventoryTabId, setInventoryTab } from "./data/inventory-display.js";
import { renderTabBar } from "./components/tab-bar.js";
import { renderItemSidebar } from "./components/item-sidebar.js";
import { renderOperationPanel } from "./components/operation-panel.js";
import { getTabById, tabRegistry, TAB_HASH_ALIASES } from "./tabs/registry.js";
import { getUpgradePanelView, resolveUpgradeSub } from "./tabs/upgrade-panel.js";
import { getPiercingPanelView, resolvePiercingSub } from "./tabs/piercing-panel.js";
import { getElementPanelView, resolveElementSub } from "./tabs/element-panel.js";
import { getSkinsPanelView, resolveSkinsSub } from "./tabs/skins-panel.js";
import {
  insertJewelIntoSlot,
  removeJewelFromSlot,
  setSelectedJewelId,
} from "./data/jewel-management.js";
import {
  applySkin,
  removeSkin,
  setSelectedSkinId,
  syncSkinToEquippedItem,
  getItemSkinState,
} from "./data/skin-management.js";

const DEFAULT_TAB = "upgrade";

/** @typedef {'level' | 'jewels'} UpgradeSub */
/** @typedef {'pierce' | 'cards'} PiercingSub */
/** @typedef {'upgrade' | 'change'} ElementSub */
/** @typedef {'apply' | 'remove'} SkinsSub */

/**
 * @typedef {{
 *   tabId: string;
 *   upgradeSub: UpgradeSub;
 *   piercingSub: PiercingSub;
 *   elementSub: ElementSub;
 *   skinsSub: SkinsSub;
 * }} WorkshopRoute
 */

const DEFAULT_ROUTE = /** @type {WorkshopRoute} */ ({
  tabId: DEFAULT_TAB,
  upgradeSub: "level",
  piercingSub: "pierce",
  elementSub: "upgrade",
  skinsSub: "apply",
});

/** @returns {WorkshopRoute} */
function readRouteFromUrl() {
  const raw =
    location.hash.replace(/^#/, "").trim() ||
    new URLSearchParams(location.search).get("tab") ||
    "";

  if (raw === "upgrade-jewels" || raw === "jewels") {
    return { ...DEFAULT_ROUTE, tabId: "upgrade", upgradeSub: "jewels" };
  }
  if (raw === "upgrade-level") {
    return { ...DEFAULT_ROUTE, tabId: "upgrade", upgradeSub: "level" };
  }
  if (raw === "piercing-cards") {
    return { ...DEFAULT_ROUTE, tabId: "piercing", piercingSub: "cards" };
  }
  if (raw === "piercing-pierce" || raw === "piercing") {
    return { ...DEFAULT_ROUTE, tabId: "piercing", piercingSub: "pierce" };
  }
  if (raw === "element-change") {
    return { ...DEFAULT_ROUTE, tabId: "element", elementSub: "change" };
  }
  if (raw === "element-upgrade" || raw === "element") {
    return { ...DEFAULT_ROUTE, tabId: "element", elementSub: "upgrade" };
  }
  if (raw === "skins-remove" || raw === "transmutation-revert") {
    return { ...DEFAULT_ROUTE, tabId: "skins", skinsSub: "remove" };
  }
  if (
    raw === "skins-apply" ||
    raw === "skins" ||
    raw === "transmutation-apply" ||
    raw === "transmutation"
  ) {
    return { ...DEFAULT_ROUTE, tabId: "skins", skinsSub: "apply" };
  }

  const tabId = TAB_HASH_ALIASES[raw] ?? raw;
  if (tabId && getTabById(tabId)) {
    return {
      ...DEFAULT_ROUTE,
      tabId,
      piercingSub: tabId === "piercing" ? "pierce" : "pierce",
      elementSub: tabId === "element" ? "upgrade" : "upgrade",
      skinsSub: tabId === "skins" ? "apply" : "apply",
    };
  }

  return { ...DEFAULT_ROUTE };
}

/**
 * @param {WorkshopRoute} route
 * @returns {import("./data/attempt-plans.js").AttemptPlanKey | null}
 */
function attemptPlanKeyFromRoute(route) {
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

/** @param {WorkshopRoute} route */
function writeRouteToUrl(route) {
  let hash = route.tabId;

  if (route.tabId === "upgrade" && route.upgradeSub === "jewels") {
    hash = "upgrade-jewels";
  } else if (route.tabId === "upgrade") {
    hash = "upgrade";
  } else if (route.tabId === "piercing" && route.piercingSub === "cards") {
    hash = "piercing-cards";
  } else if (route.tabId === "piercing") {
    hash = "piercing";
  } else if (route.tabId === "element" && route.elementSub === "change") {
    hash = "element-change";
  } else if (route.tabId === "element") {
    hash = "element";
  } else if (route.tabId === "skins" && route.skinsSub === "remove") {
    hash = "skins-remove";
  } else if (route.tabId === "skins") {
    hash = "skins";
  }

  const next = `#${hash}`;
  if (location.hash === next) return;
  location.hash = hash;
}

/**
 * @param {HTMLElement} mount
 * @param {WorkshopRoute} route
 */
function render(mount, route) {
  let tab = getTabById(route.tabId) ?? getTabById(DEFAULT_TAB);
  if (!tab) return;

  let panelTitle = tab.panelTitle;
  let panelSubtitle = tab.panelSubtitle;
  let bodyHtml = tab.renderBody();
  let materials = tab.materials;
  let materialsVariant = tab.materialsVariant;
  let materialsTitle = tab.materialsTitle;

  if (tab.id === "upgrade") {
    const view = getUpgradePanelView(resolveUpgradeSub(route.upgradeSub));
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    bodyHtml = view.renderBody();
  }

  if (tab.id === "piercing") {
    const view = getPiercingPanelView(resolvePiercingSub(route.piercingSub));
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    bodyHtml = view.renderBody();
  }

  if (tab.id === "element") {
    const view = getElementPanelView(resolveElementSub(route.elementSub));
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    bodyHtml = view.renderBody();
  }

  if (tab.id === "skins") {
    const view = getSkinsPanelView(resolveSkinsSub(route.skinsSub));
    ({ panelTitle, panelSubtitle, materials, materialsVariant, materialsTitle } = view);
    bodyHtml = view.renderBody();
  }

  const tabDefs = tabRegistry.map(({ id, label, icon }) => ({ id, label, icon }));

  mount.innerHTML = `
    <section class="workshop" id="equipment-workshop" aria-labelledby="equipment-workshop-title">
      ${renderWorkshopHeader()}
      ${renderTabBar({ tabs: tabDefs, activeId: tab.id })}
      <div class="workshop__layout">
        ${renderItemSidebar(equippedItem)}
        ${renderOperationPanel({
          title: panelTitle,
          subtitle: panelSubtitle,
          meta: "Item actions",
          bodyHtml,
          materials,
          materialsVariant,
          materialsTitle,
        })}
      </div>
    </section>
    ${renderInventorySection({
      activeId: activeWorkshopItemId,
      tabId: inventoryTabId,
    })}
  `;
}

function bindEvents(mount) {
  mount.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const upgradeSubBtn = target.closest("[data-upgrade-sub]");
    if (upgradeSubBtn instanceof HTMLButtonElement) {
      writeRouteToUrl({
        ...DEFAULT_ROUTE,
        tabId: "upgrade",
        upgradeSub: resolveUpgradeSub(upgradeSubBtn.dataset.upgradeSub),
      });
      return;
    }

    const piercingSubBtn = target.closest("[data-piercing-sub]");
    if (piercingSubBtn instanceof HTMLButtonElement) {
      writeRouteToUrl({
        ...DEFAULT_ROUTE,
        tabId: "piercing",
        piercingSub: resolvePiercingSub(piercingSubBtn.dataset.piercingSub),
      });
      return;
    }

    const elementSubBtn = target.closest("[data-element-sub]");
    if (elementSubBtn instanceof HTMLButtonElement) {
      writeRouteToUrl({
        ...DEFAULT_ROUTE,
        tabId: "element",
        elementSub: resolveElementSub(elementSubBtn.dataset.elementSub),
      });
      return;
    }

    const skinsSubBtn = target.closest("[data-skins-sub]");
    if (skinsSubBtn instanceof HTMLButtonElement) {
      writeRouteToUrl({
        ...DEFAULT_ROUTE,
        tabId: "skins",
        skinsSub: resolveSkinsSub(skinsSubBtn.dataset.skinsSub),
      });
      return;
    }

    const skinBtn = target.closest("[data-skin-id]");
    if (skinBtn instanceof HTMLButtonElement) {
      const id = skinBtn.dataset.skinId;
      if (id) {
        const skinState = getItemSkinState();
        setSelectedSkinId(id === skinState.selectedSkinId ? null : id);
        render(mount, readRouteFromUrl());
      }
      return;
    }

    const invTabBtn = target.closest("[data-inventory-tab]");
    if (invTabBtn instanceof HTMLButtonElement) {
      const tab = invTabBtn.dataset.inventoryTab;
      if (tab) {
        setInventoryTab(tab);
        render(mount, readRouteFromUrl());
      }
      return;
    }

    const workshopItemBtn = target.closest("[data-workshop-item-id]");
    if (workshopItemBtn instanceof HTMLButtonElement) {
      const itemId = workshopItemBtn.dataset.workshopItemId;
      if (itemId && selectWorkshopItem(itemId)) {
        syncSkinToEquippedItem();
        render(mount, readRouteFromUrl());
      }
      return;
    }

    const tabBtn = target.closest("[data-tab-id]");
    if (tabBtn instanceof HTMLButtonElement) {
      const tabId = tabBtn.dataset.tabId ?? DEFAULT_TAB;
      if (getTabById(tabId)) {
        writeRouteToUrl({
          ...DEFAULT_ROUTE,
          tabId,
          upgradeSub: tabId === "upgrade" ? "level" : "level",
          piercingSub: tabId === "piercing" ? "pierce" : "pierce",
          elementSub: tabId === "element" ? "upgrade" : "upgrade",
          skinsSub: tabId === "skins" ? "apply" : "apply",
        });
      } else {
        render(mount, { ...DEFAULT_ROUTE });
      }
      return;
    }

    const changeElBtn = target.closest("[data-change-element-id]");
    if (changeElBtn instanceof HTMLElement) {
      const isDisabledBtn =
        changeElBtn instanceof HTMLButtonElement && changeElBtn.disabled;
      if (isDisabledBtn) return;
      const nextId = changeElBtn.dataset.changeElementId;
      if (
        nextId &&
        nextId !== elementUpgradeState.appliedElementId &&
        nextId !== elementUpgradeState.changeTargetElementId
      ) {
        elementUpgradeState.changeTargetElementId = nextId;
        render(mount, readRouteFromUrl());
      }
      return;
    }

    const jewelTile = target.closest("[data-jewel-type]");
    if (jewelTile instanceof HTMLButtonElement) {
      const id = jewelTile.dataset.jewelType;
      if (id) {
        setSelectedJewelId(id);
        render(mount, readRouteFromUrl());
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
          render(mount, readRouteFromUrl());
        }
        return;
      }

      if (
        action === "Insert Jewel" &&
        actionBtn.dataset.jewelSlot &&
        !actionBtn.disabled
      ) {
        const slotIndex = Number(actionBtn.dataset.jewelSlot);
        if (Number.isFinite(slotIndex)) {
          const result = insertJewelIntoSlot(slotIndex);
          if (result.ok) render(mount, readRouteFromUrl());
        }
        return;
      }

      if (action === "Change Element" && !actionBtn.disabled) {
        const result = applyElementChange();
        if (result.ok) {
          render(mount, readRouteFromUrl());
        }
        return;
      }

      if (action === "Apply Skin" && !actionBtn.disabled) {
        const result = applySkin();
        if (result.ok) {
          render(mount, readRouteFromUrl());
        }
        return;
      }

      if (
        (action === "Purge Skin" || action === "Recover Skin") &&
        !actionBtn.disabled
      ) {
        const mode =
          actionBtn.dataset.skinRemove === "recover" ? "recover" : "destroy";
        const result = removeSkin(mode);
        if (result.ok) {
          render(mount, readRouteFromUrl());
        }
        return;
      }

      if (action === "Auto Refill") {
        const planKey = attemptPlanKeyFromRoute(readRouteFromUrl());
        if (planKey) {
          if (planKey === "element-upgrade") {
            const icon =
              getElementById(elementUpgradeState.appliedElementId)?.cardIcon ??
              "⚡";
            autoRefillAttemptPlan(planKey, { material: icon });
          } else {
            autoRefillAttemptPlan(planKey);
          }
          render(mount, readRouteFromUrl());
        }
        return;
      }

      if (action === "Clear") {
        const planKey = attemptPlanKeyFromRoute(readRouteFromUrl());
        if (planKey) {
          clearAttemptPlan(planKey);
          render(mount, readRouteFromUrl());
        }
        return;
      }

      if (action === "Start") {
        const planKey =
          actionBtn.dataset.attemptPlan ??
          attemptPlanKeyFromRoute(readRouteFromUrl());
        if (planKey && !attemptPlanCanStart(/** @type {any} */ (planKey))) {
          return;
        }
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
  });
}

const root = document.getElementById("app");
if (root) {
  bindEvents(root);

  const applyTabFromUrl = () => {
    render(root, readRouteFromUrl());
  };

  window.addEventListener("hashchange", applyTabFromUrl);
  applyTabFromUrl();
}