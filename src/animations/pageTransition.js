import gsap from "gsap";

export const pageEnter = (container) => {
  if (!container) return;
  return gsap.fromTo(
    container,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
  );
};

export const pageExit = (container) => {
  if (!container) return;
  return gsap.to(container, {
    opacity: 0,
    y: -16,
    duration: 0.35,
    ease: "power2.in",
  });
};
