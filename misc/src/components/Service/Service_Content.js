'use client';

import { useEffect } from 'react';
import Head from 'next/head';

export default function Service_Content() {

  useEffect(() => {
    const reveals = document.querySelectorAll('.scroll-reveal');

    const reveal = () => {
      reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 150) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', reveal);
    reveal();

    return () => window.removeEventListener('scroll', reveal);
  }, []);

  return (
    <>
      <Head>
        <style>{`
          .fw-bold { font-weight:700; }
          .lead { font-size:18px; }
          .text-secondary { color:#6b7280; }

          .btn-rounded {
            border-radius:999px;
            padding:12px 28px;
          }

          .gradient-text {
            background: linear-gradient(90deg, #fed20f, #fcc50f);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .hero-gradient {
            background: linear-gradient(135deg, #fcc50f 0%, #fed20f 100%);
          }

          .card-box {
            background:#fff;
            padding:30px;
            border-radius:16px;
            box-shadow:0 10px 15px rgba(0,0,0,.08);
            height:100%;
            transition:all .3s ease;
          }

          .card-box:hover {
            transform:translateY(-10px);
            box-shadow:0 20px 25px rgba(0,0,0,.1);
          }

          .fade-in {
            animation: fadeIn 1.5s ease-in;
          }

          @keyframes fadeIn {
            from { opacity:0; transform:translateY(20px); }
            to { opacity:1; transform:translateY(0); }
          }

          .scroll-reveal {
            opacity:0;
            transform:translateY(30px);
            transition:all .8s ease;
          }

          .scroll-reveal.active {
            opacity:1;
            transform:none;
          }
        .btn-gradient {
          background: linear-gradient(90deg, #fcc50f, #fed20f);
          color: #fff;
          border: none;
          border-radius: 30px;
          padding: 14px 30px;
          font-weight: 600;
        }

          .mb-30 { margin-bottom:30px; }
          .mb-40 { margin-bottom:40px; }
          .mt-30 { margin-top:30px; }
        `}</style>
      </Head>

      {/* HERO */}
      <section className="hero-gradient" style={{ padding: '80px 0', background: '#f3f4f6' }} >
        <div className="container text-center fade-in">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h1 className="fw-bold mb-40">
                Digital Marketing <br />
                <span className="gradient-text">
                  Strategy-Led. People-Focused. Results-Driven.
                </span>
              </h1>

              <p className="lead text-secondary mb-40">
                Digital marketing works best when it feels natural not forced.
                At MiscArchive, we help businesses in Trivandrum, Kerala, and beyond
                grow their online presence.
              </p>

              <div>
                <a href='/contact'>
                <button className="btn btn-gradient btn-lg">
                  Get Started
                </button></a>

                &nbsp;&nbsp;
                <a href='#SERVICES'>
                                    <button className="btn btn-gradient btn-lg">
                  Learn More
                </button>
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="text-center mb-40 scroll-reveal">
            <h2 className="fw-bold">Our Digital Marketing Approach</h2>
            <div style={{
              width:'80px',
              height:'4px',
              margin:'20px auto',
              background:'linear-gradient(90deg,#fcc50f,#fed20f)'
            }} />
          </div>

     <div className="row">
  <div className="col-md-4 mb-30 scroll-reveal">
    <div className="SERVICESglass-card">
      <div className="SERVICESglass-icon">
        <i className="fas fa-users" />
      </div>
      <h4 className="fw-bold">Audience Understanding</h4>
      <p className="text-secondary">
        We dive deep into understanding your audience’s behavior and intent.
      </p>
    </div>
  </div>

  <div className="col-md-4 mb-30 scroll-reveal">
    <div className="SERVICESglass-card">
      <div className="SERVICESglass-icon">
        <i className="fas fa-map-marker-alt" />
      </div>
      <h4 className="fw-bold">Location Strategy</h4>
      <p className="text-secondary">
        Strategies tailored for your local and regional market.
      </p>
    </div>
  </div>

  <div className="col-md-4 mb-30 scroll-reveal">
    <div className="SERVICESglass-card">
      <div className="SERVICESglass-icon">
        <i className="fas fa-chart-line" />
      </div>
      <h4 className="fw-bold">Goal Alignment</h4>
      <p className="text-secondary">
        Every campaign supports clear business objectives.
      </p>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: '80px 0', background: '#f3f4f6' }} id='SERVICES'>
        <div className="container">
          <div className="text-center mb-40 scroll-reveal">
            <h2 className="fw-bold">Our Digital Marketing Services</h2>
            <div style={{
              width:'80px',
              height:'4px',
              margin:'20px auto',
              background:'linear-gradient(90deg,#fcc50f,#fed20f)'
            }} />
          </div>

          <div className="row">
            {[
              ['fa-search','SEO Optimization','Improve your organic search visibility.','text-primary'],
              ['fa-share-alt','Social Media','Engage and grow communities.','text-muted'],
              ['fa-bullseye','Performance Campaigns','ROI-focused paid advertising.','text-info'],
              ['fa-pen-fancy','Content Creation','Story-driven brand content.','text-danger'],
              ['fa-envelope','Email Marketing','Lead nurturing campaigns.','text-warning'],
              ['fa-chart-pie','Analytics & Reporting','Actionable insights.','text-success'],
            ].map((s,i)=>(
              <div className="col-md-4 mb-30 scroll-reveal" key={i}>
                <div className="SERVICESglass-card " style={{marginBottom:'10px'}}>
                  <i className={`fas ${s[0]} ${s[3]}`} style={{ fontSize: 26 }} />
                  <h4 className="fw-bold mt-30">{s[1]}</h4>
                  <p className="text-secondary">{s[2]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div
            className="text-center scroll-reveal"
            style={{
              background:'linear-gradient(135deg,#fed20f,#fcc50f)',
              color:'#fff',
              padding:'60px',
              borderRadius:'20px'
            }}
          >
            <h2 className="fw-bold mb-30">Ready to Grow Your Digital Presence?</h2>
            <p className="lead mb-40">
              Let’s discuss how we can help your business grow.
            </p>
           <a href='/contact'>
              <button className="btn btn-default btn-rounded">
                Schedule a Consultation
              </button>
           </a>
          </div>
        </div>
      </section>
    </>
  );
}
