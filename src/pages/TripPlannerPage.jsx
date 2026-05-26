import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDestinationBySlug } from "../data/destinations";
import { useTrip } from "../context/TripContext";
import { searchHotels, normalizeHotel } from "../services/hotelService";
import { searchFlights, normalizeFlight } from "../services/flightService";
import { getAirportForDestination, DEFAULT_ORIGIN } from "../utils/airports";
import HotelCard from "../components/trip/HotelCard";
import FlightCard from "../components/trip/FlightCard";
import PriceBreakdown from "../components/trip/PriceBreakdown";
import ItineraryTimeline from "../components/trip/ItineraryTimeline";
import TripDatePicker from "../components/trip/TripDatePicker";
import { formatDisplayDate } from "../utils/dates";
import { ListSkeleton } from "../components/ui/LoadingSkeleton";
import Button from "../components/ui/Button";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function PlannerContent() {
  const { slug } = useParams();
  const destination = getDestinationBySlug(slug);
  const {
    selectedAttractions,
    selectedHotel,
    setSelectedHotel,
    selectedFlight,
    setSelectedFlight,
    dates,
    originAirport,
    pricing,
    travelers,
    setTravelers,
    getTripSnapshot,
  } = useTrip();

  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(true);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [apiNote, setApiNote] = useState("");

  useEffect(() => {
    if (!destination) return;

    const load = async () => {
      setLoadingHotels(true);
      setLoadingFlights(true);
      const destName = destination.name;
      const to = getAirportForDestination(destination);

      const [hotelRes, flightRes] = await Promise.all([
        searchHotels({
          destination: destName,
          checkInDate: dates.checkIn,
          checkOutDate: dates.checkOut,
        }),
        searchFlights({
          from: originAirport || DEFAULT_ORIGIN,
          to,
          departureDate: dates.departure,
          returnDate: dates.returnDate,
        }),
      ]);

      const normalizedHotels = (hotelRes.properties || []).slice(0, 6).map(normalizeHotel);
      const normalizedFlights = (flightRes.best_flights || []).slice(0, 5).map(normalizeFlight);

      setHotels(normalizedHotels);
      setFlights(normalizedFlights);
      setSelectedHotel((prev) => prev || normalizedHotels[0] || null);
      setSelectedFlight((prev) => prev || normalizedFlights[0] || null);

      if (hotelRes.fromMock || flightRes.fromMock) {
        setApiNote("Showing curated recommendations (live API unavailable or empty).");
      } else {
        setApiNote("Live prices from SerpAPI");
      }

      setLoadingHotels(false);
      setLoadingFlights(false);
    };

    load();
  }, [destination, dates, originAirport]);

  if (!destination) {
    return (
      <div className="section-padding text-center">
        <p>Destination not found.</p>
        <Button to="/">Home</Button>
      </div>
    );
  }

  return (
    <div className="section-padding max-w-7xl mx-auto">
      <div className="mb-10">
        <Link to={`/destination/${slug}`} className="text-sm text-brand-400 hover:underline">
          ← {destination.name}
        </Link>
        <h1 className="heading-display text-3xl md:text-5xl font-bold mt-2">Smart Trip Planner</h1>
        <p className="text-slate-400 mt-2">{apiNote}</p>
      </div>

      <div className="mb-8">
        <TripDatePicker title="Your trip dates" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recommended Hotels</h2>
              <label className="text-sm text-slate-400">
                Travelers{" "}
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="ml-2 input-field !py-1 !px-2 w-auto"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
            </div>
            {loadingHotels ? (
              <ListSkeleton count={2} />
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {hotels.map((h, i) => (
                  <HotelCard
                    key={h.id}
                    index={i}
                    hotel={h}
                    selected={selectedHotel?.id === h.id}
                    onSelect={setSelectedHotel}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Recommended Flights</h2>
            {loadingFlights ? (
              <ListSkeleton count={2} />
            ) : (
              <div className="space-y-4">
                {flights.map((f) => (
                  <FlightCard
                    key={f.id}
                    flight={f}
                    selected={selectedFlight?.id === f.id}
                    onSelect={setSelectedFlight}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Your Itinerary</h2>
            <ItineraryTimeline
              days={destination.itinerary}
              selectedAttractions={selectedAttractions}
            />
          </section>
        </div>

        <aside className="relative lg:self-start">
          <div className="space-y-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:overscroll-contain">
            <PriceBreakdown pricing={pricing} />
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Trip Summary</h3>
              <ul className="text-sm text-muted space-y-2">
                <li>📅 {formatDisplayDate(dates.startDate || dates.checkIn)} → {formatDisplayDate(dates.checkOut)}</li>
                <li>📍 {destination.name}</li>
                <li>🏨 {selectedHotel?.name || "Select hotel"}</li>
                <li>✈️ {selectedFlight?.airline || "Select flight"}</li>
                <li>🎯 {selectedAttractions.length} activities selected</li>
              </ul>
              <Button
                to="/checkout"
                className="w-full mt-6"
                onClick={() => {
                  sessionStorage.setItem("tripcraft_checkout", JSON.stringify(getTripSnapshot()));
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function TripPlannerPage() {
  return (
    <ProtectedRoute>
      <PlannerContent />
    </ProtectedRoute>
  );
}
