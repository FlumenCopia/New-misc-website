'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CommonServiceTemplate.module.css';
import { getUnifiedService, normalizeService, fallbackServicesCatalog } from '@/lib/servicesData';

// Keyword-based or indexed icon helper for features
function getFeatureSvgIcon(text = '', index = 0) {
  const lower = text.toLowerCase();
  if (lower.includes('search') || lower.includes('seo') || lower.includes('audit')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    );
  }
  if (lower.includes('social') || lower.includes('community') || lower.includes('media')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    );
  }
  if (lower.includes('web') || lower.includes('site') || lower.includes('code') || lower.includes('architecture')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    );
  }
  if (lower.includes('mobile') || lower.includes('app') || lower.includes('responsive')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    );
  }
  if (lower.includes('design') || lower.includes('creative') || lower.includes('brand') || lower.includes('logo')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    );
  }
  if (lower.includes('audio') || lower.includes('podcast') || lower.includes('sound') || lower.includes('voice')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
      </svg>
    );
  }
  if (lower.includes('ai') || lower.includes('automation') || lower.includes('rpa') || lower.includes('bot')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2"></rect>
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v4"></path>
        <line x1="8" y1="16" x2="8" y2="16"></line>
        <line x1="16" y1="16" x2="16" y2="16"></line>
      </svg>
    );
  }
  if (lower.includes('speed') || lower.includes('performance') || lower.includes('growth') || lower.includes('conversion')) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    );
  }

  // Default fallback icons cycle
  const fallbacks = [
    <svg key="fb-1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
    <svg key="fb-2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>,
    <svg key="fb-3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  ];
  return fallbacks[index % fallbacks.length];
}

