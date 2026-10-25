import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../config.js";
import { successCopy, validateSignup } from "../logic/validate-signup.js";

const FIELDS = ["role", "name", "email", "timezone", "consent"];
const RETRY_MESSAGE = "We couldn’t save your seat just now. Please try again.";

export function signupSource(search) {
  const value = String(new URLSearchParams(search).get("utm_source") ?? "").trim();
  return value ? value.slice(0, 80) : "signup-page";
}

export function consentFlag(value) {
  return value === true || value === "yes";
}

export async function postSignup(payload, fetchImpl = globalThis.fetch) {
  try {
    const response = await fetchImpl(`${SUPABASE_URL}/rest/v1/signups`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        role: payload.role,
        timezone: payload.timezone,
        consent: consentFlag(payload.consent),
        source: payload.source,
        website: payload.website ?? "",
      }),
    });
    if (response.status === 201 || response.status === 409) return { ok: true };
    return { ok: false };
  } catch {
    return { ok: false };
  }
}

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

function prefillTimezone(form, view) {
  const field = form.elements.namedItem("timezone");
  if (!field || field.value) return;
  const detected = view.Intl?.DateTimeFormat?.().resolvedOptions?.().timeZone;
  if (!detected) return;
  const known = [...field.options].some((option) => option.value === detected);
  if (known) field.value = detected;
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
  const alert = panel.querySelector("[data-signup-error]");
  if (!form || !success || !successCopyNode || !successTitle) return;

  const view = doc.defaultView;
  const params = new URLSearchParams(view?.location?.search ?? "");
  const role = params.get("role");
  const email = params.get("email");
  if (role === "dm" || role === "player") {
    const radio = form.querySelector(`input[name="role"][value="${role}"]`);
    if (radio) radio.checked = true;
  }
  if (email && form.elements.namedItem("email")) form.elements.namedItem("email").value = email;
  if (view) prefillTimezone(form, view);
  syncKickers(form);

  let submitted = false;
  let pending = false;
  let generation = 0;

  function values() {
    const data = new FormData(form);
    return {
      name: data.get("name"),
      email: data.get("email"),
      role: data.get("role"),
      timezone: data.get("timezone"),
      consent: data.get("consent"),
      website: data.get("website"),
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

  function submitButton() {
    return form.querySelector("[type='submit']");
  }

  function showSuccess(result) {
    successCopyNode.textContent = successCopy(result);
    form.hidden = true;
    success.hidden = false;
    panel.classList.remove("is-submitting");
    panel.dataset.signupState = "success";
    if (status) status.hidden = true;
    if (alert) alert.hidden = true;
    successTitle.focus();
  }

  function showRetry() {
    panel.classList.remove("is-submitting");
    panel.dataset.signupState = "error";
    if (status) status.hidden = true;
    const submit = submitButton();
    if (submit) submit.disabled = false;
    if (alert) {
      alert.textContent = RETRY_MESSAGE;
      alert.hidden = false;
    }
  }

  form.addEventListener("change", (event) => {
    if (event.target?.name === "role") syncKickers(form);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (pending) return;
    submitted = true;
    const current = values();
    const result = validateSignup(current);
    const firstInvalid = renderErrors(result);
    if (!result.ok) {
      panel.dataset.signupState = "error";
      focusControl(firstInvalid);
      return;
    }

    const id = ++generation;
    pending = true;
    panel.classList.add("is-submitting");
    panel.dataset.signupState = "submitting";
    if (status) status.hidden = false;
    if (alert) alert.hidden = true;
    const submit = submitButton();
    if (submit) submit.disabled = true;

    const website = String(current.website ?? "");
    if (website.trim()) {
      pending = false;
      showSuccess(result);
      return;
    }

    const posted = await postSignup(
      {
        name: result.name,
        email: result.email,
        role: result.role,
        timezone: result.timezone,
        consent: true,
        source: signupSource(view?.location?.search ?? ""),
        website: "",
      },
      view?.fetch?.bind(view),
    );
    if (id !== generation) return;
    pending = false;
    if (!posted.ok) {
      showRetry();
      return;
    }
    showSuccess(result);
  });

  form.addEventListener("input", () => {
    if (!submitted) return;
    renderErrors(validateSignup(values()));
  });

  reset?.addEventListener("click", () => {
    generation += 1;
    pending = false;
    form.reset();
    submitted = false;
    for (const name of FIELDS) clearError(controlFor(form, name));
    const player = form.querySelector('input[name="role"][value="player"]');
    if (player) player.checked = true;
    syncKickers(form);
    const submit = submitButton();
    if (submit) submit.disabled = false;
    panel.classList.remove("is-submitting");
    panel.dataset.signupState = "ready";
    if (status) status.hidden = true;
    if (alert) {
      alert.hidden = true;
      alert.textContent = "";
    }
    form.hidden = false;
    success.hidden = true;
    successCopyNode.textContent = "";
    if (view) prefillTimezone(form, view);
    form.elements.namedItem("name")?.focus();
  });
}
