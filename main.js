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
tl.from(".fv", {duration: 2, backgroundColor: "white" })
  .from(".fv__title", { duration: 2, opacity: 0 })
  .from(".fv__text", { duration: 1, opacity: 0 });
// gsap.to('.fv', {backgroundColor: "white"})

// gsap.to(".workContainer", {  //fix later
//   scrollTrigger: {
//     trigger: "#benefit",
//     start: "top 100px",
//     endTrigger: ".social",
//     end: "top 0px",
//     scrub: 1,
//     markers: true,
//     // pin: '.workWrapper'
//   },
//   xPercent: -90,
//   ease: "none",
//   stagger: .1
// });
