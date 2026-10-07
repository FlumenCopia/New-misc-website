import React from "react";

const SemContent = () => {
  return (
    <>
      <header className="yellow-bg">
        <div className="container" style={{ paddingTop: "130px" }}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title" style={{color:"#333"}}>S E M</h2>
              <h5 className="sub-title" style={{color:"#333"}}>Search Engine Marketing</h5>
            </div>
          </div>
        </div>
      </header>
<section 
        style={{
          backgroundImage: "url('/assets/images/services/dm-banner-sem.png')",
          backgroundSize: "cover",

        }}
>
  <div className="container">
    <div className="row align-items-center">
      
      {/* Left Side - Text */}
      <div className="col-md-6">
        <h1 style={{ fontWeight: "700", fontSize: "58px", color: "#fcc50f", marginTop:'20%'}} >
       Search Engine <br />Marketing
        </h1>
        <p
          style={{
            padding: "10px 15px",
            borderRadius: "4px",
            marginTop: "20px",
          }}
        >
    Boost Visibility, Drive Traffic, and Achieve Measurable Results with Precision-Powered SEM Strategies
        </p>
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
          src="/assets/images/services/sm1.png"
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
          src="/assets/images/services/sem2.jpg" // Replace with correct image path
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
        Getting Started with Search 
<br />Engine Marketing
        </h1>
<p>Search Engine Marketing (SEM) is a powerful digital marketing strategy designed to enhance a business's online visibility and attract high-intent customers. By leveraging paid advertising platforms, SEM places your website at the forefront of search engine results pages (SERPs) when users search for relevant keywords. Unlike organic search efforts, SEM delivers immediate results, making it an essential tool for businesses aiming to drive targeted traffic, generate leads, and boost sales in a competitive digital landscape. With SEM, you can reach your audience precisely where and when they are searching for your products or services, ensuring maximum return on investment (ROI) and measurable success.
  </p>      </div> </div>
    </div>
  </div>
</section>










    </>
  );
};

export default SemContent;
