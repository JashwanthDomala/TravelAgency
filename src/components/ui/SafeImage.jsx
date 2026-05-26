import { useEffect, useState } from "react";
import { DEFAULT_DESTINATION_IMAGE, DEFAULT_HOTEL_IMAGE } from "../../utils/images";

export default function SafeImage({
  src,
  alt = "",
  className = "",
  fallback = DEFAULT_DESTINATION_IMAGE,
}) {
  const [current, setCurrent] = useState(src || fallback);

  useEffect(() => {
    setCurrent(src || fallback);
  }, [src, fallback]);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
    />
  );
}

export function HotelImage({ src, alt, className, index = 0 }) {
  const fallbacks = [
    DEFAULT_HOTEL_IMAGE,
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  ];
  return (
    <SafeImage
      src={src}
      alt={alt}
      className={className}
      fallback={fallbacks[index % fallbacks.length]}
    />
  );
}
