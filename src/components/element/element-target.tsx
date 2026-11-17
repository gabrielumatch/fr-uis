export function ElementTarget({
  current,
  target,
  max,
}: {
  current: number;
  target: number;
  max: number;
}) {
  return (
    <div className="element-target">
      <div className="element-target__current">
        Current: <b>+{current}</b>
      </div>
      <label className="muted">
        Target level
        <input
          type="number"
          name="element-target"
          defaultValue={target}
          min={current + 1}
          max={max}
        />
      </label>
    </div>
  );
}