import { escapeHtml, safeHref } from "../render/escape.js";
import { renderNav } from "./nav.js";
import { renderPillArrowButton } from "./pill-arrow-button.js";

export function renderTopBar(content) {
  const theme = content.navTheme === "light" ? "topbar--light" : "topbar--dark";
  const cta = renderPillArrowButton(content.navCta);
  return `<header class="topbar ${theme}" data-component="top-bar">
    <div class="topbar__inner">
      <a class="logo" href="${safeHref(content.homeHref || "index.html")}">
        <span class="logo__mark" aria-hidden="true"></span>
        <span>${escapeHtml(content.logo)}</span>
      </a>
      <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav">
        <span class="nav-toggle__label">Menu</span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Primary">
        ${renderNav(content.nav)}
        ${cta}
      </nav>
    </div>
  </header>`;
}