export default function CommonServiceTemplate({
  service: initialService,
  slug,
  parentService,
  isSubService = false,
}) {
  const [service, setService] = useState(initialService || null);

  useEffect(() => {
    if (!service && slug) {
      getUnifiedService(slug).then((res) => {
        if (res) setService(res);
      });
    }
  }, [service, slug]);

  const currentService =
    service ||
    (slug
      ? normalizeService(null, fallbackServicesCatalog.find((f) => f.slug === slug))
      : fallbackServicesCatalog[0]);

  const {
    title = 'Service Details',
    badge = 'OUR SERVICES',
    taglineLines = ['Strategy-Led.', 'People-Focused.', 'Results-Driven.'],
    shortDescription = 'Comprehensive, result-oriented solutions tailored for your business.',
    fullDescriptionHtml = '',
    features = [],
    subServices = [],
    approach = {},
    whyPartner = {},
    uniqueRequirement = {},
    offerings = [],
    ctaTarget = 'Digital Presence?',
    ctaSubtitle = "Let's discuss how we can help your business grow.",
    specializedPillars = {},
    iconImage = '/assets/images/services/service-card-01.webp',
  } = currentService;

  const eyebrowLabel = title;

  return (
    <div className={styles.pageWrapper}>
      {/* ------------------------------------------------------------------
          1. Hero Section (Mockup High-Fidelity Match)
      ------------------------------------------------------------------- */}
      <section className={styles.heroBanner}>
        {/* Left Vertical Indicator Rail */}
        <div className={styles.heroVerticalRail} aria-hidden="true">
          <div className={styles.verticalDot}></div>
          <div className={styles.verticalText}>{title}</div>
        </div>

        {/* Hero Content Container */}
        <div className={styles.heroContainer}>
          <div className={styles.heroMainBox}>
            {/* Eyebrow: — Digital Marketing */}
            <div className={styles.heroEyebrow}>
              <span className={styles.eyebrowLine}></span>
              <span className={styles.eyebrowText}>{eyebrowLabel}</span>
            </div>

            {/* Headline */}
            <h1 className={styles.heroHeadline}>
              <span className={styles.heroGoldenLine}>{title}</span>
              {taglineLines.map((line, idx) => (
                <span key={`line-${idx}`} className={styles.heroBlackLine}>
                  {line}
                </span>
              ))}
            </h1>

            {/* Description Paragraph */}
            <p className={styles.heroDescription}>
              {shortDescription}
            </p>

            {/* Action Buttons: Get Started → and Learn More */}
            <div className={styles.heroActionsRow}>
              <Link href="/contact" className={styles.getStartedBtn}>
                Get Started
                <span className={styles.btnArrow}>→</span>
              </Link>
              <a href="#approach" className={styles.learnMoreBtn}>
                Learn More
              </a>
            </div>
          </div>

          {/* Right-Side Clean Image Card */}
          <div className={styles.heroRightVisual}>
            <div className={styles.heroImageCard}>
              <Image
                src={iconImage}
                alt={title}
                width={560}
                height={380}
                className={styles.heroServiceImg}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          2. Strategic Overview Section (Why Partner + Approach + Core Services)
      ------------------------------------------------------------------- */}
      <section id="approach" className={styles.strategyOverviewSection}>
        <div className={styles.stratContainer}>
          <div className={styles.stratLayout}>
            {/* ==========================================
                LEFT COLUMN (Why Partner + Contact Block)
            ========================================== */}
            <div className={styles.stratLeftCol}>
              {/* Card 1: Why Partner With Us - Clean text panel */}
              <div className={styles.whyPartnerCard}>
                <h3 className={styles.whyPartnerTitle}>
                  {whyPartner?.title || 'Why Partner With Us'}
                </h3>

                <div className={styles.whyPartnerList}>
                  {(whyPartner?.points || [
                    'Trivandrum-based core engineering and creative team.',
                    'Transparent communication and sprint-based reporting.',
                    'Dedicated account managers and post-launch support.',
                  ]).map((point, idx) => (
                    <div key={`wp-${idx}`} className={styles.whyPartnerItem}>
                      <span className={styles.whyPartnerDot} aria-hidden="true" />
                      <p className={styles.whyPartnerText}>{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Simple, light-background contact block */}
              <div className={styles.contactBlock}>
                <h3 className={styles.contactBlockTitle}>
                  {uniqueRequirement?.title && !uniqueRequirement.title.includes('unique\nrequirement')
                    ? uniqueRequirement.title
                    : 'Have a project in mind?'}
                </h3>

                <p className={styles.contactBlockDesc}>
                  {uniqueRequirement?.subtitle ||
                    'Our team will review your goals and create a custom implementation blueprint.'}
                </p>

                <Link
                  href={uniqueRequirement?.btnRoute || '/contact'}
                  className={styles.contactBlockBtn}
                >
                  <span>
                    {uniqueRequirement?.btnText && uniqueRequirement.btnText !== 'Speak With an Expert'
                      ? uniqueRequirement.btnText
                      : 'Talk to Our Team'}
                  </span>
                  <span className={styles.btnArrow} aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* ==========================================
                RIGHT COLUMN (Our Approach + Services List)
            ========================================== */}
            <div className={styles.stratRightCol}>
              {/* Block 1: OUR APPROACH */}
              <div className={styles.stratApproachBlock}>
                {/* Main Headline */}
                <h2 className={styles.stratMainTitle}>
                  {approach?.taglineLines ? (
                    <>
                      {approach.taglineLines[0]} <br />
                      <span className={styles.stratGoldenText}>{approach.taglineLines[1] || 'Results-Driven.'}</span>
                    </>
                  ) : (
                    <>
                      Strategy-Led. People-Focused. <br />
                      <span className={styles.stratGoldenText}>Results-Driven.</span>
                    </>
                  )}
                </h2>

                {/* Subtitle */}
                <p className={styles.stratSubtitle}>
                  {approach?.subtitle ||
                    'We follow an engineering-driven, user-first approach to architect and build high-performance websites that convert visitors into customers.'}
                </p>

                {/* 3 Simple Editorial Columns (No badges, no numbered circles) */}
                <div className={styles.stratStepsRow}>
                  {(approach?.steps || [
                    {
                      title: 'UX Architecture & Planning',
                      description: 'Blueprint intuitive user journeys, wireframes, and responsive layout structures.',
                    },
                    {
                      title: 'Modern Agile Engineering',
                      description: 'Develop ultra-fast, clean semantic code using modern Next.js and React frameworks.',
                    },
                    {
                      title: 'Speed & Conversion Tuning',
                      description: 'Rigorous cross-device testing, SEO optimization, and sub-second page performance.',
                    },
                  ]).map((stepItem, idx) => (
                    <div key={`strat-step-${idx}`} className={styles.stratStepCol}>
                      <h4 className={styles.stratStepTitle}>{stepItem.title}</h4>
                      <p className={styles.stratStepDesc}>{stepItem.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spacing between Approach and Services */}
              <div className={styles.stratBlockSpacer}></div>

              {/* Block 2: OUR SERVICES (Clean editorial service list) */}
              <div className={styles.stratServicesBlock}>
                {/* Headline: Our Web Development Services */}
                <h3 className={styles.stratServicesTitle}>
                  Our {title}{' '}
                  <span className={styles.stratGoldenText}>Services</span>
                </h3>

                {/* Subtitle */}
                <p className={styles.stratServicesSubtitle}>
                  Comprehensive solutions to help your brand grow, engage, and deliver measurable results.
                </p>

                {/* Clean Editorial Service List (Two Columns) */}
                <div className={styles.stratServicesList}>
                  {(offerings.slice(0, 4).length === 4
                    ? offerings.slice(0, 4)
                    : [
                        {
                          title: 'Custom Web Applications',
                          description: 'Scalable Next.js and React full-stack solutions.',
                        },
                        {
                          title: 'E-commerce Portals',
                          description: 'High-conversion stores with seamless checkouts.',
                        },
                        {
                          title: 'UI/UX Design',
                          description: 'User-centered interfaces with fluid animations.',
                        },
                        {
                          title: 'Headless CMS',
                          description: 'Easy content editing with lightning fast loads.',
                        },
                      ]
                  ).map((srv, idx) => {
                    const CardEl = srv.route ? Link : 'div';
                    const props = srv.route ? { href: srv.route } : {};
                    return (
                      <CardEl
                        key={`strat-srv-${idx}`}
                        className={styles.editorialServiceItem}
                        {...props}
                      >
                        <div className={styles.editorialServiceContent}>
                          <div className={styles.editorialServiceNameRow}>
                            <h4 className={styles.editorialServiceName}>{srv.title}</h4>
                            <span className={styles.editorialServiceArrow} aria-hidden="true">→</span>
                          </div>
                          <p className={styles.editorialServiceDesc}>{srv.description}</p>
                        </div>
                      </CardEl>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ------------------------------------------------------------------
          3. Specialized Pillars Section ("Explore Focused Specializations")
      ------------------------------------------------------------------- */}
      <section id="specializations" className={styles.pillarsSection}>
        <div className={styles.pillarsContainer}>
          {/* Headline: Explore Focused Specializations */}
          <h2 className={styles.pillarsTitle}>
            {specializedPillars?.title || 'Explore Focused'}{' '}
            <span className={styles.pillarsTitleHighlight}>
              {specializedPillars?.titleHighlight || 'Specializations'}
            </span>
          </h2>

          {/* Subtitle */}
          <p className={styles.pillarsSubtitle}>
            {specializedPillars?.subtitle ||
              'From strategy to execution, our specialized digital marketing services help businesses grow with precision, creativity, and measurable results.'}
          </p>

          {/* 4 Pillars Cards Grid */}
          <div className={styles.pillarsGrid}>
            {(specializedPillars?.pillars || [
              {
                step: '01',
                title: 'E-mail Marketing',
                description:
                  'Transform Connections into Conversions with Email Marketing. In the fast-paced digital era, email marketing remains one of the most personal and cost-effective ways to reach your audience.',
                route: '/services/digital-marketing/email',
                linkText: 'Explore Service',
              },
              {
                step: '02',
                title: 'Search Engine Marketing (SEM)',
                description:
                  'Boost Visibility, Drive Traffic, and Achieve Measurable Results with Precision-Powered SEM Strategies. Dominate search engine results pages with strategic paid advertising.',
                route: '/services/digital-marketing/sem',
                linkText: 'Explore Service',
              },
              {
                step: '03',
                title: 'Search Engine Optimization (SEO)',
                description:
                  'Increase organic rankings, high-intent traffic, and lasting authority across search engines. Build sustainable search presence through technical optimization and content strategy.',
                route: '/services/digital-marketing/seo',
                linkText: 'Explore Service',
              },
              {
                step: '04',
                title: 'Social Media Marketing (SMM)',
                description:
                  'Unlock the power of social media to grow your brand and engage with your audience like never before. Strategic campaigns across Facebook, Instagram, LinkedIn, and more.',
                route: '/services/digital-marketing/smm',
                linkText: 'Explore Service',
              },
            ]).map((pillar, idx) => (
              <div key={`pillar-${idx}`} className={styles.pillarCard}>
                <div className={styles.pillarCardBody}>
                  {/* Index Row: Large Number */}
                  <div className={styles.pillarIndexRow}>
                    <span className={styles.pillarNumber}>
                      {pillar.step || (idx + 1).toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>

                  {/* Description */}
                  <p className={styles.pillarDesc}>{pillar.description}</p>
                </div>

                {/* Bottom Action Link */}
                <div className={styles.pillarActionRow}>
                  {pillar.route ? (
                    <Link href={pillar.route} className={styles.pillarLink}>
                      <span>{pillar.linkText || 'Explore Service'}</span>
                      <span className={styles.pillarArrowCircle}>
                        <span className={styles.pillarArrowIcon}>→</span>
                      </span>
                    </Link>
                  ) : (
                    <span className={styles.pillarLink}>
                      <span>{pillar.linkText || 'Explore Service'}</span>
                      <span className={styles.pillarArrowCircle}>
                        <span className={styles.pillarArrowIcon}>→</span>
                      </span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          4. CTA Banner Section (Closing Call to Action - Final Section)
      ------------------------------------------------------------------- */}
      <section className={styles.ctaBannerSection}>
        <div className={styles.ctaBannerContainer}>
          {/* Main Floating Rounded Card */}
          <div className={styles.ctaCard}>
            {/* Left Content Column */}
            <div className={styles.ctaContentCol}>
              {/* Headline */}
              <h2 className={styles.ctaHeadline}>
                Ready to Grow Your <br />
                <span className={styles.ctaGoldenText}>{ctaTarget || 'Digital Presence?'}</span>
              </h2>

              {/* Subtitle */}
              <p className={styles.ctaSubtitle}>
                {ctaSubtitle || "Let's discuss how we can help your business grow."}
              </p>

              {/* Buttons Row */}
              <div className={styles.ctaActionsRow}>
                <Link href="/contact" className={styles.ctaPrimaryBtn}>
                  Schedule a Consultation
                  <span className={styles.btnArrow}>→</span>
                </Link>
                <a href="#specializations" className={styles.ctaSecondaryBtn}>
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Visual Column (3D Chart & Target) */}
            <div className={styles.ctaVisualCol} aria-hidden="true">
              {/* 3D Growth Chart & Target Illustration */}
              <div className={styles.ctaChartWrapper}>
                <Image
                  src="/assets/images/services/cta-growth-chart-v2.jpg"
                  alt="Ready to grow your digital presence"
                  width={580}
                  height={380}
                  className={styles.ctaGrowthImg}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
