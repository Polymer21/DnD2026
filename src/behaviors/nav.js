export function initNav(doc = document) {
  const toggle = doc.querySelector(".nav-toggle");
  const nav = doc.querySelector("#site-nav");
  if (!toggle || !nav) return;

  const label = toggle.querySelector(".nav-toggle__label");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    if (label) label.textContent = open ? "Close" : "Menu";
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  doc.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
}
