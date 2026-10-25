import { guide } from "./guide.js";
import { landing } from "./landing.js";
import { quiz } from "./quiz.js";
import { signup } from "./signup.js";

/** Map a Vite HTML path to the content object that drives that page. */
export const pages = {
  "/index.html": landing,
  "/guide.html": guide,
  "/quiz.html": quiz,
  "/signup.html": signup,
};

export function contentFor(path = "") {
  const clean = String(path).split("?")[0];
  const file = clean.split("/").filter(Boolean).pop() || "index.html";
  const key = file.endsWith(".html") ? `/${file}` : "/index.html";
  return pages[key] ?? landing;
}
