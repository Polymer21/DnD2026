import { renderPillArrowButton } from "./pill-arrow-button.js";
import { escapeHtml } from "../render/escape.js";

function renderSlide(slide, index) {
  return `<div class="hero__slide${index === 0 ? " is-active" : ""}" data-slide="${index}" ${index === 0 ? "" : 'aria-hidden="true"'}>
    <div class="hero__caption">
      <p class="hero__slide-kicker">${escapeHtml(slide.kicker)}</p>
      <p class="hero__slide-note">${escapeHtml(slide.note)}</p>
    </div>
  </div>`;
}

function renderDots(slides) {
  return slides
    .map((slide, index) => {
      const current = index === 0 ? ` aria-current="true"` : "";
      const label = `Show slide ${index + 1} of ${slides.length}`;
      return `<button type="button" class="hero__dot" data-hero-dot="${index}" aria-label="${escapeHtml(label)}"${current}></button>`;
    })
    .join("");
}

export function renderHero(hero) {
  const slides = hero.slides ?? [];
  const actions = (hero.actions ?? [])
    .map((action) => renderPillArrowButton(action))
    .join("");

  return `<section class="hero" aria-roledescription="carousel" aria-labelledby="hero-title" style="--hero-fade: ${Number(hero.fadeMs) || 600}ms">
    <div class="hero__slides">
      ${slides.map(renderSlide).join("")}
    </div>
    <div class="hero__layout">
      <div class="hero__copy">
        <p class="eyebrow">${escapeHtml(hero.kicker)}</p>
        <h1 id="hero-title">${escapeHtml(hero.title)}</h1>
        <p class="lede">${escapeHtml(hero.lede)}</p>
        <div class="hero__actions">${actions}</div>
      </div>
    </div>
    <div class="hero__dots">${renderDots(slides)}</div>
    <p class="hero__credit">${escapeHtml(hero.credit)}</p>
    <p class="visually-hidden" data-hero-live aria-live="polite"></p>
  </section>`;
}
