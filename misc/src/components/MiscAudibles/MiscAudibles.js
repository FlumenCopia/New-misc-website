'use client';
import Link from "next/link";
export default function MiscAudibles() {


  return (
    <>

      <style jsx global>{`
     

        .hero-gradient {
          background: linear-gradient(135deg, #f3f4f6, #f3f4f6, #f3f4f6);
         
        }

        .card-gradient {
          background: linear-gradient(
            145deg,
            #fcc50f,
            #fed20f
          );
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 30px;
          transition: 0.3s;
        }

        .card-gradient:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }



        .text-gradient {
          background: linear-gradient(90deg, #fcc50f, #333);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn-gradient {
          background: linear-gradient(90deg, #fcc50f, #fed20f);
          color: #fff;
          border: none;
          border-radius: 30px;
          padding: 14px 30px;
          font-weight: 600;
        }

        .btn-gradient:hover {
          opacity: 0.9;
          color: #fff;
        }

        .btn-outline {
          border: 1px solid #fcc50f;
          background: transparent;
          color: #fcc50f;
          border-radius: 30px;
          padding: 14px 30px;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 #fcc50f;
          }
          70% {
            box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
.label-Sound {
  background: linear-gradient(
    to right,
    #fcc50f 0%,
    #fed20f 40%,
    #fed20f 100%
  );

     color: #fff;
}
.section-title {
color: #fff;
}

        .pulse {
          animation: pulse 2s infinite;
        }

        .audio-wave {
          height: 4px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(249, 249, 112, 0.2),
            transparent
          );
          overflow: hidden;
          position: relative;
        }

        .audio-wave:after {
          content: '';
          position: absolute;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            #fcc50f,
            transparent
          );
          animation: wave 1.5s infinite linear;
        }

        @keyframes wave {
          to {
            left: 100%;
          }
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 32px;
          }
        }
      `}</style>

      {/* Hero */}
      <section className="hero-gradient text-center" style={{ padding: '100px 0' }}>
        <div className="container">
          <span
            className="label label-Sound"
            style={{ padding: '8px 30px', display: 'inline-block', fontSize: '16px' }}
          >
            <i className="fa fa-volume-up" /> Sound That Carries Emotion
          </span>


          <h1 style={{ marginTop: 30 }}>
            Audio has the power to connect{' '}
            <span className="text-gradient">instantly</span>
          </h1>

          <p className="lead" style={{ color: '#333', maxWidth: 700, margin: '20px auto' }}>
            Misc Audibles is our dedicated space for voice-led storytelling and
            sound-based content creation.
          </p>

          {/* <a className="btn btn-gradient pulse">
            <i className="fa fa-play-circle" /> Listen Demo
          </a>
          <a className="btn btn-outline" style={{ marginLeft: 10 }}>
            Explore Services
          </a> */}

          <div style={{ marginTop: 60 }}>
            <div className="audio-wave"></div>
          </div>
        </div>
      </section>

      {/* About */}
      <section style={{ padding: '90px 0', background: '#fff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="section-title" style={{ color: '#333' }}>
                We create audio experiences that feel{' '}
                <span className="text-gradient">authentic</span>
              </h2>
              <p style={{ color: '#333' }}>
                Designed to complement your brand communication, our soundscapes
                resonate deeply with audiences.
              </p>
            </div>

            <div className="col-md-6">
              <div className="card-gradient">
                <h4 style={{ color: '#fff' }}>
                  <i className="fa fa-headphones" /> Emotional Impact
                </h4>
                <ul style={{ marginTop: 15, color: '#fff' }} >
                  <li>Voice-driven narratives</li>
                  <li>Brand-aligned sound identity</li>
                  <li>High-quality production</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '90px 0', background: '#333' }}>
        <div className="container text-center">
          <h2 className="section-title">
            Our <span className="text-gradient">Audibles</span> Services
          </h2>

          <div className="row" style={{ marginTop: 50, color: '#fff' }}>
            {[
              ['microphone', 'Voiceovers', 'Professional voice talent with emotional depth.'],
              ['trademark', 'Audio Branding', 'Sonic logos & brand sound identities.'],
              ['podcast', 'Podcast Support', 'Production, editing & publishing.'],
              ['book-open', 'Sound Concepts', 'Immersive audio storytelling.'],
            ].map(([icon, title, desc], i) => (
              <div className="col-md-3" key={i}>
                <div className="card-gradient">
                  <i className={`fa fa-${icon} fa-2x`} />
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient text-center" style={{ padding: '90px 0' }}>
        <div className="container">
          <h2 >
            Ready to give your brand a <span className="text-gradient">voice</span>?
          </h2>
          <p className="lead">Let’s create sound that feels right.</p>

          <form className="form-inline" style={{ marginTop: 30 }}>
            {/* <input
              type="email"
              className="form-control input-lg"
              placeholder="Email Address"
            /> */}
            <Link href="/contact" className="btn btn-gradient btn-lg">
              Start Conversation
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}
