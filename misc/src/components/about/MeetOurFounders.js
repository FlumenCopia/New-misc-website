'use client';

import React from 'react';
import styles from './MeetOurFounders.module.css';
import { resolveMediaUrl } from '@/lib/api';

export default function MeetOurFounders({ team }) {
  const displayTeam = Array.isArray(team)
    ? team.filter((m) => m && m.isActive !== false)
    : [];

  const sortedTeam = [...displayTeam].sort((a, b) => (a.order || 0) - (b.order || 0));

  if (sortedTeam.length === 0) {
    return null;
  }

  return (
    <section className={styles.foundersSection}>
      {/* ================= CONTENT CONTAINER ================= */}
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.headerWrapper}>
          <h2 className={styles.title}>
            Meet Our <span className={styles.highlight}>Team & Founders</span>
          </h2>
        </div>

        {/* Dynamic Team Cards Grid without artificial limitation */}
        <div className={styles.grid}>
          {sortedTeam.map((member, idx) => {
            const photoSrc = resolveMediaUrl(member.photoImage || member.image);
            return (
              <div className={styles.card} key={member._id || member.name || idx}>
                <div className={styles.imageWrapper}>
                  {photoSrc ? (
                    <img
                      src={photoSrc}
                      alt={member.name}
                      className={styles.image}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#f5f5f4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e', fontSize: '2rem', fontWeight: 'bold' }}>
                      {member.name ? member.name.charAt(0) : 'M'}
                    </div>
                  )}
                </div>

                <div className={styles.content}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.designation}>{member.designation}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
