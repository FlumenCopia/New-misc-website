'use client';

import { useEffect } from 'react';

export default function Practical() {
  useEffect(() => {
    const fadeEls = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeEls.forEach(el => observer.observe(el));
  }, []);

  return (
    <>
      {/* Background */}
      <div className="tech-bg" />

      {/* RESULTS SECTION */}
      <section className="section-padding">
        <div className="container">

          {/* Heading */}
          <div className="text-center fade-in">
            <h2 className="section-title">
              The Outcomes: Practical Systems, Tangible Results
            </h2>
            <p className="section-subtitle">
              No fluff. We track real enquiries, real walk-ins, and real growth.
            </p>
          </div>

          {/* Cards */}
          <div className="row">

            <div className="col-sm-4 fade-in" style={{ transitionDelay: '0.1s' }}>
              <div className="card">
                <div className="card-icon">
                  <span>✉</span>
                </div>
                <h3>Real Enquiries</h3>
                <p>
                  Digital systems that filter noise and attract only high-intent
                  leads ready to convert.
                </p>
              </div>
            </div>

            <div className="col-sm-4 fade-in" style={{ transitionDelay: '0.2s' }}>
              <div className="card">
                <div className="card-icon">
                  <span>⌖</span>
                </div>
                <h3>Real Walk-ins</h3>
                <p>
                  Local SEO and trust signals that turn online presence into
                  physical foot traffic.
                </p>
              </div>
            </div>

            <div className="col-sm-4 fade-in" style={{ transitionDelay: '0.3s' }}>
              <div className="card">
                <div className="card-icon">
                  <span>🚀</span>
                </div>
                <h3>Real Momentum</h3>
                <p>
                  Sustainable systems that reduce acquisition cost and compound
                  business growth.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
