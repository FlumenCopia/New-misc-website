import React from 'react';

const CareerContent = () => {
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
            <div className="col-lg-4 col-md-6">
              <div className="gallery-item">
                <img
                  src="/assets/images/career/dm-hiring.jpg"
                  alt="Digital Marketing Hiring"
                  className="img-fluid"
                />
              </div>
            </div>

            {/* Add more gallery items here if needed */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerContent;
