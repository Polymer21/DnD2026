import { matchTables } from "../logic/match.js";

function list(value) {
  return String(value ?? "")
    .split(/\s+/)
    .filter(Boolean);
}

function readTables(root) {
  return [...root.querySelectorAll("[data-table]")].map((card) => ({
    id: card.dataset.table,
    playstyle: list(card.dataset.playstyle),
    schedule: list(card.dataset.schedule),
    experience: list(card.dataset.experience),
    goals: list(card.dataset.goals),
    personalities: list(card.dataset.personalities),
    card,
  }));
}

export function initQuiz(doc = document) {
  const root = doc.querySelector("[data-quiz]");
  if (!root) return;
  const form = root.querySelector("[data-quiz-form]");
  const steps = [...root.querySelectorAll("[data-quiz-step]")];
  const bars = [...root.querySelectorAll("[data-quiz-progress] li")];
  const kicker = root.querySelector("[data-quiz-kicker]");
  const live = root.querySelector("[data-quiz-live]");
  const actions = root.querySelector("[data-quiz-actions]");
  const back = root.querySelector("[data-quiz-back]");
  const next = root.querySelector("[data-quiz-next]");
  if (!form || steps.length === 0) return;

  let index = Math.max(0, steps.findIndex((step) => step.classList.contains("is-current")));

  function show(nextIndex, { focus = false } = {}) {
    index = nextIndex;
    steps.forEach((step, stepIndex) => {
      step.classList.toggle("is-current", stepIndex === index);
    });
    const step = steps[index];
    const label = step?.dataset.quizKicker || "";
    if (kicker) kicker.textContent = label;
    if (live) live.textContent = label;
    const numeric = Number(step?.dataset.quizStep);
    const filled = step?.dataset.quizStep === "results" ? bars.length : numeric;
    bars.forEach((bar, barIndex) => {
      bar.classList.toggle("is-complete", barIndex < filled);
    });
    const atResults = step?.dataset.quizStep === "results";
    if (actions) actions.hidden = atResults;
    if (back) back.disabled = index === 0;
    if (atResults) rank();
    if (!focus) return;
    const target = step?.querySelector("input, textarea, h1");
    if (target instanceof HTMLHeadingElement) target.tabIndex = -1;
    target?.focus();
  }

  function answers() {
    const data = new FormData(form);
    return {
      playstyle: String(data.get("playstyle") ?? ""),
      schedule: String(data.get("schedule") ?? ""),
      experience: String(data.get("experience") ?? ""),
      goal: String(data.get("goal") ?? ""),
      personality: String(data.get("personality") ?? ""),
    };
  }

  function rank() {
    const host = root.querySelector("[data-quiz-results]");
    if (!host) return;
    const tables = readTables(host);
    const ranked = matchTables(answers(), tables);
    for (const table of ranked) {
      const percent = table.card.querySelector("[data-match-percent]");
      if (percent) percent.textContent = `${table.percent}% match`;
      host.append(table.card);
    }
  }

  back?.addEventListener("click", () => {
    if (index > 0) show(index - 1, { focus: true });
  });
  next?.addEventListener("click", () => {
    if (index < steps.length - 1) show(index + 1, { focus: true });
  });
  form.addEventListener("submit", (event) => event.preventDefault());

  show(index);
}
