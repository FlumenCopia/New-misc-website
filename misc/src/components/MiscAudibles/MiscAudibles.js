'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { getServiceBySlug } from '@/lib/api';

const defaultAudibleServices = [
  ['microphone', 'Voiceovers', 'Professional voice talent with emotional depth.'],
  ['trademark', 'Audio Branding', 'Sonic logos & brand sound identities.'],
  ['podcast', 'Podcast Support', 'Production, editing & publishing.'],
  ['book-open', 'Sound Concepts', 'Immersive audio storytelling.'],
];

export default function MiscAudibles({ initialService }) {
  const [service, setService] = useState(initialService || null);

  useEffect(() => {
    getServiceBySlug('miscaudibles').then((data) => {
      if (data) setService(data);
    }).catch(() => {});
  }, []);

  const audibleServices = (service?.features && service.features.length > 0)
    ? service.features.map((feat, i) => {
        const fallback = defaultAudibleServices[i] || ['headphones', feat, 'Dedicated audio production deliverable.'];
        return [fallback[0] || 'headphones', feat, fallback[2] || 'Professional voice and sound experience.'];
      })
    : defaultAudibleServices;

  return (
    <>
      <style jsx global>{`
        .audibles-hero {
          background: #faf9f6;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding: 155px 0 75px 0;
          text-align: center;
        }

        .audibles-label {
          background: #fef3c7;
          color: #b45309;
          border: 1px solid rgba(245, 166, 35, 0.3);
          border-radius: 999px;
          padding: 8px 24px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .audibles-hero h1 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(34px, 4.2vw, 52px);
          font-weight: 900;
          color: #141414;
          line-height: 1.2;
          margin-top: 24px;
        }

        .audibles-highlight {
          color: #f5a623;
        }

        .audibles-lead {
          font-size: 17px;
          line-height: 1.65;
          color: #52525b;
          max-width: 680px;
          margin: 18px auto 0 auto;
        }

        .audibles-about {
          padding: 90px 0;
          background: #ffffff;
        }

        .audibles-about-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(28px, 3.2vw, 40px);
          font-weight: 800;
          color: #141414;
          line-height: 1.25;
          margin-bottom: 18px;
        }

        .audibles-about-text {
          font-size: 16.5px;
          line-height: 1.7;
          color: #52525b;
        }

        .audibles-about-card {
          background: #faf9f6;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 34px 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .audibles-about-card h4 {
          font-family: 'Outfit', sans-serif;
          font-size: 20px;
          font-weight: 800;
          color: #141414;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .audibles-about-card h4 i {
          color: #f5a623;
        }

        .audibles-about-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .audibles-about-card li {
          font-size: 15px;
          color: #4b5563;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .audibles-about-card li::before {
          content: '•';
          color: #f5a623;
          font-size: 20px;
          line-height: 1;
        }

        .audibles-services-section {
          padding: 95px 0 105px 0;
          background: #faf9f6;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .audibles-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(30px, 3.6vw, 44px);
          font-weight: 900;
          color: #141414;
          text-align: center;
          margin-bottom: 50px;
        }

        .audible-service-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 18px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .audible-service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.07);
        }

        .audible-icon-wrap {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: #fff8e7;
          border: 1px solid rgba(245, 166, 35, 0.3);
          color: #d97706;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 20px;
        }

        .audible-service-card h4 {
          font-family: 'Outfit', sans-serif;
          font-size: 19px;
          font-weight: 800;
          color: #141414;
          margin: 0 0 10px 0;
        }

        .audible-service-card p {
          font-size: 14px;
          line-height: 1.6;
          color: #6b7280;
          margin: 0;
        }

        .audibles-cta {
          padding: 90px 0;
          background: #ffffff;
          text-align: center;
        }

        .audibles-cta h2 {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(28px, 3.4vw, 42px);
          font-weight: 900;
          color: #141414;
        }

        .audibles-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #f5a623;
          color: #141414;
          font-weight: 800;
          font-size: 15px;
          padding: 14px 34px;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 6px 18px rgba(245, 166, 35, 0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .audibles-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(245, 166, 35, 0.35);
          color: #141414;
          text-decoration: none;
        }
      `}</style>

      {/* Hero */}
      <section className="audibles-hero">
        <div className="container">
          <span className="audibles-label">
            <i className="fa fa-volume-up" /> Sound That Carries Emotion
          </span>

          <h1>
            Audio has the power to connect{' '}
            <span className="audibles-highlight">instantly</span>
          </h1>

          <p className="audibles-lead">
            {service?.shortDescription ||
              'Misc Audibles is our dedicated space for voice-led storytelling and sound-based content creation.'}
          </p>
        </div>
      </section>

      {/* About */}
      <section className="audibles-about">
        <div className="container">
          <div className="row" style={{ alignItems: 'center' }}>
            <div className="col-md-6" style={{ marginBottom: 24 }}>
              <h2 className="audibles-about-title">
                We create audio experiences that feel{' '}
                <span className="audibles-highlight">authentic</span>
              </h2>
              <p className="audibles-about-text">
                Designed to complement your brand communication, our soundscapes
                resonate deeply with audiences and build meaningful emotional recall.
              </p>
            </div>

            <div className="col-md-6" style={{ marginBottom: 24 }}>
              <div className="audibles-about-card">
                <h4>
                  <i className="fa fa-headphones" /> Emotional Impact
                </h4>
                <ul>
                  <li>Voice-driven narratives</li>
                  <li>Brand-aligned sound identity</li>
                  <li>High-quality production</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="audibles-services-section">
        <div className="container">
          <h2 className="audibles-section-title">
            Our <span className="audibles-highlight">{service?.title || 'Audibles'}</span> Services
          </h2>

          <div className="row">
            {audibleServices.map(([icon, title, desc], i) => (
              <div className="col-md-3 col-sm-6" key={i} style={{ marginBottom: 24 }}>
                <div className="audible-service-card">
                  <div className="audible-icon-wrap">
                    <i className={`fa fa-${icon}`} />
                  </div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="audibles-cta">
        <div className="container">
          <h2>
            Ready to give your brand a <span className="audibles-highlight">voice</span>?
          </h2>
          <p className="audibles-lead" style={{ marginBottom: 30 }}>Let’s create sound that feels right.</p>

          <Link href="/contact" className="audibles-btn">
            Start Conversation →
          </Link>
        </div>
      </section>
    </>
  );
}
