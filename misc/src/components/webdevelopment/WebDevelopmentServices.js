'use client';

import { useEffect } from 'react';
import Head from 'next/head';

export default function WebDevelopmentServices() {

  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll('.fade-in').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>

      <style jsx global>{`

        .gradient-bg {
          background: linear-gradient(135deg, #eef2ff 0%, #fed20f 100%);
          color: #fff;
        }

        .btn-primary-custom {
          background: #fff;
          color: #fed20f;
          font-weight: 600;
          border: none;
        }

        .btn-outline-custom {
          background: transparent;
          border: 2px solid #fff;
          color: #fff;
          font-weight: 600;
        }

        .btn-gradient {
          background: linear-gradient(135deg, #fed20f, #fcc50f);
          color: #fff;
          font-weight: 600;
          border: none;
        }



        .feature-card {
          background: #f9fafb;
          border: 1px solid #eee;
          padding: 30px;
          border-radius: 12px;
          height: 100%;
          transition: .3s;

            display: flex;
  flex-direction: column;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,.1);
        }

        .icon-box {
          width: 54px;
          height: 54px;
          background: #e0e7ff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          color: #4f46e5;
          font-size: 26px;
        }

        .feature-card h4 {
          margin-top: 0;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .feature-card p {
          margin-bottom: 0;
          color: #6b7280;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: all .8s ease;
        }

        .fade-in.active {
          opacity: 1;
          transform: none;
        }







        /* ================= SERVICES ALIGNMENT FIX ================= */

/* Desktop & tablet */
.services-row{
  display: table;
  width: 100%;
  margin-bottom: 30px;

 
}

.services-col{
  display: table-cell;
  float: none;
  vertical-align: top;
  padding: 15px;
}

/* ================= MOBILE FIX ================= */
@media (max-width: 767px){

  .services-row{
    display: block;
  }

  .services-col{
    display: block;
    width: 100%;
    float: none;
    padding: 12px 0;
  }

  .feature-card{
    text-align: center;
  }

  .icon-box{
    margin-left: auto;
    margin-right: auto;
  }
}

      `}</style>

      <div  />

      {/* HERO */}
      <section className="gradient-bg text-center" style={{ padding: '100px 0' }} >
        <div className="container fade-in">
          <h1 style={{ fontWeight: '700', color:'#333'  }} >
            Websites That Look Good and Work Better
          </h1>
          <p className="lead" style={{ maxWidth: 800, margin: '25px auto', color:'#333' }}>
            A website is often the first interaction someone has with your brand.
            We design and develop websites that are not only visually appealing,
            but also functional, fast, and easy to navigate.
          </p>
          <a href="/contact" className="btn btn-lg btn-primary-custom" style={{color:"#333"}} >
            Get Started
          </a>{' '}
          <a href="https://miscarchiveportfolio.com/" className="btn btn-lg btn-outline-custom" style={{color:"#333"}}>
            View Portfolio
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: '90px 0', background: '#fff' }}>
        <div className="container">
          <div className="text-center fade-in" style={{ marginBottom: 60 }}>
            <h2 style={{ fontWeight: 700 }}>
              Our Web Development Services
            </h2>
            <p className="text-muted">
              At MiscArchive, our web development services focus on creating
              exceptional digital experiences
            </p>
          </div>

          {/* ROW 1 */}
          <div className="services-row">
            <div className=" col-xs-12 col-sm-6 col-md-4services-col fade-in">
              <div className="feature-card">
                <div className="icon-box">🧭</div>
                <h4>Clear Structure & User Experience</h4>
                <p>
                  We create intuitive layouts that guide users naturally through
                  your content and offerings.
                </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-4services-col fade-in">
              <div className="feature-card">
                <div className="icon-box">📱</div>
                <h4>Mobile-Friendly Responsive Design</h4>
                <p>
                  Your website will look and function beautifully on all devices.
                </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-4 services-col fade-in">
              <div className="feature-card">
                <div className="icon-box">📈</div>
                <h4>SEO-Ready Development</h4>
                <p>
                  We build with search engines in mind, helping your website rank
                  higher.
                </p>
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="services-row">
            <div className=" col-xs-12 col-sm-6 col-md-4 services-col fade-in">
              <div className="feature-card">
                <div className="icon-box">⚡</div>
                <h4>Performance & Loading Speed</h4>
                <p>
                  Fast-loading websites keep users engaged and improve conversions.
                </p>
              </div>
            </div>

            <div className=" col-xs-12 col-sm-6 col-md-4 services-col fade-in">
              <div className="feature-card">
                <div className="icon-box">🧩</div>
                <h4>Easy Navigation & Conversion Flow</h4>
                <p>
                  We design pathways that lead visitors to take action.
                </p>
              </div>
            </div>

            <div className=" col-xs-12 col-sm-6 col-md-4 services-col fade-in">
              <div className="feature-card">
                <div className="icon-box">🎯</div>
                <h4>Brand-Centric Design</h4>
                <p>
                  We build websites that help users connect with your brand message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: '#eef2ff' }}>
        <div className="container text-center fade-in">
          <div
            style={{
              background: '#fff',
              padding: 50,
              borderRadius: 16,
              boxShadow: '0 15px 40px rgba(0,0,0,.1)'
            }}
          >
            <h2 style={{ fontWeight: 700 }}>
              Ready to Build Your Perfect Website?
            </h2>
            <p className="text-muted">
              Let&apos;s create a website that not only looks impressive but drives results.
            </p>
            <a href="/contact" className="btn btn-lg btn-gradient">
              Start Your Project
            </a>
          </div>
        </div>
      </section>

      {/* Bootstrap JS */}
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" />
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" />
    </>
  );
}
