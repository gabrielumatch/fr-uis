import { FLYFF_WIKI_ORIGIN } from "../data/flyff-wiki-icons.js";

/**
 * @param {string} icon Emoji or wiki URL / `images/...` path
 * @returns {string}
 */
export function resolveIconSrc(icon) {
  if (!icon) return "";
  if (icon.startsWith("http://") || icon.startsWith("https://")) return icon;
  if (icon.startsWith("images/")) return `${FLYFF_WIKI_ORIGIN}/${icon}`;
  return "";
}

/** @param {string} icon */
export function isImageIcon(icon) {
  return Boolean(resolveIconSrc(icon));
}

/**
 * @param {string} icon
 * @param {{ wrapperClass?: string; imgClass?: string; alt?: string }} [opts]
 */
export function renderItemIcon(icon, opts = {}) {
  const {
    wrapperClass = "",
    imgClass = "item-icon__img",
    alt = "",
  } = opts;
  const src = resolveIconSrc(icon);
  if (src) {
    return `<span class="item-icon item-icon--img ${wrapperClass}" aria-hidden="true"><img class="${imgClass}" src="${src}" alt="${alt}" loading="lazy" decoding="async" /></span>`;
  }
  if (!icon) return "";
  return `<span class="item-icon item-icon--emoji ${wrapperClass}" aria-hidden="true">${icon}</span>`;
}