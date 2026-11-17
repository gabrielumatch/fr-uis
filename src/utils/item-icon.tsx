import { FLYFF_WIKI_ORIGIN } from "../data/assets/wiki-icons";

export function resolveIconSrc(icon: string): string {
  if (!icon) return "";
  if (icon.startsWith("http://") || icon.startsWith("https://")) return icon;
  if (icon.startsWith("images/")) return `${FLYFF_WIKI_ORIGIN}/${icon}`;
  return "";
}

export function isImageIcon(icon: string): boolean {
  return Boolean(resolveIconSrc(icon));
}

export type ItemIconProps = {
  icon: string;
  wrapperClass?: string;
  imgClass?: string;
  alt?: string;
};

export function ItemIcon({
  icon,
  wrapperClass = "",
  imgClass = "item-icon__img",
  alt = "",
}: ItemIconProps) {
  const src = resolveIconSrc(icon);
  if (src) {
    return (
      <span
        className={`item-icon item-icon--img ${wrapperClass}`}
        aria-hidden="true"
      >
        <img
          className={imgClass}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      </span>
    );
  }
  if (!icon) return null;
  return (
    <span
      className={`item-icon item-icon--emoji ${wrapperClass}`}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}