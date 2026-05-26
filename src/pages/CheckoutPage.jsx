import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../context/AuthContext";
import { useTrip } from "../context/TripContext";
import { createBooking, saveTrip } from "../firebase/tripService";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PriceBreakdown from "../components/trip/PriceBreakdown";
import Button from "../components/ui/Button";
import { formatINR, formatDisplayDate } from "../utils/dates";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

function CheckoutContent() {
  const { user } = useAuth();
  const { destination, selectedHotel, selectedFlight, pricing, getTripSnapshot, travelers, dates } = useTrip();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: user?.email || "" });

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const snapshot = getTripSnapshot();

      if (stripeKey && stripeKey !== "pk_test_placeholder") {
        await loadStripe(stripeKey);
      }

      await saveTrip(user.uid, snapshot);
      const booking = await createBooking(user.uid, {
        destination: destination?.name,
        hotel: selectedHotel?.name,
        flight: selectedFlight?.airline,
        total: pricing.total,
        travelers,
      });

      sessionStorage.setItem(
        "tripcraft_confirmation",
        JSON.stringify({ ...booking, pricing, destination: destination?.name })
      );
      navigate("/confirmation");
    } catch (err) {
      console.error(err);
      alert("Payment simulation failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (!destination) {
    return (
      <div className="section-padding text-center">
        <p className="text-slate-400 mb-4">No trip selected. Plan a trip first.</p>
        <Button to="/#destinations">Browse Destinations</Button>
      </div>
    );
  }

  return (
    <div className="section-padding max-w-5xl mx-auto">
      <h1 className="heading-display text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Traveler Details</h2>
            <div className="space-y-4">
              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="input-field"
                />
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Booking Summary</h2>
            <ul className="text-sm text-muted space-y-2">
              <li>📅 {formatDisplayDate(dates.startDate || dates.checkIn)} – {formatDisplayDate(dates.checkOut)}</li>
              <li>📍 {destination.name}</li>
              <li>🏨 {selectedHotel?.name}</li>
              <li>✈️ {selectedFlight?.airline}</li>
              <li>👥 {travelers} travelers</li>
            </ul>
          </div>

          <p className="text-xs text-slate-500">
            Stripe sandbox / Razorpay test mode — no real charge in demo. Configure VITE_STRIPE_PUBLISHABLE_KEY for live test payments.
          </p>
        </div>

        <div>
          <PriceBreakdown pricing={pricing} />
          <Button
            className="w-full mt-6"
            onClick={handlePayment}
            disabled={processing || !form.name || !form.email}
          >
            {processing ? "Processing…" : `Pay ${formatINR(pricing.total)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}
