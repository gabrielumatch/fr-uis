import { renderPiercingPierceBody, pierceMaterials } from "./piercing-pierce-body.js";
import {
  renderPiercingCardsBody,
  cardsMaterials,
} from "./piercing-cards-body.js";

export { PIERCING_SUB_TABS } from "./piercing-sub-tabs.js";

/** @typedef {'pierce' | 'cards'} PiercingSubId */

/**
 * @param {PiercingSubId} [sub]
 */
export function resolvePiercingSub(sub) {
  return sub === "cards" ? "cards" : "pierce";
}

/**
 * @param {PiercingSubId} sub
 */
export function getPiercingPanelView(sub) {
  const mode = resolvePiercingSub(sub);
  if (mode === "cards") {
    return {
      panelTitle: "Card Management",
      panelSubtitle: "Insert or remove letter cards on pierced sockets.",
      materialsVariant: "grid",
      materialsTitle: "Materials Required / Available",
      materials: cardsMaterials,
      renderBody: renderPiercingCardsBody,
    };
  }

  return {
    panelTitle: "Safe Piercing",
    panelSubtitle: "Open new card sockets on your weapon.",
    materialsVariant: "grid",
    materialsTitle: "Materials Required / Available",
    materials: pierceMaterials,
    renderBody: renderPiercingPierceBody,
  };
}

/** @type {import('./registry.js').TabDefinition} */
export const piercingTab = {
  id: "piercing",
  label: "Piercing & Cards",
  icon: "⚫",
  panelTitle: "Safe Piercing",
  panelSubtitle: "",
  materialsVariant: "grid",
  materialsTitle: "Materials Required / Available",
  materials: pierceMaterials,
  renderBody() {
    return renderPiercingPierceBody();
  },
};