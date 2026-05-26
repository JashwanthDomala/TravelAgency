import { Link } from "react-router-dom";
import { formatINR } from "../../utils/dates";
import SafeImage from "../ui/SafeImage";
import GlassCard from "../ui/GlassCard";

export default function DestinationCard({ destination }) {
  return (
    <GlassCard className="group dest-card">
      <Link to={`/destination/${destination.slug}`} className="block">
        <div className="relative h-52 overflow-hidden bg-surface-800">
          <SafeImage
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 text-2xl font-semibold heading-display">
            {destination.name}
          </span>
        </div>
        <div className="p-5">
          <p className="text-slate-400 text-sm line-clamp-2 mb-4">{destination.description}</p>
          <div className="flex justify-between text-sm">
            <span className="text-brand-400">{formatINR(destination.budget)}+</span>
            <span className="text-slate-500">{destination.duration}</span>
          </div>
        </div>
      </Link>
    </GlassCard>
  );
}
