"use client";

import React from "react";
import styles from "@/components/home/CrucialReasons.module.css";

const WHY_CHOOSE_ITEMS = [
  {
    num: "01",
    title: "Custom-built strategies",
    description:
      "Aligned with your business goals and tailored to your unique market position.",
  },
  {
    num: "02",
    title: "Extended team approach",
    description:
      "We work as an extension of your brand, understanding your business inside out.",
  },
  {
    num: "03",
    title: "Creativity meets data",
    description:
      "A perfect balance of creative thinking and data-driven decision-making.",
  },
  {
    num: "04",
    title: "Local accessibility",
    description:
      "Our Neyyatinkara branch ensures local accessibility with the same quality and standards Misc Archive is known for.",
  },
  {
    num: "05",
    title: "Transparent outcomes",
    description:
      "Clear communication and measurable results you can track and understand.",
  },
  {
    num: "06",
    title: "Growth-focused",
    description:
      "We're committed to helping your business grow and scale sustainably.",
  },
];

export default function WhyChoose() {
  return (
    <section className={styles.whyChooseSection} id="why-choose">
      <div className={styles.container}>
        <div className={styles.whyChooseHeader}>
          <h2 className={styles.whyChooseHeading}>
            Why Choose <span className={styles.whyChooseHighlight}>MiscArchive</span>
          </h2>
        </div>

        <p className={styles.whyChooseIntro}>
          We don&apos;t believe in one-size-fits-all solutions. Every brand has a story and a strategy of its own. Here is why partnering with our Neyyattinkara team is your best decision.
        </p>

        <div className={styles.whyChooseGrid}>
          {WHY_CHOOSE_ITEMS.map((item) => (
            <div key={item.num} className={styles.whyChooseCell}>
              <span className={styles.whyChooseNumber}>{item.num}</span>
              <div className={styles.whyChooseContent}>
                <h3 className={styles.whyChooseTitle}>{item.title}</h3>
                <p className={styles.whyChooseDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
