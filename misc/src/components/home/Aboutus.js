'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Aboutus.module.css';

export default function AboutSection({
  tag = 'ABOUT US',
  title = 'What makes us a team?',
  highlightWord = 'team?',
  paragraphs,
  showButton = true,
  buttonLink = '/about',
  buttonText = 'READ MORE',
}) {
  // Default paragraph preserved 100% word-for-word
  const defaultParagraphs = [
    `We specialise in creating custom marketing solutions for brands and businesses in India and throughout the world. By skilfully fusing the 3 C’s of marketing—Customer, Company, Competitor—with the influence of the web, social media marketing, and mobile technology, our team enables our clients to realise their full potential.`,
  ];

  const contentParagraphs = paragraphs && paragraphs.length > 0 ? paragraphs : defaultParagraphs;

  return (
    <section className={styles.aboutSection} id="about-us">
      {/* Central Content Container */}
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Left Column: Authentic Tree Artwork + Refined Floating Badges */}
          <div className={styles.visualCol}>
            <div className={styles.illustrationWrap}>
              
              {/* Badge 1: Top-Left (Yellow Bar Chart) */}
              <div className={`${styles.floatingBadge} ${styles.badgeChart}`}>
                <div className={styles.badgeChartInner} title="Marketing Analytics & Growth">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3.5" y="14" width="4" height="7" rx="1.5" fill="#FFA000" />
                    <rect x="10" y="9" width="4" height="12" rx="1.5" fill="#FFA000" />
                    <rect x="16.5" y="4" width="4" height="17" rx="1.5" fill="#FFA000" />
                  </svg>
                </div>
              </div>

              {/* Badge 2: Right of Canopy (Amber Megaphone) */}
              <div className={`${styles.floatingBadge} ${styles.badgeMegaphone}`}>
                <div className={styles.badgeMegaphoneInner} title="Social Media & Broadcasting">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11l14-5v12L3 13v-2z" fill="#111827" stroke="none" />
                    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" stroke="#111827" strokeWidth="2" />
                    <path d="M18.5 8.5a4.5 4.5 0 0 1 0 7" stroke="#111827" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* Badge 3: Bottom-Left (Web / Globe Network) */}
              <div className={`${styles.floatingBadge} ${styles.badgeGlobe}`}>
                <div className={styles.badgeGlobeInner} title="Global Digital Reach">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
              </div>

              {/* Centered Tree Artwork */}
              <div className={styles.treeImageContainer}>
                <Image
                  src="/assets/images/banyan-tree-enhanced.webp"
                  alt="MiscArchive Tree of Digital Marketing Solutions"
                  width={500}
                  height={490}
                  priority
                  className={styles.treeImage}
                />
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Copy & Call to Action */}
          <div className={styles.contentCol}>
            {/* Hidden SEO Heading (Preserved Intact) */}
            <h1 style={{ display: 'none' }}>
              <b>Digital Marketing Company in Trivandrum</b>
            </h1>

            {/* Dynamic Headline with Highlight Word */}
            <h2 className={styles.heading}>
              {highlightWord && title.includes(highlightWord) ? (
                <>
                  {title.replace(highlightWord, '').trim()}{' '}
                  <span className={styles.highlightText}>{highlightWord}</span>
                </>
              ) : title.includes('team?') ? (
                <>
                  What makes <br />
                  us a <span className={styles.highlightText}>team?</span>
                </>
              ) : title.includes('MiscArchive') ? (
                <>
                  ABOUT <span className={styles.highlightText}>MiscArchive</span>
                </>
              ) : (
                title
              )}
            </h2>

            {/* Preserved Editorial Copy */}
            {contentParagraphs.map((para, idx) => (
              <p key={idx} className={styles.paragraph}>
                {para}
              </p>
            ))}

            {/* CTA Read More Button */}
            {showButton && (
              <div className={styles.ctaWrapper}>
                <Link href={buttonLink} className={styles.readMoreBtn}>
                  <span className={styles.btnLabel}>{buttonText}</span>
                  <span className={styles.btnIconCircle}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
