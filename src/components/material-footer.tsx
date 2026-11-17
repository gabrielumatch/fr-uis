import { MaterialCard } from "./material-card";

export type MaterialDef = { icon: string; name: string; quantity: number };

export function MaterialFooter({
  materials,
  variant = "grid",
  title = "Materials Required / Available",
}: {
  materials: MaterialDef[];
  variant?: "grid" | "list";
  title?: string;
}) {
  if (variant === "list") {
    return (
      <footer className="material-footer">
        <h2 className="section-title material-footer__title">
          <span>{title}</span>
        </h2>
        <div>
          {materials.map((m) => (
            <div key={m.name} className="material-list__row">
              <div className="material-card__name">
                <span className="material-card__icon">{m.icon}</span>
                <span className="material-card__label" title={m.name}>
                  {m.name}
                </span>
              </div>
              {m.quantity === 0 ? (
                <button type="button" className="btn btn--buy" data-buy={m.name}>
                  🛒 BUY NOW
                </button>
              ) : (
                <span className="material-card__qty">{m.quantity} available</span>
              )}
            </div>
          ))}
        </div>
      </footer>
    );
  }

  return (
    <footer className="material-footer">
      <h2 className="section-title material-footer__title">
        <span>{title}</span>
      </h2>
      <div className="material-footer__grid">
        {materials.map((m) => (
          <MaterialCard
            key={m.name}
            icon={m.icon}
            name={m.name}
            quantity={m.quantity}
            showBuy={m.quantity === 0}
          />
        ))}
      </div>
    </footer>
  );
}