import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonials } from "../../data/destinations";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const ref = useScrollReveal();

  return (
    <section className="section-padding bg-peach/40">
      <div ref={ref} className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-display text-3xl md:text-4xl font-bold">Traveler Stories</h2>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="glass rounded-3xl p-8 md:p-12 text-center">
                <p className="text-lg md:text-xl text-slate-300 mb-8 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-semibold">
                    {t.avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.location}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
