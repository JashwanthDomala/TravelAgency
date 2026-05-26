import { destinations } from "../../data/destinations";
import { useStaggerReveal } from "../../hooks/useScrollReveal";
import DestinationCard from "./DestinationCard";

export default function DestinationsSection() {
  const gridRef = useStaggerReveal(".dest-card", []);

  return (
    <section id="destinations" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-400 text-sm uppercase tracking-widest mb-2">Where to next?</p>
          <h2 className="heading-display text-3xl md:text-5xl font-bold">Popular Destinations</h2>
        </div>
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
