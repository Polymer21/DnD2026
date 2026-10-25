import { escapeHtml, safeHref } from "../render/escape.js";

export function renderPillArrowButton({
  label,
  href,
  type = "submit",
  disabled = false,
  variant = "primary",
  attributes = "",
  name = "",
  value = "",
}) {
  const classes = ["pill-arrow", variant === "primary" ? "" : `pill-arrow--${variant}`]
    .filter(Boolean)
    .join(" ");
  const text = `<span class="pill-arrow__label">${escapeHtml(label)}</span>`;

  if (href) {
    return `<a class="${classes}" data-component="pill-arrow" href="${safeHref(href)}">${text}</a>`;
  }

  const dis = disabled ? " disabled" : "";
  const named = name ? ` name="${escapeHtml(name)}" value="${escapeHtml(value)}"` : "";
  return `<button class="${classes}" data-component="pill-arrow" type="${escapeHtml(type)}"${named}${dis}${attributes}>${text}</button>`;
}
