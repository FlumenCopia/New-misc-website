'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getServices, resolveMediaUrl } from '@/lib/api';
import styles from './Services.module.css';

export default function ServicesSection({
  initialServices,
  limit = null,
  showSeeMore = true,
}) {
  const formatServices = (list) => {
    if (!list || !Array.isArray(list)) return [];
    const active = list.filter((s) => s && s.isActive !== false && s.slug !== 'main-services');
    const targeted = limit ? active.slice(0, limit) : active;
    return targeted.map((s, idx) => ({
      num: (idx + 1).toString().padStart(2, '0'),
      title: s.title,
      route: s.route || `/services/${s.slug}`,
      description: s.shortDescription || s.description || '',
      image: resolveMediaUrl(s.coverImage || s.image || s.iconImage) || `/assets/images/services/service-card-${((idx % 9) + 1).toString().padStart(2, '0')}.webp`,
    }));
  };

  const [services, setServices] = useState(() => {
    if (initialServices && Array.isArray(initialServices) && initialServices.length > 0) {
      return formatServices(initialServices);
    }
    return [];
  });

  useEffect(() => {
    getServices(true)
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setServices(formatServices(data));
        }
      })
      .catch(() => {});
  }, [limit]);

  return (
    <section className={styles.servicesSection} id="services">
      {/* Main Container */}
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Our <span className={styles.highlightText}>Services</span>
          </h2>
        </div>

        {/* 3-Column Services Grid (Showing 6 Cards) */}
        <div className={styles.grid}>
          {services.map((service, index) => {
            const isExternal = service.route && service.route.startsWith('http');
            const CardComponent = isExternal ? 'a' : Link;
            const linkProps = isExternal
              ? { href: service.route, target: '_blank', rel: 'noopener noreferrer' }
              : { href: service.route || '/services' };

            return (
              <CardComponent
                key={service.slug || index}
                {...linkProps}
                className={styles.card}
              >
                {/* Photo Thumbnail with 01 Watermark */}
                <div className={styles.imageWrapper}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className={styles.cardImage}
                  />
                  <span className={styles.numberWatermark}>{service.num}</span>
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  {/* Title */}
                  <h3 className={styles.cardTitle}>{service.title}</h3>

                  {/* Description Copy */}
                  <p className={styles.cardDescription}>{service.description}</p>

                  {/* Card Footer with READ MORE & Circular Arrow Button */}
                  <div className={styles.cardFooter}>
                    <span className={styles.readMoreLink}>READ MORE</span>

                    <div className={styles.arrowCircleBtn} aria-label={`Learn more about ${service.title}`}>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#111827"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardComponent>
            );
          })}
        </div>

        {/* Centered "SEE MORE" Button Navigating to /services */}
        {showSeeMore && (
          <div className={styles.seeMoreWrapper}>
            <Link href="/services" className={styles.seeMoreBtn}>
              <span>SEE MORE</span>
              <span className={styles.seeMoreIconCircle}>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
