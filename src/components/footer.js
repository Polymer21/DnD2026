import { escapeHtml, safeHref } from "../render/escape.js";
import { renderPillArrowButton } from "./pill-arrow-button.js";

export function renderFooter(content) {
  const footer = content.footer;
  const social = footer.social
    .map(
      (item) =>
        `<li><a href="${safeHref(item.href)}">${escapeHtml(item.label)}</a></li>`,
    )
    .join("");
  const palettes = footer.palettes
    .map((palette) => {
      const pressed = palette.id === content.palette ? "true" : "false";
      return `<button type="button" data-palette-option="${escapeHtml(palette.id)}" aria-pressed="${pressed}">${escapeHtml(palette.label)}</button>`;
    })
    .join("");
  const player = renderPillArrowButton({
    label: footer.playerLabel,
    type: "submit",
    name: "role",
    value: "player",
    variant: "primary",
  });
  const dm = renderPillArrowButton({
    label: footer.dmLabel,
    type: "submit",
    name: "role",
    value: "dm",
    variant: "secondary",
  });

  return `<footer class="site-footer">
    <div class="wrap">
      <div class="footer-join">
        <div class="footer-copy">
          <p class="eyebrow">${escapeHtml(footer.eyebrow)}</p>
          <h2>${escapeHtml(footer.title)}</h2>
          <p>${escapeHtml(footer.blurb)}</p>
        </div>
        <form class="footer-form" action="signup.html" method="get">
          <label class="visually-hidden" for="footer-email">Email</label>
          <input id="footer-email" name="email" type="email" autocomplete="email" placeholder="${escapeHtml(footer.emailPlaceholder)}" />
          <div class="button-row">
            ${player}
            ${dm}
          </div>
        </form>
      </div>
      <hr class="footer-rule" />
      <div class="footer-bottom">
        <p>${escapeHtml(footer.legal)}</p>
        <ul class="footer-social">${social}</ul>
      </div>
      <fieldset class="palette-switch">
        <legend>${escapeHtml(footer.paletteLegend)}</legend>
        <div class="palette-switch__options">${palettes}</div>
      </fieldset>
    </div>
  </footer>`;
}
