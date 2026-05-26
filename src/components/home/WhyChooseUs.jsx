import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaRoute, FaHotel, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { refreshScroll } from "../../animations/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: FaRoute, title: "Smart Trip Planner", desc: "AI-powered itineraries with live hotel & flight data." },
  { icon: FaHotel, title: "Premium Stays", desc: "Hand-picked hotels rated by real travelers." },
  { icon: FaShieldAlt, title: "Secure Booking", desc: "Encrypted checkout with instant confirmation." },
  { icon: FaHeadset, title: "24/7 Support", desc: "Dedicated travel experts for your group." },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".why-card");
      if (cards?.length) {
        gsap.set(cards, { y: 50, opacity: 0 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
            once: true,
          },
        });
      }

      const counters = { trips: 0, travelers: 0, destinations: 0 };
      gsap.to(counters, {
        trips: 1200,
        travelers: 8500,
        destinations: 50,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          if (!counterRef.current) return;
          counterRef.current.querySelector("[data-trips]").textContent =
            `${Math.floor(counters.trips).toLocaleString()}+`;
          counterRef.current.querySelector("[data-travelers]").textContent =
            `${Math.floor(counters.travelers).toLocaleString()}+`;
          counterRef.current.querySelector("[data-destinations]").textContent =
            `${Math.floor(counters.destinations)}+`;
        },
      });
    }, sectionRef);

    refreshScroll();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-display text-3xl md:text-5xl font-bold mb-4">Why Choose TripCraft?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            We combine cinematic design with real travel data for group trips that feel personal.
          </p>
        </div>

        <div ref={counterRef} className="grid grid-cols-3 gap-4 mb-16 max-w-2xl mx-auto text-center">
          <div className="glass rounded-2xl p-6">
            <p data-trips className="text-3xl font-bold text-brand-400">0+</p>
            <p className="text-sm text-slate-500 mt-1">Trips Planned</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p data-travelers className="text-3xl font-bold text-brand-400">0+</p>
            <p className="text-sm text-slate-500 mt-1">Happy Travelers</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p data-destinations className="text-3xl font-bold text-brand-400">0+</p>
            <p className="text-sm text-slate-500 mt-1">Destinations</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="why-card glass rounded-2xl p-6 text-center hover:border-brand-500/20 transition-colors"
            >
              <f.icon className="w-10 h-10 text-brand-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
