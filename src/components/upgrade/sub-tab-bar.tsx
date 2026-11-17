export type SubTabDef = { id: string; label: string };

export function PanelSubTabBar({
  tabs,
  activeId,
  dataAttr,
  ariaLabel = "Panel mode",
}: {
  tabs: readonly SubTabDef[];
  activeId: string;
  dataAttr: string;
  ariaLabel?: string;
}) {
  return (
    <nav className="sub-tab-bar" role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`sub-tab-bar__btn${tab.id === activeId ? " is-active" : ""}`}
          {...{ [`data-${dataAttr}`]: tab.id }}
          aria-selected={tab.id === activeId}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}