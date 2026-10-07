"use client";

import { useEffect } from "react";

export default function ProcessSection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
  }, []);

  return (
    <>
      <style>{`
 

     

        .process-section {
          padding: 50px 0;
          background: #f9fafb;
        }

        .process-header {
          margin-bottom: 60px;
        }

        .process-title {
  font-size: 36px;
  font-weight: 700;
          margin-bottom: 15px;
        }

        .process-subtitle {
          font-size: 15px;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .process-step {
          position: relative;
        }

        .process-step:after {
          content: '';
          position: absolute;
          top: 40px;
          right: -50%;
          width: 100%;
          height: 2px;
  background: linear-gradient(
    135deg,
    rgba(254, 189, 14, 0.18),
    rgba(254, 189, 14, 0.35)
  );           z-index: -1;
        }

        .process-step:last-child:after {
          display: none;
        }

        .step-circle {
          width: 80px;
          height: 80px;
          background: #febd0e;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
        }

        .step-circle span {
          color: #fff;
          font-size: 24px;
          font-weight: 700;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .process-step:after {
            display: none;
          }
        }
      `}</style>

      <section id="process" className="process-section">
        <div className="container">

          <div className="text-center process-header fade-in">
            <h2 className="process-title">Our Process</h2>
            <p className="process-subtitle">
              A streamlined approach to delivering exceptional results for your brand.
            </p>
          </div>

          <div className="row text-center">
            <div className="col-xs-12 col-sm-3 process-step fade-in">
              <div className="step-circle"><span>1</span></div>
              <h3>Understand</h3>
              <p className="text-muted">
                We listen first—your goals, challenges, and audience.
              </p>
            </div>

            <div className="col-xs-12 col-sm-3 process-step fade-in" style={{ transitionDelay: ".1s" }}>
              <div className="step-circle"><span>2</span></div>
              <h3>Strategize</h3>
              <p className="text-muted">
                We craft a tailored plan that aligns creativity with performance.
              </p>
            </div>

            <div className="col-xs-12 col-sm-3 process-step fade-in" style={{ transitionDelay: ".2s" }}>
              <div className="step-circle"><span>3</span></div>
              <h3>Execute</h3>
              <p className="text-muted">
                Our team brings the strategy to life across digital and creative channels.
              </p>
            </div>

            <div className="col-xs-12 col-sm-3 process-step fade-in" style={{ transitionDelay: ".3s" }}>
              <div className="step-circle"><span>4</span></div>
              <h3>Optimize</h3>
              <p className="text-muted">
                Continuous tracking, insights, and refinement for sustained growth.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
