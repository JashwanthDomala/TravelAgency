import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { getDestinationBySlug } from "../data/destinations";
import {
  getDefaultTripDates,
  buildTripDates,
  parseTripDurationDays,
} from "../utils/dates";
import { calculateTripPricing, getHotelNightly, getFlightPrice } from "../utils/pricing";

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [destinationSlug, setDestinationSlug] = useState(null);
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [travelers, setTravelers] = useState(2);
  const [tripDurationDays, setTripDurationDaysState] = useState(5);
  const [dates, setDates] = useState(() => getDefaultTripDates(5));
  const [originAirport, setOriginAirport] = useState("DEL");

  const destination = useMemo(
    () => (destinationSlug ? getDestinationBySlug(destinationSlug) : null),
    [destinationSlug]
  );

  const setTripStartDate = useCallback(
    (startDate) => {
      setDates(buildTripDates(startDate, tripDurationDays));
    },
    [tripDurationDays]
  );

  const setTripDurationDays = useCallback((days) => {
    setTripDurationDaysState(days);
    setDates((prev) => buildTripDates(prev.startDate || prev.checkIn, days));
  }, []);

  const toggleAttraction = useCallback((attraction) => {
    setSelectedAttractions((prev) => {
      const exists = prev.find((a) => a.id === attraction.id);
      if (exists) return prev.filter((a) => a.id !== attraction.id);
      return [...prev, attraction];
    });
  }, []);

  const activitiesTotal = useMemo(
    () => selectedAttractions.reduce((sum, a) => sum + (a.price || 0), 0),
    [selectedAttractions]
  );

  const nights = useMemo(() => dates.nights ?? tripDurationDays, [dates.nights, tripDurationDays]);

  const pricing = useMemo(
    () =>
      calculateTripPricing({
        hotelNightly: selectedHotel ? getHotelNightly(selectedHotel) : 0,
        nights,
        flightPrice: selectedFlight ? getFlightPrice(selectedFlight) : 0,
        activitiesTotal,
        travelers,
      }),
    [selectedHotel, selectedFlight, activitiesTotal, nights, travelers]
  );

  const resetTrip = useCallback(() => {
    setSelectedAttractions([]);
    setSelectedHotel(null);
    setSelectedFlight(null);
    const defaultDays = 5;
    setTripDurationDaysState(defaultDays);
    setDates(getDefaultTripDates(defaultDays));
  }, []);

  const loadDestination = useCallback((slug) => {
    const dest = getDestinationBySlug(slug);
    const days = dest ? parseTripDurationDays(dest.duration) : 5;
    setDestinationSlug(slug);
    setSelectedAttractions([]);
    setSelectedHotel(null);
    setSelectedFlight(null);
    setTripDurationDaysState(days);
    setDates((prev) => buildTripDates(prev.startDate || prev.checkIn, days));
  }, []);

  const value = {
    destination,
    destinationSlug,
    loadDestination,
    selectedAttractions,
    toggleAttraction,
    setSelectedAttractions,
    selectedHotel,
    setSelectedHotel,
    selectedFlight,
    setSelectedFlight,
    travelers,
    setTravelers,
    dates,
    setDates,
    tripDurationDays,
    setTripDurationDays,
    setTripStartDate,
    originAirport,
    setOriginAirport,
    nights,
    pricing,
    activitiesTotal,
    resetTrip,
    getTripSnapshot: () => ({
      destinationSlug,
      destination: destination?.name,
      selectedAttractions,
      selectedHotel,
      selectedFlight,
      travelers,
      dates,
      tripDurationDays,
      nights,
      originAirport,
      pricing,
    }),
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export const useTrip = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used within TripProvider");
  return ctx;
};
