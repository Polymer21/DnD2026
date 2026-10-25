import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const tokens = readFileSync(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
const themes = readFileSync(new URL("../src/styles/themes.css", import.meta.url), "utf8");
const base = readFileSync(new URL("../src/styles/base.css", import.meta.url), "utf8");
const hero = readFileSync(new URL("../src/styles/hero.css", import.meta.url), "utf8");
const sections = readFileSync(new URL("../src/styles/sections.css", import.meta.url), "utf8");
const components = readFileSync(new URL("../src/styles/components.css", import.meta.url), "utf8");

const expected = {
  a: {
    "--color-bg-page": "#f3ead7",
    "--color-bg-surface": "#fbf5e8",
    "--color-bg-muted": "#e8dbbf",
    "--color-bg-inverse": "#5a3e2b",
    "--color-bg-placeholder": "#e8dbbf",
    "--color-text-primary": "#2b2622",
    "--color-text-secondary": "#5a3e2b",
    "--color-text-link": "#28625d",
    "--color-text-on-inverse": "#f3ead7",
    "--color-text-on-accent": "#2b2622",
    "--color-text-on-teal": "#f3ead7",
    "--color-text-error": "#7a2e2e",
    "--color-accent": "#d9772b",
    "--color-accent-hover": "#c9a24a",
    "--color-gold": "#c9a24a",
    "--color-teal": "#2f6f6a",
    "--color-wine": "#7a2e2e",
    "--color-border-default": "#5a3e2b",
    "--color-border-subtle": "#c9a24a",
    "--color-border-focus": "#28625d",
  },
  b: {
    "--color-bg-page": "#1f1a16",
    "--color-bg-surface": "#3a2a1e",
    "--color-bg-muted": "#3a2a1e",
    "--color-bg-inverse": "#f3ead7",
    "--color-bg-placeholder": "#5a3e2b",
    "--color-text-primary": "#f3ead7",
    "--color-text-secondary": "#c9a24a",
    "--color-text-link": "#c9a24a",
    "--color-text-on-inverse": "#2b2622",
    "--color-text-on-accent": "#2b2622",
    "--color-text-on-teal": "#f3ead7",
    "--color-text-error": "#c9a24a",
    "--color-accent": "#d9772b",
    "--color-accent-hover": "#c9a24a",
    "--color-gold": "#c9a24a",
    "--color-teal": "#2f6f6a",
    "--color-wine": "#7a2e2e",
    "--color-border-default": "#c9a24a",
    "--color-border-subtle": "#5a3e2b",
    "--color-border-focus": "#c9a24a",
  },
};

const textPairs = [
  ["--color-text-primary", "--color-bg-page"],
  ["--color-text-secondary", "--color-bg-page"],
  ["--color-text-primary", "--color-bg-surface"],
  ["--color-text-secondary", "--color-bg-surface"],
  ["--color-text-primary", "--color-bg-muted"],
  ["--color-text-secondary", "--color-bg-muted"],
  ["--color-text-link", "--color-bg-page"],
  ["--color-text-link", "--color-bg-surface"],
  ["--color-text-on-accent", "--color-accent"],
  ["--color-text-on-accent", "--color-accent-hover"],
  ["--color-text-on-teal", "--color-teal"],
  ["--color-text-on-inverse", "--color-bg-inverse"],
  ["--color-text-error", "--color-bg-page"],
  ["--color-text-error", "--color-bg-surface"],
  ["--color-text-placeholder", "--color-bg-input"],
  ["--color-text-primary", "--color-bg-placeholder"],
];

function lin(channel) {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function lum(hex) {
  const h = hex.replace("#", "");
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(foreground, background) {
  const lighter = Math.max(lum(foreground), lum(background));
  const darker = Math.min(lum(foreground), lum(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function paletteBlock(id) {
  const match = tokens.match(new RegExp(`:root\\[data-palette="${id}"\\]\\s*\\{([^}]+)\\}`));
  assert.ok(match, `missing palette ${id}`);
  const values = {};
  for (const line of match[1].split("\n")) {
    const token = line.match(/(--color-[\w-]+):\s*(#[0-9a-fA-F]{6})/);
    if (token) values[token[1]] = token[2].toLowerCase();
  }
  return values;
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, files);
    else files.push(path);
  }
  return files;
}

test("palette tokens match the Figma modes and clear AA", () => {
  assert.match(tokens, /--color-focus-ring:\s*var\(--color-border-focus\)/);
  assert.equal(tokens.match(/--color-focus-ring/g).length, 1);
  assert.doesNotMatch(tokens, /data-palette="c"/);

  for (const id of ["a", "b"]) {
    const values = paletteBlock(id);
    for (const [token, hex] of Object.entries(expected[id])) {
      assert.equal(values[token], hex, `${id} ${token}`);
    }
    assert.equal(values["--color-text-on-accent"], "#2b2622");
    for (const [foreground, background] of textPairs) {
      const ratio = contrast(values[foreground], values[background]);
      assert.ok(ratio >= 4.5, `${id} ${foreground} on ${background} is ${ratio.toFixed(2)}`);
    }
    for (const [foreground, background] of [
      ["--color-border-input", "--color-bg-input"],
      ["--color-border-focus", "--color-bg-page"],
      ["--color-border-error", "--color-bg-input"],
    ]) {
      const ratio = contrast(values[foreground], values[background]);
      assert.ok(ratio >= 3, `${id} ${foreground} on ${background} is ${ratio.toFixed(2)}`);
    }
  }
});

test("component styles do not hardcode colors", () => {
  const root = new URL("..", import.meta.url).pathname;
  const files = walk(join(root, "src")).filter((file) => /\.(css|js)$/.test(file));
  const offenders = [];
  for (const file of files) {
    if (file.endsWith("tokens.css")) continue;
    const source = readFileSync(file, "utf8");
    if (/#[0-9a-fA-F]{3,8}\b/.test(source)) offenders.push(file);
  }
  assert.deepEqual(offenders, []);
});

test("fonts stay Fraunces, Nunito Sans, and Caveat in the theme", () => {
  assert.match(themes, /Fraunces/);
  assert.match(themes, /Nunito Sans/);
  assert.match(themes, /Caveat/);
  assert.match(base, /var\(--font-display\)/);
  assert.match(base, /var\(--font-body\)/);
  assert.match(base, /var\(--font-accent\)/);

  const root = new URL("..", import.meta.url).pathname;
  const files = walk(join(root, "src")).filter((file) => file.endsWith(".css"));
  const offenders = [];
  for (const file of files) {
    if (file.endsWith("themes.css") || file.endsWith("fonts.css")) continue;
    const source = readFileSync(file, "utf8");
    if (/Fraunces|Nunito Sans|Caveat/.test(source)) offenders.push(file);
  }
  assert.deepEqual(offenders, []);
});

test("the hero keeps the specified size, timing, and dot treatment", () => {
  assert.match(base, /--hero-height:\s*calc\(720 \* 100svh \/ 844\)/);
  assert.match(base, /--hero-height:\s*calc\(860 \* 100svh \/ 900\)/);
  assert.match(base, /--hero-fade:\s*600ms/);
  assert.match(hero, /ease-in-out/);
  assert.match(hero, /width:\s*8px/);
  assert.match(hero, /height:\s*8px/);
  assert.match(hero, /\.hero \.eyebrow\s*\{[^}]*var\(--color-text-on-inverse\)/);
  assert.match(base, /prefers-reduced-motion/);
  assert.match(base, /\[hidden\]\s*\{[^}]*display:\s*none\s*!important/);
});

test("chips, disclosures, and buttons use palette tokens", () => {
  assert.match(components, /\.choice-chip:hover\s*\{[^}]*var\(--color-bg-muted\)/);
  assert.match(components, /\.choice-chip:has\(:disabled\)[\s\S]*var\(--color-bg-disabled\)/);
  assert.match(components, /\.choice-chip:has\(:disabled\)[\s\S]*var\(--color-text-disabled\)/);
  assert.match(components, /\.choice-chip:has\(:checked\)\s*\{[^}]*border-width:\s*2px/);
  assert.match(components, /\.choice-chip:has\(:checked\)\s*\{[^}]*var\(--color-accent\)/);
  assert.match(components, /\.faq-item__trigger:hover\s*\{[^}]*var\(--color-bg-muted\)/);
  assert.match(components, /\.faq-item__trigger:focus-visible\s*\{[^}]*outline-offset:\s*-3px/);
  assert.match(components, /\.schedule-row:has\(\.schedule-row__trigger:hover\)\s*\{[^}]*var\(--color-bg-muted\)/);
  assert.match(components, /\.schedule-row:has\(\.schedule-row__trigger:focus-visible\)\s*\{[^}]*var\(--color-focus-ring\)/);
  assert.match(components, /\.pill-arrow:hover\s*\{[^}]*var\(--color-accent-hover\)/);
  assert.match(components, /\.pill-arrow\s*\{[^}]*var\(--color-text-on-accent\)/);
});

test("at 390px the logo, hero dots, and footer links have a 44px target", () => {
  const heroMobile = hero.slice(hero.indexOf("@media (max-width: 759px)"));
  assert.match(hero, /\.logo\s*\{[^}]*min-height:\s*44px/);
  assert.match(heroMobile, /\.hero__dot\s*\{[^}]*width:\s*44px;\s*height:\s*44px/);
  assert.match(heroMobile, /width:\s*8px;\s*height:\s*8px/);
  const footerMobile = sections.slice(sections.indexOf("@media (max-width: 759px)"));
  assert.match(footerMobile, /\.site-footer a\s*\{[^}]*min-height:\s*44px/);
});
