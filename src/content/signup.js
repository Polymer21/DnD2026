import { ART_CREDIT, ART_LABEL, site } from "./site.js";

export const timeZones = [
  { value: "America/New_York", label: "America/New_York (ET)" },
  { value: "America/Chicago", label: "America/Chicago (CT)" },
  { value: "America/Denver", label: "America/Denver (MT)" },
  { value: "America/Phoenix", label: "America/Phoenix (MST)" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles (PT)" },
  { value: "Europe/London", label: "Europe/London (GMT)" },
  { value: "UTC", label: "UTC" },
];

export const signup = {
  ...site,
  page: "signup",
  navTheme: "light",
  meta: {
    title: "Save your seat — First Table",
    description: "Free to start. Tell us how you want to play and we’ll find your table.",
  },
  form: {
    state: "ready",
    eyebrow: "Join the first 10 tables",
    title: "Save your seat.",
    lede: "Free to start. Tell us how you want to play and we’ll find your table.",
    submit: "Find My First Table",
    roleLegend: "How do you want to join?",
    roles: [
      {
        value: "player",
        label: "Player",
        body: "I want to play my first game.",
        selected: true,
        selectedLabel: "Selected",
        idleLabel: "Option",
      },
      {
        value: "dm",
        label: "New DM",
        body: "I want to run a game for beginners.",
        selectedLabel: "Selected",
        idleLabel: "Option",
      },
    ],
    fields: {
      name: "Your name",
      namePlaceholder: "What should the table call you?",
      email: "Email",
      emailPlaceholder: "you@example.com",
      timezone: "Time zone",
      timezonePlaceholder: "America/Denver (MT)",
      consent: "I agree to the table code: kind, beginner-safe, inclusive.",
    },
    zones: timeZones,
    errors: {},
    successTitle: "You’re on the list.",
  },
  aside: {
    label: ART_LABEL,
    caption: "A small, friendly, original dragon mascot by the hearth, saving you a seat",
    credit: ART_CREDIT,
    badges: [
      { kind: "safe", label: "Safe table" },
      { kind: "beginners", label: "Beginners only" },
      { kind: "system", label: "5e-compatible" },
    ],
  },
};
