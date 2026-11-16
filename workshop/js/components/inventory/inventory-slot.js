/**
 * @param {{
 *   icon?: string;
 *   upgradeBadge?: string;
 *   workshopItemId?: string;
 *   active?: boolean;
 *   empty?: boolean;
 *   title?: string;
 *   as?: 'button' | 'div';
 *   variant?: 'grid' | 'equip';
 *   className?: string;
 * }} props
 */
export function renderInventorySlot({
  icon,
  upgradeBadge,
  workshopItemId,
  active = false,
  empty = false,
  title = "",
  as = "div",
  variant = "equip",
  className = "",
}) {
  const filled = !empty && icon;
  const classes = [
    "inv-slot",
    variant === "grid" ? "inv-slot--grid" : "inv-slot--equip",
    filled ? "inv-slot--filled" : "inv-slot--empty",
    active ? " is-active" : "",
    workshopItemId ? " inv-slot--workshop" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const badge = upgradeBadge
    ? `<span class="inv-slot__badge">${upgradeBadge}</span>`
    : "";

  const inner = filled
    ? `<span class="inv-slot__icon" aria-hidden="true">${icon}</span>${badge}`
    : "";

  if (as === "button" && workshopItemId) {
    return `
      <button
        type="button"
        class="${classes}"
        data-workshop-item-id="${workshopItemId}"
        aria-pressed="${active ? "true" : "false"}"
        title="${title}"
      >
        ${inner}
      </button>
    `;
  }

  if (as === "button" && filled) {
    return `
      <button type="button" class="${classes}" disabled title="${title}">
        ${inner}
      </button>
    `;
  }

  return `<div class="${classes}" ${title ? `title="${title}"` : ""}>${inner}</div>`;
}