/**
 * @param {{ label: string; icon: string; level: number; max: number }} props
 */
export function renderElementStatus({ label, icon, level, max }) {
  return `
    <div class="element-status">
      <span class="element-status__label muted">Current Element</span>
      <span class="element-status__value">
        <span aria-hidden="true">${icon}</span> ${label}
        <strong>${level}/${max}</strong>
      </span>
    </div>
  `;
}