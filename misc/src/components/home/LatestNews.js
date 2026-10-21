'use client';

import React from 'react';
import styles from './CrucialReasons.module.css';

// Exact preserved items for "Digital marketing is crucial for many reasons!"
const crucialReasons = [
  {
    num: '01',
    title: 'Diverse Skill Set:',
    description:
      'Digital marketing encompasses various aspects like SEO, social media, content creation, PPC advertising, email marketing, and more. A team can bring together individuals with specialized skills in each of these areas.',
  },
  {
    num: '02',
    title: 'Strategy Development:',
    description:
      'A team can collaborate to create a comprehensive digital marketing strategy tailored to your company’s goals and target audience.',
  },
  {
    num: '03',
    title: 'Workload Distribution:',
    description:
      'Digital marketing involves ongoing tasks. A team can distribute the workload effectively, ensuring consistent and timely execution.',
  },
  {
    num: '04',
    title: 'Adaptation and Innovation:',
    description:
      'The digital landscape is ever-evolving. A team can stay updated on industry trends, algorithms, and emerging platforms, allowing your company to adapt and innovate accordingly.',
  },
  {
    num: '05',
    title: 'Creative Input:',
    description:
      'Different team members can provide fresh perspectives and creative ideas, enhancing the quality of campaigns and content.',
  },
  {
    num: '06',
    title: 'Data Analysis:',
    description:
      'A team can collectively analyse data and metrics, helping your company make data-driven decisions to optimize marketing efforts.',
  },
];

// Exact preserved items for "Drawbacks of not having a digital marketing team!"
const drawbacksList = [
  {
    num: '01',
    title: 'Limited Expertise:',
    description:
      'Without dedicated professionals, you may lack the in-depth expertise needed for various aspects of digital marketing like SEO, SEM, analytics, etc., potentially leading to suboptimal results.',
  },
  {
    num: '02',
    title: 'Inconsistent Execution:',
    description:
      'The absence of a dedicated team may result in irregular or inconsistent execution of digital marketing strategies, hindering the effectiveness and impact of your efforts.',
  },
  {
    num: '03',
    title: 'Overwhelming Workload:',
    description:
      'Handling all digital marketing responsibilities alone can overwhelm you, impacting your ability to manage other essential aspects of your business effectively.',
  },
  {
    num: '04',
    title: 'Time Constraints:',
    description:
      'Digital marketing requires time and effort. Without a team, you might struggle to balance marketing tasks with other operational and managerial responsibilities.',
  },
  {
    num: '05',
    title: 'Difficulty Keeping Up with Trends:',
    description:
      'Staying updated with the fast-paced changes in digital marketing trends can be challenging for a single person, potentially causing your strategies to become outdated.',
  },
  {
    num: '06',
    title: 'Lack of Collaboration and Innovation:',
    description:
      'Collaborative brainstorming and innovative ideas are often fostered in a team environment. Without a team, you may miss out on creative solutions and fresh perspectives.',
  },
];

