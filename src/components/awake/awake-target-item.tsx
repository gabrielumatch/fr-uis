export function AwakeTargetItem({ name }: { name: string }) {
  return <p className="awake-target">{name.toUpperCase()}</p>;
}