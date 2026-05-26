import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch, HiLocationMarker } from "react-icons/hi";
import { destinations } from "../../data/destinations";
import { formatINR } from "../../utils/dates";
import SafeImage from "../ui/SafeImage";
export default function DestinationSearch({ variant = "hero", className = "" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinations.slice(0, 5);
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.slug.includes(q) ||
        d.mustVisit?.some((p) => p.toLowerCase().includes(q))
    );
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const goToDestination = (slug) => {
    setOpen(false);
    setQuery("");
    navigate(`/destination/${slug}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) {
      goToDestination(results[activeIndex].slug);
    }
  };

  const handleKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const isHero = variant === "hero";

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <HiSearch
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-brand-500 ${isHero ? "w-5 h-5" : "w-4 h-4"}`}
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search destinations — Goa, Kashmir, Kerala…"
          aria-label="Search destinations"
          aria-expanded={open}
          aria-autocomplete="list"
          className={
            isHero
              ? "w-full pl-12 pr-28 py-4 rounded-2xl glass-strong text-brand-800 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-400/50 text-base"
              : "w-full pl-10 pr-4 py-2 rounded-full glass text-sm text-brand-800 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-400/40 min-w-[200px] lg:min-w-[260px]"
          }
        />
        {isHero && (
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-500 to-brand-400 text-white font-semibold px-5 py-2 rounded-xl text-sm hover:shadow-lg hover:shadow-brand-500/30 transition-shadow"
          >
            Search
          </button>
        )}
      </form>

      {open && results.length > 0 && (
        <ul
          role="listbox"
          className={`absolute z-50 w-full mt-2 glass-strong rounded-2xl overflow-hidden border border-brand-500/15 shadow-2xl ${
            isHero ? "max-h-80" : "max-h-64"
          } overflow-y-auto`}
        >
          {results.map((dest, i) => (
            <li key={dest.id} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                onClick={() => goToDestination(dest.slug)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${
                  i === activeIndex ? "bg-brand-500/15" : "hover:bg-peach/80"
                }`}
              >
                <SafeImage
                  src={dest.image}
                  alt=""
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm flex items-center gap-1">
                    <HiLocationMarker className="text-brand-500 shrink-0" />
                    {dest.name}
                  </p>
                  <p className="text-xs text-muted truncate">{dest.description}</p>
                </div>
                <span className="text-xs text-brand-500 shrink-0">{formatINR(dest.budget)}+</span>
              </button>
            </li>
          ))}
          {!query.trim() && (
            <li className="px-3 py-2 text-xs text-muted border-t border-brand-500/10">
              Popular picks — type to filter all destinations
            </li>
          )}
        </ul>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 glass-strong rounded-2xl p-4 text-sm text-muted text-center">
          No destinations found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
