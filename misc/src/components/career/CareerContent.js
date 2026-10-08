"use client";
import React, { useEffect, useState } from 'react';
import { getCareers, resolveMediaUrl } from '@/lib/api';

const defaultCareers = [
  {
    title: 'Digital Marketing Hiring',
    flyerImage: '/assets/images/career/dm-hiring.jpg',
  },
];

const CareerContent = ({ initialCareers }) => {
  const [careers, setCareers] = useState(() => {
    if (initialCareers && initialCareers.length > 0) {
      return initialCareers;
    }
    return defaultCareers;
  });

  useEffect(() => {
    if (!initialCareers) {
      getCareers().then((data) => {
        if (data && data.length > 0) {
          setCareers(data);
        }
      }).catch(() => {});
    }
  }, [initialCareers]);

  return (
    <>
      <header className='yellow-bg'>
        <div className="container" style={{paddingTop:"130px"}}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title" style={{color:"#333"}}>Career</h2>
              <h5 className="sub-title"> &nbsp;</h5>
            </div>
          </div>
        </div>
      </header>

      <section className="about-us">
        <div className="container">
          <div className="row">
            {careers.map((career, index) => {
              const src = career.flyerImage ? resolveMediaUrl(career.flyerImage) : '/assets/images/career/dm-hiring.jpg';
              return (
                <div key={career._id || index} className="col-lg-4 col-md-6">
                  <div className="gallery-item">
                    <img
                      src={src}
                      alt={career.title || "Career Hiring"}
                      className="img-fluid"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerContent;
