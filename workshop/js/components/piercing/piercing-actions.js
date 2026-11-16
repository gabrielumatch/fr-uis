/**
 * Ações principais da aba: furar novo socket vs gerenciar cartas.
 */
export function renderPiercingActions() {
  return `
    <div class="pierce-actions">
      <button type="button" class="btn pierce-actions__primary" data-action="Create New Slots">
        Create New Slots
      </button>
      <button type="button" class="btn btn--secondary pierce-actions__secondary" data-action="Manage Cards">
        Manage Cards
      </button>
    </div>
    <p class="pierce-help muted">
      Pierce a slot first (Moonstone + GProtect), then insert a <strong>letter card</strong>
      (Fire/Water/Electric/Land/Wind — grades D, C, B, A…). Suit % cards (e.g. Lightning 7%) do not
      go on weapons.
    </p>
  `;
}