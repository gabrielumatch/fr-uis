/** @param {{ elements: typeof import('../../data/element-upgrade.js').elementTypes; selectedId: string }} props */
export function renderElementPicker({ elements, selectedId }) {
  const buttons = elements
    .map(
      (el) => `
    <button
      type="button"
      class="element-picker__btn${el.id === selectedId ? " is-active" : ""}"
      data-element-id="${el.id}"
      aria-pressed="${el.id === selectedId}"
    >
      <span class="element-picker__icon" aria-hidden="true">${el.icon}</span>
      ${el.label}
    </button>
  `,
    )
    .join("");

  return `
    <div class="element-picker">
      <div class="element-picker__title section-title">Select Element</div>
      <div class="element-picker__grid" role="group" aria-label="Select element">${buttons}</div>
    </div>
  `;
}