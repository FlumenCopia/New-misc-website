'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getServices, getServiceBySlug } from '@/lib/api';
import styles from './ServicesPage.module.css';

const defaultAllServices = [
  {
    num: '01',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    route: '/services/digital-marketing',
    image: '/assets/images/services/service-card-02.webp',
    description:
      'Digital marketing works best when it feels natural, not forced. At MiscArchive, we help businesses in Trivandrum, Kerala, and beyond grow their online presence.',
  },
  {
    num: '02',
    title: 'Web Development',
    slug: 'web-development',
    route: '/services/web-development',
    image: '/assets/images/services/service-card-03.webp',
    description:
      'Websites That Look Good and Work Better. We design and develop websites that are visually stunning, fast, and engineered for high conversions.',
  },
  {
    num: '03',
    title: 'Graphic Designing',
    slug: 'graphic-designing',
    route: '/services/graphic-designing',
    image: '/assets/images/services/service-card-04.webp',
    description:
      "Visuals that speak without explaining. We create unique brand identities and marketing creatives that improve your business's online visibility.",
  },
  {
    num: '04',
    title: 'Branding',
    slug: 'branding',
    route: '/services/branding',
    image: '/assets/images/services/service-card-05.webp',
    description:
      "We're dedicated to helping you shape your brand identity and elevate your market impact through cohesive strategy and distinctive design.",
  },
  {
    num: '05',
    title: 'Search Engine Optimisation (SEO)',
    slug: 'seo',
    route: '/services/digital-marketing/seo',
    image: '/assets/images/services/service-card-06.webp',
    description:
      'SEO improves visibility, drives qualified inbound traffic, and converts clicks into customers using ethical, data-backed strategies.',
  },
  {
    num: '06',
    title: 'Misc Audible',
    slug: 'miscaudibles',
    route: '/services/miscaudibles',
    image: '/assets/images/services/service-card-07.webp',
    description:
      'From podcasts and audiobooks to sonic branding, our audio services cover the full production cycle with top audio engineers.',
  },
  {
    num: '07',
    title: 'RPA / AI Solutions',
    slug: 'rpa-ai',
    route: '/services/rpa-ai',
    image: '/assets/images/services/service-card-08.webp',
    description:
      'RPA automates repetitive workflows and AI delivers intelligent decision-making—both boosting efficiency and cutting operational costs.',
  },
  {
    num: '08',
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    route: '/services/mobile-app-development',
    image: '/assets/images/services/service-card-01.webp',
    description:
      'Native iOS, Android, and cross-platform Flutter apps engineered for fluid performance, delightful interactions, and scalable backends.',
  },
  {
    num: '09',
    title: 'Recruiting & Staffing',
    slug: 'recruiting',
    route: '/services/recruiting',
    image: '/assets/images/services/service-card-09.webp',
    description:
      'Connecting visionary companies with top-tier talent across digital marketing, software development, creative design, and executive leadership.',
  },
  {
    num: '10',
    title: 'Event Management',
    slug: 'event-management',
    route: '/services/event-management',
    image: '/assets/images/services/service-card-01.webp',
    description:
      'End-to-end corporate event planning, brand launch activations, and experiential marketing designed to create lasting impressions.',
  },
];