// Exact preserved items for "Why Choose Miscarchive for Your Digital Marketing Needs?"
const whyChooseReasons = [
  {
    num: '01',
    title: 'Expertise Across the Spectrum:',
    description:
      "Our team comprises seasoned experts in every facet of digital marketing - from SEO and content creation to social media management and PPC advertising. We've got the skills and know-how to tackle all your digital marketing challenges.",
  },
  {
    num: '02',
    title: 'Tailored Strategies, Measurable Results:',
    description:
      "We don't believe in one-size-fits-all solutions. Our approach begins with a deep understanding of your business, goals, and target audience. We then craft customized strategies that deliver measurable results.",
  },
  {
    num: '03',
    title: 'Data-Driven Decision Making:',
    description:
      "With Miscarchive, you're not flying blind. We're obsessed with data. Our team rigorously analyzes performance metrics, ensuring that every campaign is optimized for success. We make informed decisions to maximize ROI.",
  },
  {
    num: '04',
    title: 'Creativity and Innovation:',
    description:
      "Digital marketing isn't just about numbers; it's also about creativity. Our team is a melting pot of innovative thinkers, always pushing the boundaries to create engaging content and cutting-edge campaigns.",
  },
  {
    num: '05',
    title: 'Proven Track Record:',
    description:
      "Our portfolio is a testament to our success. We've helped businesses of all sizes and industries achieve their digital marketing goals. When you choose Miscarchive, you're choosing a track record of excellence.",
  },
  {
    num: '06',
    title: 'Scalability and Adaptability:',
    description:
      'As your business grows, we grow with you. Our strategies are designed to scale seamlessly, ensuring that your digital marketing efforts remain effective as you expand.',
  },
  {
    num: '07',
    title: 'Cost-Effective Solutions:',
    description:
      'Quality doesn\'t have to come at a premium. Miscarchive offers competitive pricing without compromising on the quality of service. We believe in delivering value that exceeds your investment.',
  },
  {
    num: '08',
    title: 'Client-Centric Approach:',
    description:
      "Your success is our success. We're committed to building long-lasting client relationships. When you choose Miscarchive, you're choosing a partner dedicated to your growth.",
  },
];

export default function DigitalMarketingSection() {
  return (
    <>
      {/* =========================================================================
          SECTION 1: DIGITAL MARKETING IS CRUCIAL FOR MANY REASONS! (3x2 Grid)
          ========================================================================= */}
      <section className={styles.crucialSection} id="crucial-reasons">
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.heading}>
              Digital marketing is crucial <br />
              <span className={styles.highlightText}>for many reasons!</span>
            </h2>
          </div>

          <div className={styles.grid}>
            {crucialReasons.map((item) => (
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
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: DRAWBACKS OF NOT HAVING A DIGITAL MARKETING TEAM! (2x3 Grid)
          ========================================================================= */}
      <section className={styles.drawbacksSection} id="drawbacks">
        <div className={styles.container}>
          <div className={styles.drawbacksHeader}>
            <h2 className={styles.drawbacksHeading}>
              Drawbacks <span className={styles.highlightText}>of not having</span> <br />
              <span className={styles.highlightText}>a digital marketing team!</span>
            </h2>
          </div>

          <div className={styles.drawbacksGrid}>
            {drawbacksList.map((item) => (
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

      {/* =========================================================================
          SECTION 3: WHY CHOOSE MISCARCHIVE FOR YOUR DIGITAL MARKETING NEEDS? (2x4 Grid)
          ========================================================================= */}
      <section className={styles.whyChooseSection} id="why-choose-miscarchive">
        <div className={styles.container}>
          <div className={styles.whyChooseHeader}>
            <h2 className={styles.whyChooseHeading}>
              Why Choose Miscarchive for Your <br />
              <span className={styles.whyChooseHighlight}>Digital Marketing Needs?</span>
            </h2>
          </div>

          <p className={styles.whyChooseIntro}>
            At Miscarchive, we understand that in the fast-paced world of digital marketing, staying ahead of the curve is paramount. Here&apos;s why partnering with us is your best decision and we’ll assure you that we are the <strong>Best Digital Marketing company in Trivandrum.</strong>
          </p>

          <div className={styles.whyChooseGrid}>
            {whyChooseReasons.map((item) => (
              <div key={item.num} className={styles.whyChooseCell}>
                <span className={styles.whyChooseNumber}>{item.num}</span>

                <div className={styles.whyChooseContent}>
                  <h3 className={styles.whyChooseTitle}>{item.title}</h3>
                  <p className={styles.whyChooseDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.closingBox}>
            <p className={styles.closingText}>
              Choose Miscarchive as the best digital marketing company in Trivandrum as your partner. Join the ranks of businesses that have experienced unparalleled success with us. Contact us today to embark on your journey to digital greatness.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
