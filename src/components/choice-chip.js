import { escapeHtml } from "../render/escape.js";

export function renderChoiceChips({
  name,
  legend,
  options = [],
  variant = "quiz",
  legendHidden = false,
  error = "",
}) {
  const groupId = `${name}-group`;
  const cards = variant === "card";
  const chips = options
    .map((option) => {
      const id = `${name}-${option.value}`;
      const checked = option.selected ? " checked" : "";
      const dis = option.disabled ? " disabled" : "";
      const mark = cards
        ? ""
        : `<span class="choice-chip__mark" aria-hidden="true"></span>`;
      const body = cards
        ? `<span class="choice-chip__kicker" data-kicker-selected="${escapeHtml(option.selectedLabel || "Selected")}" data-kicker-idle="${escapeHtml(option.idleLabel || "Option")}">${escapeHtml(option.selected ? option.selectedLabel || "Selected" : option.idleLabel || "Option")}</span>
        <span class="choice-chip__title">${escapeHtml(option.label)}</span>
        <span class="choice-chip__body">${escapeHtml(option.body || "")}</span>`
        : `<span>${escapeHtml(option.label)}</span>`;
      return `<label class="choice-chip${cards ? " choice-chip--card" : ""}" data-component="choice-chip" for="${escapeHtml(id)}">
        <input class="choice-chip__input" id="${escapeHtml(id)}" type="radio" name="${escapeHtml(name)}" value="${escapeHtml(option.value)}"${checked} aria-describedby="${escapeHtml(groupId)}-error"${dis} />
        ${mark}
        ${body}
      </label>`;
    })
    .join("");
  const legendClass = legendHidden ? ` class="visually-hidden"` : "";
  const listClass = cards ? "choice-chips choice-chips--cards" : "choice-chips";
  const invalid = error ? ` aria-invalid="true"` : "";
  const hidden = error ? "" : " hidden";

  return `<fieldset class="${listClass}" id="${escapeHtml(groupId)}" data-choice-chips${invalid}>
    <legend${legendClass}>${escapeHtml(legend)}</legend>
    <div class="choice-chips__list">${chips}</div>
    <p id="${escapeHtml(groupId)}-error" class="field__error"${hidden}>${escapeHtml(error)}</p>
  </fieldset>`;
}
