/**
 * @param {{ primary?: string; secondary?: string[] }} [options]
 */
export function renderActionButtons(
  options = {
    primary: "Start",
    secondary: ["Auto Refill", "Clear"],
  },
) {
  const { primary = "Start", secondary = [] } = options;

  const secondaryBtns = secondary
    .map((label) => `<button type="button" class="btn btn--secondary" data-action="${label}">${label}</button>`)
    .join("");

  return `
    <div class="btn-row">
      <button type="button" class="btn" data-action="${primary}">${primary}</button>
      ${secondaryBtns}
    </div>
  `;
}