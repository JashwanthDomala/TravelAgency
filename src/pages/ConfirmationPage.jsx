import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Button from "../components/ui/Button";
import { formatINR } from "../utils/dates";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function ConfirmationContent() {
  const ref = useRef(null);
  const data = JSON.parse(sessionStorage.getItem("tripcraft_confirmation") || "{}");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".confirm-icon", { scale: 0, rotation: -180, duration: 0.8, ease: "back.out(2)" });
      gsap.from(".confirm-text", { y: 30, opacity: 0, stagger: 0.15, delay: 0.3, duration: 0.6 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="text-center max-w-lg">
        <div className="confirm-icon w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-4xl mb-6">
          ✓
        </div>
        <h1 className="confirm-text heading-display text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="confirm-text text-slate-400 mb-6">
          Your adventure to {data.destination || "India"} is booked. Check your email for details.
        </p>
        {data.pricing && (
          <p className="confirm-text text-brand-400 text-xl font-semibold mb-8">
            {formatINR(data.pricing.total)}
          </p>
        )}
        <div className="confirm-text flex flex-wrap justify-center gap-4">
          <Button to="/dashboard">View Dashboard</Button>
          <Button to="/" variant="secondary">Back Home</Button>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <ProtectedRoute>
      <ConfirmationContent />
    </ProtectedRoute>
  );
}
