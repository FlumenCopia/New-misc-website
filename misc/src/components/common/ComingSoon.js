import React from 'react';

const ComingSoon = () => {
  return ( 
    <>
      <header>
        <div className="container" style={{paddingTop:"130px"}}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title" style={{color:"#333"}}> Coming Soon</h2> <br></br>
              {/* <h5 className="sub-title">Search Engine Optimization</h5> */}
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

export default ComingSoon;