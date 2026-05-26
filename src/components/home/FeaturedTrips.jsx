import { featuredTrips } from "../../data/destinations";
import Button from "../ui/Button";
import FeaturedTripCard from "./FeaturedTripCard";
import { useStaggerReveal } from "../../hooks/useScrollReveal";

export default function FeaturedTrips() {
  const ref = useStaggerReveal(".featured-trip-card", []);

  return (
    <section className="section-padding bg-peach/60">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-brand-400 text-sm uppercase tracking-widest mb-2">Curated for you</p>
            <h2 className="heading-display text-3xl md:text-5xl font-bold">Featured Trips</h2>
          </div>
          <Button to="/#destinations" variant="secondary">View All</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredTrips.map((trip) => (
            <FeaturedTripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </section>
  );
}
