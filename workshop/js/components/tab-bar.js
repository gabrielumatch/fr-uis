/**
 * @typedef {{ id: string; label: string; icon: string }} TabDef
 */

/**
 * @param {{ tabs: TabDef[]; activeId: string }} props
 */
export function renderTabBar({ tabs, activeId }) {
  const buttons = tabs
    .map(
      (tab) => `
    <button
      type="button"
      class="tab-bar__btn${tab.id === activeId ? " is-active" : ""}"
      data-tab-id="${tab.id}"
      aria-selected="${tab.id === activeId}"
    >
      <span class="tab-bar__icon" aria-hidden="true">${tab.icon}</span>${tab.label}
    </button>
  `,
    )
    .join("");

  return `<nav class="tab-bar" role="tablist">${buttons}</nav>`;
}