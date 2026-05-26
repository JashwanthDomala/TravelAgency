import { mockFlights } from "../data/mockApi";

const API_KEY = import.meta.env.VITE_SERPAPI_KEY;

export async function searchFlights({
  from,
  to,
  departureDate,
  returnDate,
  currency = "INR",
}) {
  if (!API_KEY) {
    console.warn("VITE_SERPAPI_KEY not set — using mock flights");
    return { best_flights: mockFlights(from, to), fromMock: true };
  }

  const base = import.meta.env.DEV ? "/api/serp" : "https://serpapi.com";
  const keyParam = import.meta.env.DEV ? "" : `&api_key=${API_KEY}`;
  const url = `${base}/search.json?engine=google_flights&departure_id=${from}&arrival_id=${to}&outbound_date=${departureDate}&return_date=${returnDate}&currency=${currency}&hl=en${keyParam}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Flights API error: ${response.status}`);
    const data = await response.json();
    const flights =
      data.best_flights ||
      data.other_flights ||
      data.flights_results ||
      [];
    if (flights.length === 0) {
      return { best_flights: mockFlights(from, to), fromMock: true };
    }
    return { best_flights: flights, fromMock: false };
  } catch (err) {
    console.error("Flight search failed:", err);
    return { best_flights: mockFlights(from, to), fromMock: true, error: err.message };
  }
}

export function normalizeFlight(flight, index = 0) {
  const firstLeg = flight.flights?.[0] || flight;
  const lastLeg = flight.flights?.[flight.flights?.length - 1] || flight;

  return {
    id: flight.id || `flight-${index}`,
    airline: firstLeg.airline || flight.airline || "Airline",
    airline_logo: firstLeg.airline_logo || flight.airline_logo,
    departure_airport: firstLeg.departure_airport || flight.departure_airport,
    arrival_airport: lastLeg.arrival_airport || flight.arrival_airport,
    layovers: flight.layovers || [],
    total_duration: flight.total_duration || firstLeg.duration || 120,
    price: flight.price ?? flight.total_price ?? 8000,
    ticket_class: flight.type || "Economy",
    flights: flight.flights,
    raw: flight,
  };
}
