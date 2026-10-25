import { successCopy, validateSignup } from "../logic/validate-signup.js";

const FIELDS = ["role", "name", "email", "timezone", "consent"];

function controlFor(form, name) {
  if (name === "role") return form.querySelector("#role-group");
  return form.elements.namedItem(name);
}

function showError(input, message) {
  if (!input) return;
  const error = input.ownerDocument.getElementById(`${input.id}-error`);
  input.setAttribute("aria-invalid", "true");
  if (input.matches?.("fieldset")) {
    for (const radio of input.querySelectorAll("input")) radio.setAttribute("aria-invalid", "true");
  }
  if (!error) return;
  error.textContent = message;
  error.hidden = false;
}

function clearError(input) {
  if (!input) return;
  const error = input.ownerDocument.getElementById(`${input.id}-error`);
  input.removeAttribute("aria-invalid");
  if (input.matches?.("fieldset")) {
    for (const radio of input.querySelectorAll("input")) radio.removeAttribute("aria-invalid");
  }
  if (!error) return;
  error.textContent = "";
  error.hidden = true;
}

function focusControl(input) {
  if (!input) return;
  if (input.matches?.("fieldset")) {
    const radio = input.querySelector("input:checked") || input.querySelector("input");
    radio?.focus();
    return;
  }
  input.focus();
}

function syncKickers(form) {
  for (const chip of form.querySelectorAll(".choice-chip--card")) {
    const input = chip.querySelector("input");
    const kicker = chip.querySelector(".choice-chip__kicker");
    if (!input || !kicker) continue;
    kicker.textContent = input.checked ? kicker.dataset.kickerSelected : kicker.dataset.kickerIdle;
  }
}

export function initSignup(doc = document) {
  const panel = doc.querySelector("[data-signup]");
  if (!panel) return;
  const form = panel.querySelector("[data-signup-form]");
  const success = panel.querySelector("[data-signup-success]");
  const successCopyNode = panel.querySelector("[data-signup-success-copy]");
  const successTitle = panel.querySelector("[data-signup-success-title]");
  const reset = panel.querySelector("[data-signup-reset]");
  const status = panel.querySelector("[data-signup-status]");
  if (!form || !success || !successCopyNode || !successTitle) return;

  const params = new URLSearchParams(doc.defaultView.location.search);
  const role = params.get("role");
  const email = params.get("email");
  if (role === "dm" || role === "player") {
    const radio = form.querySelector(`input[name="role"][value="${role}"]`);
    if (radio) radio.checked = true;
  }
  if (email && form.elements.namedItem("email")) form.elements.namedItem("email").value = email;
  syncKickers(form);

  let submitted = false;
  let pending = 0;
  const view = doc.defaultView;

  function values() {
    const data = new FormData(form);
    return {
      name: data.get("name"),
      email: data.get("email"),
      role: data.get("role"),
      timezone: data.get("timezone"),
      consent: data.get("consent"),
    };
  }

  function renderErrors(result) {
    let firstInvalid = null;
    for (const name of FIELDS) {
      const input = controlFor(form, name);
      if (!input) continue;
      const message = result.errors[name];
      if (message) {
        showError(input, message);
        firstInvalid ??= input;
      } else {
        clearError(input);
      }
    }
    return firstInvalid;
  }

  function showSuccess(result) {
    successCopyNode.textContent = successCopy(result);
    form.hidden = true;
    success.hidden = false;
    panel.classList.remove("is-submitting");
    panel.dataset.signupState = "success";
    if (status) status.hidden = true;
    successTitle.focus();
  }

  form.addEventListener("change", (event) => {
    if (event.target?.name === "role") syncKickers(form);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (pending) return;
    submitted = true;
    const result = validateSignup(values());
    const firstInvalid = renderErrors(result);
    if (!result.ok) {
      panel.dataset.signupState = "error";
      focusControl(firstInvalid);
      return;
    }

    panel.classList.add("is-submitting");
    panel.dataset.signupState = "submitting";
    if (status) status.hidden = false;
    const submit = form.querySelector("[type='submit']");
    if (submit) submit.disabled = true;
    const reduce = view.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    pending = view.setTimeout(() => {
      pending = 0;
      showSuccess(result);
    }, reduce ? 0 : 600);
  });

  form.addEventListener("input", () => {
    if (!submitted) return;
    renderErrors(validateSignup(values()));
  });

  reset?.addEventListener("click", () => {
    if (pending) view.clearTimeout(pending);
    pending = 0;
    form.reset();
    submitted = false;
    for (const name of FIELDS) clearError(controlFor(form, name));
    const player = form.querySelector('input[name="role"][value="player"]');
    if (player) player.checked = true;
    syncKickers(form);
    const submit = form.querySelector("[type='submit']");
    if (submit) submit.disabled = false;
    panel.classList.remove("is-submitting");
    panel.dataset.signupState = "ready";
    if (status) status.hidden = true;
    form.hidden = false;
    success.hidden = true;
    successCopyNode.textContent = "";
    form.elements.namedItem("name")?.focus();
  });
}
