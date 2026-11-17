import {
  attemptPlanCanStart,
  type AttemptPlanKey,
} from "../../data/systems/attempt-plans";

export function ActionButtons({
  primary = "Start",
  secondary = ["Auto Refill", "Clear"],
  attemptPlanKey,
  primaryDisabled: primaryDisabledOverride,
}: {
  primary?: string;
  secondary?: string[];
  attemptPlanKey?: AttemptPlanKey;
  primaryDisabled?: boolean;
} = {}) {
  const primaryDisabled = attemptPlanKey
    ? !attemptPlanCanStart(attemptPlanKey)
    : Boolean(primaryDisabledOverride);

  return (
    <div className="btn-row">
      <button
        type="button"
        className={`btn${primaryDisabled ? " is-disabled" : ""}`}
        data-action={primary}
        data-attempt-plan={attemptPlanKey}
        disabled={primaryDisabled}
        aria-disabled={primaryDisabled}
      >
        {primary}
      </button>
      {secondary.map((label) => (
        <button
          key={label}
          type="button"
          className="btn btn--secondary"
          data-action={label}
        >
          {label}
        </button>
      ))}
    </div>
  );
}