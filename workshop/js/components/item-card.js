/**
 * @param {{ icon: string; name: string; type: string; upgradeBadge: string; activeSkinName?: string | null }} item
 */
export function renderItemCard(item) {
  const lookCaption = item.activeSkinName
    ? `<div class="item-card__look muted">Skin: ${item.activeSkinName}</div>`
    : "";

  return `
    <article class="item-card">
      <div class="item-card__icon-wrap">
        <div class="item-card__icon" aria-hidden="true">${item.icon}</div>
        <span class="item-card__badge">${item.upgradeBadge}</span>
      </div>
      <div class="item-card__name">${item.name}</div>
      <div class="item-card__type">${item.type}</div>
      ${lookCaption}
    </article>
  `;
}