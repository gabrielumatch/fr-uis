export type SubTabDef = { id: string; label: string; disabled?: boolean; title?: string };

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
      {tabs.map((tab) => {
        const isActive = !tab.disabled && tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            className={`sub-tab-bar__btn${isActive ? " is-active" : ""}${tab.disabled ? " is-disabled" : ""}`}
            {...(tab.disabled ? {} : { [`data-${dataAttr}`]: tab.id })}
            aria-selected={isActive}
            disabled={tab.disabled}
            aria-disabled={tab.disabled}
            title={tab.title}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}