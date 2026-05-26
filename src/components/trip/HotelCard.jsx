import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaStar, FaCheck } from "react-icons/fa";
import { formatINR } from "../../utils/dates";
import { getHotelNightly } from "../../utils/pricing";
import { DEFAULT_HOTEL_IMAGE } from "../../utils/images";
import { HotelImage } from "../ui/SafeImage";
import GlassCard from "../ui/GlassCard";
import "swiper/css";
import "swiper/css/pagination";

export default function HotelCard({ hotel, selected, onSelect, index = 0 }) {
  const images =
    Array.isArray(hotel.images) && hotel.images.length > 0
      ? hotel.images.filter((u) => typeof u === "string" && u.startsWith("http"))
      : [DEFAULT_HOTEL_IMAGE];

  const nightly = getHotelNightly(hotel);

  return (
    <GlassCard
      onClick={() => onSelect(hotel)}
      className={`${selected ? "ring-2 ring-brand-500 border-brand-500/50" : ""}`}
    >
      <div className="relative h-44 bg-surface-800">
        {images.length > 1 ? (
          <Swiper modules={[Pagination]} pagination={{ clickable: true }} className="h-full w-full">
            {images.slice(0, 5).map((img, i) => (
              <SwiperSlide key={`${hotel.id}-img-${i}`}>
                <HotelImage
                  src={img}
                  alt={hotel.name}
                  index={index + i}
                  className="w-full h-44 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <HotelImage
            src={images[0]}
            alt={hotel.name}
            index={index}
            className="w-full h-44 object-cover"
          />
        )}
        {selected && (
          <span className="absolute top-3 right-3 z-10 bg-brand-500 text-surface-900 rounded-full p-2">
            <FaCheck size={12} />
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-1">{hotel.name}</h3>
        <div className="flex items-center gap-2 mt-1 text-sm">
          <FaStar className="text-brand-400" />
          <span>{hotel.overall_rating}</span>
          <span className="text-slate-500">
            ({typeof hotel.reviews === "number" ? hotel.reviews.toLocaleString() : hotel.reviews} reviews)
          </span>
        </div>
        <p className="text-slate-500 text-xs mt-1 line-clamp-1">{hotel.location}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {(hotel.amenities || []).slice(0, 4).map((a, i) => (
            <span key={`${a}-${i}`} className="text-xs glass px-2 py-0.5 rounded-full text-slate-400">
              {typeof a === "string" ? a : a?.name || "Amenity"}
            </span>
          ))}
        </div>
        <p className="mt-3 text-brand-400 font-semibold">
          {formatINR(nightly)} <span className="text-slate-500 text-xs font-normal">/ night</span>
        </p>
      </div>
    </GlassCard>
  );
}
