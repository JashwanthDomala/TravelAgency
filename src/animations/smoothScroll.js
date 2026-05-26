import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let tickerCallback = null;
let scrollReady = false;
const readyQueue = [];

export function initSmoothScroll() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
    anchors: { offset: -80 },
  });

  lenisInstance.on("scroll", ScrollTrigger.update);

  tickerCallback = (time) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  const scrollElement = document.documentElement;

  ScrollTrigger.scrollerProxy(scrollElement, {
    scrollTop(value) {
      if (arguments.length && lenisInstance) {
        lenisInstance.scrollTo(value, { immediate: true });
      }
      return lenisInstance?.scroll ?? window.scrollY;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: "transform",
  });

  ScrollTrigger.defaults({ scroller: scrollElement });

  lenisInstance.on("scroll", () => {
    if (!scrollReady) {
      scrollReady = true;
      readyQueue.forEach((cb) => cb());
      readyQueue.length = 0;
    }
  });

  requestAnimationFrame(() => {
    lenisInstance?.resize();
    ScrollTrigger.refresh();
    if (!scrollReady) {
      scrollReady = true;
      readyQueue.forEach((cb) => cb());
      readyQueue.length = 0;
    }
  });

  return lenisInstance;
}

export function onScrollReady(callback) {
  if (scrollReady && lenisInstance) {
    callback();
  } else {
    readyQueue.push(callback);
  }
}

export function getLenis() {
  return lenisInstance;
}

export function scrollTo(target, options = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
  } else if (typeof target === "number") {
    window.scrollTo(0, target);
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop(immediate = true) {
  scrollTo(0, { immediate });
}

export function refreshScroll() {
  requestAnimationFrame(() => {
    lenisInstance?.resize();
    ScrollTrigger.refresh(true);
  });
}

export function destroySmoothScroll() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  lenisInstance?.destroy();
  lenisInstance = null;
  scrollReady = false;
  readyQueue.length = 0;
}
