/**
 * @param {{ icon: string; name: string; type: string; upgradeBadge: string }} item
 */
export function renderItemCard(item) {
  return `
    <article class="item-card">
      <div class="item-card__icon-wrap">
        <div class="item-card__icon" aria-hidden="true">${item.icon}</div>
        <span class="item-card__badge">${item.upgradeBadge}</span>
      </div>
      <div class="item-card__name">${item.name}</div>
      <div class="item-card__type">${item.type}</div>
    </article>
  `;
}