import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const ServicesPage = () => {
  return (
    <>
      <Head className='yellow-bg'>
        <title>Services - Misc Archive</title>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        {/* Include .js or other scripts if needed */}
      </Head>

      <header className='yellow-bg'>
        <div className="container " style={{paddingTop:"130px"}}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title" style={{color:"#333"}}>SERVICES</h2>
              <h5 className="sub-title"> &nbsp;</h5>
            </div>
          </div>
        </div>
      </header>

      <section className="service">
        <div className="container">
          <div className="row  fadeInUp">
            {/* DIGITAL MARKETING */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <Link href="#">
                  
                    <div className="table">
                      <div className="inner">
                        <img src="/assets/images/dm.png" alt="Digital Marketing" />
                        <h4>DIGITAL MARKETING.</h4>
                        <p>
                          Misc Archive has many multidimensional strategies that aim to find,
                          connect with, and develop relationships with customers online through
                          various channels to persuade them to purchase and repurchase. <br /><br /><br />
                        </p>
                      </div>
                    </div>
                  
                </Link>
              </div>
            </div>

            {/* SEO */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <Link href="#">
                  
                    <div className="table">
                      <div className="inner">
                        <img src="/assets/images/seo.png" alt="SEO" />
                        <h4>SEARCH ENGINE OPTIMISATION (SEO)</h4>
                        <p>
                          SEO improves visibility, drives traffic, boosts sales, and converts
                          clicks into customers. We make your site rank higher on search engines
                          using trends and analytics. <br /><br /><br />
                        </p>
                      </div>
                    </div>
                  
                </Link>
              </div>
            </div>

            {/* WEB DEVELOPMENT */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <Link href="#">
                  
                    <div className="table">
                      <div className="inner">
                        <img src="/assets/images/web devolepment 1.png" alt="Web Development" />
                        <h4>WEB DEVELOPMENT</h4>
                        <p>
                          We create and maintain fast, responsive websites and apps tailored to your
                          needs. Quality delivery is our priority to ensure your success online.
                        </p>
                      </div>
                    </div>
                  
                </Link>
              </div>
            </div>

            {/* GOOGLE ADS */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <Link href="#">
                  
                    <div className="table">
                      <div className="inner">
                        <img src="/assets/images/google ad.png" alt="Google Ads" />
                        <h4>GOOGLE ADS/PPC</h4>
                        <p>
                          We analyze and optimize your ad campaigns for better reach, conversion,
                          and ROI across all Google Ads platforms.<br /><br /><br />
                        </p>
                      </div>
                    </div>
               
                </Link>
              </div>
            </div>
          </div>

          {/* SECOND ROW */}
          <div className="row  fadeInUp">
            {/* RPA / AI */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <div className="table">
                  <div className="inner">
                    <img src="/assets/images/ai.png" alt="AI RPA" />
                    <h4>RPA / AI</h4>
                    <p>
                      RPA automates tasks and AI makes intelligent decisions—both improving
                      efficiency and cutting costs.<br /><br /><br /><br />
                    </p>
                    <ul className="list5">
                      <li>Assess current processes for automation</li>
                      <li>Integrate AI for smarter decisions</li>
                      <li>Customize for your business needs</li>
                      <li>Provide support & training</li>
                    </ul>
                    <span className="expand btn5">EXPAND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AUDIBLE */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <div className="table">
                  <div className="inner">
                    <img src="/assets/images/mic.png" alt="Audible" />
                    <h4>AUDIBLE</h4>
                    <p>
                      From audiobooks to sound design, our audio services cover the full
                      production cycle with top engineers and sound designers.<br /><br /><br /><br /><br />
                    </p>
                    <ul className="list6">
                      <li>Audiobook Production</li>
                      <li>Audio Editing</li>
                      <li>Mixing & Mastering</li>
                      <li>Quality Assurance</li>
                    </ul>
                    <span className="expand btn6">EXPAND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BRANDING */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <div className="table">
                  <div className="inner">
                    <img src="/assets/images/branding.png" alt="Branding" />
                    <h4>BRANDING</h4>
                    <p>
                      We craft standout brand identities including logos, USPs, and messaging that
                      communicates your value to your audience.
                    </p>
                    <ul className="list6">
                      <li>Target Audience Analysis</li>
                      <li>Brand Positioning</li>
                      <li>Company Persona Development</li>
                      <li>Logo, Color, USP, and Tagline</li>
                    </ul>
                    <span className="expand btn6">EXPAND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RECRUITING */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <div className="table">
                  <div className="inner">
                    <img src="/assets/images/recruting.png" alt="Recruiting" />
                    <h4>RECRUITING</h4>
                    <p>
                      We find the right candidates using direct and third-party recruitment across
                      multiple platforms. <br /><br />
                    </p>
                    <ul className="list6">
                      <li>Direct Recruitment</li>
                      <li>Third-Party Recruitment</li>
                    </ul>
                    <span className="expand btn6">EXPAND</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote" data-stellar-background-ratio="0.5">
        <div className="container  fadeInUp">
          <div className="row">
            <div className="col-xs-12">
              <div className="content-box">
                <h3>Discover how we can assist you!</h3>
                <p>
                  We're excited to learn more about your project. Reach out and let's create
                  something amazing together.
                </p>
                <a href="#" className="hamburger-menu">GET IN TOUCH</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
