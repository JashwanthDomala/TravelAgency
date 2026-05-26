import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4">
      <nav className="glass-strong max-w-7xl mx-auto rounded-full px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center text-white font-bold text-sm">
            TC
          </span>
          <span className="font-semibold text-lg hidden sm:block text-brand-800">
            Trip<span className="text-brand-500">Craft</span> India
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${isActive ? "text-brand-500" : "text-muted hover:text-brand-700"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Button to="/dashboard" variant="secondary">
              Dashboard
            </Button>
          ) : (
            <Button to="/login" variant="secondary">
              Sign In
            </Button>
          )}
          <Button to="/#destinations">Explore Trips</Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-brand-700"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-2 glass-strong max-w-7xl mx-auto rounded-2xl p-4 flex flex-col gap-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2 text-muted hover:text-brand-700"
            >
              {l.label}
            </NavLink>
          ))}
          <Button to={user ? "/dashboard" : "/login"} variant="secondary" onClick={() => setOpen(false)}>
            {user ? "Dashboard" : "Sign In"}
          </Button>
        </div>
      )}
    </header>
  );
}
