const PALETTES = new Set(["a", "b"]);

export function applyPalette(doc, id) {
  if (!PALETTES.has(id)) return;
  doc.documentElement.dataset.palette = id;
  doc.querySelectorAll("[data-palette-option]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.paletteOption === id ? "true" : "false");
  });
}

export function initPalette(doc = document) {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("palette");
  if (PALETTES.has(fromQuery)) applyPalette(doc, fromQuery);

  doc.querySelectorAll("[data-palette-option]").forEach((button) => {
    button.addEventListener("click", () => {
      applyPalette(doc, button.dataset.paletteOption);
    });
  });
}
