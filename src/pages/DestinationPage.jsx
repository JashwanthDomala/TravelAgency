import { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { getDestinationBySlug } from "../data/destinations";
import { useTrip } from "../context/TripContext";
import AttractionSelector from "../components/trip/AttractionSelector";
import TripDatePicker from "../components/trip/TripDatePicker";
import Button from "../components/ui/Button";
import SafeImage from "../components/ui/SafeImage";
import { formatINR } from "../utils/dates";
import { refreshScroll } from "../animations/smoothScroll";

export default function DestinationPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const destination = getDestinationBySlug(slug);
  const { loadDestination, selectedAttractions, toggleAttraction, dates } = useTrip();
  const heroRef = useRef(null);

  useEffect(() => {
    if (destination) loadDestination(slug);
  }, [slug, destination, loadDestination]);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".dest-reveal", { y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
    }, heroRef);
    refreshScroll();
    return () => ctx.revert();
  }, [slug]);

  if (!destination) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-2xl font-bold">Destination not found</h1>
        <Button to="/" className="mt-4">Back Home</Button>
      </div>
    );
  }

  const handlePlanTrip = () => {
    if (!dates?.startDate && !dates?.checkIn) {
      alert("Please select your trip start date.");
      return;
    }
    navigate(`/planner/${slug}`);
  };

  return (
    <div ref={heroRef}>
      <section className="relative h-[50vh] min-h-[400px]">
        <SafeImage
          src={destination.gallery[0] || destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-800/80 via-brand-800/40 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 className="dest-reveal heading-display text-4xl md:text-6xl font-bold text-white">{destination.name}</h1>
          <p className="dest-reveal text-white/90 mt-2 max-w-2xl">{destination.description}</p>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-16 dest-reveal">
          <div className="glass rounded-2xl p-6">
            <p className="text-slate-500 text-sm">Best Season</p>
            <p className="font-medium mt-1">{destination.bestSeason}</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-slate-500 text-sm">Weather</p>
            <p className="font-medium mt-1">{destination.weather}</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-slate-500 text-sm">Estimated Budget</p>
            <p className="font-medium mt-1 text-brand-400">{formatINR(destination.budget)}+ · {destination.duration}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="dest-reveal">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 gap-3">
              {destination.gallery.map((img, i) => (
                <SafeImage key={i} src={img} alt="" className="rounded-xl h-32 object-cover w-full bg-surface-800" />
              ))}
            </div>
          </div>
          <div className="dest-reveal">
            <h2 className="text-2xl font-semibold mb-4">Must Visit</h2>
            <ul className="space-y-2">
              {destination.mustVisit.map((place) => (
                <li key={place} className="glass rounded-lg px-4 py-3 text-slate-300">
                  {place}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="dest-reveal mb-10">
          <TripDatePicker />
        </div>

        <div className="dest-reveal mb-8">
          <h2 className="text-2xl font-semibold mb-2">Select Attractions</h2>
          <p className="text-slate-400 text-sm mb-6">Choose experiences to include in your custom package.</p>
          <AttractionSelector
            attractions={destination.attractions}
            selected={selectedAttractions}
            onToggle={toggleAttraction}
          />
        </div>

        <div className="dest-reveal flex flex-wrap gap-4">
          <Button onClick={handlePlanTrip}>Build My Trip →</Button>
          <Button to="/" variant="secondary">Back to Destinations</Button>
        </div>
      </section>
    </div>
  );
}
