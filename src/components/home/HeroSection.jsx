import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowDown } from "react-icons/hi";
import HeroScene from "../../three/HeroScene";
import Button from "../ui/Button";
import DestinationSearch from "../search/DestinationSearch";
import { onScrollReady, refreshScroll, scrollTo } from "../../animations/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

const floatingTags = ["Goa", "Kashmir", "Ladakh", "Kerala", "Jaipur"];

export default function HeroSection() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const globeWrapRef = useRef(null);
  const contentRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    let ctx = null;

    const setupScroll = () => {
      if (!containerRef.current || !stickyRef.current) return;

      ctx?.revert();
      ctx = gsap.context(() => {
        gsap.from(".hero-intro-item", {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          delay: 0.2,
          ease: "power3.out",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 3,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              scrollProgress.current = self.progress;
            },
          },
        });

        tl.to(globeWrapRef.current, {}, 0)
          .to(contentRef.current, { y: -80, opacity: 0, ease: "none" }, 0)
          .to(stickyRef.current, { filter: "blur(0px)" }, 0);
      }, containerRef);

      refreshScroll();
    };

    onScrollReady(setupScroll);
    const fallback = setTimeout(setupScroll, 150);

    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(fallback);
      ctx?.revert();
    };
  }, []);

  const handleScrollDown = (e) => {
    e.preventDefault();
    scrollTo("#destinations", { offset: -80 });
  };

  return (
    <section
      ref={containerRef}
      className="hero-scroll-container relative h-[200vh] pt-20"
      aria-label="Hero"
    >
      <div
        ref={stickyRef}
        className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden flex items-center justify-center"
      >
        <div ref={globeWrapRef} className="
          hero-globe-wrap
          absolute inset-0 z-0
          will-change-transform
          flex items-center justify-center
        ">
          <HeroScene mouseRef={mouseRef} scrollProgress={scrollProgress} />
        </div>

        <div
          ref={contentRef}
          className="hero-content relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4 sm:pt-6 pb-16 w-full"
        >
          <p className="hero-intro-item text-brand-500 text-sm uppercase tracking-[0.3em] mb-4 font-medium">
            Premium Group Travel
          </p>
          <h1 className="hero-intro-item heading-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-5 gradient-text">
            Explore Incredible India
          </h1>
          <p className="hero-intro-item text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8">
            Personalized group trips crafted for unforgettable journeys.
          </p>

          {/* <div className="hero-intro-item relative z-50 max-w-xl mx-auto">
              <DestinationSearch variant="hero" />
          </div> */}

          <div className="hero-intro-item flex flex-wrap justify-center gap-4 mb-10">
            <Button to="/#destinations">Start Exploring</Button>
            <Button to="/about" variant="secondary">
              How It Works
            </Button>
          </div>

          <div className="hero-intro-item flex flex-wrap justify-center gap-3 mb-12">
            {floatingTags.map((tag) => (
              <Link
                key={tag}
                to={`/destination/${tag.toLowerCase()}`}
                className="glass px-4 py-2 rounded-full text-sm text-brand-700 hover:text-brand-500 hover:border-brand-500/40 transition-all"
              >
                {tag}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={handleScrollDown}
            className="hero-intro-item inline-flex flex-col items-center gap-2 text-muted hover:text-brand-500 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <HiArrowDown size={20} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
