"use strict";

const setHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
setHeight();

let vw = window.innerWidth;

window.addEventListener("resize", () => {
  if (vw === window.innerWidth) {
    return;
  }
  vw = window.innerWidth;
  setHeight();
});

//-----GSAP-------

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();
tl.from(".fv", { duration: 2, backgroundColor: "white" })
  .from(".fv__title", { duration: 1, opacity: 0, y: 40 })
  .from(".navigation__item", { duration: 1, opacity: 0, stagger: 0.2 });

gsap.to(".visible", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 72%",
    end: "top 10%",
  },
  opacity: 1,
});

gsap.to(".textContainer-about", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 32%",
    end: "top 10%",
  },
  opacity: 1,
});

gsap.to(".sectionTitle-vision", {
  scrollTrigger: {
    trigger: ".vision",
    start: "top 96%",
    end: "top 10%",
  },
  y: -16,
  opacity: 1,
});

gsap.to(".sectionWrapper-vision", {
  scrollTrigger: {
    trigger: ".vision",
    start: "top 88%",
    end: "top 10%",
  },
  y: -16,
  opacity: 1,
});

gsap.to(".sectionTitle-strength", {
  scrollTrigger: {
    trigger: ".strength",
    start: "top 96%",
    end: "top 10%",
  },
  y: -16,
  opacity: 1,
});

gsap.to(".sectionWrapper-strength", {
  scrollTrigger: {
    trigger: ".strength",
    start: "top 88%",
    end: "top 10%",
  },
  y: -16,
  opacity: 1,
});

gsap.to(".sectionTitle-benefit", {
  scrollTrigger: {
    trigger: ".benefit",
    start: "top 96%",
    end: "top 10%",
  },
  y: -16,
  opacity: 1,
});

gsap.to(".sectionWrapper-benefit", {
  scrollTrigger: {
    trigger: ".benefit",
    start: "top 88%",
    end: "top 10%",
  },
  y: -16,
  opacity: 1,
});
