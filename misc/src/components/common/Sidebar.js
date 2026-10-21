// components/common/Sidebar.js
"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Sidebar.module.css";
import { submitEnquiry } from "@/lib/api";

export default function Sidebar({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.type === "error") {
      setStatus({ type: "", message: "" });
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      service: formData.service || "",
      message: formData.message.trim(),
      formSource: "sidebar_enquiry",
    };

    try {
      const res = await submitEnquiry(payload);
      if (res && res.success) {
        setStatus({
          type: "success",
          message:
            "Thank you! Your enquiry has been received successfully. Our team will get back to you shortly.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        setIsSubmitting(false);
        return;
      }
      throw new Error(res?.message || "Submission failed");
    } catch (cmsErr) {
      // Seamless fallback to Google Apps Script endpoint
      try {
        const scriptParams = new URLSearchParams();
        scriptParams.append("name", payload.name);
        scriptParams.append("email", payload.email);
        scriptParams.append("phone", payload.phone);
        scriptParams.append("service", payload.service);
        scriptParams.append("message", payload.message);

        await fetch(
          "https://script.google.com/macros/s/AKfycbxLw60yrM_9HtfrIsIJLyKTBD5FGKZ9UWUrPDe_FIquLZ3f8_hoQA_qm2RJnIRs2kub/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: scriptParams.toString(),
          }
        );

        setStatus({
          type: "success",
          message:
            "Thank you! Your enquiry has been received successfully. Our team will get back to you shortly.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } catch (fallbackErr) {
        setStatus({
          type: "error",
          message:
            "Something went wrong while submitting. Please try again or reach out to us directly.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Drawer Panel */}
      <div
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Enquiry Form"
      >
        {/* Top-Right Decorative Graphic */}
        <svg
          className={styles.topGraphic}
          viewBox="0 0 260 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer golden wave shape */}
          <path
            d="M90 0 C130 50, 185 80, 260 88 L260 0 Z"
            fill="url(#topGoldGrad)"
          />
          <path
            d="M135 0 C170 38, 210 54, 260 58 L260 0 Z"
            fill="#f5a623"
            opacity="0.9"
          />
          {/* Swoop contour lines */}
          <path
            d="M30 0 C80 65, 160 120, 260 130"
            stroke="#f5a623"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M0 0 C55 80, 135 155, 260 165"
            stroke="#f5a623"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <defs>
            <linearGradient
              id="topGoldGrad"
              x1="260"
              y1="0"
              x2="100"
              y2="90"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#f5a623" />
              <stop offset="1" stopColor="#fed20f" stopOpacity="0.85" />
            </linearGradient>
          </defs>
        </svg>

        {/* Bottom-Right Decorative Graphic */}
        <svg
          className={styles.bottomGraphic}
          viewBox="0 0 280 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Corner soft glow fill */}
          <path
            d="M280 90 C225 120, 170 175, 145 240 L280 240 Z"
            fill="url(#bottomGoldGrad)"
            opacity="0.45"
          />
          {/* Outer arc */}
          <path
            d="M280 35 C175 65, 80 140, 50 240"
            stroke="#f5a623"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Mid arc with node dot */}
          <path
            d="M280 80 C195 105, 120 170, 95 240"
            stroke="#f5a623"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.88"
          />
          {/* Node dot on the arc */}
          <circle cx="160" cy="142" r="5" fill="#f5a623" />

          {/* Inner arc */}
          <path
            d="M280 130 C225 150, 165 195, 145 240"
            stroke="#f5a623"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          <defs>
            <linearGradient
              id="bottomGoldGrad"
              x1="280"
              y1="240"
              x2="160"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fed20f" stopOpacity="0.8" />
              <stop offset="1" stopColor="#f5a623" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Circular Black Close Button */}
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close Enquiry Form"
        >
          <i
            className="fa-solid fa-xmark"
            style={{ color: "#ffffff", fontSize: "19px", lineHeight: 1 }}
          />
        </button>

        {/* Scrollable Form Content */}
        <div className={styles.scrollArea}>
          {/* Header Typography */}
          <div className={styles.headerBlock}>
            <h2 className={styles.title}>
              Enquiry<span className={styles.titleHighlight}>Form</span>
            </h2>
            <div className={styles.titleBar} />
            <p className={styles.subtitle}>
              Have a question or a project in mind?
              <br />
              Fill out the form and our team will get back to you shortly.
            </p>
          </div>

          {/* Form Content */}
          {status.type === "success" ? (
            <div className={styles.successCard}>
              <div className={styles.successIconWrap}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className={styles.successTitle}>Enquiry Received!</h3>
              <p className={styles.successText}>{status.message}</p>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={handleResetForm}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate={false}>
              {status.type === "error" && (
                <div className={styles.errorBanner}>{status.message}</div>
              )}

              {/* Name */}
              <div className={styles.fieldGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your Name *"
                  required
                />
              </div>

              {/* Email */}
              <div className={styles.fieldGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Email Address *"
                  required
                />
              </div>

              {/* Phone */}
              <div className={styles.fieldGroup}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Phone Number *"
                  required
                />
              </div>

              {/* Service Select */}
              <div className={styles.fieldGroup}>
                <div className={styles.selectWrapper}>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={styles.select}
                    required
                  >
                    <option value="" disabled hidden>
                      Select Service *
                    </option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Graphic Designing">Graphic Designing</option>
                    <option value="Search Engine Optimization (SEO)">
                      Search Engine Optimization (SEO)
                    </option>
                    <option value="Social Media Handling (SMM)">
                      Social Media Handling (SMM)
                    </option>
                    <option value="Search Engine Marketing (SEM)">
                      Search Engine Marketing (SEM)
                    </option>
                    <option value="Email Marketing">Email Marketing</option>
                    <option value="Application Development">
                      Application Development
                    </option>
                    <option value="Brand Building">Brand Building</option>
                    <option value="Misc Audible">Misc Audible</option>
                    <option value="Other Services">Other Services</option>
                  </select>
                  <svg
                    className={styles.selectChevron}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <div className={styles.fieldGroup}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Your Message *"
                  rows={4}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner} />
                    <span>SENDING...</span>
                  </>
                ) : (
                  "SEND MESSAGE"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
