# First Table

A beginner-focused fantasy tabletop community site. Guides, a matching quiz, and a sign-up form run entirely in the browser. Nothing is sent to a server.

The layout follows the DnD-Design-26 frames: a full-bleed hero, parchment sections, and three extra pages that stay readable on a phone. Copy lives in `src/content`. Colors live only in `src/styles/tokens.css`.

## Structure

```
index.html                 Landing shell. Copy is injected at build time.
guide.html                 Beginner guide.
quiz.html                  Matching quiz.
signup.html                Player or new DM sign-up.
vite.config.js             Base path /DnD2026/ and the HTML plugin.
src/content/               Page copy, tables, and the default palette.
src/components/            Top bar, hero, schedule, FAQ, fields, footer.
src/render/                Composes a page from a content object.
src/behaviors/             Slider, menu, palette, stepper, FAQ, quiz, sign-up.
src/logic/                 Slide timing, stepper, validation, and table matching.
src/styles/tokens.css      Palette modes a (Tavern) and b (Hearth Night).
src/styles/themes.css      Fraunces, Nunito Sans, and Caveat.
public/                    Favicon and the GitHub Pages marker.
```

## Develop

Requires Node 20 or newer.

```bash
npm install
npm test
npm run dev
```

Open [http://localhost:5173/DnD2026/](http://localhost:5173/DnD2026/).

```bash
npm run build
npm run preview
```

The production preview is [http://127.0.0.1:4173/DnD2026/](http://127.0.0.1:4173/DnD2026/).

## Palettes

Set `data-palette` on `<html>` to `a` (A Tavern, the default) or `b` (B Hearth Night). Components only reference role tokens such as `var(--color-bg-page)`, `var(--color-accent)`, and `var(--color-text-on-accent)`. Ember buttons use the dark ink color for their text.

The footer switcher sets the same attribute. Adding `?palette=b` does too.

## Hero

- Three slides, looping 1 → 2 → 3 → 1.
- Crossfade is 600ms, `ease-in-out`.
- Autoplay waits 5 seconds per slide.
- Autoplay pauses while the pointer is over the hero or focus is inside it, and while the tab is in the background.
- `prefers-reduced-motion: reduce` turns autoplay off and drops the fade.
- Controls are three dots at the bottom right. Below 760px, each dot keeps an 8px mark inside a 44px hit area.

## Quiz and sign-up

The quiz is six questions plus a results step. Table order is scored in the browser. The sign-up form checks name, email, role, time zone, and the table-code agreement, then shows a success message. Nothing leaves the device.

## Deploy to GitHub Pages

Asset URLs use the Vite base `/DnD2026/`.

1. Push the project to GitHub.
2. In the repository settings, open Pages → Build and deployment, and choose GitHub Actions.
3. `.github/workflows/pages.yml` runs the tests, builds `dist/`, and deploys on every push to `main`.

The site is served at `https://<user>.github.io/DnD2026/`.
