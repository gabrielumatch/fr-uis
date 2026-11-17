export function GearScore({ score }: { score: number }) {
  return (
    <div className="gear-score">
      <span className="gear-score__label">⚔ GEAR SCORE</span>
      <strong className="gear-score__value">{score}</strong>
    </div>
  );
}