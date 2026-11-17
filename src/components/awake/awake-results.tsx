export function AwakeResults({
  lines,
  showColored,
}: {
  lines: { label: string; value: string; tone?: string }[];
  showColored: boolean;
}) {
  return (
    <section className="awake-results" aria-labelledby="awake-results-title">
      <h3 className="section-title" id="awake-results-title">
        Current / Generated Awake
      </h3>
      <div className="awake-results__panel">
        {lines.map((line, i) => {
          const toneClass =
            showColored && line.tone === "red"
              ? " awake-line--red"
              : showColored && line.tone === "blue"
                ? " awake-line--blue"
                : "";
          return (
            <div key={i} className={`awake-line${toneClass}`}>
              <strong>{line.label}</strong> {line.value}
            </div>
          );
        })}
      </div>
    </section>
  );
}