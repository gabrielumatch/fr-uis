/**
 * @param {{ title?: string; subtitle?: string }} [options]
 */
export function renderWorkshopHeader(options = {}) {
  const title = options.title ?? "EQUIPMENT WORKSHOP";
  const subtitle =
    options.subtitle ?? "Upgrade, customize and manage your equipment.";

  return `
    <header class="ws-header">
      <h1 class="ws-header__title">
        <span class="dim">◇</span> ${title} <span class="dim">◇</span>
      </h1>
      <p class="ws-header__sub">${subtitle}</p>
    </header>
  `;
}