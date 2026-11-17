export function ProbabilityBar({
  chance,
  energy,
  cost,
  chanceHighlight = false,
}: {
  chance: string;
  energy: string;
  cost?: string;
  chanceHighlight?: boolean;
}) {
  const chanceNode = chanceHighlight ? (
    <span className="probability-bar__chance">{chance}</span>
  ) : (
    chance
  );

  return (
    <div className="probability-bar">
      <div>
        <strong>Chance:</strong> {chanceNode} &nbsp;|&nbsp;{" "}
        <strong>Energy:</strong> {energy}
      </div>
      {cost ? (
        <div>
          <strong>Cost:</strong> {cost} per attempt
        </div>
      ) : null}
    </div>
  );
}