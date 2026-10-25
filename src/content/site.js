export const ART_LABEL = "Commissioned human illustration (credit artist)";
export const ART_CREDIT = "Art by [artist] · commissioned, human-made";

export const site = {
  palette: "a",
  logo: "First Table",
  homeHref: "index.html",
  nav: [
    { href: "guide.html", label: "Guides" },
    { href: "index.html#how-it-works", label: "How It Works" },
    { href: "index.html#new-dms", label: "For New DMs" },
    { href: "index.html#faq", label: "FAQ" },
  ],
  navCta: { href: "quiz.html", label: "Find My Table", variant: "primary" },
  footer: {
    eyebrow: "Founding tables",
    title: "Join the first 10 tables",
    blurb: "One email when your seat opens. No spam, no paid GMs.",
    emailPlaceholder: "you@example.com",
    playerLabel: "Sign up as a Player",
    dmLabel: "Sign up as a DM",
    legal:
      "© First Table · A fantasy tabletop RPG community · 5e-compatible · Human art, credited",
    social: [
      { href: "https://discord.com", label: "Discord" },
      { href: "https://instagram.com", label: "Instagram" },
      { href: "https://youtube.com", label: "YouTube" },
      { href: "https://bsky.app", label: "Bluesky" },
    ],
    paletteLegend: "Palette",
    palettes: [
      { id: "a", label: "Tavern" },
      { id: "b", label: "Hearth Night" },
    ],
  },
};

export const tables = [
  {
    id: "story-thursday",
    percent: 94,
    seats: "4 of 5 seats",
    title: "Story-lovers, Thursday nights, all beginners",
    meta: "Online · Thu 7–10pm MT · Story & social",
    badges: [
      { kind: "safe", label: "Safe table" },
      { kind: "dm", label: "New DM" },
      { kind: "beginners", label: "Beginners only" },
    ],
    playstyle: ["story", "social"],
    schedule: ["evening"],
    experience: ["never", "once", "basics"],
    goals: ["finish", "friends", "learn"],
    personalities: ["helper", "improviser"],
  },
  {
    id: "weekend-explore",
    percent: 88,
    seats: "3 of 5 seats",
    title: "Weekend explorers, cozy pace",
    meta: "Online · Sat 2–5pm MT · Exploration",
    badges: [
      { kind: "safe", label: "Safe table" },
      { kind: "dm", label: "New DM" },
      { kind: "beginners", label: "Beginners only" },
    ],
    playstyle: ["exploration"],
    schedule: ["weekend"],
    experience: ["never", "basics"],
    goals: ["finish", "learn"],
    personalities: ["planner", "improviser"],
  },
  {
    id: "denver-fights",
    percent: 81,
    seats: "2 of 4 seats",
    title: "Brave first fights, lots of laughs",
    meta: "In person · Denver · Combat & social",
    badges: [
      { kind: "safe", label: "Safe table" },
      { kind: "dm", label: "New DM" },
      { kind: "beginners", label: "Beginners only" },
    ],
    playstyle: ["combat", "social"],
    schedule: ["evening", "weekend"],
    experience: ["never", "once"],
    goals: ["friends"],
    personalities: ["spark", "improviser"],
  },
];
