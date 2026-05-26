import { useEffect, useRef } from "react";
import gsap from "gsap";
import { formatINR } from "../../utils/dates";

export default function PriceBreakdown({ pricing, className = "" }) {
  const totalRef = useRef(null);

  useEffect(() => {
    if (totalRef.current) {
      gsap.fromTo(
        totalRef.current,
        { scale: 0.95, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out" }
      );
    }
  }, [pricing.total]);

  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <h3 className="font-semibold text-lg mb-4">Price Breakdown</h3>
      <ul className="space-y-3 text-sm">
        {pricing.breakdown.map((item) => (
          <li key={item.label} className="flex justify-between text-slate-400">
            <span>{item.label}</span>
            <span className="text-slate-200">{formatINR(item.amount)}</span>
          </li>
        ))}
      </ul>
      <div ref={totalRef} className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
        <span className="font-semibold">Total</span>
        <span className="text-2xl font-bold text-brand-400">{formatINR(pricing.total)}</span>
      </div>
    </div>
  );
}
