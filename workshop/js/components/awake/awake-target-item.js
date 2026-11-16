/**
 * Nome do item alvo (estilo janela FlyFF — item já equipado na sidebar).
 * @param {{ name: string }} props
 */
export function renderAwakeTargetItem({ name }) {
  return `<p class="awake-target">${name.toUpperCase()}</p>`;
}