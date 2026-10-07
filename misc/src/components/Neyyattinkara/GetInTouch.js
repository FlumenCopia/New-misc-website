
"use client";

import { useEffect } from "react";

export default function GetInTouch() {
  useEffect(() => {
    /* Fade-in animation */
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

    /* Contact form */
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", e => {
      e.preventDefault();

      const inputs = form.querySelectorAll("input, textarea");
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) valid = false;
      });

      if (!valid) {
        alert("Please fill in all fields");
        return;
      }

      alert("Thank you! We will get back to you shortly.");
      form.reset();
    });
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-wrapper">

          {/* Heading */}
          <div className="text-center fade-in contact-heading">
            <h2>Get In Touch</h2>
            <p>
              We'd love to hear from you. Let's discuss how we can help your
              business grow.
            </p>
          </div>

          {/* Card */}
          <div className="contact-card fade-in">
            <div className="row">

              {/* Contact Info */}
              <div className="col-md-6">
                <h3>Contact Information</h3>

                <div className="contact-item">
                  <div className="icon">
                    <i className="fa fa-map-marker"></i>
                  </div>
                  <div>
                    <h4>Location</h4>
                    <p>Neyyatinkara, Trivandrum</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="icon">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 99958 62504</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="icon">
                    <i className="fa fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>Contact@miscarchive.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="icon">
                                                         <i className="fas fa-clock text-purple-600"></i>
                  </div>
                  <div>
                    <h4>Working Hours</h4>
                    <p>Mon – Sat | 9:30 AM – 6:30 PM</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="col-md-6">
                <h3>Send us a Message</h3>

                <form id="contact-form">
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Your Email" />
                  <textarea rows="4" placeholder="Your Message"></textarea>

                  <button type="submit">Send Message</button>
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
