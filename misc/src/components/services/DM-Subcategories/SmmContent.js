'use client';
import React, { useEffect, useState } from "react";
import { getSubServices } from "@/lib/api";

const SmmContent = () => {
  const [data, setData] = useState({
    title: "S M M",
    subtitle: "Social Media Marketing",
    shortDescription: "Unlock the power of social media to grow your brand and engage with your audience like never before",
  });

  useEffect(() => {
    let isMounted = true;
    getSubServices().then((subs) => {
      if (isMounted && Array.isArray(subs)) {
        const item = subs.find((s) => s.slug === "smm");
        if (item) {
          setData({
            title: item.title || "S M M",
            subtitle: "Social Media Marketing",
            shortDescription: item.shortDescription || "Unlock the power of social media to grow your brand and engage with your audience like never before",
          });
        }
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <header className="yellow-bg">
        <div className="container" style={{ paddingTop: "130px" }}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title" style={{color:"#333"}}>{data.title}</h2>
              <h5 className="sub-title" style={{color:"#333"}}>{data.subtitle}</h5>
            </div>
          </div>
        </div>
      </header>
<section 
        style={{
          backgroundImage: "url('/assets/images/services/banner-dm-6.png')",
          backgroundSize: "cover",

        }}
>
  <div className="container">
    <div className="row align-items-center">
      
      {/* Left Side - Text */}
      <div className="col-md-6">
        <h1 style={{ fontWeight: "700", fontSize: "58px", color: "#fcc50f", marginTop:'20%'}} >
       Social Media  <br />Marketing
        </h1>
        <p
          style={{
            padding: "10px 15px",
            borderRadius: "4px",
            marginTop: "20px",
          }}
        >
{data.shortDescription}        </p>
        <div style={{ marginTop: "30px" }}>
          <button
            className="btn"
            style={{
              backgroundColor: "#fcc50f",
              color: "#fff",
              padding: "20px 35px",
              borderRadius: "8px",
              fontSize: "1.5rem"
            }}
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="col-md-6 text-center">
        <img
          src="/assets/images/services/smm1.png"
          alt="SEO Illustration"
          style={{
            maxWidth: "100%",
            height: "auto"
          }}
        />
      </div>
    </div>
  </div>
</section>



















<section style={{marginTop:'50px'}}>
  <div className="container ">
    <div className="row align-items-center">
      
      <div className="col-md-6">
             <img
          src="/assets/images/services/smm2.jpg" // Replace with correct image path
          alt="SEO Illustration"
          style={{
            maxWidth: "100%",
            height: "auto",
            padding:'10PX',
            borderRadius:'30px'
          }}
        />
      </div>

      <div className="col-md-6 text-start">
        <div style={{   marginTop:'10%'}}>

       
               <h1 style={{ color: "#fcc50f",fontWeight:'bold'}} >
       Getting Started with Social

<br />Media Marketing
        </h1>
<p>Social Media Marketing (SMM) is a powerful strategy for businesses to connect with their audience, build brand awareness, and drive engagement through platforms like Facebook, Instagram, Twitter, LinkedIn, and TikTok. By leveraging targeted content, engaging posts, and strategic ad campaigns, social media marketing helps businesses reach potential customers, foster relationships, and ultimately boost sales. In today's digital age, having a strong social media presence is crucial for staying competitive, fostering brand loyalty, and driving business growth. Whether you are a small startup or an established company, social media marketing offers limitless opportunities to connect with your target audience and grow your brand.</p>    </div> </div>
    </div>
  </div>
</section>










    </>
  );
};

export default SmmContent;
