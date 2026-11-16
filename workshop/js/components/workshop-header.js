/**
 * @param {{ title: string; subtitle?: string; headingLevel?: 'h1' | 'h2'; id?: string }} options
 */
export function renderSectionHeader(options) {
  const { title, subtitle = "", headingLevel = "h2", id } = options;
  const heading = headingLevel === "h1" ? "h1" : "h2";
  const idAttr = id ? ` id="${id}"` : "";

  return `
    <header class="ws-header">
      <${heading} class="ws-header__title"${idAttr}>
        <span class="dim">◇</span> ${title} <span class="dim">◇</span>
      </${heading}>
      ${subtitle ? `<p class="ws-header__sub">${subtitle}</p>` : ""}
    </header>
  `;
}

/**
 * @param {{ subtitle?: string }} [options]
 */
export function renderWorkshopHeader(options = {}) {
  const subtitle =
    options.subtitle ?? "Upgrade, customize and manage your equipment.";

  return renderSectionHeader({
    id: "equipment-workshop-title",
    title: "EQUIPMENT WORKSHOP",
    subtitle,
    headingLevel: "h1",
  });
}