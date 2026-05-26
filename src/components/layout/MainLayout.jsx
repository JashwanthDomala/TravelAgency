import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLenis } from "../../hooks/useLenis";
import { pageEnter } from "../../animations/pageTransition";
import { scrollToTop, refreshScroll } from "../../animations/smoothScroll";

export default function MainLayout() {
  useLenis();
  const location = useLocation();
  const pageRef = useRef(null);
  const isHome = location.pathname === "/";

  useEffect(() => {
    scrollToTop(true);
    pageEnter(pageRef.current);
    refreshScroll();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main ref={pageRef} className={`flex-1 ${isHome ? "" : "pt-20"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
