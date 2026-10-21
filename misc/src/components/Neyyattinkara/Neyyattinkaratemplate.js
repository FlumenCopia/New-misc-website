"use client";

import React from "react";
import Link from "next/link";
import styles from "./Neyyattinkara.module.css";

const TOWNS = [
  "Neyyattinkara",
  "Poovar",
  "Parasala",
  "Karakkonam",
  "Nedumangad",
  "Nemom",
  "Balaramapuram",
  "Sasthamangalam",
];

export default function Neyyattinkaratemplate() {
  return (
    <section className={styles.heroSection} aria-label="Neyyattinkara Regional Launch">
      <div className={styles.heroContainer}>
        {/* Left Column: Headline, Narrative & CTA */}
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Regional Expansion</span>

          <h1 className={styles.heroHeadline}>
            MISC ARCHIVE ARRIVES IN <span className={styles.highlight}>NEYYATTINKARA</span>
          </h1>

          <div className={styles.heroAccentText}>
            Your trusted partner for digital growth, creative strategy, and brand building, now closer to you.
          </div>

          <p className={styles.heroSecondaryText}>
            From startups to established businesses, we help brands stand out, scale smartly, and connect meaningfully with their audience.
          </p>

          <Link href="/contact" className={styles.heroCtaBtn}>
            <span>Enquire Now</span>
            <span className={styles.btnArrow} aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Right Column: Editorial Regional Footprint Panel (No icons, no capsules) */}
        <div className={styles.regionalPanel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelEyebrow}>Regional Footprint</span>
            <span className={styles.panelSub}>South Trivandrum Division</span>
          </div>

          <div className={styles.panelStatement}>
            <h3 className={styles.panelTitle}>Neyyattinkara Office</h3>
            <p className={styles.panelDescription}>
              Direct on-ground access to agency-grade creative strategy, performance marketing, and digital engineering.
            </p>
          </div>

          <div className={styles.coverageSection}>
            <span className={styles.coverageTitle}>Areas Served Across South Trivandrum</span>
            <ul className={styles.townsList}>
              {TOWNS.map((town, idx) => (
                <li key={`town-${idx}`} className={styles.townItem}>
                  <span className={styles.townIndex}>0{idx + 1}</span>
                  <span className={styles.townName}>{town}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
