'use client';

import React from 'react';
import styles from './MeetOurFounders.module.css';
import { resolveMediaUrl } from '@/lib/api';

const DEFAULT_FOUNDERS = [
  {
    name: 'Anoop D Anil',
    designation: 'Vice President, CFO',
    photoImage: '/assets/images/sunny.webp',
  },
  {
    name: 'Anoop Krishna',
    designation: 'CEO, FOUNDER',
    photoImage: '/assets/images/anoop.webp',
  },
  {
    name: 'Rohini A Pillai',
    designation: 'Co-Founder, COO',
    photoImage: '/assets/images/anju.webp',
  },
];

export default function MeetOurFounders({ team }) {
  // If team is passed, match founders or use default 3 founders from mockup
  let displayFounders = DEFAULT_FOUNDERS;

  if (team && Array.isArray(team) && team.length > 0) {
    const matched = DEFAULT_FOUNDERS.map((df) => {
      const foundInApi = team.find(
        (t) =>
          t.name?.toLowerCase().trim() === df.name.toLowerCase().trim() ||
          t.designation?.toLowerCase().trim() === df.designation.toLowerCase().trim()
      );
      if (foundInApi) {
        return {
          name: foundInApi.name || df.name,
          designation: foundInApi.designation || df.designation,
          photoImage:
            resolveMediaUrl(foundInApi.photoImage || foundInApi.image) ||
            foundInApi.photoImage ||
            df.photoImage,
        };
      }
      return df;
    });

    displayFounders = matched.length === 3 ? matched : DEFAULT_FOUNDERS;
  }

  return (
    <section className={styles.foundersSection}>
      {/* ================= CONTENT CONTAINER ================= */}
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.headerWrapper}>
          <h2 className={styles.title}>
            Meet Our <span className={styles.highlight}>Founders</span>
          </h2>
        </div>

        {/* 3 Founders Cards */}
        <div className={styles.grid}>
          {displayFounders.map((founder, idx) => (
            <div className={styles.card} key={founder.name || idx}>
              <div className={styles.imageWrapper}>
                <img
                  src={founder.photoImage}
                  alt={founder.name}
                  className={styles.image}
                  loading="lazy"
                />
              </div>

              <div className={styles.content}>
                <h3 className={styles.name}>{founder.name}</h3>
                <p className={styles.designation}>{founder.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