const ServicesPage = ({ initialServices, initialMainService }) => {
  const [services, setServices] = useState(
    initialServices && initialServices.length > 0 ? initialServices : []
  );
  const [mainService, setMainService] = useState(initialMainService || null);

  useEffect(() => {
    if (!initialServices || initialServices.length === 0) {
      getServices(true)
        .then((data) => {
          if (data && data.length > 0) setServices(data);
        })
        .catch(() => {});
    }
    if (!initialMainService) {
      getServiceBySlug('main-services')
        .then((data) => {
          if (data) setMainService(data);
        })
        .catch(() => {});
    }
  }, [initialServices, initialMainService]);

  // Dynamically resolve services from backend data if present, or fallback to default catalog
  const displayServices = (() => {
    if (services && services.length > 0) {
      const activeItems = services.filter((s) => s.slug !== 'main-services');
      if (activeItems.length > 0) {
        return activeItems.map((item, idx) => {
          const matchedDef = defaultAllServices.find(
            (def) => def.slug === item.slug || (def.title && def.title.toLowerCase() === item.title?.toLowerCase())
          );
          const fallbackImg = `/assets/images/services/service-card-${((idx % 9) + 1).toString().padStart(2, '0')}.webp`;
          const resolvedImg =
            (item.iconImage &&
            !item.iconImage.includes('devolepment') &&
            !item.iconImage.includes('dm.png') &&
            !item.iconImage.includes('seo.png')
              ? item.iconImage
              : null) ||
            item.coverImage ||
            item.image ||
            matchedDef?.image ||
            fallbackImg;

          return {
            num: (idx + 1).toString().padStart(2, '0'),
            title: item.title || matchedDef?.title || 'Service',
            slug: item.slug || matchedDef?.slug || '',
            route: item.route || (item.slug ? `/services/${item.slug}` : matchedDef?.route || '/services'),
            image: resolvedImg,
            description: item.shortDescription || item.description || matchedDef?.description || '',
          };
        });
      }
    }
    return defaultAllServices;
  })();

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Banner */}
      <header className={styles.heroBanner}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            {/* Breadcrumbs */}
            <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
              <Link href="/" className={styles.breadcrumbHome}>
                HOME
              </Link>
              <span className={styles.breadcrumbSeparator}>&gt;</span>
              <span className={styles.breadcrumbActive}>SERVICES</span>
            </nav>

            {/* Headline */}
            <h1 className={styles.heroTitle}>
              OUR <span className={styles.heroHighlight}>SERVICES</span>
            </h1>

            {/* Subtitle / Tagline */}
            <p className={styles.heroSubtitle}>
              Strategic Solutions for Your Digital Growth
            </p>
          </div>
        </div>
      </header>

      {/* Main Services Grid */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {displayServices.map((service, index) => {
              const isExternal = service.route && service.route.startsWith('http');
              const CardTag = isExternal ? 'a' : Link;
              const linkProps = isExternal
                ? { href: service.route, target: '_blank', rel: 'noopener noreferrer' }
                : { href: service.route || '/services' };

              return (
                <CardTag
                  key={service.slug || index}
                  {...linkProps}
                  className={styles.card}
                >
                  {/* Photo Thumbnail with Watermark Number */}
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
                    <h2 className={styles.cardTitle}>{service.title}</h2>

                    {/* Description */}
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
                </CardTag>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation / Assist CTA Section */}
      <section className={styles.assistSection}>
        <div className={styles.assistContainer}>
          {/* Left Column: Headline, Copy, CTA & 3 Features */}
          <div className={styles.assistContent}>

            <h2 className={styles.assistTitle}>
              Discover how we can <br />
              <span className={styles.assistHighlight}>assist you!</span>
            </h2>

            <p className={styles.assistDescription}>
              {(mainService?.shortDescription
                ? mainService.shortDescription.replace(/^Discover how we can assist you!\s*/i, '')
                : "We're excited to learn more about your project. Reach out and let's create something amazing together.")}
            </p>

            <Link href="/contact" className={styles.assistCtaBtn}>
              <span>GET IN TOUCH</span>
              <span className={styles.assistCtaArrow}>
                <svg
                  width="14"
                  height="14"
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

            {/* 3 Feature Items */}
            <div className={styles.assistFeaturesRow}>
              <div className={styles.assistFeatureItem}>
                <div className={styles.assistFeatureIcon}>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#141414"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className={styles.assistFeatureText}>
                  <strong>Share</strong>
                  <span>Your Idea</span>
                </div>
              </div>

              <div className={styles.assistFeatureItem}>
                <div className={styles.assistFeatureIcon}>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#141414"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <div className={styles.assistFeatureText}>
                  <strong>Get Expert</strong>
                  <span>Guidance</span>
                </div>
              </div>

              <div className={styles.assistFeatureItem}>
                <div className={styles.assistFeatureIcon}>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#141414"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                    <polyline points="4 14 12 6 18 12 22 8" />
                  </svg>
                </div>
                <div className={styles.assistFeatureText}>
                  <strong>Grow</strong>
                  <span>Together</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Woman & Floating Badges */}
          <div className={styles.assistVisualWrapper}>

            {/* Floating Card: Your Growth Our Priority */}
            <div className={styles.cardGrowth}>
              <div className={styles.cardGrowthIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="14" width="4" height="8" rx="1" fill="#f59e0b" />
                  <rect x="9" y="9" width="4" height="13" rx="1" fill="#fdbb14" />
                  <rect x="16" y="4" width="4" height="18" rx="1" fill="#fed20f" />
                </svg>
              </div>
              <div className={styles.cardGrowthText}>
                <strong>Your Growth</strong>
                <span>Our Priority</span>
              </div>
            </div>

            {/* Floating Card: Ideas Strategy Results */}
            <div className={styles.cardIdeas}>
              <div className={styles.cardIdeasIcon}>
                💡
              </div>
              <div className={styles.cardIdeasText}>
                <span>Ideas</span>
                <span>Strategy</span>
                <span>Results</span>
              </div>
            </div>

            {/* Organic Curved Photo Frame */}
            <div className={styles.assistImageWrapper}>
              <img
                src="/assets/images/services/consultation-woman.jpg"
                alt="Consultation and Digital Marketing Assistance"
                className={styles.assistImage}
              />
            </div>

            {/* Floating Badge: Paper Plane */}
            <div className={styles.cardPlane}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#141414" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
