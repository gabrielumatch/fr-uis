import { getElementById } from "../../data/element-upgrade.js";
import { ELEMENT_CYCLE_ORDER } from "../../data/element-cycle.js";

const CX = 180;
const CY = 178;
const NODE_R = 100;
const TRACK_R = 118;
const START_DEG = -90;
const ARC_PAD_DEG = 18;
const CHIP = 72;
const CORE = 76;
const CORE_DISC_R = 36;

/**
 * @param {number} cx
 * @param {number} cy
 * @param {number} r
 * @param {number} deg
 */
function polar(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

/**
 * Arco no anel externo (sentido horário) entre dois elementos.
 * @param {number} i índice do elemento de origem
 */
function trackArcPath(i) {
  const aStart = START_DEG + i * 72 + ARC_PAD_DEG;
  const aEnd = START_DEG + (i + 1) * 72 - ARC_PAD_DEG;
  const p0 = polar(CX, CY, TRACK_R, aStart);
  const p1 = polar(CX, CY, TRACK_R, aEnd);
  const large = aEnd - aStart > 180 ? 1 : 0;
  return `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${TRACK_R} ${TRACK_R} 0 ${large} 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
}

/**
 * @param {{
 *   appliedId: string;
 *   targetId?: string;
 *   interactive?: boolean;
 *   showChangeAction?: boolean;
 * }} props
 */
export function renderElementCycleWheel({
  appliedId,
  targetId,
  interactive = false,
  showChangeAction = false,
}) {
  const target = targetId ? getElementById(targetId) : null;
  const canChange = Boolean(targetId && targetId !== appliedId && target);
  const appliedIdx = ELEMENT_CYCLE_ORDER.indexOf(appliedId);
  const weakArcIdx =
    appliedIdx >= 0
      ? (appliedIdx - 1 + ELEMENT_CYCLE_ORDER.length) %
        ELEMENT_CYCLE_ORDER.length
      : -1;

  const arcs = ELEMENT_CYCLE_ORDER.map((fromId, i) => {
    const toId = ELEMENT_CYCLE_ORDER[(i + 1) % ELEMENT_CYCLE_ORDER.length];
    const from = getElementById(fromId);
    const to = getElementById(toId);
    const isOutgoing = i === appliedIdx;
    const isIncomingWeak = i === weakArcIdx;
    const classes = [
      "element-cycle-wheel__arc",
      isOutgoing ? "is-outgoing" : "",
      isIncomingWeak ? "is-incoming-weak" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const marker = isOutgoing
      ? "url(#element-cycle-arrow-strong)"
      : "url(#element-cycle-arrow)";

    return `
      <path
        class="${classes}"
        d="${trackArcPath(i)}"
        marker-end="${marker}"
        data-cycle-from="${fromId}"
        data-cycle-to="${toId}"
      >
        <title>${from?.label ?? fromId} beats ${to?.label ?? toId}</title>
      </path>
    `;
  }).join("");

  const nodes = ELEMENT_CYCLE_ORDER.map((id, i) => {
    const el = getElementById(id);
    const pos = polar(CX, CY, NODE_R, START_DEG + i * 72);
    const isApplied = id === appliedId;
    const isTarget = targetId != null && id === targetId;
    const chipClass = [
      "element-cycle-wheel__chip",
      isApplied ? "is-applied" : "",
      isTarget ? "is-target" : "",
      interactive && !isApplied ? "is-pickable" : "",
    ]
      .filter(Boolean)
      .join(" ");

    const pickAttr =
      interactive && !isApplied ? ` data-change-element-id="${id}"` : "";
    const tab = interactive && !isApplied ? ' tabindex="0" role="button"' : "";
    const aria =
      interactive && !isApplied
        ? ` aria-label="Select ${el?.label ?? id}"`
        : isApplied
          ? ' aria-label="Current element on item"'
          : "";

    return `
      <g class="element-cycle-wheel__node-wrap" transform="translate(${pos.x.toFixed(2)}, ${pos.y.toFixed(2)})">
        <foreignObject x="${-CHIP / 2}" y="${-CHIP / 2}" width="${CHIP}" height="${CHIP}">
          <div xmlns="http://www.w3.org/1999/xhtml" class="${chipClass}"${pickAttr}${tab}${aria}>
            <span class="element-cycle-wheel__chip-icon" aria-hidden="true">${el?.icon ?? "?"}</span>
            <span class="element-cycle-wheel__chip-name">${el?.label ?? id}</span>
            ${isApplied ? '<span class="element-cycle-wheel__chip-tag">Now</span>' : ""}
            ${isTarget && !isApplied ? '<span class="element-cycle-wheel__chip-tag">Pick</span>' : ""}
          </div>
        </foreignObject>
      </g>
    `;
  }).join("");

  return `
    <section class="element-cycle-wheel" aria-label="Element advantage cycle">
      <h3 class="section-title element-cycle-wheel__title">Who beats whom</h3>
      <p class="element-cycle-wheel__caption muted">
        Follow the ring clockwise — each element has advantage over the <strong>next</strong> one.
      </p>
      <div class="element-cycle-wheel__frame">
            <svg class="element-cycle-wheel__svg" viewBox="0 0 360 360" role="img" aria-label="Clockwise arrows mean the first element beats the second">
              <defs>
                <linearGradient id="element-cycle-arc" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#b88938" />
                  <stop offset="100%" stop-color="#8b6338" />
                </linearGradient>
                <linearGradient id="element-cycle-arc-strong" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#6cad5c" />
                  <stop offset="100%" stop-color="#3d8a4a" />
                </linearGradient>
                <linearGradient id="element-cycle-arc-weak" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#c97a5a" />
                  <stop offset="100%" stop-color="#a85a3a" />
                </linearGradient>
                <marker
                  id="element-cycle-arrow"
                  markerWidth="7"
                  markerHeight="7"
                  refX="6"
                  refY="3.5"
                  orient="auto"
                >
                  <path class="element-cycle-wheel__marker-head" d="M0,0 L7,3.5 L0,7 Z" />
                </marker>
                <marker
                  id="element-cycle-arrow-strong"
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                >
                  <path class="element-cycle-wheel__marker-head-strong" d="M0,0 L8,4 L0,8 Z" />
                </marker>
              </defs>
              <circle class="element-cycle-wheel__track-bg" cx="${CX}" cy="${CY}" r="${TRACK_R}" />
              <g class="element-cycle-wheel__arrows">
                ${arcs}
              </g>
              ${nodes}
              <circle class="element-cycle-wheel__core-disc" cx="${CX}" cy="${CY}" r="${CORE_DISC_R}" />
              ${
                showChangeAction
                  ? `
              <foreignObject
                x="${CX - CORE / 2}"
                y="${CY - CORE / 2}"
                width="${CORE}"
                height="${CORE}"
              >
                <div xmlns="http://www.w3.org/1999/xhtml" class="element-cycle-wheel__core">
                  <button
                    type="button"
                    class="btn element-cycle-wheel__change-btn"
                    data-action="Change Element"
                    ${canChange ? "" : "disabled"}
                    ${canChange ? ` aria-label="Change element to ${target.label}"` : ' aria-label="Pick an element on the ring"'}
                  >
                    ${
                      canChange
                        ? `<span class="element-cycle-wheel__change-label">Change</span>`
                        : `<span class="element-cycle-wheel__change-label element-cycle-wheel__change-label--hint">Pick on ring</span>`
                    }
                  </button>
                </div>
              </foreignObject>
              `
                  : `
              <g class="element-cycle-wheel__core-glyphs">
                <text class="element-cycle-wheel__core-icon" x="${CX}" y="${CY - 2}" text-anchor="middle">↻</text>
                <text class="element-cycle-wheel__core-label" x="${CX}" y="${CY + 14}" text-anchor="middle">beats</text>
              </g>
              `
              }
            </svg>
            <p class="element-cycle-wheel__legend">
              <span class="element-cycle-wheel__legend-item element-cycle-wheel__legend-item--win">Green arrow</span>
              = your element wins ·
              <span class="element-cycle-wheel__legend-item element-cycle-wheel__legend-item--lose">Rust arrow</span>
              = you lose
            </p>
      </div>
    </section>
  `;
}