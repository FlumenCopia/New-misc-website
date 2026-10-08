'use client';
import React, { useEffect, useState } from 'react';
import { getSubServices } from "@/lib/api";

const SeoContent = () => {
  const [data, setData] = useState({
    title: " S E O",
    subtitle: "Search Engine Optimization",
  });

  useEffect(() => {
    let isMounted = true;
    getSubServices().then((subs) => {
      if (isMounted && Array.isArray(subs)) {
        const item = subs.find((s) => s.slug === "seo");
        if (item) {
          setData({
            title: item.title || " S E O",
            subtitle: "Search Engine Optimization",
          });
        }
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  return ( 
    <>
      <header className='yellow-bg'>
        <div className="container" style={{paddingTop:"130px"}}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title" style={{color:"#333"}}>{data.title}</h2>
              <h5 className="sub-title" style={{color:"#333"}}>{data.subtitle}</h5>
            </div>
          </div>
        </div>
      </header>

      <section className="about-us">
        <div className="container" style={{ padding: '100px', textAlign: 'center' }}>
          <h1>Page will be visible Soon</h1>
        </div>
      </section>
    </>
  );
};

export default SeoContent;