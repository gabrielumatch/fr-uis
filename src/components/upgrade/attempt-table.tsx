import type { AttemptPlanRow } from "../../data/attempt-plans";

function MaterialCell({ value, slotLabel }: { value: string; slotLabel: string }) {
  const filled = Boolean(value);
  return (
    <span
      className={`attempt-slot${filled ? " attempt-slot--filled" : " attempt-slot--empty"}`}
      role="img"
      aria-label={filled ? slotLabel : `${slotLabel} empty`}
    >
      {filled ? (
        <span className="attempt-slot__icon" aria-hidden="true">
          {value}
        </span>
      ) : (
        <span className="attempt-slot__void" aria-hidden="true" />
      )}
    </span>
  );
}

export function AttemptTable({
  rows,
  title,
}: {
  rows: AttemptPlanRow[];
  title?: string;
}) {
  return (
    <>
      {title ? (
        <div className="attempt-table__title section-title">{title}</div>
      ) : null}
      <table className="attempt-table">
        <thead>
          <tr>
            <th scope="col">Material</th>
            <th scope="col">Protect</th>
            <th scope="col">Smelting</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.index}>
              <td>
                <MaterialCell value={row.material} slotLabel="Material" />
              </td>
              <td>
                <MaterialCell value={row.protect} slotLabel="Protect scroll" />
              </td>
              <td>
                <MaterialCell value={row.smelting} slotLabel="Smelting scroll" />
              </td>
              <td className={row.result === "Waiting" ? "muted" : undefined}>
                {row.result}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}