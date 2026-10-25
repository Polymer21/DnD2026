import { renderArtSlot } from "../components/art-slot.js";
import { renderBadge } from "../components/badge.js";
import { renderChoiceChips } from "../components/choice-chip.js";
import { renderPillArrowButton } from "../components/pill-arrow-button.js";
import { escapeHtml } from "./escape.js";

function fieldError(id, message) {
  const hidden = message ? "" : " hidden";
  return `<p class="field__error" id="${escapeHtml(id)}-error"${hidden}>${escapeHtml(message || "")}</p>`;
}

export function renderSignup(content) {
  const form = content.form;
  const state = form.state || "ready";
  const errors = form.errors || {};
  const replaced = state === "success";
  const invalid = (name) => (errors[name] ? ` aria-invalid="true"` : "");
  const zones = [
    `<option value="" selected disabled>${escapeHtml(form.fields.timezonePlaceholder)}</option>`,
    ...form.zones.map(
      (zone) =>
        `<option value="${escapeHtml(zone.value)}">${escapeHtml(zone.label)}</option>`,
    ),
  ].join("");
  const badges = content.aside.badges.map(renderBadge).join("");
  const formHidden = replaced ? ` hidden` : "";
  const successHidden = replaced ? "" : " hidden";

  return `<div class="wrap signup-split">
    <div class="signup-form" data-signup data-signup-state="${escapeHtml(state)}">
      <form class="signup-fields" data-signup-form${formHidden}${state === "submitting" ? ' aria-busy="true"' : ""}>
        <header class="signup-copy">
          <p class="eyebrow">${escapeHtml(form.eyebrow)}</p>
          <h1>${escapeHtml(form.title)}</h1>
          <p>${escapeHtml(form.lede)}</p>
        </header>
        <p class="form-error" role="alert" data-signup-error${state === "error" ? "" : " hidden"}>${state === "error" ? escapeHtml(form.errorTitle || "Check the highlighted fields.") : ""}</p>
        ${renderChoiceChips({
          name: "role",
          legend: form.roleLegend,
          legendHidden: true,
          variant: "card",
          options: form.roles,
          error: errors.role || "",
        })}
        <div class="field">
          <label for="signup-name">${escapeHtml(form.fields.name)}</label>
          <input id="signup-name" name="name" type="text" autocomplete="name" placeholder="${escapeHtml(form.fields.namePlaceholder)}" aria-describedby="signup-name-error"${invalid("name")} />
          ${fieldError("signup-name", errors.name)}
        </div>
        <div class="field">
          <label for="signup-email">${escapeHtml(form.fields.email)}</label>
          <input id="signup-email" name="email" type="email" autocomplete="email" placeholder="${escapeHtml(form.fields.emailPlaceholder)}" aria-describedby="signup-email-error"${invalid("email")} />
          ${fieldError("signup-email", errors.email)}
        </div>
        <div class="field">
          <label for="signup-timezone">${escapeHtml(form.fields.timezone)}</label>
          <select id="signup-timezone" name="timezone" autocomplete="on" aria-describedby="signup-timezone-error"${invalid("timezone")}>${zones}</select>
          ${fieldError("signup-timezone", errors.timezone)}
        </div>
        <div class="field">
          <label class="check" for="signup-consent">
            <input id="signup-consent" name="consent" type="checkbox" value="yes" aria-describedby="signup-consent-error"${invalid("consent")} />
            <span>${escapeHtml("I agree to the ")}<a href="index.html#code">table code</a>: kind, beginner-safe, inclusive.</span>
          </label>
          ${fieldError("signup-consent", errors.consent)}
        </div>
        <div class="visually-hidden" aria-hidden="true">
          <label for="signup-website">Website</label>
          <input id="signup-website" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" />
        </div>
        <p class="form-status" data-signup-status${state === "submitting" ? "" : " hidden"}>Saving your seat…</p>
        ${renderPillArrowButton({ label: form.submit, type: "submit", variant: "primary" })}
      </form>
      <div class="signup-success" data-signup-success${successHidden}>
        <h2 tabindex="-1" data-signup-success-title>${escapeHtml(form.successTitle)}</h2>
        <p data-signup-success-copy>${escapeHtml(form.successBody || "")}</p>
        <button type="button" class="pill-arrow pill-arrow--ghost" data-component="pill-arrow" data-signup-reset>Edit my answers</button>
      </div>
    </div>
    <aside class="signup-aside">
      ${renderArtSlot({ ...content.aside, size: "hero" })}
      <div class="badge-row">${badges}</div>
    </aside>
  </div>`;
}
