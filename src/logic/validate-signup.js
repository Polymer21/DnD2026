const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ZONES = new Set([
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Phoenix",
  "America/Los_Angeles",
  "Europe/London",
  "UTC",
]);

export function validateSignup(values) {
  const errors = {};
  const name = String(values.name ?? "").trim();
  const email = String(values.email ?? "").trim();
  const role = String(values.role ?? "").trim();
  const timezone = String(values.timezone ?? "").trim();
  const consent = String(values.consent ?? "").trim();
  const note = values.note == null ? "" : String(values.note);

  if (!name) errors.name = "Enter your name.";
  else if (name.length > 80) errors.name = "Use 80 characters or fewer.";

  if (!email) errors.email = "Enter your email.";
  else if (!EMAIL.test(email)) errors.email = "Enter an email address with an @ and a domain.";

  if (role !== "player" && role !== "dm") errors.role = "Choose Player or New DM.";

  if (!timezone) errors.timezone = "Choose a time zone.";
  else if (!ZONES.has(timezone)) errors.timezone = "Choose a time zone from the list.";

  if (consent !== "yes") errors.consent = "Agree to the table code to save your seat.";

  if (note.length > 400) errors.note = "Use 400 characters or fewer.";

  return { ok: Object.keys(errors).length === 0, errors, name, email, role, timezone };
}

export function successCopy({ name, role }) {
  const seat = role === "dm" ? "a new DM" : "a player";
  return `${name}, your seat is saved as ${seat}.`;
}
