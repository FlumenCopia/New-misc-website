// components/AiRpaBlog.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Rpablog = () => {
  return (
    <>
      {/* Blog Section */}
      <section className="blog py-5">
        <div className="container blog-mobile-padding">
          <div className="row">
            <div className="wow fadeInUp col-12">
              <div className="blog-post">
                {/* <figure>
                  <Image
                    src="/assets/images/blogs/RPA.png"
                    alt="AI and RPA"
                    width={800}
                    height={400}
                    layout="responsive"
                  />
                </figure> */}
                <h3>So what are Ai and RPA?</h3>
                <small>October 27, 2024</small>
                <span className="border d-block my-3" />

                <p>
                  In the present world, RPA and AI are becoming more and more significant. They can assist businesses in automating routine processes to boost productivity and cut costs...
                </p>
                <p>
                  Artificial intelligence (AI) involves the development of systems capable of tasks that ordinarily require human intelligence. Robotic Process Automation (RPA) is a software technology that automates repetitive and rule-based tasks...
                </p>

                <h4>Why should you do RPA and Ai?</h4>
                <p>
                  RPA and AI are becoming more significant in the current world due to their ability to automate repetitive operations, boost productivity, and cut expenses...
                </p>

                <h4>What do we do?</h4>
                <p>
                  Misc Archive can help you automate and improve your recurring operations using the RPA platform. This decreases manual intervention while increasing accuracy and efficiency. RPA conducts lengthy, difficult activities by recreating how a human would typically carry them out.
                </p>
                <p>
                  Our main platform for developing these apps is Microsoft Power Automate and related automation modules:
                </p>
                <ul>
                  <li>Extremely quick implementation.</li>
                  <li>Without interfering with the underlying architecture.</li>
                  <li>Used to eliminate manual entry methods from all business activities.</li>
                  <li>Used to extract text and image information from structured, semi-structured, and unstructured documents.</li>
                </ul>

                <h4>Why choose us?</h4>
                <p>
                  Misc Archive focuses on delivering high-quality software solutions that meet the needs of our business audience. Our products are reliable, user-friendly, and provide value to our customers. We also offer technical support, maintenance, and upgrades.
                </p>
                <p>For more details, please feel free to contact us.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote py-5 bg-dark text-white" data-stellar-background-ratio="0.5">
        <div className="container wow fadeInUp">
          <div className="row">
            <div className="col-12">
              <div className="content-box text-center">
                <h3>Discover how we can assist you!</h3>
                <p>
                  We are delighted to hear from you and excited to learn more about your project. Our team is eager to provide top-notch digital marketing and web development services tailored to your needs.
                </p>
                <p>
                  Use the form below to send us a message. We aim to respond quickly. Let us know how we can assist you in achieving your business goals.
                </p>
                <p>Thank you for considering our services. We look forward to hearing from you soon!</p>
                <Link href="#" className="btn btn-outline-light mt-3">Get In Touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rpablog;
