import { useScrollReveal } from "../hooks/useScrollReveal";

export default function AboutPage() {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="section-padding max-w-4xl mx-auto">
      <h1 className="heading-display text-4xl font-bold mb-6">About TripCraft India</h1>
      <div className="prose prose-invert space-y-4 text-slate-500">
        <p>
          TripCraft India is a premium travel-tech platform built to help groups discover, customize, and book unforgettable journeys across India — from the beaches of Goa to the peaks of Ladakh.
        </p>
        <p>
          We combine cinematic web experiences with real-time hotel and flight data so you can plan smarter, not harder. Our smart trip planner generates itineraries, recommends stays, and updates pricing as you customize your adventure.
        </p>
        <p>
          Founded with a passion for Incredible India, we believe group travel should feel personal, transparent, and inspiring from the first scroll to the final booking confirmation.
        </p>
      </div>
    </div>
  );
}
