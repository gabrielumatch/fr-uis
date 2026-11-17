import { ItemCard } from "./item-card";
import { StatList } from "./stat-list";
import { AwakeAttributes } from "./awake-attributes";
import { GearScore } from "./gear-score";
import {
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

  const badge =
    item.type === "skin"
      ? "Skin"
      : item.stackQty > 1
        ? `×${item.stackQty}`
        : "";

  return (
    <aside className="frame item-sidebar">
      <h2 className="section-title">Selected Item</h2>
      <ItemCard
        icon={item.icon}
        name={item.name}
        typeLabel={item.typeLabel}
        upgradeBadge={badge}
      />
      <p className="muted item-sidebar__hint">
        This item is in your bag. Equip gear above to use workshop actions.
      </p>
    </aside>
  );
}