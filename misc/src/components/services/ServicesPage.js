'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getServices, getServiceBySlug, resolveMediaUrl } from '@/lib/api';

const ServicesPage = ({ initialServices, initialMainService }) => {
  const [services, setServices] = useState(initialServices || []);
  const [mainService, setMainService] = useState(initialMainService || null);

  useEffect(() => {
    if (!initialServices || initialServices.length === 0) {
      getServices(true).then((data) => {
        if (data && data.length > 0) setServices(data);
      }).catch(() => {});
    }
    if (!initialMainService) {
      getServiceBySlug('main-services').then((data) => {
        if (data) setMainService(data);
      }).catch(() => {});
    }
  }, [initialServices, initialMainService]);

  const serviceMap = {};
  if (Array.isArray(services)) {
    services.forEach((s) => {
      if (s && s.slug) {
        serviceMap[s.slug] = s;
      }
    });
  }

  // Target service lookups from MongoDB
  const dm = serviceMap['digital-marketing'];
  const seo = serviceMap['seo'];
  const web = serviceMap['web-development'];
  const googleAds = serviceMap['sem'] || serviceMap['google-ads'];
  const rpa = serviceMap['rpa-ai'];
  const audible = serviceMap['miscaudibles'];
  const branding = serviceMap['branding'];
  const recruiting = serviceMap['recruiting'];

  return (
    <>
      <Head className='yellow-bg'>
        <title>{mainService?.title ? `${mainService.title} - Misc Archive` : 'Services - Misc Archive'}</title>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
      </Head>

      <header className='yellow-bg'>
        <div className="container " style={{paddingTop:"130px"}}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title" style={{color:"#333"}}>
                {mainService?.title ? mainService.title.toUpperCase() : 'SERVICES'}
              </h2>
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
                <Link href={dm?.route || "/services/digital-marketing"}>
                  <div className="table">
                    <div className="inner">
                      <img
                        src={dm?.iconImage ? resolveMediaUrl(dm.iconImage) : "/assets/images/dm.png"}
                        alt={dm?.title || "Digital Marketing"}
                      />
                      <h4>{dm?.title ? `${dm.title.toUpperCase()}.` : 'DIGITAL MARKETING.'}</h4>
                      <p>
                        {dm?.shortDescription ||
                          "Misc Archive has many multidimensional strategies that aim to find, connect with, and develop relationships with customers online through various channels to persuade them to purchase and repurchase."}
                        <br /><br /><br />
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* SEO */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <Link href={seo?.route || "#"}>
                  <div className="table">
                    <div className="inner">
                      <img
                        src={seo?.iconImage ? resolveMediaUrl(seo.iconImage) : "/assets/images/seo.png"}
                        alt={seo?.title || "SEO"}
                      />
                      <h4>{seo?.title ? seo.title.toUpperCase() : 'SEARCH ENGINE OPTIMISATION (SEO)'}</h4>
                      <p>
                        {seo?.shortDescription ||
                          "SEO improves visibility, drives traffic, boosts sales, and converts clicks into customers. We make your site rank higher on search engines using trends and analytics."}
                        <br /><br /><br />
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* WEB DEVELOPMENT */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <Link href={web?.route || "/services/web-development"}>
                  <div className="table">
                    <div className="inner">
                      <img
                        src={web?.iconImage ? resolveMediaUrl(web.iconImage) : "/assets/images/web devolepment 1.png"}
                        alt={web?.title || "Web Development"}
                      />
                      <h4>{web?.title ? web.title.toUpperCase() : 'WEB DEVELOPMENT'}</h4>
                      <p>
                        {web?.shortDescription ||
                          "We create and maintain fast, responsive websites and apps tailored to your needs. Quality delivery is our priority to ensure your success online."}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* GOOGLE ADS */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <Link href={googleAds?.route || "#"}>
                  <div className="table">
                    <div className="inner">
                      <img
                        src={googleAds?.iconImage ? resolveMediaUrl(googleAds.iconImage) : "/assets/images/google ad.png"}
                        alt={googleAds?.title || "Google Ads"}
                      />
                      <h4>{googleAds?.title ? googleAds.title.toUpperCase() : 'GOOGLE ADS/PPC'}</h4>
                      <p>
                        {googleAds?.shortDescription ||
                          "We analyze and optimize your ad campaigns for better reach, conversion, and ROI across all Google Ads platforms."}
                        <br /><br /><br />
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
                    <img
                      src={rpa?.iconImage ? resolveMediaUrl(rpa.iconImage) : "/assets/images/ai.png"}
                      alt={rpa?.title || "AI RPA"}
                    />
                    <h4>{rpa?.title ? rpa.title.toUpperCase() : 'RPA / AI'}</h4>
                    <p>
                      {rpa?.shortDescription ||
                        "RPA automates tasks and AI makes intelligent decisions—both improving efficiency and cutting costs."}
                      <br /><br /><br /><br />
                    </p>
                    <ul className="list5">
                      {(rpa?.features && rpa.features.length > 0
                        ? rpa.features
                        : [
                            'Assess current processes for automation',
                            'Integrate AI for smarter decisions',
                            'Customize for your business needs',
                            'Provide support & training',
                          ]
                      ).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <span className="expand btn5">EXPAND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AUDIBLE */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <Link href={audible?.route || "/services/miscaudibles"}>
                  <div className="table">
                    <div className="inner">
                      <img
                        src={audible?.iconImage ? resolveMediaUrl(audible.iconImage) : "/assets/images/mic.png"}
                        alt={audible?.title || "Audible"}
                      />
                      <h4>{audible?.title ? audible.title.toUpperCase() : 'AUDIBLE'}</h4>
                      <p>
                        {audible?.shortDescription ||
                          "From audiobooks to sound design, our audio services cover the full production cycle with top engineers and sound designers."}
                        <br /><br /><br /><br /><br />
                      </p>
                      <ul className="list6">
                        {(audible?.features && audible.features.length > 0
                          ? audible.features
                          : [
                              'Audiobook Production',
                              'Audio Editing',
                              'Mixing & Mastering',
                              'Quality Assurance',
                            ]
                        ).map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                      <span className="expand btn6">EXPAND</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* BRANDING */}
            <div className="col-md-3 col-sm-6 col-xs-12 no-padding">
              <div className="box yellow-bg">
                <div className="table">
                  <div className="inner">
                    <img
                      src={branding?.iconImage ? resolveMediaUrl(branding.iconImage) : "/assets/images/branding.png"}
                      alt={branding?.title || "Branding"}
                    />
                    <h4>{branding?.title ? branding.title.toUpperCase() : 'BRANDING'}</h4>
                    <p>
                      {branding?.shortDescription ||
                        "We craft standout brand identities including logos, USPs, and messaging that communicates your value to your audience."}
                    </p>
                    <ul className="list6">
                      {(branding?.features && branding.features.length > 0
                        ? branding.features
                        : [
                            'Target Audience Analysis',
                            'Brand Positioning',
                            'Company Persona Development',
                            'Logo, Color, USP, and Tagline',
                          ]
                      ).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
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
                    <img
                      src={recruiting?.iconImage ? resolveMediaUrl(recruiting.iconImage) : "/assets/images/recruting.png"}
                      alt={recruiting?.title || "Recruiting"}
                    />
                    <h4>{recruiting?.title ? recruiting.title.toUpperCase() : 'RECRUITING'}</h4>
                    <p>
                      {recruiting?.shortDescription ||
                        "We find the right candidates using direct and third-party recruitment across multiple platforms."}
                      <br /><br />
                    </p>
                    <ul className="list6">
                      {(recruiting?.features && recruiting.features.length > 0
                        ? recruiting.features
                        : [
                            'Direct Recruitment',
                            'Third-Party Recruitment',
                          ]
                      ).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
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
                <h3>{mainService?.title ? 'Discover how we can assist you!' : 'Discover how we can assist you!'}</h3>
                <p>
                  {mainService?.shortDescription ||
                    "We're excited to learn more about your project. Reach out and let's create something amazing together."}
                </p>
                <Link href="/contact" className="hamburger-menu">GET IN TOUCH</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
