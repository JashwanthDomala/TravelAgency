import { useEffect } from "react";
import { HiCalendar } from "react-icons/hi";
import { useTrip } from "../../context/TripContext";
import { formatDisplayDate, getMinStartDate } from "../../utils/dates";

export default function TripDatePicker({ title = "When does your trip start?", compact = false }) {
  const {
    dates,
    nights,
    tripDurationDays,
    setTripStartDate,
    setTripDurationDays,
    destination,
  } = useTrip();

  const minDate = getMinStartDate();
  const startValue = dates.startDate || dates.checkIn;

  useEffect(() => {
    if (!startValue || startValue < minDate) {
      setTripStartDate(minDate);
    }
  }, [minDate, startValue, setTripStartDate]);

  if (compact) {
    return (
      <div className="glass rounded-2xl p-4 flex flex-wrap items-end gap-4">
        <DateField
          label="Trip start"
          value={startValue}
          min={minDate}
          onChange={setTripStartDate}
        />
        <DurationField value={tripDurationDays} onChange={setTripDurationDays} />
        <p className="text-xs text-muted w-full sm:w-auto">
          Ends {formatDisplayDate(dates.checkOut)} · {nights} nights
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 md:p-8 border-2 border-brand-500/15">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-10 rounded-full bg-brand-500/15 flex items-center justify-center">
          <HiCalendar className="text-brand-500 w-5 h-5" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-brand-800">{title}</h2>
          <p className="text-sm text-muted">
            {destination
              ? `Planning your ${destination.name} trip — hotels & flights use these dates`
              : "Required for hotel and flight search"}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-6">
        <DateField
          label="Trip start date"
          value={startValue}
          min={minDate}
          onChange={setTripStartDate}
          required
        />
        <DurationField value={tripDurationDays} onChange={setTripDurationDays} />
      </div>

      <div className="grid sm:grid-cols-3 gap-3 p-4 rounded-xl bg-peach/80 border border-brand-500/10">
        <SummaryItem label="Start" value={formatDisplayDate(startValue)} />
        <SummaryItem label="End" value={formatDisplayDate(dates.checkOut)} />
        <SummaryItem label="Duration" value={`${nights} nights`} />
      </div>
    </div>
  );
}

function DateField({ label, value, min, onChange, required }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-brand-700 mb-1.5 block">
        {label}
        {required && <span className="text-brand-500"> *</span>}
      </span>
      <input
        type="date"
        value={value}
        min={min}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      />
    </label>
  );
}

function DurationField({ value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-brand-700 mb-1.5 block">Trip length (nights)</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="input-field"
      >
        {[3, 4, 5, 6, 7, 8, 10, 12, 14].map((n) => (
          <option key={n} value={n}>
            {n} nights
          </option>
        ))}
      </select>
    </label>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted uppercase tracking-wide">{label}</p>
      <p className="font-semibold text-brand-800 text-sm mt-0.5">{value}</p>
    </div>
  );
}
