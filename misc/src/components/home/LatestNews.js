'use client';

export default function DigitalMarketingSection() {
  const crucialReasons = [
    {
      num: '01',
      title: 'Diverse Skill Set',
      desc: 'Digital marketing encompasses various aspects like SEO, social media, content creation, PPC advertising, email marketing, and more. A team can bring together individuals with specialized skills in each of these areas.',
    },
    {
      num: '02',
      title: 'Strategy Development',
      desc: "A team can collaborate to create a comprehensive digital marketing strategy tailored to your company's goals and target audience.",
    },
    {
      num: '03',
      title: 'Workload Distribution',
      desc: 'Digital marketing involves ongoing tasks. A team can distribute the workload effectively, ensuring consistent and timely execution.',
    },
    {
      num: '04',
      title: 'Adaptation and Innovation',
      desc: 'The digital landscape is ever-evolving. A team can stay updated on industry trends, algorithms, and emerging platforms, allowing your company to adapt and innovate accordingly.',
    },
    {
      num: '05',
      title: 'Creative Input',
      desc: 'Different team members can provide fresh perspectives and creative ideas, enhancing the quality of campaigns and content.',
    },
    {
      num: '06',
      title: 'Data Analysis',
      desc: 'A team can collectively analyse data and metrics, helping your company make data-driven decisions to optimize marketing efforts.',
    },
  ];

  const drawbacks = [
    {
      num: '01',
      title: 'Limited Expertise',
      desc: 'Without dedicated professionals, you may lack the in-depth expertise needed for various aspects of digital marketing like SEO, SEM, analytics, etc., potentially leading to suboptimal results.',
    },
    {
      num: '02',
      title: 'Inconsistent Execution',
      desc: 'The absence of a dedicated team may result in irregular or inconsistent execution of digital marketing strategies, hindering the effectiveness and impact of your efforts.',
    },
    {
      num: '03',
      title: 'Overwhelming Workload',
      desc: 'Handling all digital marketing responsibilities alone can overwhelm you, impacting your ability to manage other essential aspects of your business effectively.',
    },
    {
      num: '04',
      title: 'Time Constraints',
      desc: 'Digital marketing requires time and effort. Without a team, you might struggle to balance marketing tasks with other operational and managerial responsibilities.',
    },
    {
      num: '05',
      title: 'Difficulty Keeping Up with Trends',
      desc: 'Staying updated with the fast-paced changes in digital marketing trends can be challenging for a single person, potentially causing your strategies to become outdated.',
    },
    {
      num: '06',
      title: 'Lack of Collaboration and Innovation',
      desc: 'Collaborative brainstorming and innovative ideas are often fostered in a team environment. Without a team, you may miss out on creative solutions and fresh perspectives.',
    },
  ];

  const whyChooseReasons = [
    {
      num: '01',
      title: 'Expertise Across the Spectrum',
      desc: "Our team comprises seasoned experts in every facet of digital marketing - from SEO and content creation to social media management and PPC advertising. We've got the skills and know-how to tackle all your digital marketing challenges.",
    },
    {
      num: '02',
      title: 'Tailored Strategies, Measurable Results',
      desc: "We don't believe in one-size-fits-all solutions. Our approach begins with a deep understanding of your business, goals, and target audience. We then craft customized strategies that deliver measurable results.",
    },
    {
      num: '03',
      title: 'Data-Driven Decision Making',
      desc: "With Miscarchive, you're not flying blind. We're obsessed with data. Our team rigorously analyzes performance metrics, ensuring that every campaign is optimized for success. We make informed decisions to maximize ROI.",
    },
    {
      num: '04',
      title: 'Creativity and Innovation',
      desc: 'Digital marketing isn\'t just about numbers; it\'s also about creativity. Our team is a melting pot of innovative thinkers, always pushing the boundaries to create engaging content and cutting-edge campaigns.',
    },
    {
      num: '05',
      title: 'Proven Track Record',
      desc: "Our portfolio is a testament to our success. We've helped businesses of all sizes and industries achieve their digital marketing goals. When you choose Miscarchive, you're choosing a track record of excellence.",
    },
    {
      num: '06',
      title: 'Scalability and Adaptability',
      desc: 'As your business grows, we grow with you. Our strategies are designed to scale seamlessly, ensuring that your digital marketing efforts remain effective as you expand.',
    },
    {
      num: '07',
      title: 'Cost-Effective Solutions',
      desc: "Quality doesn't have to come at a premium. Miscarchive offers competitive pricing without compromising on the quality of service. We believe in delivering value that exceeds your investment.",
    },
    {
      num: '08',
      title: 'Client-Centric Approach',
      desc: "Your success is our success. We're committed to building long-lasting client relationships. When you choose Miscarchive, you're choosing a partner dedicated to your growth.",
    },
  ];

  return (
    <section className="latest-news" style={{ backgroundColor: '#fcfcfc', padding: '90px 0', color: '#111' }}>
      <style>{`
        .dm-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .dm-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        @media (max-width: 991px) {
          .dm-grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }
          .dm-grid-4 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .dm-grid-3,
          .dm-grid-4 {
            grid-template-columns: 1fr;
          }
        }
        .dm-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 30px 24px;
          height: 100%;
          border: 1px solid #eaedf0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .dm-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.08);
        }
      `}</style>

      <div className="container-fluid" style={{ maxWidth: '1380px', width: '92%', margin: '0 auto', padding: '0 15px' }}>
        
        {/* ================= SECTION 1: CRUCIAL REASONS ================= */}
        <div className="text-center mb-5">
          <h3 style={{ color: '#febd0e', fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
            <span>Digital marketing is crucial for many reasons!</span>
          </h3>
          <p style={{ color: '#666', fontSize: '15.5px', maxWidth: '680px', margin: '0 auto' }}>
            In today&apos;s digital-first economy, having a dedicated digital marketing team provides critical strategic advantages:
          </p>
        </div>

        <div className="dm-grid-3">
          {crucialReasons.map((item, idx) => (
            <div key={idx} className="dm-card" style={{ borderTop: '3px solid #febd0e' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span
                  style={{
                    background: '#fef9e7',
                    color: '#d49b06',
                    fontWeight: '800',
                    fontSize: '12px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    letterSpacing: '0.5px',
                  }}
                >
                  ADVANTAGE {item.num}
                </span>
              </div>
              <h4 style={{ color: '#111111', fontSize: '19px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.35' }}>
                {item.title}
              </h4>
              <p style={{ color: '#555555', fontSize: '14.5px', lineHeight: '1.65', margin: 0, flexGrow: 1 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ================= SECTION 2: DRAWBACKS ================= */}
        <div className="text-center mb-5" style={{ marginTop: '70px' }}>
          <h3 style={{ color: '#febd0e', fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>
            <span>Drawbacks of not having a digital marketing team!</span>
          </h3>
          <p style={{ color: '#666', fontSize: '15.5px', maxWidth: '680px', margin: '0 auto' }}>
            Operating without specialized marketing leadership can hold your business back from reaching its full potential:
          </p>
        </div>

        <div className="dm-grid-3">
          {drawbacks.map((item, idx) => (
            <div key={idx} className="dm-card" style={{ borderTop: '3px solid #111111' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span
                  style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    fontWeight: '800',
                    fontSize: '12px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    letterSpacing: '0.5px',
                  }}
                >
                  RISK {item.num}
                </span>
              </div>
              <h4 style={{ color: '#111111', fontSize: '19px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.35' }}>
                {item.title}
              </h4>
              <p style={{ color: '#555555', fontSize: '14.5px', lineHeight: '1.65', margin: 0, flexGrow: 1 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ================= SECTION 3: WHY CHOOSE MISCARCHIVE ================= */}
        <div className="text-center mb-5" style={{ marginTop: '70px' }}>
          <h3 style={{ color: '#febd0e', fontSize: '32px', fontWeight: '800', marginBottom: '15px' }}>
            <span>Why Choose Miscarchive for Your Digital Marketing Needs?</span>
          </h3>
          <div
            style={{
              maxWidth: '840px',
              margin: '0 auto',
              background: '#ffffff',
              padding: '24px 30px',
              borderRadius: '12px',
              border: '1px solid #eaedf0',
            }}
          >
            <p style={{ margin: 0, color: '#333333', fontSize: '15.5px', lineHeight: '1.7', fontWeight: '500' }}>
              At Miscarchive, we understand that in the fast-paced world of digital marketing, staying ahead of the curve is paramount. Here&apos;s why partnering with us is your best decision and we’ll assure you that we are the <strong>Best Digital Marketing company in Trivandrum.</strong>
            </p>
          </div>
        </div>

        <div className="dm-grid-4">
          {whyChooseReasons.map((item, idx) => (
            <div key={idx} className="dm-card">
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#febd0e',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '13px',
                  marginBottom: '16px',
                }}
              >
                {item.num}
              </div>
              <h4 style={{ color: '#111111', fontSize: '17px', fontWeight: '700', marginBottom: '10px', lineHeight: '1.35' }}>
                {item.title}
              </h4>
              <p style={{ color: '#555555', fontSize: '14px', lineHeight: '1.6', margin: 0, flexGrow: 1 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Concluding Bottom Banner */}
        <div style={{ marginTop: '35px' }}>
          <div
            style={{
              background: 'linear-gradient(to right, #fcc50f 0%, #fed20f 40%, #fed20f 100%)',
              borderRadius: '14px',
              padding: '30px 36px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(254,189,14,0.25)',
            }}
          >
            <p style={{ margin: 0, color: '#111111', fontSize: '16px', fontWeight: '700', lineHeight: '1.7' }}>
              Choose Miscarchive as the best digital marketing company in Trivandrum as your partner. Join the ranks of businesses that have experienced unparalleled success with us. Contact us today to embark on your journey to digital greatness.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
