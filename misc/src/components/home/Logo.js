'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getClientLogos, resolveMediaUrl } from '@/lib/api';

const defaultLogos = [
  'promag-logo.png',
  'icatch-logo.png',
  'C L 01.webp',
  'C L 02.webp',
  'C L 03.webp',
  'C L 05.webp',
  'bulletclub.png',
  'bm.png',
  'jsml.png',
  'pounchik.png',
  'lemonsole_final.jpg',
  'wisdom.jpg',
  'kompeterzen.jpg',
  'nanoos_final.jpg',
  'swarasaakhi.jpg',
  'math.jpg',
  'ananthapuri.jpg',
  'miscaudiable.jpg',
  'misc web logos-01.jpg',
  'misc web logos-02.jpg',
  'misc web logos-03.jpg',
  'misc web logos-04.jpg',
  'misc web logos-05.jpg',
  'misc web logos-06.jpg',
  'misc web logos-07.jpg',
  'misc web logos-08.jpg',
  'misc web logos-09.jpg',
  'misc web logos-10.jpg',
  'ssnss.jpg',
  'flyers.jpg',
];

export default function LogosSection({ initialLogos }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  const [logos, setLogos] = useState(() => {
    if (initialLogos && initialLogos.length > 0) {
      return initialLogos.map((l) => l.logoImage || l);
    }
    return defaultLogos;
  });

  useEffect(() => {
    if (!initialLogos) {
      getClientLogos().then((data) => {
        if (data && data.length > 0) {
          setLogos(data.map((l) => l.logoImage || l));
        }
      }).catch(() => {});
    }
  }, [initialLogos]);

  return (
    <section className="logos">
      <div className="container-fluid fadeInUp">
        <div className="row">
          <div className="col-xs-12 slider-container">
            <div className="logos-intro">
              <span className="section-kicker">SELECTED CLIENTS</span>
              <p>Good work travels. A few of the brands we&apos;ve helped move forward.</p>
            </div>
            <Slider {...settings}>
              {logos.map((filename, index) => {
                const src = filename.startsWith('/') || filename.startsWith('http')
                  ? resolveMediaUrl(filename)
                  : `/assets/images/${filename}`;
                return (
                  <div className="item" key={index}>
                    <figure style={{ display: 'flex', justifyContent: 'center' }}>
                      <img
                        src={src}
                        alt={`Logo ${index}`}
                        style={{ width: '60%', height: 'auto' }}
                      />
                    </figure>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
