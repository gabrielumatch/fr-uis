/**
 * @param {{ title: string; subtitle?: string; meta?: string }} props
 */
export function renderOperationHead({ title, subtitle = "", meta = "" }) {
  return `
    <header class="operation-head">
      <div>
        <div class="operation-head__title">${title}</div>
        ${subtitle ? `<div class="operation-head__sub">${subtitle}</div>` : ""}
      </div>
      ${meta ? `<span class="muted">${meta}</span>` : ""}
    </header>
  `;
}