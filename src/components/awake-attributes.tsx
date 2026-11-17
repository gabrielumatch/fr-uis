import { StatList } from "./stat-list";
import type { AwakeStat } from "../data/items/workshop-item";

export function AwakeAttributes({ stats }: { stats: AwakeStat[] }) {
  return (
    <section className="awake-block">
      <h2 className="section-title">Awake Attributes</h2>
      <StatList
        rows={stats}
        valueClass={(row) =>
          row.tone === "red"
            ? "stat--red"
            : row.tone === "blue"
              ? "stat--blue"
              : ""
        }
      />
    </section>
  );
}