const HOTEL_FALLBACKS = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  "https://images.unsplash.com/photo-1618773928121-c1efcf880d8e?w=800&q=80",
];

export const DEFAULT_HOTEL_IMAGE = HOTEL_FALLBACKS[0];

export const DEFAULT_DESTINATION_IMAGE =
  "https://images.unsplash.com/photo-1524492412937-280b9d812304?w=800&q=80";

function pushUrl(urls, value) {
  if (!value) return;
  if (typeof value === "string" && /^https?:\/\//i.test(value)) {
    urls.push(value);
    return;
  }
  if (typeof value === "object") {
    pushUrl(urls, value.original_image);
    pushUrl(urls, value.thumbnail);
    pushUrl(urls, value.url);
    pushUrl(urls, value.link);
    pushUrl(urls, value.src);
    pushUrl(urls, value.image);
  }
}

/** Normalize SerpAPI / mock hotel image fields into plain URL strings */
export function extractHotelImages(hotel) {
  const urls = [];

  pushUrl(urls, hotel?.thumbnail);
  pushUrl(urls, hotel?.image);
  pushUrl(urls, hotel?.main_photo);

  if (Array.isArray(hotel?.images)) {
    hotel.images.forEach((img) => pushUrl(urls, img));
  }

  if (Array.isArray(hotel?.photos)) {
    hotel.photos.forEach((img) => pushUrl(urls, img));
  }

  const unique = [...new Set(urls)].filter(Boolean);
  return unique.length ? unique : [HOTEL_FALLBACKS[Math.floor(Math.random() * HOTEL_FALLBACKS.length)]];
}

export function getHotelFallback(index = 0) {
  return HOTEL_FALLBACKS[index % HOTEL_FALLBACKS.length];
}
