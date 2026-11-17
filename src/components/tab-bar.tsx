export type TabDef = { id: string; label: string; icon: string };

export function TabBar({ tabs, activeId }: { tabs: TabDef[]; activeId: string }) {
  return (
    <nav className="tab-bar" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`tab-bar__btn${tab.id === activeId ? " is-active" : ""}`}
          data-tab-id={tab.id}
          aria-selected={tab.id === activeId}
        >
          <span className="tab-bar__icon" aria-hidden="true">
            {tab.icon}
          </span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}