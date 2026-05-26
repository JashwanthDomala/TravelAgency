import { Link } from "react-router-dom";
import { formatINR } from "../../utils/dates";
import SafeImage from "../ui/SafeImage";
import GlassCard from "../ui/GlassCard";

export default function FeaturedTripCard({ trip }) {
  return (
    <GlassCard className="group overflow-hidden featured-trip-card">
      <Link to={`/destination/${trip.slug}`} className="block">
        <div className="relative h-48 bg-surface-800 overflow-hidden">
          <SafeImage
            src={trip.image}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent" />
          <span className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs text-brand-400">
            {trip.tag}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-400 transition-colors">
            {trip.title}
          </h3>
          <p className="text-slate-400 text-sm mb-4">
            {trip.destinations.join(" → ")} · {trip.duration}
          </p>
          <p className="text-brand-400 font-semibold">
            {formatINR(trip.price)}{" "}
            <span className="text-slate-500 font-normal text-sm">/ person</span>
          </p>
        </div>
      </Link>
    </GlassCard>
  );
}
