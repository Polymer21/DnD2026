import { disclosureIndex } from "../logic/disclosure.js";

function toggle(trigger, panel) {
  const open = trigger.getAttribute("aria-expanded") === "true";
  trigger.setAttribute("aria-expanded", open ? "false" : "true");
  if (panel) panel.hidden = open;
}

export function initSchedule(doc = document) {
  const triggers = [...doc.querySelectorAll(".schedule-row__trigger")];
  triggers.forEach((trigger, index) => {
    const panel = doc.getElementById(trigger.getAttribute("aria-controls") ?? "");
    trigger.addEventListener("click", () => toggle(trigger, panel));
    trigger.addEventListener("keydown", (event) => {
      const nextIndex = disclosureIndex(index, event.key, triggers.length);
      if (nextIndex === null || nextIndex === index) return;
      event.preventDefault();
      triggers[nextIndex].focus();
    });
  });
}
