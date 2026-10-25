const ESCAPE = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ESCAPE[char]);
}

export function safeHref(value) {
  const href = String(value ?? "");
  if (
    href.startsWith("#") ||
    href.startsWith("./") ||
    href.startsWith("/") ||
    /^https?:\/\//.test(href) ||
    /^[a-z0-9.-]+\.html(?:[?#][^\s]*)?$/i.test(href)
  ) {
    return escapeHtml(href);
  }
  return "#";
}
