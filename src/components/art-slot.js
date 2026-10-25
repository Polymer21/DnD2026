import { escapeHtml } from "../render/escape.js";

export function renderArtSlot({ label, caption, credit = "", size = "" }) {
  const sized = size ? ` art-slot--${size}` : "";
  const creditHtml = credit
    ? `<figcaption class="art-credit">— ${escapeHtml(credit)}</figcaption>`
    : "";
  return `<figure class="art-slot${sized}">
    <div class="art-slot__frame">
      <p class="art-slot__label">${escapeHtml(label)}</p>
      <p class="art-slot__caption">${escapeHtml(caption)}</p>
    </div>
    ${creditHtml}
  </figure>`;
}
