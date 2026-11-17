export function AwakeHighlight({
  options,
  primary,
  secondary,
  showColored,
  summarize,
}: {
  options: string[];
  primary: string;
  secondary: string;
  showColored: boolean;
  summarize: boolean;
}) {
  return (
    <section className="awake-highlight" aria-label="Awake display options">
      <div className="awake-highlight__row">
        <div className="awake-highlight__left">
          <span className="awake-highlight__heading">Highlight Stat</span>
          <div className="awake-highlight__selects">
            <select name="awake-highlight-primary" aria-label="Highlight stat primary" defaultValue={primary}>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <select name="awake-highlight-secondary" aria-label="Highlight stat secondary" defaultValue={secondary}>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
        <fieldset className="awake-highlight__options" aria-label="Display options">
          <label className="awake-check">
            <input type="checkbox" name="awake-colored" defaultChecked={showColored} />
            <span className="awake-check__text">Show colored stats</span>
          </label>
          <label className="awake-check">
            <input type="checkbox" name="awake-summarize" defaultChecked={summarize} />
            <span className="awake-check__text">Summarize stats</span>
          </label>
        </fieldset>
      </div>
    </section>
  );
}