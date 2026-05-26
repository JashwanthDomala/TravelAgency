import { FaPlane, FaCheck } from "react-icons/fa";
import { formatINR, formatDuration } from "../../utils/dates";
import { getFlightPrice } from "../../utils/pricing";
import GlassCard from "../ui/GlassCard";

export default function FlightCard({ flight, selected, onSelect }) {
  const dep = flight.departure_airport;
  const arr = flight.arrival_airport;
  const price = getFlightPrice(flight);

  return (
    <GlassCard
      onClick={() => onSelect(flight)}
      className={`p-5 ${selected ? "ring-2 ring-brand-500 border-brand-500/50" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {flight.airline_logo ? (
            <img src={flight.airline_logo} alt="" className="w-10 h-10 object-contain" />
          ) : (
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
              <FaPlane className="text-brand-400" />
            </div>
          )}
          <div>
            <p className="font-semibold">{flight.airline}</p>
            <p className="text-xs text-slate-500">{flight.ticket_class || "Economy"}</p>
          </div>
        </div>
        {selected && (
          <span className="bg-brand-500 text-surface-900 rounded-full p-2">
            <FaCheck size={12} />
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-6 gap-4">
        <div>
          <p className="text-lg font-semibold">{dep?.time || "—"}</p>
          <p className="text-xs text-slate-500">{dep?.id || dep?.name}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-xs text-slate-500">{formatDuration(flight.total_duration)}</p>
          <div className="h-px bg-white/20 my-1 relative">
            <FaPlane className="absolute left-1/2 -translate-x-1/2 -top-2 text-brand-400 text-xs" />
          </div>
          {flight.layovers?.length > 0 && (
            <p className="text-xs text-amber-400/80">{flight.layovers.length} stop(s)</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{arr?.time || "—"}</p>
          <p className="text-xs text-slate-500">{arr?.id || arr?.name}</p>
        </div>
      </div>

      <p className="mt-4 text-brand-400 font-semibold text-right">
        {formatINR(price)} <span className="text-slate-500 text-xs font-normal">/ person</span>
      </p>
    </GlassCard>
  );
}
