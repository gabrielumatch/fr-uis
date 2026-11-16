import { upgradeTab } from "./upgrade-panel.js";
import { elementTab } from "./element-panel.js";
import { piercingTab } from "./piercing-panel.js";
import { jewelsTab } from "./jewels-panel.js";
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
  jewelsTab,
  awakeTab,
];

/**
 * @param {string} id
 * @returns {TabDefinition | undefined}
 */
export function getTabById(id) {
  return tabRegistry.find((tab) => tab.id === id);
}