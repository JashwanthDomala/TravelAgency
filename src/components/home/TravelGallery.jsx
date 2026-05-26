import { galleryImages } from "../../data/destinations";
import { useStaggerReveal } from "../../hooks/useScrollReveal";
import SafeImage from "../ui/SafeImage";

export default function TravelGallery() {
  const ref = useStaggerReveal(".gallery-item", []);

  return (
    <section className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h2 className="heading-display text-3xl md:text-5xl font-bold">Travel Gallery</h2>
      </div>
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 px-4 max-w-7xl mx-auto">
        {galleryImages.map((src, i) => (
          <div
            key={i}
            className={`gallery-item relative overflow-hidden rounded-xl aspect-square ${i === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto md:h-full" : ""}`}
          >
            <SafeImage src={src} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
        ))}
      </div>
    </section>
  );
}
