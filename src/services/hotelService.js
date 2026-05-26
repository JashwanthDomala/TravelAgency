import { mockHotels } from "../data/mockApi";
import { extractHotelImages } from "../utils/images";

const API_KEY = import.meta.env.VITE_SERPAPI_KEY;

export async function searchHotels({
  destination,
  checkInDate,
  checkOutDate,
}) {
  if (!API_KEY) {
    console.warn("VITE_SERPAPI_KEY not set — using mock hotels");
    return { properties: mockHotels(destination), fromMock: true };
  }

  const query = encodeURIComponent(`${destination} Hotels`);
  const base = import.meta.env.DEV ? "/api/serp" : "https://serpapi.com";
  const keyParam = import.meta.env.DEV ? "" : `&api_key=${API_KEY}`;
  const url = `${base}/search.json?engine=google_hotels&q=${query}&check_in_date=${checkInDate}&check_out_date=${checkOutDate}${keyParam}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Hotels API error: ${response.status}`);
    const data = await response.json();
    const properties = data.properties || data.hotels_results || [];
    if (properties.length === 0) {
      return { properties: mockHotels(destination), fromMock: true };
    }
    const sorted = [...properties].sort(
      (a, b) => (b.overall_rating || 0) - (a.overall_rating || 0)
    );
    return { properties: sorted, fromMock: false };
  } catch (err) {
    console.error("Hotel search failed:", err);
    return { properties: mockHotels(destination), fromMock: true, error: err.message };
  }
}

export function normalizeHotel(hotel, index = 0) {
  return {
    id: hotel.property_token || hotel.id || `hotel-${index}`,
    name: hotel.name || hotel.title || "Hotel",
    overall_rating: hotel.overall_rating ?? hotel.rating ?? 4,
    reviews: hotel.reviews ?? hotel.reviews_count ?? 0,
    rate_per_night: hotel.rate_per_night || {
      extracted_lowest: hotel.price ?? 5000,
    },
    images: extractHotelImages(hotel),
    amenities: hotel.amenities || hotel.amenity_features?.map((a) => a.name) || [],
    location: hotel.location || hotel.address || "India",
    nearby_places: hotel.nearby_places || [],
    raw: hotel,
  };
}
