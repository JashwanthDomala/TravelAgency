import { FaCheck } from "react-icons/fa";

export default function AttractionSelector({ attractions, selected, onToggle }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {attractions.map((attr) => {
        const isSelected = selected.some((s) => s.id === attr.id);
        return (
          <button
            key={attr.id}
            type="button"
            onClick={() => onToggle(attr)}
            className={`glass rounded-xl p-4 text-left transition-all duration-300 flex items-center gap-3 ${
              isSelected ? "ring-2 ring-brand-500 bg-brand-500/10" : "hover:border-white/20"
            }`}
          >
            <span
              className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                isSelected ? "bg-brand-500 text-surface-900" : "border border-black/30"
              }`}
            >
              {isSelected && <FaCheck size={12} />}
            </span>
            <div>
              <p className="font-medium">{attr.label}</p>
              <p className="text-xs text-slate-500">+ ₹{attr.price?.toLocaleString("en-IN")}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
