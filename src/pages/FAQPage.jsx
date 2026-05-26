import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const faqs = [
  {
    q: "How does the Smart Trip Planner work?",
    a: "Select a destination, choose attractions, and we'll fetch live hotel and flight recommendations. Pricing updates instantly as you customize.",
  },
  {
    q: "Are prices real-time?",
    a: "Yes — we use SerpAPI for Google Hotels and Flights. If the API is unavailable, curated mock data is shown so you can still explore the flow.",
  },
  {
    q: "Can I book for a group?",
    a: "Absolutely. Set the number of travelers in the planner and we'll adjust flight and activity costs accordingly.",
  },
  {
    q: "Is payment secure?",
    a: "We integrate Stripe sandbox for test payments. Production deployments should use verified Stripe or Razorpay keys.",
  },
];

export default function FAQPage() {
  const ref = useScrollReveal();
  const [open, setOpen] = useState(0);

  return (
    <div ref={ref} className="section-padding max-w-3xl mx-auto">
      <h1 className="heading-display text-4xl font-bold text-center mb-12">FAQ</h1>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              className="w-full text-left p-6 font-medium flex justify-between items-center"
            >
              {faq.q}
              <span className="text-brand-400">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <p className="px-6 pb-6 text-slate-400 text-sm">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
