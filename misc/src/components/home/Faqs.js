"use client";
import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(2); // default open (3rd)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      q: " Expertise Across the Spectrum",
      a: "Our team comprises seasoned experts in every facet of digital marketing - from SEO and content creation to social media management and PPC advertising. We've got the skills and know-how to tackle all your digital marketing challenges."
    },

    {
      q: "Tailored Strategies, Measurable Results:",
      a: "We don't believe in one-size-fits-all solutions. Our approach begins with a deep understanding of your business, goals, and target audience. We then craft customized strategies that deliver measurable results."
    },


    {
      q: "Data-Driven Decision Making:",
      a: "With Miscarchive, you're not flying blind. We're obsessed with data. Our team rigorously analyzes performance metrics, ensuring that every campaign is optimized for success. We make informed decisions to maximize ROI."
    },


    {
      q: "Creativity and Innovation:",
      a: "Digital marketing isn't just about numbers; it's also about creativity. Our team is a melting pot of innovative thinkers, always pushing the boundaries to create engaging content and cutting-edge campaigns."
    },


    {
      q: "Proven Track Record:",
      a: "Our portfolio is a testament to our success. We've helped businesses of all sizes and industries achieve their digital marketing goals. When you choose Miscarchive, you're choosing a track record of excellence."
    },


    {
      q: "Scalability and Adaptability:",
      a: "As your business grows, we grow with you. Our strategies are designed to scale seamlessly, ensuring that your digital marketing efforts remain effective as you expand."
    },


    {
      q: "Cost-Effective Solutions:",
      a: "Quality doesn't have to come at a premium. Miscarchive offers competitive pricing without compromising on the quality of service. We believe in delivering value that exceeds your investment."
    },


    {
      q: "Client-Centric Approach :",
      a: "Your success is our success. We're committed to building long-lasting client relationships. When you choose Miscarchive, you're choosing a partner dedicated to your growth."
    },


  ];

  return (
    <section
      className="faqs-section"
      style={{
        backgroundColor: "",
        color: "#fff",
        padding: "80px 20px",
        textAlign: "center",
      }}
      id="faqs"
    >
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="heading text-center mb-5">
          <h2
            className="heading-title"
            style={{
              color: "#febd0e ",
            //   fontSize: "2.4rem",
              fontWeight: "700",
              marginBottom: "40px",
            }}
          >
           Why Choose Miscarchive for Your Digital Marketing Needs?
          </h2>
          <p>At Miscarchive, we understand that in the fast-paced world of digital marketing, staying ahead of the curve is paramount. Here's why partnering with us is your best decision and we’ll assure you that we are the Best Digital Marketing company in Trivandrum.</p>
        </div>

        <div className="accordion">
          {items.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{
                background: "",
                marginBottom: "12px",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid #333",
              }}
            >
              {/* Heading */}
              <div
                className="card-heading d-flex justify-content-between align-items-center"
                onClick={() => toggleAccordion(index)}
                style={{
                  cursor: "pointer",
                  padding: "16px 20px",
                  background: openIndex === index ? "#febd0e " : "",
                  color: openIndex === index ? "" : "#febd0e ",
                  fontWeight: "600",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <span className="card-link">{item.q}</span>

                {/* + / - icon */}
                <motion.span
                  initial={false}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  {openIndex === index ? "−" : "+"}
                </motion.span>
              </div>

              {/* Animated Body */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="card-body"
                      style={{
                        padding: "16px 20px",

                        color: "black",
                        lineHeight: "1.6",
                        fontSize: "15px",
                        textAlign: "left",
                      }}
                    >
                      {item.a}
                    </div>

                    <p>Choose Miscarchive as the best digital marketing company in Trivandrum as your partner. Join the ranks of businesses that have experienced unparalleled success with us. Contact us today to embark on your journey to digital greatness.

</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
