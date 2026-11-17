import { ItemIcon } from "../utils/item-icon";

export function MaterialCard({
  icon,
  name,
  quantity,
  showBuy = false,
}: {
  icon: string;
  name: string;
  quantity: number;
  showBuy?: boolean;
}) {
  return (
    <div className="material-card" data-material={name}>
      <div className="material-card__name">
        <ItemIcon
          icon={icon}
          wrapperClass="material-card__icon"
          imgClass="material-card__icon-img"
          alt={name}
        />
        {name}
      </div>
      {showBuy ? (
        <button type="button" className="btn btn--buy" data-buy={name}>
          🛒 BUY NOW
        </button>
      ) : (
        <span className="material-card__qty">x {quantity}</span>
      )}
    </div>
  );
}