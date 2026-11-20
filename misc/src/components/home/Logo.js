'use client';

import React, { useEffect, useState } from 'react';
import { getClientLogos, resolveMediaUrl } from '@/lib/api';
import styles from './Logo.module.css';

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
    if (initialLogos && Array.isArray(initialLogos) && initialLogos.length > 0) {
      return initialLogos.filter((l) => l && l.isActive !== false);
    }
    return [];
  });

  useEffect(() => {
    if (!initialLogos || initialLogos.length === 0) {
      getClientLogos()
        .then((data) => {
          if (data && Array.isArray(data) && data.length > 0) {
            setLogos(data.filter((l) => l && l.isActive !== false));
          }
        })
        .catch(() => {});
    }
  }, [initialLogos]);

  const activeLogos = logos.filter((l) => l && l.isActive !== false);
  if (activeLogos.length === 0) return null;

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
