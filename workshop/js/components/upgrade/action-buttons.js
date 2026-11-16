import {
  attemptPlanCanStart,
} from "../../data/attempt-plans.js";

/**
 * @param {{
 *   primary?: string;
 *   secondary?: string[];
 *   attemptPlanKey?: import("../../data/attempt-plans.js").AttemptPlanKey;
 *   primaryDisabled?: boolean;
 * }} [options]
 */
export function renderActionButtons(options = {}) {
  const {
    primary = "Start",
    secondary = ["Auto Refill", "Clear"],
    attemptPlanKey,
    primaryDisabled: primaryDisabledOverride,
  } = options;

  const primaryDisabled = attemptPlanKey
    ? !attemptPlanCanStart(attemptPlanKey)
    : Boolean(primaryDisabledOverride);

  const secondaryBtns = secondary
    .map((label) => `<button type="button" class="btn btn--secondary" data-action="${label}">${label}</button>`)
    .join("");

  const planAttr = attemptPlanKey
    ? ` data-attempt-plan="${attemptPlanKey}"`
    : "";

  return `
    <div class="btn-row">
      <button
        type="button"
        class="btn${primaryDisabled ? " is-disabled" : ""}"
        data-action="${primary}"
        ${planAttr}
        ${primaryDisabled ? 'disabled aria-disabled="true"' : ""}
      >
        ${primary}
      </button>
      ${secondaryBtns}
    </div>
  `;
}