import { renderArtSlot } from "../components/art-slot.js";
import { renderBadge } from "../components/badge.js";
import { renderChoiceChips } from "../components/choice-chip.js";
import { renderFaq } from "../components/faq-item.js";
import { renderPillArrowButton } from "../components/pill-arrow-button.js";
import { renderSchedule } from "../components/schedule-row.js";
import { renderSectionHeader } from "../components/section-header.js";
import { ART_LABEL } from "../content/site.js";
import { escapeHtml } from "./escape.js";

function renderNotice(section) {
  const cards = section.cards
    .map(
      (card) => `<article class="parchment-card">
        <p class="pin-row"><span class="pin" aria-hidden="true"></span><span class="eyebrow">${escapeHtml(card.eyebrow)}</span></p>
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.problem)}</p>
        <hr class="rule" />
        <p class="eyebrow eyebrow--link">The fix</p>
        <p>${escapeHtml(card.fix)}</p>
      </article>`,
    )
    .join("");
  return `<section class="section" data-component="section" id="${escapeHtml(section.id)}" aria-labelledby="${escapeHtml(section.headingId)}">
    <div class="wrap">
      ${renderSectionHeader(section)}
      <div class="card-grid">${cards}</div>
    </div>
  </section>`;
}

function renderHow(section) {
  const steps = section.steps
    .map(
      (step) => `<article class="path-step">
        <div class="path-step__track" aria-hidden="true"><span class="path-step__flame"></span><span class="path-step__rule"></span></div>
        <p class="path-step__num">${escapeHtml(step.number)}</p>
        <h3>${escapeHtml(step.title)}</h3>
        <p>${escapeHtml(step.body)}</p>
      </article>`,
    )
    .join("");
  return `<section class="section section--muted" data-component="section" id="${escapeHtml(section.id)}" aria-labelledby="${escapeHtml(section.headingId)}">
    <div class="wrap">
      ${renderSectionHeader(section)}
      <div class="path">${steps}</div>
    </div>
  </section>`;
}

function renderGuides(section) {
  const cards = section.cards
    .map(
      (card) => `<a class="guide-card" href="${escapeHtml(card.href)}">
        ${renderArtSlot({ label: ART_LABEL, caption: card.caption })}
        <p class="eyebrow">${escapeHtml(card.meta)}</p>
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.body)}</p>
        <p class="guide-card__more">Read the guide →</p>
      </a>`,
    )
    .join("");
  return `<section class="section" data-component="section" id="${escapeHtml(section.id)}" aria-labelledby="${escapeHtml(section.headingId)}">
    <div class="wrap">
      ${renderSectionHeader(section)}
      <div class="guide-grid">${cards}</div>
    </div>
  </section>`;
}

function renderTableCard(table) {
  const badges = table.badges.map(renderBadge).join("");
  return `<article class="table-card" data-table="${escapeHtml(table.id)}">
    <header>
      <p class="eyebrow">${escapeHtml(`${table.percent}% match`)}</p>
      <p class="eyebrow">${escapeHtml(table.seats)}</p>
    </header>
    <h3>${escapeHtml(table.title)}</h3>
    <p class="meta">${escapeHtml(table.meta)}</p>
    <div class="badge-row">${badges}</div>
    ${renderPillArrowButton({ href: "signup.html", label: "Save my seat", variant: "primary" })}
  </article>`;
}

function renderTables(section) {
  const sample = section.sample;
  return `<section class="section section--muted" data-component="section" id="${escapeHtml(section.id)}" aria-labelledby="${escapeHtml(section.headingId)}">
    <div class="wrap">
      ${renderSectionHeader(section)}
      <div class="match">
        <div class="quiz-sample">
          <p class="eyebrow">${escapeHtml(sample.kicker)}</p>
          <h3>${escapeHtml(sample.question)}</h3>
          ${renderChoiceChips({ name: "sample-playstyle", legend: "Playstyle", legendHidden: true, options: sample.options })}
          ${renderPillArrowButton(sample.next)}
        </div>
        <div class="table-list">
          ${section.tables.map(renderTableCard).join("")}
        </div>
      </div>
    </div>
  </section>`;
}

function renderDm(section) {
  return `<section class="section section--inverse" data-component="section" id="${escapeHtml(section.id)}" aria-labelledby="dm-heading">
    <div class="wrap dm">
      ${renderArtSlot({ label: section.label, caption: section.caption, size: "hero" })}
      <div class="dm-copy">
        <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h2 id="dm-heading">${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.body)}</p>
        ${renderPillArrowButton(section.cta)}
      </div>
    </div>
  </section>`;
}

function renderPath(section) {
  const markers = section.markers
    .map((marker) => {
      const soon = marker.now ? "level-marker--now" : "level-marker--soon";
      return `<article class="level-marker ${soon}">
        <span class="level-pin">${escapeHtml(marker.number)}</span>
        <h3>${escapeHtml(marker.title)}</h3>
        <p class="eyebrow">${escapeHtml(marker.status)}</p>
      </article>`;
    })
    .join("");
  return `<section class="section" data-component="section" id="${escapeHtml(section.id)}" aria-labelledby="${escapeHtml(section.headingId)}">
    <div class="wrap">
      ${renderSectionHeader(section)}
      <div class="card-grid">${markers}</div>
    </div>
  </section>`;
}

function renderCost(section) {
  return `<section class="section section--muted" data-component="section" id="${escapeHtml(section.id)}" aria-labelledby="cost-heading">
    <div class="wrap poster">
      <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
      <h2 id="cost-heading">${escapeHtml(section.title)}</h2>
      <p>${escapeHtml(section.body)}</p>
    </div>
  </section>`;
}

function renderCode(section) {
  return `<section class="section" data-component="section" id="${escapeHtml(section.id)}" aria-labelledby="${escapeHtml(section.headingId)}">
    <div class="wrap">
      ${renderSectionHeader(section)}
      ${renderSchedule(section.rows)}
    </div>
  </section>`;
}

export function renderLanding(content) {
  return `${renderNotice(content.notice)}
${renderHow(content.how)}
${renderGuides(content.guides)}
${renderTables(content.tablesSection)}
${renderDm(content.dm)}
${renderPath(content.path)}
${renderCost(content.cost)}
${renderCode(content.code)}
${renderFaq(content.faq)}`;
}
