"use client";

export default function WhyChoose() {
  return (
    <main>
      <section className="why-choose-section">
        <div className="container">
          {/* Heading */}
          <div className="text-center section-header fade-in">
            <h2 className="section-title">Why Choose Misc Archive</h2>
            <p className="section-subtitle">
              We don't believe in one-size-fits-all solutions. Every brand has a
              story and a strategy of its own.
            </p>
          </div>

          {/* Content */}
          <div className="row why-choose-grid">
            {/* Left Column */}
            <div className="col-md-6 fade-in">
              <div className="feature-item">
                <div className="icon-circle">
                  <i className="fa fa-cog"></i>
                </div>
                <div className="feature-content">
                  <h3>Custom-built strategies</h3>
                  <p>
                    Aligned with your business goals and tailored to your unique
                    market position.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="icon-circle">
                  <i className="fa fa-balance-scale"></i>
                </div>
                <div className="feature-content">
                  <h3>Creativity meets data</h3>
                  <p>
                    A perfect balance of creative thinking and data-driven
                    decision-making.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="icon-circle">
                  <i className="fa fa-pie-chart"></i>
                </div>
                <div className="feature-content">
                  <h3>Transparent outcomes</h3>
                  <p>
                    Clear communication and measurable results you can track and
                    understand.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6 fade-in delay">
              <div className="feature-item">
                <div className="icon-circle">
                  <i className="fa fa-users"></i>
                </div>
                <div className="feature-content">
                  <h3>Extended team approach</h3>
                  <p>
                    We work as an extension of your brand, understanding your
                    business inside out.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="icon-circle">
                  <i className="fa fa-map-marker"></i>
                </div>
                <div className="feature-content">
                  <h3>Local accessibility</h3>
                  <p>
                    Our Neyyatinkara branch ensures local accessibility with the
                    same quality and standards Misc Archive is known for.
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="icon-circle">
                  <i className="fa fa-rocket"></i>
                </div>
                <div className="feature-content">
                  <h3>Growth-focused</h3>
                  <p>
                    We're committed to helping your business grow and scale
                    sustainably.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped CSS */}
      <style jsx>{`
        .why-choose-section {
          padding: 50px 0;
          background: #ffffff;
        }

        .section-header {
          margin-bottom: 60px;
        }

        .section-title {
   font-size: 36px;
  font-weight: 700;
          margin-bottom: 15px;
        }

        .section-subtitle {
          font-size: 15px;
          color: #666;
          max-width: 700px;
          margin: 0 auto;
        }

        .why-choose-grid {
          max-width: 960px;
          margin: 0 auto;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 30px;
        }

        .icon-circle {
          width: 48px;
          height: 48px;
           background: linear-gradient(
    135deg,
    rgba(254, 189, 14, 0.18),
    rgba(254, 189, 14, 0.35)
  );
          border-radius: 50%;
          text-align: center;
          line-height: 48px;
          margin-right: 15px;
          flex-shrink: 0;
        }

        .icon-circle i {
          font-size: 18px;
          color: #febd0e;
        }

        .feature-content h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .feature-content p {
          color: #666;
          margin: 0;
        }

        .fade-in {
          animation: fadeInUp 0.8s ease both;
        }

        .delay {
          animation-delay: 0.2s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }


      `}</style>
    </main>
  );
}
