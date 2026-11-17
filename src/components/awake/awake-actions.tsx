export function AwakeActions() {
  return (
    <div className="awake-actions">
      <button type="button" className="btn btn--secondary" data-action="Auto Fill">
        Auto Fill
      </button>
      <button type="button" className="btn awake-actions__start" data-action="Start">
        Start
      </button>
      <button type="button" className="btn btn--secondary" data-action="Previous">
        Previous
      </button>
    </div>
  );
}