'use client';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="about-us" style={{ color: 'black' }}>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md-6 left-side"
            data-stellar-background-ratio="0.5"
            aria-hidden="true"
          />

          <div className="col-md-6 right-side">
            <div className="table fadeInUp">
              <div className="about-kicker">ABOUT MISCARCHIVE</div>
              <div className="inner">
                {/* Hidden SEO heading */}
                <h1
                  style={{
                    color: '#febd0e',
                    display: 'none',
                  }}
                >
                  <b>Digital Marketing Company in Trivandrum</b>
                </h1>

                <h3>
                  <span>What makes us a team?</span>
                </h3>
                <p>
                  
                   We specialise in creating custom marketing
                  solutions for brands and businesses in India and throughout
                  the world. By skilfully fusing the 3 C’s of
                  marketing—Customer, Company, Competitor—with the influence of
                  the web, social media marketing, and mobile technology, our
                  team enables our clients to realise their full potential.
                </p>

                {/* 
                <p>
                  At MiscArchive, we provide high-quality or innovative
                  value-added solutions within the domains of digital marketing
                  services, Web Designing, Web development, Social Media
                  management, and other comparable miscellaneous services. We
                  assist our clients through expert-level ideation,
                  comprehensive project execution, seamless work experience,
                  easy interactive team collaboration, and overall team
                  transparency for absolutely everyone involved.
                </p> 
                */}

                <Link href="/about" className="read-more-link">
                  READ MORE
                </Link>
              </div>
              {/* end inner */}
            </div>
            {/* end table */}
          </div>
          {/* end col-6 */}
        </div>
        {/* end row */}
      </div>
      {/* end container */}
    </section>
  );
}
