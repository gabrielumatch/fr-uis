export function OperationHead({
  title,
  subtitle = "",
  meta = "",
}: {
  title: string;
  subtitle?: string;
  meta?: string;
}) {
  return (
    <header className="operation-head">
      <div>
        <div className="operation-head__title">{title}</div>
        {subtitle ? <div className="operation-head__sub">{subtitle}</div> : null}
      </div>
      {meta ? <span className="muted">{meta}</span> : null}
    </header>
  );
}