export function renderJewelActions() {
  return `
    <div class="jewel-actions">
      <button type="button" class="btn jewel-actions__primary" data-action="Insert Jewel">
        Insert Jewel
      </button>
      <button type="button" class="btn btn--secondary jewel-actions__secondary" data-action="Remove Last Jewel">
        Remove Last Jewel
      </button>
    </div>
  `;
}