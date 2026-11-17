import { ItemIcon } from "../utils/item-icon";

export function ItemCard(item: {
  icon: string;
  name: string;
  type: string;
  upgradeBadge: string;
  activeSkinName?: string | null;
}) {
  return (
    <article className="item-card">
      <div className="item-card__icon-wrap">
        <ItemIcon
          icon={item.icon}
          wrapperClass="item-card__icon"
          imgClass="item-card__icon-img"
          alt={item.name}
        />
        <span className="item-card__badge">{item.upgradeBadge}</span>
      </div>
      <div className="item-card__name">{item.name}</div>
      <div className="item-card__type">{item.type}</div>
      {item.activeSkinName ? (
        <div className="item-card__look muted">Skin: {item.activeSkinName}</div>
      ) : null}
    </article>
  );
}