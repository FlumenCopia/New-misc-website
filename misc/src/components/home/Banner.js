'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBanners, resolveMediaUrl } from '@/lib/api';

export default function Banner({ initialBanners }) {
  const [slides, setSlides] = useState(() => {
    if (initialBanners && Array.isArray(initialBanners) && initialBanners.length > 0) {
      const active = initialBanners.filter((b) => b.isActive !== false);
      if (active.length > 0) {
        return active.map((b) => ({
          desktopImg: resolveMediaUrl(b.desktopImage),
          mobileImg: resolveMediaUrl(b.mobileImage || b.desktopImage),
          path: b.linkUrl || '',
          theme: b.theme || 'light',
          description: b.description || '',
        }));
      }
    }
    return [];
  });

  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [inBanner, setInBanner] = useState(true);
  const bannerRef = useRef(null);
  const router = useRouter();

  // Fetch / sync banners from CMS API dynamically without artificial limits
  useEffect(() => {
    getBanners()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          const active = data.filter((b) => b.isActive !== false);
          if (active.length > 0) {
            setSlides(
              active.map((b) => ({
                desktopImg: resolveMediaUrl(b.desktopImage),
                mobileImg: resolveMediaUrl(b.mobileImage || b.desktopImage),
                path: b.linkUrl || '',
                theme: b.theme || 'light',
                description: b.description || '',
              }))
            );
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 580);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Dynamic Autoplay timer:
  // - 1st banner (main banner, current === 0): wait 5s (5000ms) before scrolling to 2nd banner
  // - 2nd banner (current === 1): wait 2s (2000ms) before scrolling back to main banner
  useEffect(() => {
    if (slides.length <= 1) return;
    const delay = current === 0 ? 5000 : 2000;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [slides.length, current]);

  // Keep current slide within bounds if slides length changes
  useEffect(() => {
    if (current >= slides.length && slides.length > 0) {
      setCurrent(0);
    }
  }, [slides.length, current]);

  useEffect(() => {
    if (!bannerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInBanner(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList.remove('nav-theme-dark', 'nav-theme-light');

    if (!inBanner) return;

    const theme = slides[current]?.theme || 'light';
    body.classList.add(`nav-theme-${theme}`);
  }, [current, inBanner, slides]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('nav-theme-dark', 'nav-theme-light');
    };
  }, []);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="banner-carousel" ref={bannerRef}>
      {slides.map((slide, index) => {
        const bgImg = isMobile ? (slide.mobileImg || slide.desktopImg) : slide.desktopImg;
        return (
          <div
            key={index}
            className={`banner-slide ${index === current ? 'active' : ''}`}
            style={{
              backgroundImage: `url("${bgImg}")`,
            }}
            onClick={() => slide.path && router.push(slide.path)}
            role="button"
          />
        );
      })}

      {/* PREV BUTTON */}
      <button
        className="banner-nav prev"
        aria-label="Previous slide"
        onClick={(e) => {
          e.stopPropagation();
          setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
        }}
      >
        ‹
      </button>

      {/* NEXT BUTTON */}
      <button
        className="banner-nav next"
        aria-label="Next slide"
        onClick={(e) => {
          e.stopPropagation();
          setCurrent((prev) => (prev + 1) % slides.length);
        }}
      >
        ›
      </button>
    </div>
  );
}
