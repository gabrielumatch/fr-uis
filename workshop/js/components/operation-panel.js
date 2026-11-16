import { renderOperationHead } from "./operation-head.js";
import { renderMaterialFooter } from "./material-footer.js";

/**
 * @typedef {import('../tabs/registry.js').TabPanelContext} TabPanelContext
 */

/**
 * @param {TabPanelContext & { bodyHtml: string }} props
 */
export function renderOperationPanel({
  title,
  subtitle,
  meta,
  bodyHtml,
  materials,
  materialsVariant,
  materialsTitle,
}) {
  return `
    <section class="frame operation-panel">
      ${renderOperationHead({ title, subtitle, meta })}
      <div class="operation-panel__body" data-operation-body>
        ${bodyHtml}
      </div>
      ${renderMaterialFooter({
        materials,
        variant: materialsVariant ?? "grid",
        title: materialsTitle,
      })}
    </section>
  `;
}