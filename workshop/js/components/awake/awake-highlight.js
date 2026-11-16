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
    <section class="awake-highlight" aria-label="Awake display options">
      <div class="awake-highlight__row">
        <div class="awake-highlight__left">
          <span class="awake-highlight__heading">Highlight Stat</span>
          <div class="awake-highlight__selects">
            <select name="awake-highlight-primary" aria-label="Highlight stat primary">
              ${optionHtml(primary)}
            </select>
            <select name="awake-highlight-secondary" aria-label="Highlight stat secondary">
              ${optionHtml(secondary)}
            </select>
          </div>
        </div>
        <fieldset class="awake-highlight__options" aria-label="Display options">
          <label class="awake-check">
            <input type="checkbox" name="awake-colored" ${showColored ? "checked" : ""} />
            <span class="awake-check__text">Show colored stats</span>
          </label>
          <label class="awake-check">
            <input type="checkbox" name="awake-summarize" ${summarize ? "checked" : ""} />
            <span class="awake-check__text">Summarize stats</span>
          </label>
        </fieldset>
      </div>
    </section>
  `;
}