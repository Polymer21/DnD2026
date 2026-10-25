import { ART_CREDIT, ART_LABEL, site } from "./site.js";

export const guide = {
  ...site,
  page: "guide",
  navTheme: "light",
  meta: {
    title: "Making Your Character — First Table",
    description:
      "Pick a role that sounds fun. By the end of this guide you’ll have a character you can bring to your first table.",
  },
  article: {
    id: "guide-01",
    crumb: "Making Your Character",
    kicker: "Guide 01 · 6 min read · 5e-compatible",
    title: "Making Your Character",
    lede: "Pick a role that sounds fun. We’ll handle the math. By the end of this page you’ll have a character you can bring to your first table.",
    art: {
      label: ART_LABEL,
      caption: "New players laughing as they fill in character sheets, dice and mugs on the table",
      credit: ART_CREDIT,
    },
    note: "Psst: nobody memorises the rules. Not even your DM.",
    tocTitle: "In this guide",
    sections: [
      {
        id: "pick-fun",
        title: "1. Pick what sounds fun",
        toc: "Pick what sounds fun",
        body: "Do you want to swing a sword, cast spells, sneak, or talk your way through trouble? Choose the feeling first. The class will follow.",
      },
      {
        id: "background",
        title: "2. Choose a background",
        toc: "Choose a background",
        body: "A background is who you were before the adventure: a baker, a sailor, a scholar. It gives you a few skills and a story hook.",
      },
      {
        id: "sheet",
        title: "3. Let the sheet do the math",
        toc: "Let the sheet do the math",
        body: "Your character sheet tracks the numbers. Your DM and table will help you fill it in at session zero.",
      },
    ],
    sheet: {
      label: ART_LABEL,
      caption: "Annotated character sheet",
    },
    prev: { href: "index.html#guides", label: "← All guides", variant: "ghost" },
    next: { href: "#guide-02", label: "Next: How a Turn Works", variant: "primary" },
  },
  more: [
    {
      id: "guide-02",
      kicker: "Guide 02 · 5 min read",
      title: "How a Turn Works",
      lede: "Move, act, talk. That’s most of it.",
      body: "On your turn you say where you go, what you try, and who you talk to. The table helps with the order. You do not need to memorise an action list before you sit down.",
    },
    {
      id: "guide-03",
      kicker: "Guide 03 · 7 min read",
      title: "Actions & Consequences",
      lede: "Say what you want to do; the dice decide how it goes.",
      body: "Describe the attempt in plain language. Your DM tells you which number matters, you roll, and the table finds out together. A miss is a new part of the story, not a mistake.",
    },
    {
      id: "guide-04",
      kicker: "Guide 04 · 4 min read",
      title: "When to Lean on Your DM",
      lede: "Stuck? Ask. That’s what the chair at the head is for.",
      body: "Ask when a rule is in the way of the idea you have. New DMs are learning too, and the table code makes the question part of the game.",
    },
  ],
};
