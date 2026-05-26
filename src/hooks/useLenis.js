import { useEffect } from "react";
import { initSmoothScroll, destroySmoothScroll, refreshScroll } from "../animations/smoothScroll";

export function useLenis() {
  useEffect(() => {
    initSmoothScroll();

    const onLoad = () => refreshScroll();
    window.addEventListener("load", onLoad);
    const timer = setTimeout(refreshScroll, 400);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(timer);
      destroySmoothScroll();
    };
  }, []);
}
