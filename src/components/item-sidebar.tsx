import { ItemCard } from "./item-card";
import { StatList } from "./stat-list";
import { AwakeAttributes } from "./awake-attributes";
import { GearScore } from "./gear-score";
import type { WorkshopItem } from "../data/workshop-item";

export function ItemSidebar({ item }: { item: WorkshopItem }) {
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