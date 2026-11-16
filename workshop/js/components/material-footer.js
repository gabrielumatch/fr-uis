import { renderMaterialCard } from "./material-card.js";

/**
 * @typedef {{ icon: string; name: string; quantity: number }} MaterialDef
 */

/**
 * @param {{ materials: MaterialDef[]; variant?: 'grid' | 'list'; title?: string }} props
 */
export function renderMaterialFooter({
  materials,
  variant = "grid",
  title = "Materials Required / Available",
}) {
  if (variant === "list") {
    const rows = materials
      .map((m) => {
        const right =
          m.quantity === 0
            ? `<button type="button" class="btn btn--buy" data-buy="${m.name}">🛒 BUY NOW</button>`
            : `<span class="material-card__qty">${m.quantity} available</span>`;
        return `
          <div class="material-list__row">
            <div class="material-card__name">
              <span class="material-card__icon">${m.icon}</span>
              ${m.name}
            </div>
            ${right}
          </div>
        `;
      })
      .join("");

    return `
      <footer class="material-footer">
        <h2 class="section-title material-footer__title">
          <span>${title}</span>
        </h2>
        <div>${rows}</div>
      </footer>
    `;
  }

  const cards = materials
    .map((m) =>
      renderMaterialCard({
        icon: m.icon,
        name: m.name,
        quantity: m.quantity,
        showBuy: m.quantity === 0,
      }),
    )
    .join("");

  return `
    <footer class="material-footer">
      <h2 class="section-title material-footer__title">
        <span>${title}</span>
      </h2>
      <div class="material-footer__grid">${cards}</div>
    </footer>
  `;
}