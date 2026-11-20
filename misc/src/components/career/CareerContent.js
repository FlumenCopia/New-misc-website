"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCareers, resolveMediaUrl, submitEnquiry } from '@/lib/api';
import styles from './CareerContent.module.css';

function parseCareers(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

export default function CareerContent({ initialCareers }) {
  const [careers, setCareers] = useState(() => parseCareers(initialCareers));
  const [selectedFlyer, setSelectedFlyer] = useState(null);
  const [applyingJob, setApplyingJob] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Form submission state for Application Modal
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    getCareers()
      .then((data) => {
        const parsed = parseCareers(data);
        if (parsed.length > 0) {
          setCareers(parsed);
        }
      })
      .catch(() => {});
  }, []);

  const openPositions = careers.filter(
    (c) => c.status === 'open' || c.status === 'actively_hiring' || !c.status
  );

  const handleApplyClick = (job) => {
    setApplyingJob(job);
    setSubmitSuccess(false);
    setSubmitError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      portfolioUrl: '',
      note: '',
    });
  };

  const handleShareClick = (job) => {
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/career#${job._id || 'job'}` : '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedId(job._id);
        setTimeout(() => setCopiedId(null), 3000);
      });
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!applyingJob) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const messageContent = [
        `Role Applied: ${applyingJob.title}`,
        formData.portfolioUrl ? `Portfolio / Resume: ${formData.portfolioUrl}` : null,
        formData.note ? `Note: ${formData.note}` : null,
      ]
        .filter(Boolean)
        .join('\n');

      await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: `Career Application: ${applyingJob.title}`,
        message: messageContent,
        formSource: 'career_apply',
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setApplyingJob(null);
        setSubmitSuccess(false);
      }, 4000);
    } catch (err) {
      setSubmitError('Failed to submit application. Please email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* =========================================
            BREADCRUMBS & HERO TITLE
            ========================================= */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
          <Link href="/" className={styles.breadcrumbHome}>
            HOME
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbActive}>CAREERS</span>
        </nav>

        <h1 className={styles.heroTitle}>
          Build Your Career at <span className={styles.heroHighlight}>MiscArchive</span>
        </h1>

        {/* =========================================
            SECTION HEADER
            ========================================= */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitleWrap}>
            <h2 className={styles.sectionTitle}>Open Opportunities</h2>
            <div className={styles.titleAccent}></div>
          </div>

          {openPositions.length > 0 && (
            <span className={styles.activeCountBadge}>
              <span className={styles.pulseDot}></span>
              {openPositions.length} Active {openPositions.length === 1 ? 'Opening' : 'Openings'}
            </span>
          )}
        </div>

        {/* =========================================
            JOBS LIST
            ========================================= */}
        {openPositions.length > 0 ? (
          <div className={styles.jobsList}>
            {openPositions.map((career, idx) => {
              const flyerSrc = career.flyerImage ? resolveMediaUrl(career.flyerImage) : null;

              return (
                <article key={career._id || idx} id={career._id || `job-${idx}`} className={styles.jobCard}>
                  {/* Left Column: Role Details & Actions */}
                  <div className={styles.jobLeftCol}>
                    <h3 className={styles.roleTitle}>{career.title}</h3>

                    {/* Meta Badges */}
                    <div className={styles.metaPillsRow}>
                      {career.department && (
                        <span className={`${styles.metaPill} ${styles.departmentPill}`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                          {career.department}
                        </span>
                      )}

                      {career.employmentType && (
                        <span className={styles.metaPill}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {career.employmentType}
                        </span>
                      )}

                      {career.location && (
                        <span className={styles.metaPill}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {career.location}
                        </span>
                      )}

                      {career.experience && (
                        <span className={styles.metaPill}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                          </svg>
                          Exp: {career.experience}
                        </span>
                      )}

                      <span className={`${styles.metaPill} ${styles.statusPill}`}>
                        Actively Hiring
                      </span>
                    </div>

                    {/* Actions Row */}
                    <div className={styles.actionsRow}>
                      <button
                        type="button"
                        className={styles.applyBtn}
                        onClick={() => handleApplyClick(career)}
                      >
                        <span>Apply For This Position</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        className={styles.shareBtn}
                        onClick={() => handleShareClick(career)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                        <span>{copiedId === career._id ? 'Link Copied!' : 'Share Role'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Flyer Thumbnail Preview */}
                  {flyerSrc && (
                    <div className={styles.jobRightCol}>
                      <div
                        className={styles.flyerPreviewWrap}
                        onClick={() => setSelectedFlyer(flyerSrc)}
                        title="Click to preview recruitment flyer"
                      >
                        <img
                          src={flyerSrc}
                          alt={`${career.title} Recruitment Flyer`}
                          className={styles.flyerImg}
                        />
                        <div className={styles.flyerOverlay}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          <span>View Flyer</span>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>No Open Positions At The Moment</h3>
            <p className={styles.emptyText}>
              We are not currently hiring for specific vacancies, but we always welcome talented creatives,
              marketers, and technologists. Drop your resume below to be considered for future openings!
            </p>
          </div>
        )}

        {/* =========================================
            BOTTOM SPONTANEOUS BAR
            ========================================= */}
        <div className={styles.spontaneousBar}>
          <h3 className={styles.spontaneousTitle}>Don’t See A Role That Matches Your Profile?</h3>
          <a
            href="mailto:contact@miscarchive.com?subject=Spontaneous%20Job%20Application%20-%20Miscarchive"
            className={styles.spontaneousBtn}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Email Your Resume</span>
          </a>
        </div>
      </div>

      {/* =========================================
          APPLICATION MODAL
          ========================================= */}
      {applyingJob && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) setApplyingJob(null);
          }}
        >
          <div className={styles.modalBox} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Apply: {applyingJob.title}</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setApplyingJob(null)}
                aria-label="Close application modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className={styles.modalBody}>
              {submitSuccess ? (
                <div className={styles.alertSuccess}>
                  ✓ Application received! Thank you for applying. Our talent team will review your credentials and get back to you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className={styles.modalForm}>
                  {submitError && (
                    <div style={{ color: '#ef4444', fontSize: '0.85rem' }}>{submitError}</div>
                  )}

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Portfolio / LinkedIn / CV Link *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://linkedin.com/in/... or Google Drive link"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Brief Cover Note</label>
                    <textarea
                      placeholder="Tell us a little bit about yourself..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className={styles.formTextarea}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.formSubmitBtn}
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Send Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          IMAGE FLYER LIGHTBOX MODAL
          ========================================= */}
      {selectedFlyer && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedFlyer(null)}
        >
          <div className={styles.imageLightbox} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setSelectedFlyer(null)}
              aria-label="Close flyer preview"
            >
              ✕
            </button>
            <img src={selectedFlyer} alt="Recruitment Flyer Full View" />
          </div>
        </div>
      )}
    </div>
  );
}
