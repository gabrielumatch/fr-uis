export function AwakeNotice({ penyaCost }: { penyaCost: number }) {
  const formatted = penyaCost.toLocaleString("en-US");
  return (
    <p className="awake-notice">
      Start reverts the awakening and awakens again. Awakening an item costs{" "}
      <strong className="awake-notice__cost">{formatted} Penya</strong>.
    </p>
  );
}