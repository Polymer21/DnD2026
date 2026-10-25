import { escapeHtml } from "../render/escape.js";

export function renderTextarea({
  id,
  name,
  label,
  placeholder = "",
  hint = "",
  value = "",
  rows = 4,
}) {
  const hintHtml = hint
    ? `<p class="field__hint" id="${escapeHtml(id)}-hint">${escapeHtml(hint)}</p>`
    : "";
  const described = hint ? ` aria-describedby="${escapeHtml(id)}-hint ${escapeHtml(id)}-error"` : ` aria-describedby="${escapeHtml(id)}-error"`;
  return `<div class="field">
    <label for="${escapeHtml(id)}">${escapeHtml(label)}</label>
    <textarea class="textarea" data-component="textarea" id="${escapeHtml(id)}" name="${escapeHtml(name)}" rows="${Number(rows) || 4}" placeholder="${escapeHtml(placeholder)}"${described}>${escapeHtml(value)}</textarea>
    ${hintHtml}
    <p class="field__error" id="${escapeHtml(id)}-error" hidden></p>
  </div>`;
}
