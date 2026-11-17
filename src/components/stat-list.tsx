import type { StatRow as GearStatRow } from "../data/items/item";

export type StatRow = GearStatRow & { tone?: string };

export function StatList({
  rows,
  valueClass,
}: {
  rows: StatRow[];
  valueClass?: (row: StatRow) => string;
}) {
  const cls = valueClass ?? (() => "");
  return (
    <div className="stat-list">
      {rows.map((row, index) => (
        <div
          key={`${row.label}-${row.value}-${index}`}
          className={`stat-list__row${row.values?.length ? " stat-list__row--stacked" : ""}`}
        >
          <span>{row.label}</span>
          {row.values?.length ? (
            <div className="stat-list__value-stack">
              {row.values.map((line) => (
                <b key={line}>{line}</b>
              ))}
            </div>
          ) : (
            <b className={cls(row)}>{row.value}</b>
          )}
        </div>
      ))}
    </div>
  );
}