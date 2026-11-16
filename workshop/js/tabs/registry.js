import { upgradeTab } from "./upgrade-panel.js";
import { elementTab } from "./element-panel.js";
import { piercingTab } from "./piercing-panel.js";
import { awakeTab } from "./awake-panel.js";

/**
 * @typedef {{ icon: string; name: string; quantity: number }} MaterialDef
 *
 * @typedef {TabPanelContext & {
 *   id: string;
 *   label: string;
 *   icon: string;
 *   renderBody: () => string;
 * }} TabDefinition
 *
 * @typedef {{
 *   panelTitle: string;
 *   panelSubtitle?: string;
 *   meta?: string;
 *   materials: MaterialDef[];
 *   materialsVariant?: 'grid' | 'list';
 *   materialsTitle?: string;
 * }} TabPanelContext
 */

/** @type {TabDefinition[]} */
export const tabRegistry = [
  upgradeTab,
  elementTab,
  piercingTab,
  awakeTab,
];

/** Hash aliases (joias ficam dentro de Upgrade). */
export const TAB_HASH_ALIASES = {
  jewels: "upgrade",
  "upgrade-jewels": "upgrade",
  "upgrade-level": "upgrade",
  "piercing-cards": "piercing",
  "piercing-pierce": "piercing",
};

/**
 * @param {string} id
 * @returns {TabDefinition | undefined}
 */
export function getTabById(id) {
  return tabRegistry.find((tab) => tab.id === id);
}