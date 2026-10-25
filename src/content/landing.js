import { AUTOPLAY_MS, FADE_MS } from "../logic/slider.js";
import { ART_CREDIT, ART_LABEL, site, tables } from "./site.js";

export const landing = {
  ...site,
  page: "landing",
  navTheme: "dark",
  meta: {
    title: "First Table — Never played? Perfect.",
    description:
      "Find your people, learn the basics, and finish your first fantasy tabletop adventure, for free.",
  },
  hero: {
    autoplayMs: AUTOPLAY_MS,
    fadeMs: FADE_MS,
    kicker: "A fantasy tabletop RPG community · Free to start",
    title: "Never played? Perfect.",
    lede: "Find your people, learn the basics, and finish your first adventure, for free.",
    credit: ART_CREDIT,
    actions: [
      { href: "quiz.html", label: "Find My First Table", variant: "primary" },
      { href: "guide.html", label: "Read the Beginner Guides", variant: "secondary" },
    ],
    slides: [
      {
        id: "slide-1",
        kicker: "Slide 1 of 3 · Commissioned human illustration (credit artist)",
        note: "A warm tavern table with an empty chair, lantern glow",
      },
      {
        id: "slide-2",
        kicker: "Slide 2 of 3 · Commissioned human illustration (credit artist)",
        note: "Diverse new players laughing around a table, dice and mugs",
      },
      {
        id: "slide-3",
        kicker: "Slide 3 of 3 · Commissioned human illustration (credit artist)",
        note: "A small, friendly, original dragon mascot by the hearth",
      },
    ],
  },
  notice: {
    id: "notice",
    headingId: "notice-heading",
    eyebrow: "01 — The notice board",
    title: "Why first games go wrong",
    note: "Pinned by the hearth",
    cards: [
      {
        eyebrow: "Problem 01",
        title: "Thrown in the deep end",
        problem: "Rulebooks, jargon and a table of veterans before you know what a d20 is.",
        fix: "Bite-size guides and a first session built for people who have never played.",
      },
      {
        eyebrow: "Problem 02",
        title: "The wrong group",
        problem: "Mismatched expectations: you wanted story, they wanted a three-hour fight.",
        fix: "We match you on playstyle, schedule and goals before you sit down.",
      },
      {
        eyebrow: "Problem 03",
        title: "Cost or pressure",
        problem: "Paid tables, pricey books and the fear of slowing everyone down.",
        fix: "Free to start, beginners only, and a table code that makes questions welcome.",
      },
    ],
  },
  how: {
    id: "how-it-works",
    headingId: "how-heading",
    eyebrow: "02 — How it works",
    title: "Learn, match, play, finish",
    note: "Follow the candles",
    steps: [
      {
        number: "01",
        title: "Learn",
        body: "Short, friendly guides. Ten minutes and you know enough to play.",
      },
      {
        number: "02",
        title: "Match",
        body: "A quick quiz seats you with people who want the same night you do.",
      },
      {
        number: "03",
        title: "Play",
        body: "A first session built for beginners, with a DM who is learning too.",
      },
      {
        number: "04",
        title: "Finish",
        body: "Wrap a complete short adventure and keep your character.",
      },
    ],
  },
  guides: {
    id: "guides",
    headingId: "guides-heading",
    eyebrow: "03 — The bookshelf",
    title: "Beginner guides",
    note: "Start with any one",
    cards: [
      {
        href: "guide.html#guide-01",
        meta: "Guide 01 · 6 min",
        title: "Making Your Character",
        body: "Pick a role that sounds fun. We’ll handle the math.",
        caption: "New players laughing as they fill in character sheets",
      },
      {
        href: "guide.html#guide-02",
        meta: "Guide 02 · 5 min",
        title: "How a Turn Works",
        body: "Move, act, talk. That’s most of it.",
        caption: "A turn laid out like a place setting, dice beside the plate",
      },
      {
        href: "guide.html#guide-03",
        meta: "Guide 03 · 7 min",
        title: "Actions & Consequences",
        body: "Say what you want to do; the dice decide how it goes.",
        caption: "A die mid-roll and a map with a coffee ring",
      },
      {
        href: "guide.html#guide-04",
        meta: "Guide 04 · 4 min",
        title: "When to Lean on Your DM",
        body: "Stuck? Ask. That’s what the chair at the head is for.",
        caption: "The chair at the head of the table, lantern-lit",
      },
    ],
  },
  tablesSection: {
    id: "tables",
    headingId: "tables-heading",
    eyebrow: "04 — Find your table",
    title: "Seats saved for people like you",
    note: "Matched on experience, playstyle, personality and goals",
    sample: {
      kicker: "Question 2 of 6 · Playstyle",
      question: "What sounds most fun on a game night?",
      next: { href: "quiz.html", label: "Next question", variant: "primary" },
      options: [
        { value: "combat", label: "Combat — a clever, tense fight" },
        { value: "story", label: "Story — I want to see where the tale goes", selected: true },
        { value: "exploration", label: "Exploration — maps, ruins, secrets" },
        { value: "social", label: "Social — talking our way through" },
      ],
    },
    tables,
  },
  dm: {
    id: "new-dms",
    eyebrow: "05 — New DMs welcome",
    title: "Take the chair at the head of the table.",
    body: "Run your first game for people just as new as you. You get a ready-made adventure, a one-page cheat sheet and a mentor on call.",
    caption: "The chair at the head of the table, lantern-lit, waiting for a new DM",
    label: ART_LABEL,
    cta: { href: "signup.html?role=dm", label: "Run my first game", variant: "primary" },
  },
  path: {
    id: "path",
    headingId: "path-heading",
    eyebrow: "06 — Your path",
    title: "From first table to veteran",
    note: "Map on the tavern wall",
    markers: [
      { number: "1", title: "Beginner", status: "You are here", now: true },
      { number: "2", title: "Adventurer", status: "Coming soon", now: false },
      { number: "3", title: "Veteran", status: "Coming soon", now: false },
    ],
  },
  cost: {
    id: "cost",
    eyebrow: "07 — Cost",
    title: "Free to start. No paid GMs, no gatekeeping.",
    body: "Guides, matching and your first full adventure cost nothing.",
  },
  code: {
    id: "code",
    headingId: "code-heading",
    eyebrow: "08 — Community promise",
    title: "Our table code",
    note: "Read aloud before session one",
    rows: [
      {
        id: "code-kind",
        number: "01",
        title: "Kind tables",
        detail: "We play to have fun together. Patience over perfection, always.",
        open: true,
      },
      {
        id: "code-safe",
        number: "02",
        title: "Beginner-safe",
        detail: "No gatekeeping, no eye-rolls, and a quick check-in before every session.",
        open: true,
      },
      {
        id: "code-inclusive",
        number: "03",
        title: "Inclusive",
        detail: "Everyone is welcome at the table, whoever you are and wherever you start.",
        open: true,
      },
      {
        id: "code-art",
        number: "04",
        title: "Human art, credited",
        detail: "Every illustration is commissioned from a human artist and credited by name.",
        open: true,
      },
    ],
  },
  faq: {
    id: "faq",
    headingId: "faq-heading",
    eyebrow: "09 — FAQ",
    title: "Questions new players ask",
    note: "No question is too basic",
    items: [
      {
        id: "faq-buy",
        open: true,
        question: "Do I need to buy anything?",
        answer:
          "No. Guides, matching and your first table are free. A free online dice roller works fine.",
      },
      {
        id: "faq-new",
        question: "I have never played. Is that really okay?",
        answer:
          "Yes. Founding tables are for beginners, and the table code says questions are welcome.",
      },
      {
        id: "faq-system",
        question: "What system do you use?",
        answer:
          "First Table is 5e-compatible. You do not need the books to play your first adventure.",
      },
      {
        id: "faq-dm",
        question: "Can I run a game if I have never played?",
        answer:
          "Yes. New DMs get a ready-made adventure, a one-page cheat sheet, and a mentor on call.",
      },
      {
        id: "faq-where",
        question: "Online or in person?",
        answer:
          "Both. Some tables meet online, and some meet in person, including one in Denver.",
      },
    ],
  },
};
