import { escapeHtml } from "../render/escape.js";
import { renderSectionHeader } from "./section-header.js";

export function renderFAQItem(item) {
  const open = Boolean(item.open);
  const expanded = open ? "true" : "false";
  const hidden = open ? "" : " hidden";
  return `<div class="faq-item" data-component="faq-item">
    <h3 class="faq-item__heading">
      <button type="button" class="faq-item__trigger" id="${escapeHtml(item.id)}-button" aria-expanded="${expanded}" aria-controls="${escapeHtml(item.id)}">
        <span>${escapeHtml(item.question)}</span>
      </button>
    </h3>
    <div class="faq-item__panel" id="${escapeHtml(item.id)}" role="region" aria-labelledby="${escapeHtml(item.id)}-button"${hidden}>
      <p>${escapeHtml(item.answer)}</p>
    </div>
  </div>`;
}

export function renderFaq(section) {
  const items = (section.items ?? []).map(renderFAQItem).join("");
  return `<section class="section" data-component="section" id="${escapeHtml(section.id)}" aria-labelledby="${escapeHtml(section.headingId)}">
    <div class="wrap">
      ${renderSectionHeader({ eyebrow: section.eyebrow, title: section.title, note: section.note, id: section.headingId })}
      <div class="faq">${items}</div>
    </div>
  </section>`;
}
