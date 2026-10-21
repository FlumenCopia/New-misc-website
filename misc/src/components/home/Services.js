'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getServices } from '@/lib/api';
import styles from './Services.module.css';

// Exact preserved original services list and copy with images matching the mockup
export const defaultServices = [
  {
    num: '01',
    title: 'Main Services',
    slug: 'main-services',
    route: '/services',
    image: '/assets/images/services/service-card-01.webp',
    description:
      "Discover how we can assist you! We're excited to learn more about your project. Reach out and let's create something amazing together.",
  },
  {
    num: '02',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    route: '/services/digital-marketing',
    image: '/assets/images/services/service-card-02.webp',
    description:
      'Digital marketing works best when it feels natural not forced. At MiscArchive, we help businesses in Trivandrum, Kerala, and beyond grow their online presence.',
  },
  {
    num: '03',
    title: 'Web Development',
    slug: 'web-development',
    route: '/services/web-development',
    image: '/assets/images/services/service-card-03.webp',
    description:
      'Websites That Look Good and Work Better. A website is often the first interaction someone has with your brand. We design and develop websites that are not only visually appealing, but also functional, fast, and easy to navigate.',
  },
  {
    num: '04',
    title: 'Graphic Designing',
    slug: 'graphic-designing',
    route: '/services/graphic-designing',
    image: '/assets/images/services/service-card-04.webp',
    description:
      "Graphic design is the centre of attraction for any business. We at Misc Archive create unique graphic designs that help improve your business's online visibility.",
  },
  {
    num: '05',
    title: 'Branding',
    slug: 'branding',
    route: '/services',
    image: '/assets/images/services/service-card-05.webp',
    description:
      "Misc Archive is a leading Digital Marketing Company in Trivandrum. We're dedicated to helping you shape your brand identity and elevate your impact in the world through branding.",
  },
  {
    num: '06',
    title: 'SEO',
    slug: 'seo',
    route: '/services/digital-marketing/seo',
    image: '/assets/images/services/service-card-06.webp',
    description:
      'SEO improves visibility, drives traffic, boosts sales, and converts clicks into customers. We make your site rank higher on search engines using trends and analytics.',
  },
];

export default function ServicesSection({
  initialServices,
  limit = 6,
  showSeeMore = true,
}) {
  const [services, setServices] = useState(() => {
    if (initialServices && initialServices.length > 0) {
      const active = initialServices.filter((s) => s.isActive !== false);
      return (limit ? active.slice(0, limit) : active).map((s, idx) => ({
        num: (idx + 1).toString().padStart(2, '0'),
        title: s.title,
        route: s.route || `/services/${s.slug}`,
        description: s.shortDescription || s.description || defaultServices[idx % defaultServices.length]?.description || '',
        image: s.image || defaultServices[idx % defaultServices.length]?.image,
      }));
    }
    return limit ? defaultServices.slice(0, limit) : defaultServices;
  });

  useEffect(() => {
    if (!initialServices) {
      getServices(true)
        .then((data) => {
          if (data && data.length > 0) {
            const list = limit ? data.slice(0, limit) : data;
            setServices(
              list.map((s, idx) => ({
                num: (idx + 1).toString().padStart(2, '0'),
                title: s.title,
                route: s.route || `/services/${s.slug}`,
                description: s.shortDescription || s.description || defaultServices[idx % defaultServices.length]?.description || '',
                image: s.image || defaultServices[idx % defaultServices.length]?.image,
              }))
            );
          }
        })
        .catch(() => {});
    }
  }, [initialServices, limit]);

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
