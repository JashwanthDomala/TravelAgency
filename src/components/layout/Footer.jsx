import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-brand-500/15 bg-peach/80 section-padding">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-2 text-brand-800">
            Trip<span className="text-brand-500">Craft</span> India
          </h3>
          <p className="text-muted text-sm max-w-md">
            Personalized group trips crafted for unforgettable journeys across Incredible India.
          </p>
          <div className="flex gap-4 mt-6">
            {[FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-brand-600 hover:text-brand-500 transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4 text-brand-800">Explore</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/#destinations" className="hover:text-brand-500">Destinations</Link></li>
            <li><Link to="/about" className="hover:text-brand-500">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brand-500">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-brand-500">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4 text-brand-800">Legal</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/privacy" className="hover:text-brand-500">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand-500">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-500/10 text-center text-sm text-muted">
        © {new Date().getFullYear()} TripCraft India. All rights reserved.
      </div>
    </footer>
  );
}
