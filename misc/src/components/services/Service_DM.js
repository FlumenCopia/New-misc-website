import React from 'react';

const Service_DM = ({ title = 'Digital Marketing' }) => {
  return (
    <>
      <header className='yellow-bg'>
        <div className="container" style={{paddingTop:"130px"}}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title" style={{color:"#333"}}>{title}</h2>
              <h5 className="sub-title"> &nbsp;</h5>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Service_DM;
