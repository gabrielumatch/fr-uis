/**
 * @param {{
 *   options: string[];
 *   primary: string;
 *   secondary: string;
 *   showColored: boolean;
 *   summarize: boolean;
 * }} props
 */
export function renderAwakeHighlight({
  options,
  primary,
  secondary,
  showColored,
  summarize,
}) {
  const optionHtml = (selected) =>
    options
      .map(
        (opt) =>
          `<option value="${opt}"${opt === selected ? " selected" : ""}>${opt}</option>`,
      )
      .join("");

  return `
    <section class="awake-highlight">
      <h3 class="section-title">Highlight Stat</h3>
      <div class="awake-highlight__selects">
        <select name="awake-highlight-primary" aria-label="Highlight stat primary">
          ${optionHtml(primary)}
        </select>
        <select name="awake-highlight-secondary" aria-label="Highlight stat secondary">
          ${optionHtml(secondary)}
        </select>
      </div>
      <div class="awake-highlight__checks">
        <label class="awake-check">
          <input type="checkbox" name="awake-colored" ${showColored ? "checked" : ""} />
          Show colored stats
        </label>
        <label class="awake-check">
          <input type="checkbox" name="awake-summarize" ${summarize ? "checked" : ""} />
          Summarize stats
        </label>
      </div>
    </section>
  `;
}