import assert from "node:assert/strict";
import test from "node:test";
import { disclosureIndex } from "../src/logic/disclosure.js";
import { matchTables, scoreTable } from "../src/logic/match.js";
import { AUTOPLAY_MS, FADE_MS, indexFromKey, swipeDelta, wrapIndex } from "../src/logic/slider.js";
import { clampCount, countFromKey } from "../src/logic/stepper.js";
import { successCopy, validateSignup } from "../src/logic/validate-signup.js";
import { tables } from "../src/content/site.js";

test("slides loop 1-2-3-1", () => {
  assert.equal(wrapIndex(0, 3), 0);
  assert.equal(wrapIndex(1, 3), 1);
  assert.equal(wrapIndex(2, 3), 2);
  assert.equal(wrapIndex(3, 3), 0);
  assert.equal(wrapIndex(-1, 3), 2);
});

test("autoplay and fade match the hero spec", () => {
  assert.equal(AUTOPLAY_MS, 5000);
  assert.equal(FADE_MS, 600);
});

test("arrow keys move from the focused dot and loop", () => {
  assert.equal(indexFromKey(0, "ArrowRight", 3), 1);
  assert.equal(indexFromKey(2, "ArrowRight", 3), 0);
  assert.equal(indexFromKey(0, "ArrowLeft", 3), 2);
  assert.equal(indexFromKey(1, "Home", 3), 0);
  assert.equal(indexFromKey(0, "End", 3), 2);
  assert.equal(indexFromKey(1, "Enter", 3), null);
});

test("horizontal swipes move slides and vertical drags do not", () => {
  assert.equal(swipeDelta(-80, 10), 1);
  assert.equal(swipeDelta(80, 10), -1);
  assert.equal(swipeDelta(10, 0), 0);
  assert.equal(swipeDelta(-40, 80), 0);
  assert.equal(swipeDelta(48, 48), 0);
});

test("the guest stepper stays inside min and max and responds to keys", () => {
  assert.equal(clampCount("2", 1, 4), 2);
  assert.equal(clampCount("0", 1, 4), 1);
  assert.equal(clampCount("14", 1, 4), 4);
  assert.equal(clampCount("nope", 1, 4), null);
  assert.equal(countFromKey("2", "ArrowUp", 1, 4), 3);
  assert.equal(countFromKey("2", "ArrowDown", 1, 4), 1);
  assert.equal(countFromKey("1", "ArrowDown", 1, 4), 1);
  assert.equal(countFromKey("4", "ArrowUp", 1, 4), 4);
  assert.equal(countFromKey("2", "Home", 1, 4), 1);
  assert.equal(countFromKey("2", "End", 1, 4), 4);
  assert.equal(countFromKey("", "ArrowUp", 1, 4), 1);
  assert.equal(countFromKey("2", "Enter", 1, 4), null);
});

test("schedule rows move between triggers from the keyboard", () => {
  assert.equal(disclosureIndex(0, "ArrowDown", 4), 1);
  assert.equal(disclosureIndex(3, "ArrowDown", 4), 3);
  assert.equal(disclosureIndex(1, "ArrowUp", 4), 0);
  assert.equal(disclosureIndex(0, "ArrowUp", 4), 0);
  assert.equal(disclosureIndex(1, "Home", 4), 0);
  assert.equal(disclosureIndex(0, "End", 4), 3);
  assert.equal(disclosureIndex(1, "Enter", 4), null);
});

test("sign-up validation accepts a complete response and rejects empty fields", () => {
  const valid = validateSignup({
    name: "Ada Lovelace",
    email: "ada@example.com",
    role: "player",
    timezone: "America/Denver",
    consent: "yes",
  });
  assert.equal(valid.ok, true);

  const empty = validateSignup({
    name: " ",
    email: "not-an-email",
    role: "",
    timezone: "",
    consent: "",
    note: "x".repeat(401),
  });
  assert.equal(empty.ok, false);
  assert.ok(empty.errors.name);
  assert.ok(empty.errors.email);
  assert.ok(empty.errors.role);
  assert.ok(empty.errors.timezone);
  assert.ok(empty.errors.consent);
});

test("success copy stays on the device and names the guest", () => {
  const player = successCopy({ name: "Ada", role: "player" });
  assert.match(player, /Ada/);
  assert.match(player, /player/);
  assert.match(player, /Nothing was sent/);
  const dm = successCopy({ name: "Grace", role: "dm" });
  assert.match(dm, /new DM/);
});

test("a story-leaning party ranks the Thursday table first", () => {
  const answers = {
    playstyle: "story",
    schedule: "evening",
    experience: "never",
    goal: "finish",
    personality: "helper",
  };
  const ranked = matchTables(answers, tables);
  assert.equal(ranked[0].id, "story-thursday");
  assert.ok(ranked[0].percent > ranked[1].percent);
  assert.equal(scoreTable(answers, tables[0]), 99);
});
