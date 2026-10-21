"use client";

import React from "react";
import Link from "next/link";
import styles from "@/components/home/Services.module.css";

const SERVICES = [
  {
    num: "01",
    title: "Digital Marketing",
    route: "/services/digital-marketing",
    image: "/assets/images/services/service-card-02.webp",
    description:
      "Reach the right audience through planned campaigns. From SEO to lead generation, our strategies deliver measurable results.",
  },
  {
    num: "02",
    title: "Branding & Strategy",
    route: "/services",
    image: "/assets/images/services/service-card-05.webp",
    description:
      "Define your brand voice, positioning, and visual identity to ensure consistency across all digital touchpoints.",
  },
  {
    num: "03",
    title: "Web Development",
    route: "/services/web-development",
    image: "/assets/images/services/service-card-03.webp",
    description:
      "User-friendly, responsive websites built to perform and aligned perfectly with your business objectives.",
  },
  {
    num: "04",
    title: "Graphic Design",
    route: "/services/graphic-designing",
    image: "/assets/images/services/service-card-04.webp",
    description:
      "Visual content that communicates clearly. Every design is crafted to match your brand’s unique personality.",
  },
  {
    num: "05",
    title: "Social Media Management",
    route: "/services/digital-marketing/smm",
    image: "/assets/images/services/service-card-06.webp",
    description:
      "Purpose-driven content that builds trust. We manage your presence from planning to active engagement.",
  },
  {
    num: "06",
    title: "Creative Production",
    route: "/services/miscaudibles",
    image: "/assets/images/services/service-card-07.webp",
    description:
      "Audio-visual solutions and storytelling concepts that help your brand connect emotionally with its audience.",
  },
];

export default function ServicesNeyyattinkara() {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            Comprehensive <span className={styles.highlightText}>Solutions</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((service, index) => (
            <Link
              key={service.title || index}
              href={service.route}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={service.image}
                  alt={service.title}
                  className={styles.cardImage}
                />
                <span className={styles.numberWatermark}>{service.num}</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>

                <div className={styles.cardFooter}>
                  <span className={styles.readMoreLink}>READ MORE</span>
                  <div
                    className={styles.arrowCircleBtn}
                    aria-label={`Learn more about ${service.title}`}
                  >
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
