export function CardBonusBar({ summary }: { summary: string }) {
  return (
    <div className="pierce-bonus" role="status">
      Total Card Bonus: <span className="pierce-bonus__value">{summary}</span>
    </div>
  );
}