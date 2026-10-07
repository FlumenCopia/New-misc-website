"use client";

export default function WorkWith() {
  return (
    <section className="who-we-work-with">
      <div className="container">

        {/* Header */}
        <div className="text-center section-header fade-in">
          <h2 className="section-title">Who We Work With</h2>
          <p className="section-subtitle">
            We partner with businesses at every stage of their journey.
          </p>
        </div>

        {/* Grid */}
        <div className="row">

          <div className="col-xs-12 col-sm-6 col-md-3 fade-in">
            <div className="work-card text-center">
              <div className="icon-circle">
                                       <i className="fas fa-lightbulb text-3xl text-purple-600"></i>

              </div>
              <h3>Startups & Entrepreneurs</h3>
              <p>
                Helping new ventures build a strong foundation from day one.
              </p>
            </div>
          </div>

          <div
            className="col-xs-12 col-sm-6 col-md-3 fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="work-card text-center">
              <div className="icon-circle">
                <i className="fa fa-building"></i>
              </div>
              <h3>Small & Medium Businesses</h3>
              <p>
                Empowering growing companies to scale their digital presence.
              </p>
            </div>
          </div>

          <div
            className="col-xs-12 col-sm-6 col-md-3 fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="work-card text-center">
              <div className="icon-circle">
                <i className="fa fa-crown"></i>
              </div>
              <h3>Established Brands</h3>
              <p>
                Reinforcing market leadership with innovative digital strategies.
              </p>
            </div>
          </div>

          <div
            className="col-xs-12 col-sm-6 col-md-3 fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="work-card text-center">
              <div className="icon-circle">
                <i className="fa fa-shopping-bag"></i>
              </div>
              <h3>Local Businesses</h3>
              <p>
                Supporting neighborhood enterprises to expand their reach.
              </p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div
          className="text-center section-cta fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="cta-text">
            If growth is your goal, we're the right partner.
          </p>

          <div className="cta-buttons">
            {/* <a href="#" className="btn btn-primary btn-lg">
              Enquire Now
            </a> */}
            <a href="/contact" className="btn btn-outline btn-lg">
              Schedule a Consultation
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
