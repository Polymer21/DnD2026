import { renderArtSlot } from "../components/art-slot.js";
import { renderPillArrowButton } from "../components/pill-arrow-button.js";
import { escapeHtml, safeHref } from "./escape.js";

export function renderGuide(content) {
  const article = content.article;
  const sections = article.sections
    .map(
      (section) => `<h2 id="${escapeHtml(section.id)}">${escapeHtml(section.title)}</h2>
      <p>${escapeHtml(section.body)}</p>`,
    )
    .join("");
  const toc = article.sections
    .map(
      (section) =>
        `<a href="#${escapeHtml(section.id)}">${escapeHtml(section.toc)}</a>`,
    )
    .join("");
  const more = content.more
    .map(
      (item) => `<article class="article" id="${escapeHtml(item.id)}">
        <p class="eyebrow">${escapeHtml(item.kicker)}</p>
        <h2>${escapeHtml(item.title)}</h2>
        <p>${escapeHtml(item.lede)}</p>
        <p>${escapeHtml(item.body)}</p>
      </article>`,
    )
    .join("");

  return `<article class="wrap article" id="${escapeHtml(article.id)}">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="${safeHref("index.html#guides")}">Guides</a>
      <span aria-hidden="true">/</span>
      <span>${escapeHtml(article.crumb)}</span>
    </nav>
    <header class="page-intro">
      <p class="eyebrow">${escapeHtml(article.kicker)}</p>
      <h1>${escapeHtml(article.title)}</h1>
      <p>${escapeHtml(article.lede)}</p>
    </header>
    ${renderArtSlot({ ...article.art, size: "wide" })}
    <div class="article-grid">
      <div class="article-body">
        ${sections}
        ${renderArtSlot(article.sheet)}
        <div class="button-row">
          ${renderPillArrowButton(article.prev)}
          ${renderPillArrowButton(article.next)}
        </div>
      </div>
      <aside class="margin-card">
        <p class="margin-note">${escapeHtml(article.note)}</p>
        <nav class="toc" aria-label="${escapeHtml(article.tocTitle)}">
          <p class="eyebrow">${escapeHtml(article.tocTitle)}</p>
          ${toc}
        </nav>
      </aside>
    </div>
    <div class="more-guides">
      <h2>More beginner guides</h2>
      ${more}
    </div>
  </article>`;
}
