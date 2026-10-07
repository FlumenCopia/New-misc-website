"use client";

export default function ServicesNeyyattinkara() {
  return (
    <section id="services" className="services-section">
      <div className="container">

        {/* Heading */}
        <div className="row">
          <div className="col-md-12 services-header">
            <h6 className="services-subtitle">OUR SERVICES</h6>
            <h2 className="services-title">Comprehensive Solutions</h2>
          </div>
        </div>

        {/* Services Grid */}
        <div className="row">

          {/* Service 1 */}
          <div className="col-sm-6 col-md-4">
            <div className="service-card">

              <div className="icon-box blue">
                <i className="glyphicon glyphicon-stats"></i>
              </div>
              <h4>Digital Marketing</h4>
              
              <p>
                Reach the right audience through planned campaigns. From SEO to
                lead generation, our strategies deliver measurable results.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="col-sm-6 col-md-4">
            <div className="service-card">
              <div className="icon-box purple">
                <i className="glyphicon glyphicon-tint"></i>
              </div>
              <h4>Branding & Strategy</h4>
              <p>
                Define your brand voice, positioning, and visual identity to
                ensure consistency across all digital touchpoints.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="col-sm-6 col-md-4">
            <div className="service-card">
              <div className="icon-box green">
                <i className="glyphicon glyphicon-th-large"></i>
              </div>
              <h4>Web Development</h4>
              <p>
                User-friendly, responsive websites built to perform and aligned
                perfectly with your business objectives.
              </p>
            </div>
          </div>

          {/* Service 4 */}
          <div className="col-sm-6 col-md-4">
            <div className="service-card">
              <div className="icon-box orange">
                <i className="glyphicon glyphicon-pencil"></i>
              </div>
              <h4>Graphic Design</h4>
              <p>
                Visual content that communicates clearly. Every design is crafted
                to match your brand’s unique personality.
              </p>
            </div>
          </div>

          {/* Service 5 */}
          <div className="col-sm-6 col-md-4">
            <div className="service-card">
              <div className="icon-box red">
                <i className="glyphicon glyphicon-share"></i>
              </div>
              <h4>Social Media Management</h4>
              <p>
                Purpose-driven content that builds trust. We manage your presence
                from planning to active engagement.
              </p>
            </div>
          </div>

          {/* Service 6 */}
          <div className="col-sm-6 col-md-4">
            <div className="service-card">
              <div className="icon-box pink">
                <i className="glyphicon glyphicon-music"></i>
              </div>
              <h4>Creative Production</h4>
              <p>
                Audio-visual solutions and storytelling concepts that help your
                brand connect emotionally with its audience.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
