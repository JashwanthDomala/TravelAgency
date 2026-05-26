import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { refreshScroll } from "../animations/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { y: options.y ?? 50, opacity: 0 });
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: options.duration ?? 0.9,
        ease: options.ease ?? "power3.out",
        scrollTrigger: {
          trigger: el,
          start: options.start ?? "top 88%",
          toggleActions: "play none none reverse",
          once: options.once !== false,
        },
      });
    }, el);

    refreshScroll();
    return () => ctx.revert();
  }, [options.y, options.duration, options.ease, options.start, options.once]);

  return ref;
}

export function useStaggerReveal(selector, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll(selector);
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { y: 36, opacity: 0 });
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play none none reverse",
          once: true,
        },
      });
    }, el);

    refreshScroll();
    return () => ctx.revert();
  }, deps);

  return ref;
}
