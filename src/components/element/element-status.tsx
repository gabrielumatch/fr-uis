export function ElementStatus({
  label,
  icon,
  level,
  max,
}: {
  label: string;
  icon: string;
  level: number;
  max: number;
}) {
  return (
    <div className="element-status">
      <span className="element-status__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="element-status__label">{label}</span>
      <span className="element-status__level">
        Level <b>{level}</b> / {max}
      </span>
    </div>
  );
}