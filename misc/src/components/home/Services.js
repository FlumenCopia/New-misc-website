'use client';

import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: 'Digital Marketing',
    image: 'dm.png',
    route: '/services/digital-marketing',
    description:
      'Misc Archive is the best digital marketing company in Trivandrum. In a world driven by data, innovation, and connectivity, the key to your business success lies in digital marketing.',
  },
  {
    title: 'Web Development',
    image: 'web devolepment 1.png',
    route: '/services/web-development',
    description:
      "Misc Archive is one of the finest web development companies in Trivandrum. We're passionate about turning your online presence into a masterpiece. A custom-built website is our main attraction.",
  },
  {
    title: 'Graphic Designing',
    image: 'web devolepment 1.png',
    route: '/services/graphic-designing',
    description:
      "Graphic design is the centre of attraction for any business. We at Misc Archive create unique graphic designs that help improve your business's online visibility.",
  },
  {
    title: 'Branding',
    image: 'dm.png',
    route: '/',
    description:
      "Misc Archive is a leading Digital Marketing Company in Trivandrum. We're dedicated to helping you shape your brand identity and elevate your impact in the world through branding.",
  },
    {
    title: 'SEO',
    image: 'seo.png',
    route: '/coming-soon',
    description:
      'SEO improves visibility, drives traffic, boosts sales, and converts clicks into customers. We make your site rank higher on search engines using trends and analytics',
  },
  {
    title: 'Audibles',
    image: 'mic.png',
    route: '/coming-soon',
    description:
      'Misc Archive offers a creative hub where sounds and technology collide. The music studio serves as a refuge for both audiophiles and artists.',
  },
  // {
  //   title: 'Event Management',
  //   image: 'branding.png',
  //   route: '/coming-soon',
  //   description:
  //     'We are the best event management company in Trivandrum from planning to organising, and executing a wide range of events. Corporate conferences, brand launches, music concerts to trade exhibitions etc.',
  // },
  // {
  //   title: 'Mobile App Development',
  //   image: 'web devolepment 1.png',
  //   route: '/coming-soon',
  //   description:
  //     "At Misc Archive, we're dedicated to turning your app vision into a reality that exceeds expectations. With an experienced web development team, we're here to satisfy our customers' needs.",
  // },
  // {
  //   title: 'RPA / AI',
  //   image: 'ai.png',
  //   route: '/coming-soon',
  //   description:
  //     "We provide maintenance and support for the RPA and AI solutions,Along with the training we provide to the client's employees on how to use and interact with the RPA and AI solutions.",
  // },
  // {
  //   title: 'Property Listing',
  //   image: 'ai.png',
  //   route: '/coming-soon',
  //   description:
  //     'We specialize in connecting you with your ideal property. Our comprehensive property listing service offers a curated selection of residential and commercial real estate tailored to meet your unique needs.',
  // },
];

export default function ServicesSection() {
  return (
    <section className="services py-3">
      <div className="container">
        <div className="col-12 mb-5 text-center">
          <h3 style={{ color: '#000', fontSize: '30px', fontWeight: '700' }}>
            <span>Our Services</span>
          </h3>
        </div>

        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-4 col-sm-6 col-6 mb-4" key={index}>
              <div className="box yellow-bg h-100 p-3 "   style={{
    background: "linear-gradient(to right, #fcc50f 0%, #fed20f 40%, #fed20f 100%)"}}>
                {/* <Link href={service.route} className="text-decoration-none text-dark"> */}
                  <div className="table w-100 h-100">
                    <div className="inner text-center">
                      <Image
                        src={`/assets/images/${service.image}`}
                        alt={service.title}
                        width={300}
                        height={200}
                        className="img-fluid mb-3"
                      />
                      <h4 className="fw-bold">{service.title}</h4>
                      <p>{service.description}</p>
                      <span className="expand btn btn-dark mt-2">EXPAND</span>
                    </div>
                  </div>
                {/* </Link> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
