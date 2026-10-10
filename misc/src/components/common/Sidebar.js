// components/Sidebar.js
"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import $ from "jquery";

import { submitEnquiry } from "@/lib/api";

export default function Sidebar({ isOpen, onClose }) {

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  useEffect(() => {
    // Hide alerts initially
    $("#success").hide();
    $("#error").hide();

    const handleSubmit = async (e) => {
      e.preventDefault();

      $("#success").hide();
      $("#error").hide();

      const formEl = document.getElementById("submit-form");
      if (!formEl) return;
      const formData = new FormData(formEl);
      const payload = {
        name: formData.get("name") || "",
        email: formData.get("email") || "",
        phone: formData.get("phone") || "",
        service: formData.get("service") || "",
        message: formData.get("message") || "",
        formSource: "sidebar_enquiry",
      };

      try {
        const res = await submitEnquiry(payload);
        if (res && res.success) {
          alert("Thank you! Your enquiry has been received successfully.");
          $("#success").fadeIn();
          formEl.reset();
          return;
        }
        throw new Error(res?.message || 'Submission failed');
      } catch (err) {
        // Fallback to legacy endpoint if CMS is unavailable
        $.ajax({
          url: "https://script.google.com/macros/s/AKfycbxLw60yrM_9HtfrIsIJLyKTBD5FGKZ9UWUrPDe_FIquLZ3f8_hoQA_qm2RJnIRs2kub/exec",
          data: $("#submit-form").serialize(),
          method: "POST",
          success: function () {
            alert("Thank you! Your enquiry has been received successfully.");
            $("#success").fadeIn();
            formEl.reset();
          },
          error: function () {
            alert("Something went wrong, please try again.");
            $("#error").fadeIn();
          },
        });
      }
    };

    $("#submit-form").on("submit", handleSubmit);

    return () => {
      $("#submit-form").off("submit", handleSubmit);
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 998,
          }}
        />
      )}

      {/* Sidebar */}
     {/* Sidebar */}
<div
  className={`side-menu ${isOpen ? "show-me" : ""}`}
  style={{
    position: "fixed",
    top: 0,
    right: 0,
    width: "300px",
    height: "100vh",
    background: "#fff",
    zIndex: 10001, // 🔥 higher than navbar
    transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
  }}
>

        <div className="clearfix">
          <h4
            className="pull-left"
            style={{ margin: 0, lineHeight: "40px", color: "black", fontWeight: "bold" }}
          >
            Enquiry Form
          </h4>

          <span
            className="side-menu-close pull-right"
            style={{ cursor: "pointer", lineHeight: "40px" }}
            onClick={onClose}
          >
            <i
              className="ion-android-cancel"
              style={{ color: "black", fontSize: "25px" }}
            ></i>
          </span>
        </div>

        {/* FORM (unchanged) */}
        <form id="submit-form" className="enquiry-form">
          <input type="text" name="name" className="form-control custom-input" placeholder="NAME" required />
          <input type="email" name="email" className="form-control custom-input" placeholder="E-MAIL ADDRESS" required />
          <input type="text" name="phone" className="form-control custom-input" placeholder="PHONE" required />

          <select name="service" className="form-control" style={{ border: "1px solid rgba(93, 91, 92, 1)" }}>
            <option value="">Select Service</option>
            <option value="Digital marketing">Digital marketing</option>
            <option value="SMM">Social Media Handling</option>
            <option value="WEB DEVELOPMENT">Web development</option>
            <option value="APPLICATION DEVELOPMENT">Application Development</option>
            <option value="BRAND BUILDING">Brand Building</option>
            <option value="Audiable">Audible</option>
          </select>

          <textarea name="message" className="form-control custom-textarea" placeholder="YOUR MESSAGE" required></textarea>

          <button type="submit" className="btn submit-button">SEND MESSAGE</button>
        </form>

        {/* SUCCESS / ERROR (unchanged markup) */}
        <div id="success" className="alert alert-success" role="alert" style={{ paddingTop: "10px" }}>
          <p>Your message was sent successfully! We will be in touch as soon as we can.</p>
        </div>

        <div id="error" className="alert alert-danger" role="alert">
          <p>Something went wrong, try refreshing and submitting the form again.</p>
        </div>

        {/* Social icons unchanged */}
      </div>
    </>
  );
}
