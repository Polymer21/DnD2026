import assert from "node:assert/strict";
import test from "node:test";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../src/config.js";
import { consentFlag, postSignup, signupSource } from "../src/behaviors/signup.js";

const payload = {
  name: "Ada",
  email: "ada@example.com",
  role: "player",
  timezone: "UTC",
  consent: true,
  source: "signup-page",
  website: "",
};

function mockFetch(status, sink) {
  return async (url, options) => {
    sink.push({ url, options });
    if (status === "throw") throw new Error("network down");
    return { status };
  };
}

test("a 201 from Supabase saves the seat", async () => {
  const calls = [];
  const result = await postSignup(payload, mockFetch(201, calls));
  assert.equal(result.ok, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `${SUPABASE_URL}/rest/v1/signups`);
  assert.equal(calls[0].options.method, "POST");
  assert.equal(calls[0].options.headers.apikey, SUPABASE_ANON_KEY);
  assert.equal(calls[0].options.headers.Authorization, `Bearer ${SUPABASE_ANON_KEY}`);
  assert.equal(calls[0].options.headers["Content-Type"], "application/json");
  assert.equal(calls[0].options.headers.Prefer, "return=minimal");
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    name: "Ada",
    email: "ada@example.com",
    role: "player",
    timezone: "UTC",
    consent: true,
    source: "signup-page",
    website: "",
  });
});

test("a duplicate email (409) looks the same as a new signup", async () => {
  const created = await postSignup(payload, mockFetch(201, []));
  const duplicate = await postSignup(payload, mockFetch(409, []));
  assert.deepEqual(duplicate, created);
  assert.equal(duplicate.ok, true);
  assert.equal("duplicate" in duplicate, false);
});

test("other responses and network failures ask for a retry", async () => {
  const server = await postSignup(payload, mockFetch(500, []));
  const offline = await postSignup(payload, mockFetch("throw", []));
  assert.deepEqual(server, { ok: false });
  assert.deepEqual(offline, { ok: false });
});

test("source prefers utm_source and consent is a boolean", () => {
  assert.equal(signupSource(""), "signup-page");
  assert.equal(signupSource("?utm_source=launchpad"), "launchpad");
  assert.equal(consentFlag("yes"), true);
  assert.equal(consentFlag(false), false);
});
