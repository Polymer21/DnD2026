import { escapeHtml } from "../render/escape.js";

export function renderBadge({ kind, label }) {
  return `<span class="badge badge--${escapeHtml(kind)}">${escapeHtml(label)}</span>`;
}
