'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getServices, resolveMediaUrl } from '@/lib/api';

const defaultServices = [
  {
    title: 'Digital Marketing',
    image: '/assets/images/dm.png',
    route: '/services/digital-marketing',
    description:
      'Misc Archive is the best digital marketing company in Trivandrum. In a world driven by data, innovation, and connectivity, the key to your business success lies in digital marketing.',
  },
  {
    title: 'Web Development',
    image: '/assets/images/web devolepment 1.png',
    route: '/services/web-development',
    description:
      "Misc Archive is one of the finest web development companies in Trivandrum. We're passionate about turning your online presence into a masterpiece. A custom-built website is our main attraction.",
  },
  {
    title: 'Graphic Designing',
    image: '/assets/images/web devolepment 1.png',
    route: '/services/graphic-designing',
    description:
      "Graphic design is the centre of attraction for any business. We at Misc Archive create unique graphic designs that help improve your business's online visibility.",
  },
  {
    title: 'Branding',
    image: '/assets/images/dm.png',
    route: '/',
    description:
      "Misc Archive is a leading Digital Marketing Company in Trivandrum. We're dedicated to helping you shape your brand identity and elevate your impact in the world through branding.",
  },
  {
    title: 'SEO',
    image: '/assets/images/seo.png',
    route: '/coming-soon',
    description:
      'SEO improves visibility, drives traffic, boosts sales, and converts clicks into customers. We make your site rank higher on search engines using trends and analytics',
  },
  {
    title: 'Audibles',
    image: '/assets/images/mic.png',
    route: '/coming-soon',
    description:
      'Misc Archive offers a creative hub where sounds and technology collide. The music studio serves as a refuge for both audiophiles and artists.',
  },
];

export default function ServicesSection({ initialServices }) {
  const [services, setServices] = useState(() => {
    if (initialServices && initialServices.length > 0) {
      return initialServices.filter((s) => s.isActive !== false).map((s) => ({
        title: s.title,
        image: s.iconImage || s.image || '',
        route: s.route || `/services/${s.slug}`,
        description: s.shortDescription || s.description || '',
      }));
    }
    return defaultServices;
  });

  useEffect(() => {
    if (!initialServices) {
      getServices(true).then((data) => {
        if (data && data.length > 0) {
          setServices(
            data.map((s) => ({
              title: s.title,
              image: s.iconImage || s.image || '',
              route: s.route || `/services/${s.slug}`,
              description: s.shortDescription || s.description || '',
            }))
          );
        }
      }).catch(() => {});
    }
  }, [initialServices]);

  return (
    <section className="services py-3">
      <div className="container">
        <div className="col-12 services-heading">
          <span className="section-kicker">WHAT WE DO</span>
          <h3><span>Our Services</span></h3>
          <p>Strategy, storytelling and digital craft for brands with something to say.</p>
        </div>

        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-4 col-sm-6 col-6 mb-4" key={index}>
              <div className="box yellow-bg h-100 p-3 "   style={{
    background: "linear-gradient(to right, #fcc50f 0%, #fed20f 40%, #fed20f 100%)"}}>
                {/* <Link href={service.route} className="text-decoration-none text-dark"> */}
                  <div className="table w-100 h-100">
                    <div className="inner text-center">
                      <img
                        src={service.image.startsWith('/') || service.image.startsWith('http') ? resolveMediaUrl(service.image) : `/assets/images/${service.image}`}
                        alt={service.title}
                        style={{ maxWidth: '300px', maxHeight: '200px' }}
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
