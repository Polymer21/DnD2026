import assert from "node:assert/strict";
import test from "node:test";
import { guide } from "../src/content/guide.js";
import { landing } from "../src/content/landing.js";
import { contentFor } from "../src/content/pages.js";
import { quiz } from "../src/content/quiz.js";
import { signup } from "../src/content/signup.js";
import { renderPage } from "../src/render/page.js";

test("each html file maps to its content object", () => {
  assert.equal(contentFor("/index.html"), landing);
  assert.equal(contentFor("/DnD2026/guide.html"), guide);
  assert.equal(contentFor("quiz.html"), quiz);
  assert.equal(contentFor("/signup.html?role=dm"), signup);
  assert.equal(contentFor("/unknown"), landing);
});

test("the landing page renders the shared regions and tavern copy", () => {
  const page = renderPage();
  assert.equal(page.palette, "a");
  assert.match(page.title, /First Table/);
  assert.match(page.body, /id="main"/);
  assert.match(page.body, /Skip to content/);
  assert.match(page.body, /Never played\? Perfect\./);
  assert.match(page.body, /Why first games go wrong/);
  assert.match(page.body, /Learn, match, play, finish/);
  assert.match(page.body, /Making Your Character/);
  assert.match(page.body, /Seats saved for people like you/);
  assert.match(page.body, /Take the chair at the head of the table\./);
  assert.match(page.body, /Free to start\. No paid GMs, no gatekeeping\./);
  assert.match(page.body, /Our table code/);
  assert.match(page.body, /Questions new players ask/);
  assert.match(page.body, /data-component="top-bar"/);
  assert.match(page.body, /data-component="pill-arrow"/);
  assert.match(page.body, /data-component="choice-chip"/);
  assert.match(page.body, /data-component="schedule-row"/);
  assert.match(page.body, /data-component="faq-item"/);
  assert.match(page.body, /data-component="section"/);
  assert.match(page.body, /aria-expanded="true"/);
  assert.match(page.body, /aria-controls="faq-buy"/);
  assert.match(page.body, /data-autoplay="5000"/);
  assert.match(page.body, /data-fade="600"/);
  assert.match(page.body, /--hero-fade: 600ms/);
  assert.equal((page.body.match(/id="how-it-works"/g) || []).length, 1);
  assert.match(page.body, /id="how-heading"/);
  assert.equal(page.body.match(/data-hero-dot=/g).length, 3);
  assert.equal(page.body.match(/data-slide=/g).length, 3);
  assert.doesNotMatch(page.body, /hero__arrow|aria-label="Previous|aria-label="Next/);
  assert.match(page.body, /data-palette-option="a"/);
  assert.match(page.body, /data-palette-option="b"/);
  assert.doesNotMatch(page.body, /data-palette-option="c"/);
});

test("the guide, quiz, and sign-up pages render their frames", () => {
  const guidePage = renderPage(guide);
  assert.match(guidePage.body, /Making Your Character/);
  assert.match(guidePage.body, /Psst: nobody memorises the rules/);
  assert.match(guidePage.body, /Let the sheet do the math/);
  assert.match(guidePage.body, /How a Turn Works/);

  const quizPage = renderPage(quiz);
  assert.match(quizPage.body, /What sounds most fun on a game night\?/);
  assert.match(quizPage.body, /Story — I want to see where the tale goes/);
  assert.match(quizPage.body, /checked/);
  assert.match(quizPage.body, /data-component="textarea"/);
  assert.match(quizPage.body, /data-component="guest-count-stepper"/);
  assert.match(quizPage.body, /role="spinbutton"/);
  assert.match(quizPage.body, /aria-valuemin="1"/);
  assert.match(quizPage.body, /aria-valuemax="4"/);
  assert.match(quizPage.body, /is-current/);

  const signupPage = renderPage(signup);
  assert.match(signupPage.body, /Save your seat\./);
  assert.match(signupPage.body, /id="signup-name"/);
  assert.match(signupPage.body, /id="signup-email"/);
  assert.match(signupPage.body, /id="signup-timezone"/);
  assert.match(signupPage.body, /id="signup-consent" name="consent" type="checkbox" value="yes"/);
  assert.doesNotMatch(signupPage.body, /id="signup-consent"[^>]*checked/);
  assert.match(signupPage.body, /name="website"/);
  assert.match(signupPage.body, /tabindex="-1"/);
  assert.match(signupPage.body, /autocomplete="off"/);
  assert.match(signupPage.body, /aria-hidden="true"/);
  assert.match(signupPage.body, /value="player" checked/);
  assert.match(signupPage.body, /data-signup-state="ready"/);
  assert.match(signupPage.body, /Find My First Table/);
});

test("the error sign-up state keeps the form and uses the config copy", () => {
  const content = structuredClone(signup);
  content.form.state = "error";
  content.form.errors = {
    name: "Enter your name.",
    role: "Choose Player or New DM.",
  };
  const page = renderPage(content);
  assert.match(page.body, /data-signup-state="error"/);
  assert.match(page.body, /id="signup-name"/);
  assert.match(page.body, /aria-invalid="true"/);
  assert.match(page.body, /Enter your name\./);
  assert.match(page.body, /Choose Player or New DM\./);
});

test("content is escaped before it reaches the page", () => {
  const hostile = structuredClone(landing);
  hostile.hero.title = `<img src=x onerror="alert(1)">`;
  hostile.nav[0].href = `javascript:alert(1)`;
  const page = renderPage(hostile);
  assert.match(page.body, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
  assert.doesNotMatch(page.body, /<img src=x/);
  assert.doesNotMatch(page.body, /javascript:alert/);
});
