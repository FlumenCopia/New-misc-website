'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBanners, resolveMediaUrl } from '@/lib/api';

const defaultSlides = [
  {
    desktopImg: '/assets/images/Bannermisc.jpg',
    mobileImg: '/assets/images/MISC-PHONE-BANNER3.jpg',
    theme: 'light',
  },
  {
    desktopImg: '/assets/images/yeti-web3.jpeg',
    mobileImg: '/assets/images/yeti-mobile2.jpeg',
    path: '/Neyyattinkara',
    theme: 'light',
  },
  {
    desktopImg: '/assets/images/flumenxbanner.webp',
    mobileImg: '/assets/images/flumenx-mobilebanner.webp',
    path: 'https://flumenx.com/',
    theme: 'dark',
  },
];

export default function Banner({ initialBanners }) {
  const [slides, setSlides] = useState(() => {
    if (initialBanners && initialBanners.length > 0) {
      return initialBanners.map((b) => ({
        desktopImg: resolveMediaUrl(b.desktopImage),
        mobileImg: resolveMediaUrl(b.mobileImage || b.desktopImage),
        path: b.linkUrl || '',
        theme: b.theme || 'light',
      }));
    }
    return defaultSlides;
  });

  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [inBanner, setInBanner] = useState(true);
  const bannerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!initialBanners) {
      getBanners().then((data) => {
        if (data && data.length > 0) {
          setSlides(
            data.map((b) => ({
              desktopImg: resolveMediaUrl(b.desktopImage),
              mobileImg: resolveMediaUrl(b.mobileImage || b.desktopImage),
              path: b.linkUrl || '',
              theme: b.theme || 'light',
            }))
          );
        }
      }).catch(() => {});
    }
  }, [initialBanners]);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 580);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

    const theme = slides[current]?.theme || 'dark';
    body.classList.add(`nav-theme-${theme}`);
  }, [current, inBanner]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('nav-theme-dark', 'nav-theme-light');
    };
  }, []);

  return (
    <div className="banner-carousel" ref={bannerRef}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`banner-slide ${index === current ? 'active' : ''}`}
          style={{
            backgroundImage: `url(${
              isMobile ? slide.mobileImg : slide.desktopImg
            })`,
          }}
          onClick={() => slide.path && router.push(slide.path)}
          role="button"
        />
      ))}

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
