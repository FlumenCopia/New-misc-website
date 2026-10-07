// components/AboutUs.js or pages/about-us.js

import React from 'react';

const AboutUs = () => {
  return (
    <>

      <section className="about-us">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 left-side" data-stellar-background-ratio="0.5">
              {/* Background Image or Left Content can be handled via CSS */}
            </div>
            <div className="col-md-6 right-side">
              <div className="table fadeInUp">
                <div className="inner">
                  <h3>ABOUT <span>MiscArchive</span></h3>
                  <p>
                    Our goal is to emerge as the first and excellent choice for enterprise-wide solutions as
                    a Branding agency and a broadcasting partner in Trivandrum with our team of closely-knit
                    yet enthusiastic individuals.
                  </p>
                  <p>
                    At MiscArchive, we provide high-quality or innovative value-added solutions within the
                    domains of digital marketing services, Web Designing, Web Development, Social Media
                    management, and other comparable miscellaneous services. We assist our clients through
                    expert-level ideation, comprehensive project execution, seamless work experience, easy
                    interactive team collaboration, and overall team transparency for absolutely everyone
                    involved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uncomment this if you want to include the team members section */}
      {/*
      <section className="team-members">
        <div style={{ padding: '100px 0' }}></div>
        <div className="container fadeInUp">
          <div className="row">
            <div className="col-md-3 col-sm-3">
              <figure>
                <img src="/assets/images/sunny.webp" alt="Anoop D Anil" />
                <figcaption>
                  <h3>Anoop D Anil</h3>
                  <h6>Vice President, CFO</h6>
                </figcaption>
              </figure>
            </div>

            <div className="col-md-3 col-sm-3">
              <figure>
                <img src="/assets/images/anoop.webp" alt="Anoop Krishna" />
                <figcaption>
                  <h3>Anoop Krishna</h3>
                  <h6>CEO, FOUNDER</h6>
                </figcaption>
              </figure>
            </div>

            <div className="col-md-3 col-sm-3">
              <figure>
                <img src="/assets/images/anju.webp" alt="Rohini A Pillai" />
                <figcaption>
                  <h3>Rohini A Pillai</h3>
                  <h6>Co-Founder, COO</h6>
                </figcaption>
              </figure>
            </div>

            <div className="col-md-3 col-sm-3">
              <figure>
                <img src="/assets/images/akhil (1).webp" alt="Akhil G V" />
                <figcaption>
                  <h3>Akhil G V</h3>
                  <h6>Vice President, Creative Head</h6>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
      */}


     
    </>
  );
};

export default AboutUs;
