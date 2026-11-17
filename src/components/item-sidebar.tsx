import { ItemCard } from "./item-card";
import { StatList } from "./stat-list";
import { AwakeAttributes } from "./awake-attributes";
import { GearScore } from "./gear-score";
import {
  isWingItem,
  isWorkshopItem,
  type CatalogItem,
} from "../data/items/item";

export function ItemSidebar({ item }: { item: CatalogItem }) {
  if (isWorkshopItem(item)) {
    return (
      <aside className="frame item-sidebar">
        <h2 className="section-title">Workshop Item</h2>
        <ItemCard {...item} />
        <StatList rows={item.stats} />
        <AwakeAttributes stats={item.awake} />
        <GearScore score={item.gearScore} />
      </aside>
    );
  }

  if (isWingItem(item)) {
    return (
      <aside className="frame item-sidebar">
        <h2 className="section-title">Wings</h2>
        <ItemCard icon={item.icon} name={item.name} typeLabel={item.typeLabel} upgradeBadge="W" />
        <StatList rows={item.info.map((row) => ({ label: row.label, value: row.value }))} />
        <GearScore score={item.gearScore} />
        <p className="muted item-sidebar__hint">
          Wings are a separate slot — no Safe Upgrade or workshop + tab.
        </p>
      </aside>
    );
  }

  const badge = item.isSkin
    ? "Skin"
    : item.stackQty > 1
      ? `×${item.stackQty}`
      : "";

  return (
    <aside className="frame item-sidebar">
      <h2 className="section-title">{item.isSkin ? "Skin Item" : "Selected Item"}</h2>
      <ItemCard
        icon={item.icon}
        name={item.name}
        typeLabel={item.typeLabel}
        upgradeBadge={badge}
      />
      <p className="muted item-sidebar__hint">
        {item.isSkin
          ? "Use the Skins tab — same equipment type as the primary (sword↔sword, axe↔axe). No Upgrade."
          : "This item is in your bag. Equip gear above to use workshop actions."}
      </p>
    </aside>
  );
}