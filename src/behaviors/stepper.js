import { clampCount, countFromKey } from "../logic/stepper.js";

export function initSteppers(doc = document) {
  for (const stepper of doc.querySelectorAll("[data-stepper]")) {
    const input = stepper.querySelector("[role='spinbutton']");
    const dec = stepper.querySelector("[data-stepper-dec]");
    const inc = stepper.querySelector("[data-stepper-inc]");
    if (!input) continue;

    const min = Number(stepper.dataset.min ?? input.getAttribute("aria-valuemin"));
    const max = Number(stepper.dataset.max ?? input.getAttribute("aria-valuemax"));
    const locked = input.disabled;
    const view = doc.defaultView;

    function setValue(next, notify) {
      const value = String(next);
      input.value = value;
      input.disabled = locked;
      input.setAttribute("aria-valuenow", value);
      if (dec) dec.disabled = locked || next <= min;
      if (inc) inc.disabled = locked || next >= max;
      if (notify) input.dispatchEvent(new view.Event("input", { bubbles: true }));
    }

    function current() {
      return clampCount(input.value, min, max);
    }

    setValue(current() ?? min, false);

    input.addEventListener("keydown", (event) => {
      const next = countFromKey(input.value, event.key, min, max);
      if (next === null) return;
      event.preventDefault();
      setValue(next, true);
    });

    input.addEventListener("change", () => {
      setValue(current() ?? min, true);
    });

    dec?.addEventListener("click", () => {
      const value = current() ?? min;
      setValue(Math.max(min, value - 1), true);
    });

    inc?.addEventListener("click", () => {
      const value = current() ?? min;
      setValue(Math.min(max, value + 1), true);
    });

    input.form?.addEventListener("reset", () => {
      view.setTimeout(() => setValue(current() ?? min, false), 0);
    });
  }
}
