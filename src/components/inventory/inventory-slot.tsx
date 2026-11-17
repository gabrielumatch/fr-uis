import { ItemIcon } from "../../utils/item-icon";

export function InventorySlot({
  icon,
  upgradeBadge,
  workshopItemId,
  active = false,
  empty = false,
  title = "",
  as = "div",
  variant = "equip",
  skinDonor = false,
  className = "",
  onSelectWorkshopItem,
}: {
  icon?: string;
  upgradeBadge?: string;
  workshopItemId?: string;
  active?: boolean;
  empty?: boolean;
  title?: string;
  as?: "button" | "div";
  variant?: "grid" | "equip";
  skinDonor?: boolean;
  className?: string;
  onSelectWorkshopItem?: (id: string) => void;
}) {
  const filled = !empty && icon;
  const classes = [
    "inv-slot",
    variant === "grid" ? "inv-slot--grid" : "inv-slot--equip",
    filled ? "inv-slot--filled" : "inv-slot--empty",
    active ? " is-active" : "",
    workshopItemId ? " inv-slot--workshop" : "",
    skinDonor ? " inv-slot--skin-donor" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = filled ? (
    <>
      <ItemIcon
        icon={icon!}
        wrapperClass="inv-slot__icon"
        imgClass="inv-slot__icon-img"
      />
      {upgradeBadge ? (
        <span className="inv-slot__badge">{upgradeBadge}</span>
      ) : null}
    </>
  ) : null;

  if (as === "button" && workshopItemId) {
    return (
      <button
        type="button"
        className={classes}
        data-workshop-item-id={workshopItemId}
        aria-pressed={active}
        title={title}
        onClick={(event) => {
          event.stopPropagation();
          onSelectWorkshopItem?.(workshopItemId);
        }}
      >
        {inner}
      </button>
    );
  }

  if (as === "button" && filled) {
    return (
      <button type="button" className={classes} disabled title={title}>
        {inner}
      </button>
    );
  }

  return (
    <div className={classes} title={title || undefined}>
      {inner}
    </div>
  );
}