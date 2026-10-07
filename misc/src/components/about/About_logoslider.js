"use client";

import React from 'react'
import Slider from 'react-slick';

const logoImages = [
  'C L 01.webp', 'C L 02.webp', 'C L 03.webp', 'C L 05.webp',
  'bulletclub.png', 'bm.png', 'cs.png', 'jsml.png',
  'navaka.png', 'pounchik.png', 'rainbo.png', 'rrv.png', 'JSM.png'
];

const sliderSettings = {
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
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function About_logoslider() {
  return (
    <div>

         <section className="logos">
      <div className="container fadeInUp">
        <div className="row">
          <div className="col-xs-12">
            <h2>LOGOS</h2>
            <Slider {...sliderSettings}>
              {logoImages.map((img, index) => (
                <div key={index} className="text-center p-2">
                  <img
                    src={`/assets/images/${img}`}
                    alt={`Logo ${index + 1}`}
                    className="img-fluid mx-auto"
                    style={{ maxWidth: '150px', height: 'auto' }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
        
    </div>
  )
}

export default About_logoslider