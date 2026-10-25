import { renderChoiceChips } from "../components/choice-chip.js";
import { renderGuestCountStepper } from "../components/guest-count-stepper.js";
import { renderPillArrowButton } from "../components/pill-arrow-button.js";
import { renderTextarea } from "../components/textarea.js";
import { escapeHtml } from "./escape.js";

function tokenList(values) {
  return escapeHtml((values ?? []).join(" "));
}

function renderTable(table) {
  return `<article class="table-card" data-table="${escapeHtml(table.id)}" data-playstyle="${tokenList(table.playstyle)}" data-schedule="${tokenList(table.schedule)}" data-experience="${tokenList(table.experience)}" data-goals="${tokenList(table.goals)}" data-personalities="${tokenList(table.personalities)}">
    <header>
      <p class="eyebrow" data-match-percent>${escapeHtml(`${table.percent}% match`)}</p>
      <p class="eyebrow">${escapeHtml(table.seats)}</p>
    </header>
    <h3>${escapeHtml(table.title)}</h3>
    <p class="meta">${escapeHtml(table.meta)}</p>
  </article>`;
}

export function renderQuiz(content) {
  const total = content.steps.length + 1;
  const progress = Array.from({ length: total }, (_, index) => {
    const complete = index < 2 ? " is-complete" : "";
    return `<li class="${complete.trim()}"></li>`;
  }).join("");

  const currentStep = content.steps.find((step) => step.current) ?? content.steps[0];
  const steps = content.steps
    .map((step) => {
      const current = step.current ? " is-current" : "";
      return `<div class="quiz-step${current}" data-quiz-step="${step.index}" data-quiz-kicker="${escapeHtml(step.eyebrow)}" data-quiz-name="${escapeHtml(step.name)}">
        <h1>${escapeHtml(step.title)}</h1>
        <p>${escapeHtml(step.lede)}</p>
        ${renderChoiceChips({ name: step.name, legend: step.title, legendHidden: true, options: step.options })}
      </div>`;
    })
    .join("");

  const seats = content.seats;
  const results = content.results;

  return `<div class="wrap quiz-column" data-quiz>
    <p class="eyebrow" data-quiz-kicker>${escapeHtml(currentStep.eyebrow)}</p>
    <div class="progress-wrap">
      <p class="visually-hidden" data-quiz-live aria-live="polite">${escapeHtml(currentStep.eyebrow)}</p>
      <ol class="progress" data-quiz-progress aria-label="Quiz progress">${progress}</ol>
    </div>
    <form data-quiz-form>
      ${steps}
      <div class="quiz-step" data-quiz-step="${seats.index}" data-quiz-kicker="${escapeHtml(seats.eyebrow)}" data-quiz-name="seats">
        <h1>${escapeHtml(seats.title)}</h1>
        <p>${escapeHtml(seats.lede)}</p>
        ${renderGuestCountStepper(seats)}
      </div>
      <div class="quiz-step" data-quiz-step="results" data-quiz-kicker="Your matches">
        <h1>${escapeHtml(results.title)}</h1>
        <p>${escapeHtml(results.lede)}</p>
        <div class="quiz-results" data-quiz-results>
          ${content.tables.map(renderTable).join("")}
        </div>
        ${renderTextarea({
          id: "quiz-note",
          name: "note",
          label: results.noteLabel,
          placeholder: results.notePlaceholder,
          hint: results.noteHint,
        })}
        ${renderPillArrowButton(results.cta)}
      </div>
      <div class="button-row" data-quiz-actions>
        ${renderPillArrowButton({ label: content.backLabel, type: "button", variant: "ghost", attributes: ' data-quiz-back' })}
        ${renderPillArrowButton({ label: content.nextLabel, type: "button", variant: "primary", attributes: ' data-quiz-next' })}
      </div>
    </form>
    <p class="margin-note">${escapeHtml(content.note)}</p>
  </div>`;
}
