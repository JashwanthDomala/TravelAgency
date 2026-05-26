import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSavedTrips, getBookings } from "../firebase/tripService";
import { destinations } from "../data/destinations";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { formatINR } from "../utils/dates";

function DashboardContent() {
  const { user, logout } = useAuth();
  const [savedTrips, setSavedTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([getSavedTrips(user.uid), getBookings(user.uid)]).then(([trips, books]) => {
      setSavedTrips(trips);
      setBookings(books);
      setLoading(false);
    });
  }, [user]);

  const favorites = destinations.slice(0, 4);

  return (
    <div className="section-padding max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="heading-display text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-400">Hello, {user?.displayName || user?.email}</p>
        </div>
        <div className="flex gap-3">
          <Button to="/#destinations">Plan New Trip</Button>
          <Button variant="secondary" onClick={logout}>Sign Out</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <GlassCard className="p-6">
          <p className="text-slate-500 text-sm">Saved Trips</p>
          <p className="text-3xl font-bold text-brand-400 mt-1">{savedTrips.length}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <p className="text-slate-500 text-sm">Bookings</p>
          <p className="text-3xl font-bold text-brand-400 mt-1">{bookings.length}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <p className="text-slate-500 text-sm">Wishlist</p>
          <p className="text-3xl font-bold text-brand-400 mt-1">{favorites.length}</p>
        </GlassCard>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Favorite Destinations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favorites.map((d) => (
            <Link key={d.id} to={`/destination/${d.slug}`}>
              <GlassCard className="overflow-hidden group">
                <img src={d.image} alt="" className="h-28 w-full object-cover group-hover:scale-105 transition-transform" />
                <p className="p-3 font-medium">{d.name}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Saved Trips</h2>
        {loading ? (
          <p className="text-slate-500">Loading…</p>
        ) : savedTrips.length === 0 ? (
          <p className="text-slate-500 glass rounded-xl p-6">No saved trips yet. Build one from a destination page!</p>
        ) : (
          <div className="space-y-4">
            {savedTrips.map((trip) => (
              <GlassCard key={trip.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{trip.destination}</p>
                  <p className="text-sm text-slate-500">{trip.createdAt?.slice?.(0, 10) || "Recently"}</p>
                </div>
                {trip.pricing && (
                  <p className="text-brand-400">{formatINR(trip.pricing.total)}</p>
                )}
              </GlassCard>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Booking History</h2>
        {bookings.length === 0 ? (
          <p className="text-slate-500 glass rounded-xl p-6">No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <GlassCard key={b.id} className="p-4">
                <p className="font-medium">{b.destination}</p>
                <p className="text-sm text-green-400">{b.status}</p>
                <p className="text-brand-400 text-sm mt-1">{formatINR(b.total)}</p>
              </GlassCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
