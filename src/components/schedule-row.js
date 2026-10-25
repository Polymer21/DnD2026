import { escapeHtml } from "../render/escape.js";

export function renderScheduleRow(row) {
  const open = Boolean(row.open);
  const expanded = open ? "true" : "false";
  const hidden = open ? "" : " hidden";
  return `<div class="schedule-row" data-component="schedule-row">
    <h3 class="schedule-row__heading">
      <button type="button" class="schedule-row__trigger" id="${escapeHtml(row.id)}-button" aria-expanded="${expanded}" aria-controls="${escapeHtml(row.id)}">
        <span class="schedule-row__number">${escapeHtml(row.number)}</span>
        <span class="schedule-row__item">${escapeHtml(row.title)}</span>
      </button>
    </h3>
    <div class="schedule-row__panel" id="${escapeHtml(row.id)}" role="region" aria-labelledby="${escapeHtml(row.id)}-button"${hidden}>
      <p>${escapeHtml(row.detail)}</p>
    </div>
  </div>`;
}

export function renderSchedule(rows) {
  return `<div class="schedule">${rows.map(renderScheduleRow).join("")}</div>`;
}
