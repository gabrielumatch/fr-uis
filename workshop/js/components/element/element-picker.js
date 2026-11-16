/**
 * @param {{
 *   elements: typeof import('../../data/element-upgrade.js').elementTypes;
 *   selectedId: string;
 *   title?: string;
 *   pickAttr?: string;
 *   disabledId?: string;
 * }} props
 */
export function renderElementPicker({
  elements,
  selectedId,
  title = "Select Element",
  pickAttr = "change-element-id",
  disabledId,
}) {
  const buttons = elements
    .map((el) => {
      const isCurrent = el.id === disabledId;
      const isActive = el.id === selectedId;
      return `
    <button
      type="button"
      class="element-picker__btn${isActive ? " is-active" : ""}${isCurrent ? " is-current" : ""}"
      data-${pickAttr}="${el.id}"
      aria-pressed="${isActive}"
      ${isCurrent ? "disabled title=\"Current element — choose another type\"" : ""}
    >
      <span class="element-picker__icon" aria-hidden="true">${el.icon}</span>
      ${el.label}
      ${isCurrent ? '<span class="element-picker__tag">Current</span>' : ""}
    </button>
  `;
    })
    .join("");

  return `
    <div class="element-picker">
      <div class="element-picker__title section-title">${title}</div>
      <div class="element-picker__grid" role="group" aria-label="${title}">${buttons}</div>
    </div>
  `;
}