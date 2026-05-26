export default function ItineraryTimeline({ days, selectedAttractions }) {
  const extraActivities = selectedAttractions.map((a) => a.label).join(", ");

  return (
    <div className="space-y-6">
      {days.map((day) => (
        <div key={day.day} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm">
              {day.day}
            </div>
            <div className="w-px flex-1 bg-white/10 min-h-[40px]" />
          </div>
          <div className="glass rounded-xl p-4 flex-1 mb-2">
            <h4 className="font-semibold">{day.title}</h4>
            <ul className="mt-2 text-sm text-slate-400 space-y-1">
              {day.activities.map((act, i) => (
                <li key={i}>• {act}</li>
              ))}
              {day.day === 2 && extraActivities && (
                <li className="text-brand-400/90">+ {extraActivities}</li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
