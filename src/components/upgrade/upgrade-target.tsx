export function UpgradeTarget({
  current,
  target,
  maxPlus,
}: {
  current: number;
  target: number;
  maxPlus: number;
}) {
  return (
    <div className="upgrade-target">
      <div className="upgrade-target__current">
        Current Upgrade: <b>+{current}</b>{" "}
        <span className="muted">(max +{maxPlus})</span>
      </div>
      <label className="muted">
        Target
        <input
          type="number"
          name="upgrade-target"
          defaultValue={target}
          min={current + 1}
          max={maxPlus}
        />
      </label>
    </div>
  );
}