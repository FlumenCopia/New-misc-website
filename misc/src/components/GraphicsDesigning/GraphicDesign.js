'use client';

import { useEffect, useState } from 'react';
import { getServiceBySlug } from '@/lib/api';

const defaultDesignFeatures = [
  { icon: 'glyphicon glyphicon-eye-open', color: '#7c3aed', bg: '#ede9fe', title: 'Brand creatives and marketing visuals', desc: 'Create compelling brand visuals across all marketing channels.' },
  { icon: 'glyphicon glyphicon-flash', color: '#ec4899', bg: '#fce7f3', title: 'Social media designs', desc: 'Scroll-stopping graphics with consistent storytelling.' },
  { icon: 'glyphicon glyphicon-ok-circle', color: '#2563eb', bg: '#dbeafe', title: 'Campaign creatives', desc: 'High-impact visuals that drive engagement.' },
  { icon: 'glyphicon glyphicon-info-sign', color: '#4f46e5', bg: '#e0e7ff', title: 'Visual identity support', desc: 'Consistent branding across all touchpoints.' },
];

export default function GraphicDesignPage({ initialService }) {
  const [service, setService] = useState(initialService || null);

  useEffect(() => {
    getServiceBySlug('graphic-designing').then((data) => {
      if (data) setService(data);
    }).catch(() => {});
  }, []);

  const featureCards = (service?.features && service.features.length > 0)
    ? service.features.map((feat, i) => {
        const fallback = defaultDesignFeatures[i] || {};
        return {
          icon: fallback.icon || 'glyphicon glyphicon-star',
          color: fallback.color || '#7c3aed',
          bg: fallback.bg || '#ede9fe',
          title: feat,
          desc: fallback.desc || 'Bespoke creative design deliverable crafted for your brand identity.',
        };
      })
    : defaultDesignFeatures;

  return (
    <>
      {/* HERO */}
      <section className="section-paddingGraphic text-center" style={{ background: "#fff" }}>
        <div className="container">
          <h1 style={{ fontSize: "48px" }}>{service?.title || 'Graphic Designing'}</h1>
          <p className="text-muted-lgGraphic">Visuals That Speak Without Explaining.</p>
          <div className="gradient-barGraphic"></div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-paddingGraphic" style={{ background: "#fff" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-muted-lgGraphic">
                {service?.shortDescription ||
                  'Good design does not just look attractive, it communicates. Our graphic design services help brands create a strong visual identity that feels consistent, clear, and memorable.'}
              </p>
              <p className="text-muted-lgGraphic">
                We design with purpose, ensuring every visual aligns with your
                brand voice and message.
              </p>
            </div>

            <div className="col-md-6">
              <div className="card cardGraphic2">
                <img
                  src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80"
                  className="img-responsive"
                  alt="Graphic Design"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-paddingGraphic" style={{ background: "#f3f4f6" }}>
        <div className="container">
          <h2 className="text-center">Our graphic design services include:</h2>
          <br /><br />

          <div className="row">
            {featureCards.map((feat, idx) => (
              <div className="col-sm-6 col-md-3" key={idx}>
                <div className="card cardGraphic">
                  <div className="icon-circle" style={{ background: feat.bg }}>
                    <span
                      className={feat.icon}
                      style={{ fontSize: "28px", color: feat.color }}
                    ></span>
                  </div>
                  <h4>{feat.title}</h4>
                  <p className="text-muted">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <br />
          <p className="text-center text-muted-lgGraphic">
            Every design is created to leave a lasting impression.
          </p>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section-paddingGraphic" style={{ background: "#fff" }}>
        <div className="container">
          <h2 className="text-center">Our Recent Work</h2>
          <p className="text-center text-muted-lgGraphic">
            Explore how we&apos;ve helped brands communicate visually.
          </p>
          <br />

          <div className="row">
            <div className="col-md-4">
              <div className="card cardGraphic portfolio-card">
                <img src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=500&q=80" alt="Brand Identity" />
                <h4>Brand Identity Refresh</h4>
                <p className="text-muted">Modern tech startup branding</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card cardGraphic portfolio-card">
                <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=500&q=80" alt="Social Media" />
                <h4>Social Media Campaign</h4>
                <p className="text-muted">30-day content visuals</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card portfolio-card cardGraphic">
                <img src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=500&q=80" alt="Marketing Collateral" />
                <h4>Marketing Collateral</h4>
                <p className="text-muted">Launch campaign assets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-paddingGraphic ctaGraphic text-center">
        <div className="container">
          <h2>Ready to create visuals that speak for your brand?</h2>
          <p style={{ fontSize: "20px", color: "#333" }}>
            Let’s build a visual identity that communicates clearly.
          </p>
          <br />
          <a href="/contact" className="cta-btnGraphic">Contact Now</a>
        </div>
      </section>
    </>
  );
}
