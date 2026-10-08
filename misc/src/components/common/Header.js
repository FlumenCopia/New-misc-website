"use client";

import Link from "next/link";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getSettings, resolveMediaUrl } from "@/lib/api";

export default function Header({ settings: initialSettings }) {
  const [settings, setSettings] = useState(initialSettings || null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!initialSettings) {
      getSettings().then((s) => s && setSettings(s)).catch(() => {});
    }
  }, [initialSettings]);

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

useEffect(() => {
  let ticking = false;

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // TOP RESET
        if (currentY <= 10) {
          setScrolled(false);
        }
        // USER HAS ACTUALLY SCROLLED DOWN
        else if (currentY > lastScrollY.current + 5) {
          setScrolled(true);
        }

        lastScrollY.current = currentY;
        ticking = false;
      });

      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

useEffect(() => {
  document.body.classList.remove("nav-theme-dark", "nav-theme-light");
}, [pathname]);

  return (
    
    <header >
      <nav className={`main-navbar ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container-fluid nav-glass-container">
          <div className="navbar-flex">

            {/* LOGO (BOTH INSIDE SAME CONTAINER) */}
            <div className="navbar-header">
              <Link href="/" className="navbar-brand">

                <img
                  src={resolveMediaUrl(settings?.logos?.whiteNonSticky) || "/assets/images/logo2.png"}
                  alt="Logo White (Non-Sticky)"
                  className="logo-ns-white"
                />

                <img
                  src={resolveMediaUrl(settings?.logos?.blackNonSticky) || "/assets/images/42.png"}
                  alt="Logo Black (Non-Sticky)"
                  className="logo-ns-black"
                />

                <img
                  src={resolveMediaUrl(settings?.logos?.whiteSticky) || "/assets/images/logo22.png"}
                  alt="Logo White (Sticky)"
                  className="logo-s-white"
                />

                <img
                  src={resolveMediaUrl(settings?.logos?.blackSticky) || "/assets/images/4.png"}
                  alt="Logo Black (Sticky)"
                  className="logo-s-black"
                />

              </Link>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className={`navbar-toggle ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
            >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <div className={`navbar-collapse ${menuOpen ? "open" : ""}`}>
              <button
                type="button"
                className="mobile-nav-close"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <ul className="nav-center">
                <li><Link href="/" onClick={() => setMenuOpen(false)}>HOME</Link></li>
                <li><Link href="/about" onClick={() => setMenuOpen(false)}>ABOUT US</Link></li>
                <li className="dropdown">
                  <Link href="/services" onClick={() => setMenuOpen(false)}>SERVICES</Link>
                  <ul className="dropdown-menu">
                    <li><Link href="/services/digital-marketing" onClick={() => setMenuOpen(false)}>Digital Marketing</Link></li>
                    <li><Link href="/services/web-development" onClick={() => setMenuOpen(false)}>Web Development</Link></li>
                    <li><Link href="/services/graphic-designing" onClick={() => setMenuOpen(false)}>Graphic Designing</Link></li>
                  </ul>
                </li>

                <li><Link href={settings?.externalLinks?.audibles || "https://audible.miscarchive.com/"} onClick={() => setMenuOpen(false)}>MISC AUDIBLE</Link></li>

                <li><Link href="/blog" onClick={() => setMenuOpen(false)}>BLOG</Link></li>
                <li><Link href="/contact" onClick={() => setMenuOpen(false)}>CONTACT</Link></li>
                {/* <li><Link href="/career">CAREER</Link></li> */}
              </ul>

              <div className="navbar-right">
                <a
                  href="#"
                  className="enquiry-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setSidebarOpen(true);
                    setMenuOpen(false);
                  }}
                >
<i className="fa-regular fa-paper-plane"></i>      
            ENQUIRY
                </a>
              </div>
            </div>
          </div>
        </div>

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </nav>
    </header>
  );
}
