import React from "react";

const EmailContent = () => {
  return (
    <>
      <header className="yellow-bg">
        <div className="container" style={{ paddingTop: "130px" }}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title" style={{color:"#333"}}>E-mail Marketing</h2>
              <h5 className="sub-title" style={{color:"#333"}}>Email Marketing</h5>
            </div>
          </div>
        </div>
      </header>
<section 
        style={{
          backgroundImage: "url('/assets/images/services/dm-banner-7.png')",
          backgroundSize: "cover",

        }}
>
  <div className="container">
    <div className="row align-items-center">
      
      {/* Left Side - Text */}
      <div className="col-md-6">
        <h1 style={{ fontWeight: "700", fontSize: "58px", color: "#fcc50f", marginTop:'20%'}} >
   Email  <br />Marketing
        </h1>
        <p
          style={{
            padding: "10px 15px",
            borderRadius: "4px",
            marginTop: "20px",
          }}
        >
Transform Connections into Conversions with Email Marketing     </p>
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
          src="/assets/images/services/email1.png"
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
          src="/assets/images/services/email2.jpg" // Replace with correct image path
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
       Getting Started with Email

<br /> Marketing
        </h1>
<p>Email marketing is a digital marketing technique that leverages email to communicate with potential and existing customers. It is an effective tool for promoting products, building customer loyalty, nurturing leads, and educating subscribers about the benefits of a business. Email marketing is one of the most effective ways to engage with an audience and drive conversions.</p>

<p>Cost-Effective - No high advertising costs like PPC or social media ads.
Personalized Communication - Send targeted emails based on user behavior and preferences.</p>
<p>Increases Customer Retention - Helps in customer engagement and brand loyalty.</p>
 </div> </div>
    </div>
  </div>
</section>










    </>
  );
};

export default EmailContent;
