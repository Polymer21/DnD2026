import { escapeHtml } from "../render/escape.js";

export function renderSectionHeader({ eyebrow, title, note, id, headingId }) {
  const heading = headingId || id;
  return `<header class="section-header">
    <p class="eyebrow">${escapeHtml(eyebrow)}</p>
    <h2 id="${escapeHtml(heading)}">${escapeHtml(title)}</h2>
    ${note ? `<p class="margin-note">${escapeHtml(note)}</p>` : ""}
  </header>`;
}
