export function PiercingCardActions() {
  return (
    <div className="pierce-actions">
      <button type="button" className="btn pierce-actions__primary" data-action="Insert Card">
        Insert Card
      </button>
      <button
        type="button"
        className="btn btn--secondary pierce-actions__secondary"
        data-action="Remove Selected Card"
      >
        Remove Selected
      </button>
    </div>
  );
}