"use client";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 360);
          ticking = false;
        });

        ticking = true;
      }
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${visible ? "is-visible" : ""}`}
      aria-label="Scroll to top"
      title="Scroll to top"
      onClick={scrollToTop}
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
};

export default ScrollToTopButton;
