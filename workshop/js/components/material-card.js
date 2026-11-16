/**
 * @typedef {{ icon: string; name: string; quantity: number; showBuy?: boolean }} MaterialCardProps
 */

/**
 * @param {MaterialCardProps} props
 */
export function renderMaterialCard({ icon, name, quantity, showBuy = false }) {
  const right = showBuy
    ? `<button type="button" class="btn btn--buy" data-buy="${name}">🛒 BUY NOW</button>`
    : `<span class="material-card__qty">x ${quantity}</span>`;

  return `
    <div class="material-card" data-material="${name}">
      <div class="material-card__name">
        <span class="material-card__icon" aria-hidden="true">${icon}</span>
        ${name}
      </div>
      ${right}
    </div>
  `;
}