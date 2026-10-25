import { renderFooter } from "../components/footer.js";
import { renderHero } from "../components/hero.js";
import { renderTopBar } from "../components/top-bar.js";
import { landing } from "../content/landing.js";
import { escapeHtml } from "./escape.js";
import { renderGuide } from "./guide.js";
import { renderLanding } from "./landing.js";
import { renderQuiz } from "./quiz.js";
import { renderSignup } from "./signup.js";

const PALETTES = new Set(["a", "b"]);

const BODIES = {
  guide: renderGuide,
  quiz: renderQuiz,
  signup: renderSignup,
};

function shell(content) {
  const hero = content.page === "landing";
  const open = hero
    ? `<div class="hero-shell" id="top" data-hero data-autoplay="${Number(content.hero.autoplayMs) || 5000}" data-fade="${Number(content.hero.fadeMs) || 600}">`
    : `<div id="top">`;
  const inside = hero ? `${renderTopBar(content)}\n  ${renderHero(content.hero)}` : renderTopBar(content);
  const main = hero ? renderLanding(content) : BODIES[content.page](content);
  return `<a class="skip-link" href="#main">Skip to content</a>
${open}
  ${inside}
</div>
<main id="main" tabindex="-1">
  ${main}
</main>
${renderFooter(content)}
<noscript>
  <p class="noscript">The hero slider, palette switch, quiz, and sign-up demo need JavaScript. The rest of this page is readable without it.</p>
</noscript>`;
}

export function renderPage(content = landing) {
  const palette = PALETTES.has(content.palette) ? content.palette : "a";
  return {
    palette,
    title: escapeHtml(content.meta.title),
    description: escapeHtml(content.meta.description),
    body: shell(content),
  };
}
