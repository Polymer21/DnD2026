export function initFaq(doc = document) {
  for (const trigger of doc.querySelectorAll(".faq-item__trigger")) {
    const panel = doc.getElementById(trigger.getAttribute("aria-controls") ?? "");
    trigger.addEventListener("click", () => {
      const open = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel) panel.hidden = open;
    });
  }
}
