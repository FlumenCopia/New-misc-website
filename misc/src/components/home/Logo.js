'use client';

import React, { useEffect, useState } from 'react';
import { getClientLogos, resolveMediaUrl } from '@/lib/api';
import styles from './Logo.module.css';

// Exact preserved original client logos catalog
const defaultLogos = [
  'promag-logo.png',
  'icatch-logo.png',
  'C L 01.webp',
  'C L 02.webp',
  'C L 03.webp',
  'C L 05.webp',
  'bulletclub.png',
  'bm.png',
  'jsml.png',
  'pounchik.png',
  'lemonsole_final.jpg',
  'wisdom.jpg',
  'kompeterzen.jpg',
  'nanoos_final.jpg',
  'swarasaakhi.jpg',
  'math.jpg',
  'ananthapuri.jpg',
  'miscaudiable.jpg',
  'misc web logos-01.jpg',
  'misc web logos-02.jpg',
  'misc web logos-03.jpg',
  'misc web logos-04.jpg',
  'misc web logos-05.jpg',
  'misc web logos-06.jpg',
  'misc web logos-07.jpg',
  'misc web logos-08.jpg',
  'misc web logos-09.jpg',
  'misc web logos-10.jpg',
  'ssnss.jpg',
  'flyers.jpg',
];

function getLogoSrc(item) {
  if (!item) return '';
  const str = typeof item === 'string' ? item : item.logoImage || item.image || item.logo || item.url || '';
  if (!str) return '';
  if (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:')) return str;
  if (str.startsWith('/')) return resolveMediaUrl(str);
  return `/assets/images/${str}`;
}

function getLogoAlt(item, index) {
  if (item && typeof item === 'object') {
    if (item.clientName) return `${item.clientName} Logo`;
    if (item.altText) return item.altText;
  }
  return `Client Partner Logo ${index + 1}`;
}

export default function LogosSection({ initialLogos }) {
  const [logos, setLogos] = useState(() => {
    if (initialLogos && initialLogos.length > 0) {
      return initialLogos;
    }
    return defaultLogos;
  });

  useEffect(() => {
    if (!initialLogos || initialLogos.length === 0) {
      getClientLogos()
        .then((data) => {
          if (data && data.length > 0) {
            setLogos(data);
          }
        })
        .catch(() => {});
    }
  }, [initialLogos]);

  const activeLogos = logos && logos.length > 0 ? logos : defaultLogos;
  // Duplicate logos array to produce a seamless, gapless 360-degree infinite marquee loop
  const marqueeLogos = [...activeLogos, ...activeLogos];

  return (
    <section className={styles.marqueeSection} id="clients-marquee" aria-label="Our Trusted Clients & Partners">
      {/* Smooth Continuous Infinite Marquee Track with Edge Fade Masks */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {marqueeLogos.map((item, index) => {
            const src = getLogoSrc(item);
            const alt = getLogoAlt(item, index % activeLogos.length);
            const key = typeof item === 'string' ? `${item}-${index}` : `${item._id || item.clientName || index}-${index}`;

            return (
              <div className={styles.logoItem} key={key}>
                <img
                  src={src}
                  alt={alt}
                  loading="eager"
                  decoding="async"
                  className={styles.logoImage}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
