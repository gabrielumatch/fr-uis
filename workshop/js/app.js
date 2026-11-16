import { equippedItem } from "./data/equipped-item.js";
import { renderWorkshopHeader } from "./components/workshop-header.js";
import { renderTabBar } from "./components/tab-bar.js";
import { renderItemSidebar } from "./components/item-sidebar.js";
import { renderOperationPanel } from "./components/operation-panel.js";
import { getTabById, tabRegistry, TAB_HASH_ALIASES } from "./tabs/registry.js";
import { getUpgradePanelView, resolveUpgradeSub } from "./tabs/upgrade-panel.js";
import { getPiercingPanelView, resolvePiercingSub } from "./tabs/piercing-panel.js";

const DEFAULT_TAB = "upgrade";

/** @typedef {'level' | 'jewels'} UpgradeSub */
/** @typedef {'pierce' | 'cards'} PiercingSub */

/**
 * @typedef {{
 *   tabId: string;
 *   upgradeSub: UpgradeSub;
 *   piercingSub: PiercingSub;
 * }} WorkshopRoute
 */

/** @returns {WorkshopRoute} */
function readRouteFromUrl() {
  const raw =
    location.hash.replace(/^#/, "").trim() ||
    new URLSearchParams(location.search).get("tab") ||
    "";

  if (raw === "upgrade-jewels" || raw === "jewels") {
    return { tabId: "upgrade", upgradeSub: "jewels", piercingSub: "pierce" };
  }
  if (raw === "upgrade-level") {
    return { tabId: "upgrade", upgradeSub: "level", piercingSub: "pierce" };
  }
  if (raw === "piercing-cards") {
    return { tabId: "piercing", upgradeSub: "level", piercingSub: "cards" };
  }
  if (raw === "piercing-pierce" || raw === "piercing") {
    return { tabId: "piercing", upgradeSub: "level", piercingSub: "pierce" };
  }

  const tabId = TAB_HASH_ALIASES[raw] ?? raw;
  if (tabId && getTabById(tabId)) {
    return {
      tabId,
      upgradeSub: "level",
      piercingSub: tabId === "piercing" ? "pierce" : "pierce",
    };
  }

  return { tabId: DEFAULT_TAB, upgradeSub: "level", piercingSub: "pierce" };
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
    panelTitle = view.panelTitle;
    panelSubtitle = view.panelSubtitle;
    bodyHtml = view.renderBody();
    materials = view.materials;
    materialsVariant = view.materialsVariant;
    materialsTitle = view.materialsTitle;
  }

  if (tab.id === "piercing") {
    const view = getPiercingPanelView(resolvePiercingSub(route.piercingSub));
    panelTitle = view.panelTitle;
    panelSubtitle = view.panelSubtitle;
    bodyHtml = view.renderBody();
    materials = view.materials;
    materialsVariant = view.materialsVariant;
    materialsTitle = view.materialsTitle;
  }

  const tabDefs = tabRegistry.map(({ id, label, icon }) => ({ id, label, icon }));

  mount.innerHTML = `
    <div class="workshop" id="equipment-workshop">
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
    </div>
  `;
}

function bindEvents(mount) {
  mount.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const upgradeSubBtn = target.closest("[data-upgrade-sub]");
    if (upgradeSubBtn instanceof HTMLButtonElement) {
      writeRouteToUrl({
        tabId: "upgrade",
        upgradeSub: resolveUpgradeSub(upgradeSubBtn.dataset.upgradeSub),
        piercingSub: "pierce",
      });
      return;
    }

    const piercingSubBtn = target.closest("[data-piercing-sub]");
    if (piercingSubBtn instanceof HTMLButtonElement) {
      writeRouteToUrl({
        tabId: "piercing",
        upgradeSub: "level",
        piercingSub: resolvePiercingSub(piercingSubBtn.dataset.piercingSub),
      });
      return;
    }

    const tabBtn = target.closest("[data-tab-id]");
    if (tabBtn instanceof HTMLButtonElement) {
      const tabId = tabBtn.dataset.tabId ?? DEFAULT_TAB;
      if (getTabById(tabId)) {
        writeRouteToUrl({
          tabId,
          upgradeSub: tabId === "upgrade" ? "level" : "level",
          piercingSub: tabId === "piercing" ? "pierce" : "pierce",
        });
      } else {
        render(mount, {
          tabId: DEFAULT_TAB,
          upgradeSub: "level",
          piercingSub: "pierce",
        });
      }
      return;
    }

    const elementBtn = target.closest("[data-element-id]");
    if (
      elementBtn instanceof HTMLButtonElement &&
      !elementBtn.classList.contains("tab-bar__btn")
    ) {
      alert(
        `Workshop preview — switch to ${elementBtn.dataset.elementId} element (needs Scroll of Element Change if item already has another element).`,
      );
      return;
    }

    const jewelTile = target.closest("[data-jewel-type]");
    if (jewelTile instanceof HTMLButtonElement) {
      alert(
        `Workshop preview — selected ${jewelTile.dataset.jewelType} jewel for insert.`,
      );
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
      const slot = actionBtn.dataset.slotIndex ?? actionBtn.dataset.jewelSlot;
      const slotPart = slot ? ` (slot ${slot})` : "";
      const hint =
        action === "Create New Slots"
          ? "Uses Moonstone + GProtect to pierce the next locked socket."
          : action === "Insert" || action === "Insert Card"
            ? "Requires an empty pierced socket — cards insert at 100% success."
            : action === "Start"
              ? "Consumes Awakening Scroll and Penya; rerolls awake lines (100% success)."
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