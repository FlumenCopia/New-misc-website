import React from 'react'
import Link from 'next/link'


const Blogtitle = ({ title}) => {
  return (
    <div>
        <header className='yellow-bg blog-mobile-padding'>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="title" style={{paddingTop:"130px", color: '#333' }}><b>BLOG</b></h1>
            <div> 
              <Link href="/" style={{ color: '#333' }}><b>Home </b></Link>
              <i className="fa fa-angle-right mx-1" style={{ color: '#333' }}></i>
              <Link href="/blog" style={{ color: '#333' }}><b>Blog</b></Link>
              <i className="fa fa-angle-right mx-1 " style={{ color: '#333' }}></i>
              <Link href="#" style={{ color: '#333' }} className='mb-0'> <h4><b>{title}</b></h4> </Link>  <br/>
            </div>
          </div>
        </div>
      </div>
      </header>
    </div>
  )
}

export default Blogtitle