import { renderItemCard } from "./item-card.js";
import { renderStatList } from "./stat-list.js";
import { renderAwakeAttributes } from "./awake-attributes.js";
import { renderGearScore } from "./gear-score.js";

/** @param {typeof import('../data/equipped-item.js').equippedItem} item */
export function renderItemSidebar(item) {
  return `
    <aside class="frame item-sidebar">
      <h2 class="section-title">Workshop Item</h2>
      ${renderItemCard(item)}
      ${renderStatList(item.stats)}
      ${renderAwakeAttributes(item.awake)}
      ${renderGearScore({ score: item.gearScore })}
    </aside>
  `;
}