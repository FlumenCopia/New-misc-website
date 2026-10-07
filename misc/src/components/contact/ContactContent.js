"use client";
import React, { useEffect } from 'react';
import $ from "jquery";



const ContactContent = () => {

   useEffect(() => {
      $("#submit-form2").submit((e) => {
        e.preventDefault();
        $.ajax({
          url: "https://script.google.com/macros/s/AKfycbxLw60yrM_9HtfrIsIJLyKTBD5FGKZ9UWUrPDe_FIquLZ3f8_hoQA_qm2RJnIRs2kub/exec",
          data: $("#submit-form2").serialize(),
          method: "post",
          success: function (response) {
          alert("Form submitted successfully")
           window.location.reload();
          },
          error: function (err) {
            alert("An error occurred");
          },
        });
      });
    }, []); 
  
  return (
    <>
      <header className='yellow-bg'>
        <div className="container" style={{paddingTop:"130px"}}>
          <div className="row">
            <div className="col-xs-12">
              <h2 className="title" style={{color:"#333"}}>CONTACT</h2>
              <h5 className="sub-title" style={{color:"#333"}}>Just say hi! You are always welcome</h5>
            </div>
          </div>
        </div>
      </header>

      <section className="contact-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6 text-center">
              <address className=" fadeInUp">
                <h3>Get in Touch With Us</h3>
                <p>
                  Rohini, MRA E34, Mele kuzhivila lane, <br />
                  Maruthankuzhy Brg, 
                  Kanjirampara <br/>
                  Thiruvananthapuram, Kerala 695030

                   
                </p>
                <p>
                  PHONE: &nbsp;
                  <a href="tel:+918907634900">+91 8907634900</a>, &nbsp;&nbsp;
                  <a href="tel:+918848608726">+91 8848608726</a>
                </p>
                <a href="mailto:contactmiscarchive@gmail.com">contactmiscarchive@gmail.com</a>
              </address>

              <form id="submit-form2" className=" fadeInUp">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    className="spacing form-control"
                    required
                    style={{marginBottom:"10px"}}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    className="spacing form-control mb-2"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Your message"
                    className="form-control"
                    rows={5}
                    required
                  ></textarea>
                </div>

                <div className="form-group mt-3" style={{paddingBottom:'25px', paddingTop: '10px'}}>
                  <button id="submit" name="submit" className="btn btn-primary form-submit" style={{color:"#333"}}>
                    SUBMIT
                  </button>
                </div>
              </form>

              <div id="success2" className="alert alert-success mt-3 d-none">
                <p>Your message was sent successfully! We will be in touch as soon as we can.</p>
              </div>

              <div id="error2" className="alert alert-danger mt-3 d-none">
                <p>Something went wrong, try refreshing and submitting the form again.</p>
              </div>
            </div>

            <div className="col-xs-12 col-md-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.817829742477!2d76.9749134744944!3d8.517061096793476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb3682df7b0b%3A0x883771e7a4c3fd4f!2sMisc%20Archive!5e0!3m2!1sen!2sin!4v1751711918093!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="map  fadeInUp" id="map"></section>

      {/* <section className="quote" data-stellar-background-ratio="0.5">
        <div className="container  fadeInUp">
          <div className="row">
            <div className="col-xs-12">
              <div className="content-box">
                <h3>Discover how we can assist you!</h3>
                <p>
                  We are delighted to hear from you and are excited to learn more about your project or business.
                  Our team of experts is always eager to provide top-notch digital marketing and web development
                  services tailored to your unique needs.
                  <br /><br />
                  Please use the form above to send us a message. We aim to respond to all inquiries very fast.
                  Don't hesitate to ask us any questions you may have, and let us know how we can assist you in
                  achieving your business goals.
                  <br /><br />
                  Thank you for considering our services. We look forward to hearing from you soon!
                </p>
                <a href="#" className="btn btn-outline-dark">Get In Touch</a>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default ContactContent;
