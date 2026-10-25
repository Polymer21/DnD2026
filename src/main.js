import { initFaq } from "./behaviors/faq.js";
import { initNav } from "./behaviors/nav.js";
import { initPalette } from "./behaviors/palette.js";
import { initQuiz } from "./behaviors/quiz.js";
import { initSchedule } from "./behaviors/schedule.js";
import { initSignup } from "./behaviors/signup.js";
import { initSlider } from "./behaviors/slider.js";
import { initSteppers } from "./behaviors/stepper.js";

const hero = document.querySelector("[data-hero]");
if (hero) initSlider(hero);
initNav(document);
initPalette(document);
initSteppers(document);
initFaq(document);
initSchedule(document);
initQuiz(document);
initSignup(document);
