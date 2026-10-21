'use client';

import React, { useState, useEffect } from 'react';
import styles from './ContactContent.module.css';
import { getSettings, submitEnquiry } from '@/lib/api';

export default function ContactContent({ initialSettings = null }) {
  const [settings, setSettings] = useState(initialSettings);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: string }

  useEffect(() => {
    if (!settings) {
      getSettings()
        .then((s) => s && setSettings(s))
        .catch(() => {});
    }
  }, [settings]);

  const phone1 = settings?.contact?.phones?.[0] || '+91 8907634900';
  const phone2 = settings?.contact?.phones?.[1] || '+91 8848608726';
  const email = settings?.contact?.emails?.[0] || 'contact@miscarchive.com';
  const address =
    settings?.contact?.addressPrimary ||
    'Rohini, MRA E34, Mele kuzhivila lane, Maruthankuzhy Brg, Kanjirampara, Thiruvananthapuram, Kerala 695030';
  const mapEmbedUrl =
    settings?.googleMapsEmbedUrl ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.817829742477!2d76.9749134744944!3d8.517061096793476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb3682df7b0b%3A0x883771e7a4c3fd4f!2sMisc%20Archive!5e0!3m2!1sen!2sin!4v1751711918093!5m2!1sen!2sin';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const payload = {
      ...formData,
      formSource: 'contact_page',
    };

    try {
      const res = await submitEnquiry(payload);
      if (res && res.success) {
        setStatusMessage({
          type: 'success',
          text: 'Thank you! Your message has been sent successfully. Our team will get back to you shortly.',
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setLoading(false);
        return;
      }
      throw new Error(res?.message || 'Submission error');
    } catch (err) {
      // Fallback submission to Google Apps Script
      try {
        const scriptData = new URLSearchParams();
        Object.keys(payload).forEach((key) => scriptData.append(key, payload[key]));

        await fetch(
          'https://script.google.com/macros/s/AKfycbxLw60yrM_9HtfrIsIJLyKTBD5FGKZ9UWUrPDe_FIquLZ3f8_hoQA_qm2RJnIRs2kub/exec',
          {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: scriptData.toString(),
          }
        );

        setStatusMessage({
          type: 'success',
          text: 'Thank you! Your message has been sent successfully. Our team will get back to you shortly.',
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } catch (fallbackErr) {
        setStatusMessage({
          type: 'error',
          text: 'Something went wrong while sending your message. Please try calling us directly.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.contactPageWrapper}>
      {/* ------------------------------------------------------------------
          1. Hero Banner
      ------------------------------------------------------------------- */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContainer}>
          {/* Main Title: CONTACT US (CONTACT in black, US in orange) */}
          <h1 className={styles.heroTitle}>
            <span className={styles.titleContact}>CONTACT</span>
            <span className={styles.titleUs}>US</span>
          </h1>

          {/* Subtitle */}
          <p className={styles.heroSubtitle}>
            Just say hi! You are always welcome.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          2. Main Section (Contact Form + Map & Info Cards)
      ------------------------------------------------------------------- */}
      <section className={styles.mainSection}>
        <div className={styles.mainContainer}>
          <div className={styles.contentGrid}>
            {/* ==========================================================
                LEFT COLUMN: Contact Form Card
            ========================================================== */}
            <div className={styles.formCard}>
              <span className={styles.cardEyebrow}>GET IN TOUCH</span>

              <h2 className={styles.cardTitle}>
                Let&apos;s Start a <span className={styles.titleGolden}>Conversation</span>
              </h2>

              <p className={styles.cardSubtitle}>
                Have a project in mind or want to know more about our services? Drop us a message and our team will get back to you shortly.
              </p>

              <form className={styles.contactForm} onSubmit={handleSubmit}>
                {/* Row 1: Your Name & E-mail Address */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your name"
                      className={styles.formInput}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="E-mail address"
                      className={styles.formInput}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Phone number & Subject */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Phone number"
                      className={styles.formInput}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      className={styles.formInput}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 3: Textarea for Message */}
                <div className={`${styles.formGroup} ${styles.textareaGroup}`}>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Your message"
                    className={styles.formTextarea}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className={styles.submitBtnRow}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                  >
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    <span className={styles.submitBtnArrow}>→</span>
                  </button>
                </div>

                {/* Inline Status Feedback */}
                {statusMessage && (
                  <div
                    className={
                      statusMessage.type === 'success'
                        ? styles.formAlertSuccess
                        : styles.formAlertError
                    }
                    role="alert"
                  >
                    {statusMessage.type === 'success' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}
              </form>
            </div>

            {/* ==========================================================
                RIGHT COLUMN: Google Map + 3 Contact Info Cards
            ========================================================== */}
            <div className={styles.rightCol}>
              {/* Google Map Box */}
              <div className={styles.mapCard}>
                <iframe
                  src={mapEmbedUrl}
                  className={styles.mapIframe}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Misc Archive Office Location"
                ></iframe>
              </div>

              {/* 3 Contact Info Cards */}
              <div className={styles.infoCardsGrid}>
                {/* Card 1: Call Us */}
                <div className={styles.infoCard}>
                  <div className={styles.iconCircle} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <h3 className={styles.infoCardTitle}>Call Us</h3>
                  <div className={styles.infoCardBody}>
                    <a href={`tel:${phone1.replace(/\s+/g, '')}`} className={styles.infoLink}>
                      {phone1}
                    </a>
                    <a href={`tel:${phone2.replace(/\s+/g, '')}`} className={styles.infoLink}>
                      {phone2}
                    </a>
                  </div>
                </div>

                {/* Card 2: Email Us */}
                <div className={styles.infoCard}>
                  <div className={styles.iconCircle} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <h3 className={styles.infoCardTitle}>Email Us</h3>
                  <div className={styles.infoCardBody}>
                    <a href={`mailto:${email}`} className={styles.infoLink}>
                      {email}
                    </a>
                  </div>
                </div>

                {/* Card 3: Our Location */}
                <div className={styles.infoCard}>
                  <div className={styles.iconCircle} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <h3 className={styles.infoCardTitle}>Our Location</h3>
                  <div className={styles.infoCardBody}>
                    <p className={styles.infoText}>{address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
