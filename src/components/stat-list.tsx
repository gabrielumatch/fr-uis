export type StatRow = { label: string; value: string; tone?: string };

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
      {rows.map((row) => (
        <div key={row.label} className="stat-list__row">
          <span>{row.label}</span>
          <b className={cls(row)}>{row.value}</b>
        </div>
      ))}
    </div>
  );
}