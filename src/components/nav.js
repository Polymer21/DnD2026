import { escapeHtml, safeHref } from "../render/escape.js";

export function renderNav(items) {
  const links = items
    .map(
      (item) =>
        `<li><a href="${safeHref(item.href)}">${escapeHtml(item.label)}</a></li>`,
    )
    .join("");
  return `<ul>${links}</ul>`;
}
