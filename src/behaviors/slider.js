import { indexFromKey, swipeDelta, wrapIndex } from "../logic/slider.js";

const INTERACTIVE = "a, button, input, textarea, select, label";

export function initSlider(root) {
  const slides = [...root.querySelectorAll("[data-slide]")];
  const dots = [...root.querySelectorAll("[data-hero-dot]")];
  const live = root.querySelector("[data-hero-live]");
  if (slides.length < 2 || dots.length !== slides.length) return;

  const autoplayMs = Number(root.dataset.autoplay) || 5000;
  const fadeMs = Number(root.dataset.fade) || 600;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let current = slides.findIndex((slide) => slide.classList.contains("is-active"));
  if (current < 0) current = 0;
  let timer = 0;
  let token = 0;
  let hovered = false;
  let focused = false;
  let pageHidden = document.hidden;

  function autoplayAllowed() {
    return !motion.matches && !hovered && !focused && !pageHidden;
  }

  function stop() {
    window.clearInterval(timer);
    timer = 0;
  }

  function start() {
    stop();
    if (!autoplayAllowed()) return;
    timer = window.setInterval(() => show(current + 1, { user: false }), autoplayMs);
  }

  function syncDots() {
    dots.forEach((dot, index) => {
      if (index === current) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function syncMedia() {
    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", index === current ? "false" : "true");
    });
  }

  function show(index, { user }) {
    const next = wrapIndex(index, slides.length);
    if (next === current) return;

    const generation = ++token;
    const outgoing = current;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-leaving", slideIndex === outgoing);
      slide.classList.toggle("is-active", slideIndex === next);
    });
    current = next;
    syncDots();
    syncMedia();
    if (user && live) live.textContent = `Slide ${current + 1} of ${slides.length}`;

    window.setTimeout(() => {
      if (generation !== token) return;
      slides[outgoing]?.classList.remove("is-leaving");
    }, fadeMs);

    start();
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => show(Number(dot.dataset.heroDot), { user: true }));
    dot.addEventListener("keydown", (event) => {
      const index = Number(dot.dataset.heroDot);
      const next = indexFromKey(index, event.key, slides.length);
      if (next === null) return;
      event.preventDefault();
      show(next, { user: true });
      dots[next]?.focus();
    });
  });

  let tracking = false;
  let startX = 0;
  let startY = 0;

  root.addEventListener(
    "touchstart",
    (event) => {
      if (event.target.closest(INTERACTIVE)) {
        tracking = false;
        return;
      }
      const touch = event.changedTouches[0];
      tracking = true;
      startX = touch.clientX;
      startY = touch.clientY;
    },
    { passive: true },
  );

  root.addEventListener(
    "touchend",
    (event) => {
      if (!tracking) return;
      tracking = false;
      const touch = event.changedTouches[0];
      const delta = swipeDelta(touch.clientX - startX, touch.clientY - startY);
      if (delta) show(current + delta, { user: true });
    },
    { passive: true },
  );

  root.addEventListener("mouseenter", () => {
    hovered = true;
    stop();
  });
  root.addEventListener("mouseleave", () => {
    hovered = false;
    start();
  });
  root.addEventListener("focusin", () => {
    focused = true;
    stop();
  });
  root.addEventListener("focusout", (event) => {
    if (root.contains(event.relatedTarget)) return;
    focused = false;
    start();
  });

  document.addEventListener("visibilitychange", () => {
    pageHidden = document.hidden;
    if (pageHidden) stop();
    else start();
  });

  motion.addEventListener("change", () => {
    if (motion.matches) stop();
    else start();
  });

  syncDots();
  syncMedia();
  start();
}
