/**
 * @param {{ current: number; target: number }} props
 */
export function renderUpgradeTarget({ current, target }) {
  return `
    <div class="upgrade-target">
      <div class="upgrade-target__current">Current Upgrade: <b>+${current}</b></div>
      <label class="muted">
        Target
        <input type="number" name="upgrade-target" value="${target}" min="${current + 1}" max="20" />
      </label>
    </div>
  `;
}