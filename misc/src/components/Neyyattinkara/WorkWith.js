"use client";

import React from "react";
import Link from "next/link";
import styles from "@/components/home/CrucialReasons.module.css";

const AUDIENCES = [
  {
    num: "01",
    title: "Startups & Entrepreneurs",
    description: "Helping new ventures build a strong foundation from day one.",
  },
  {
    num: "02",
    title: "Small & Medium Businesses",
    description: "Empowering growing companies to scale their digital presence.",
  },
  {
    num: "03",
    title: "Established Brands",
    description: "Reinforcing market leadership with innovative digital strategies.",
  },
  {
    num: "04",
    title: "Local Businesses",
    description: "Supporting neighborhood enterprises to expand their reach.",
  },
];

export default function WorkWith() {
  return (
    <section className={styles.crucialSection} id="who-we-work-with">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Who We <span className={styles.highlightText}>Work With</span>
          </h2>
        </div>

        <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {AUDIENCES.map((item) => (
            <div key={item.num} className={styles.gridItem}>
              <div className={styles.numberCol}>
                <span className={styles.numberText}>{item.num}</span>
                <span className={styles.slash}>/</span>
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Action Banner Reusing closingBox */}
        <div className={styles.closingBox} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', textAlign: 'left', marginTop: '48px' }}>
          <p className={styles.closingText} style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827' }}>
            If growth is your goal, we&apos;re the right partner.
          </p>

          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FFA000',
              color: '#111827',
              fontSize: '14px',
              fontWeight: '700',
              padding: '13px 28px',
              borderRadius: '9999px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(255, 160, 0, 0.25)',
              transition: 'all 0.25s ease',
            }}
          >
            <span>Schedule a Consultation</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
