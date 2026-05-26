import { useEffect } from "react";
import { refreshScroll } from "../animations/smoothScroll";
import HeroSection from "../components/home/HeroSection";
import DestinationsSection from "../components/home/DestinationsSection";
import FeaturedTrips from "../components/home/FeaturedTrips";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import TravelGallery from "../components/home/TravelGallery";

export default function HomePage() {
  useEffect(() => {
    const t = setTimeout(refreshScroll, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <HeroSection />
      <DestinationsSection />
      <FeaturedTrips />
      <WhyChooseUs />
      <Testimonials />
      <TravelGallery />
    </>
  );
}
