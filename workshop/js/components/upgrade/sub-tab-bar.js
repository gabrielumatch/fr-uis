/**
 * Sub-abas reutilizáveis (Upgrade, Piercing, …).
 * @param {{
 *   tabs: { id: string; label: string }[];
 *   activeId: string;
 *   dataAttr: string;
 *   ariaLabel?: string;
 * }} props
 */
export function renderPanelSubTabBar({
  tabs,
  activeId,
  dataAttr,
  ariaLabel = "Panel mode",
}) {
  const buttons = tabs
    .map(
      (tab) => `
    <button
      type="button"
      class="sub-tab-bar__btn${tab.id === activeId ? " is-active" : ""}"
      data-${dataAttr}="${tab.id}"
      aria-selected="${tab.id === activeId}"
    >${tab.label}</button>
  `,
    )
    .join("");

  return `
    <nav class="sub-tab-bar" role="tablist" aria-label="${ariaLabel}">${buttons}</nav>
  `;
}

/** @deprecated use renderPanelSubTabBar */
export function renderUpgradeSubTabBar(props) {
  return renderPanelSubTabBar({
    ...props,
    dataAttr: "upgrade-sub",
    ariaLabel: "Upgrade mode",
  });
}