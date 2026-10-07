// components/DigitalMarketing.js or pages/digital-marketing.js

import React from 'react';

const DigitalMarketingBlog = () => {
  return (
    <>
      <div className="transition-overlay yellow-bg"></div>

      {/* <header>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title">Digital Marketing</h2>
              <h5 className="sub-title">Interactive digital experiences are continually</h5>
            </div>
          </div>
        </div>
      </header> */}


      <section>
        <div className="container" style={{ paddingBottom: '50px' }}>
          <div className="row">
            <div className="col-md-6">
              <p className="text-justify">
                Reach your target audience and grow your business with our comprehensive digital marketing solutions.
                We deliver tailored strategies to enhance your online visibility and drive measurable results.
                <br /><b>Content Marketing</b>: Engaging blogs, videos, and infographics to attract and retain your audience.
                <br /><b>Social Media Marketing</b>: Build your brand on platforms like Facebook, Instagram, and LinkedIn.
                <br /><b>Analytics & Reporting</b>: Data-driven insights to optimize your marketing strategies.
                Customized strategies tailored to your business goals.
                Proven track record of increasing engagement and ROI.
              </p>

              <p className="text-justify">
                Partnering with FlumenCopia will maximize the potential of digital marketing like no other in the market.
                From the moment you work with us, you'll notice the change. Our dedicated team will conduct a comprehensive
                analysis to help you identify areas where your business can grow.
                <br />
                We pride ourselves on our open communication channels and standard operating procedures, which ensure
                you receive frequent marketing updates. In today's ever-changing market, it's crucial to reach out to
                new customers and clients. Building a professional online presence is one of the best ways to connect with them.
              </p>
            </div>

            <div className="col-md-6">
              {/* Add image or other content here */}
            </div>
          </div>
        </div>
      </section>

      <section className="quote" data-stellar-background-ratio="0.5">
        <div className="container  fadeInUp">
          <div className="row">
            <div className="col-xs-12">
              <div className="content-box">
                <h3>Discover how we can assist you!</h3>
                <p>
                  Don't settle for mediocrity; choose Miscarchives as your trusted digital marketing partner.
                  Join the ranks of businesses that have experienced unparalleled success with us.
                  Contact us today to embark on your journey to digital greatness.
                </p>
                <a href="#" className="hamburger-menu">Get In Touch</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingBlog;
