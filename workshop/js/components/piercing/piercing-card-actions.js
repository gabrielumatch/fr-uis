export function renderPiercingCardActions() {
  return `
    <div class="pierce-actions">
      <button type="button" class="btn pierce-actions__primary" data-action="Insert Card">
        Insert Card
      </button>
      <button type="button" class="btn btn--secondary pierce-actions__secondary" data-action="Remove Selected Card">
        Remove Selected
      </button>
    </div>
  `;
}