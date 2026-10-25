import { escapeHtml } from "../render/escape.js";

export function renderGuestCountStepper({
  id,
  name = "seats",
  label,
  hint = "",
  min = 1,
  max = 4,
  value = 1,
}) {
  const hintHtml = hint
    ? `<p class="field__hint" id="${escapeHtml(id)}-hint">${escapeHtml(hint)}</p>`
    : "";
  return `<div class="field" data-component="guest-count-stepper" data-stepper data-min="${Number(min)}" data-max="${Number(max)}">
    <label for="${escapeHtml(id)}">${escapeHtml(label)}</label>
    <div class="stepper__control">
      <button type="button" class="stepper__button" data-stepper-dec aria-label="Fewer seats">−</button>
      <input class="stepper__value" id="${escapeHtml(id)}" name="${escapeHtml(name)}" role="spinbutton" inputmode="numeric" aria-valuemin="${Number(min)}" aria-valuemax="${Number(max)}" aria-valuenow="${Number(value)}" value="${Number(value)}" aria-describedby="${escapeHtml(id)}-hint" />
      <button type="button" class="stepper__button" data-stepper-inc aria-label="More seats">+</button>
    </div>
    ${hintHtml}
  </div>`;
}
