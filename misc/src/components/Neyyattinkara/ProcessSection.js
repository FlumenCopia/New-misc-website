"use client";

import React from "react";
import styles from "@/components/home/CrucialReasons.module.css";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Understand",
    description: "We listen first—your goals, challenges, and audience.",
  },
  {
    num: "02",
    title: "Strategize",
    description: "We craft a tailored plan that aligns creativity with performance.",
  },
  {
    num: "03",
    title: "Execute",
    description: "Our team brings the strategy to life across digital and creative channels.",
  },
  {
    num: "04",
    title: "Optimize",
    description: "Continuous tracking, insights, and refinement for sustained growth.",
  },
];

export default function ProcessSection() {
  return (
    <section className={styles.drawbacksSection} id="process">
      <div className={styles.container}>
        <div className={styles.drawbacksHeader}>
          <h2 className={styles.drawbacksHeading}>
            Our <span className={styles.highlightText}>Process</span>
          </h2>
        </div>

        <div className={styles.drawbacksGrid}>
          {PROCESS_STEPS.map((item) => (
            <div key={item.num} className={styles.drawbackCell}>
              <span className={styles.drawbackNumber}>{item.num}</span>

              <div className={styles.drawbackContent}>
                <h3 className={styles.drawbackTitle}>{item.title}</h3>
                <p className={styles.drawbackDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
