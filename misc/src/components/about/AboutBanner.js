'use client';

import React from 'react';
import Link from 'next/link';
import styles from './AboutBanner.module.css';

const AboutBanner = () => {
  return (
    <header className={styles.banner}>
      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbHome}>
              HOME
            </Link>
            <span className={styles.breadcrumbSeparator}>&gt;</span>
            <span className={styles.breadcrumbActive}>ABOUT US</span>
          </nav>

          {/* Heading */}
          <h1 className={styles.title}>
            ABOUT <span className={styles.highlight}>US</span>
          </h1>

          {/* Subtitle / Tagline */}
          <p className={styles.subtitle}>People. Ideas. Digital Growth.</p>
        </div>
      </div>
    </header>
  );
};

export default AboutBanner;
