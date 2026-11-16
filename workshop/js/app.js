import { equippedItem } from "./data/equipped-item.js";
import { renderWorkshopHeader } from "./components/workshop-header.js";
import { renderTabBar } from "./components/tab-bar.js";
import { renderItemSidebar } from "./components/item-sidebar.js";
import { renderOperationPanel } from "./components/operation-panel.js";
import { getTabById, tabRegistry } from "./tabs/registry.js";

const DEFAULT_TAB = "upgrade";

/** @returns {string} */
function readTabFromUrl() {
  const hash = location.hash.replace(/^#/, "").trim();
  if (hash && getTabById(hash)) return hash;

  const fromQuery = new URLSearchParams(location.search).get("tab");
  if (fromQuery && getTabById(fromQuery)) return fromQuery;

  return DEFAULT_TAB;
}

/** @param {string} tabId */
function writeTabToUrl(tabId) {
  const hash = `#${tabId}`;
  if (location.hash === hash) return;
  location.hash = tabId;
}

/**
 * @param {HTMLElement} mount
 * @param {string} activeTabId
 */
function render(mount, activeTabId) {
  const tab = getTabById(activeTabId) ?? getTabById(DEFAULT_TAB);
  if (!tab) return;

  const tabDefs = tabRegistry.map(({ id, label, icon }) => ({ id, label, icon }));

  mount.innerHTML = `
    <div class="workshop" id="equipment-workshop">
      ${renderWorkshopHeader()}
      ${renderTabBar({ tabs: tabDefs, activeId: tab.id })}
      <div class="workshop__layout">
        ${renderItemSidebar(equippedItem)}
        ${renderOperationPanel({
          title: tab.panelTitle,
          subtitle: tab.panelSubtitle,
          meta: "Item actions",
          bodyHtml: tab.renderBody(),
          materials: tab.materials,
          materialsVariant: tab.materialsVariant,
          materialsTitle: tab.materialsTitle,
        })}
      </div>
    </div>
  `;
}

function bindEvents(mount) {
  mount.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const tabBtn = target.closest("[data-tab-id]");
    if (tabBtn instanceof HTMLButtonElement) {
      const tabId = tabBtn.dataset.tabId ?? DEFAULT_TAB;
      if (getTabById(tabId)) writeTabToUrl(tabId);
      else render(mount, DEFAULT_TAB);
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
      const slot = actionBtn.dataset.slotIndex;
      const slotPart = slot ? ` (slot ${slot})` : "";
      const hint =
        action === "Create New Slots"
          ? "Uses Moonstone + GProtect to pierce the next locked socket."
          : action === "Insert"
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
    render(root, readTabFromUrl());
  };

  window.addEventListener("hashchange", applyTabFromUrl);
  applyTabFromUrl();
}