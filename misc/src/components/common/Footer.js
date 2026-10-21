'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { getSettings, resolveMediaUrl } from '@/lib/api';
import styles from './Footer.module.css';

export default function FooterSection({ settings: initialSettings }) {
  const [settings, setSettings] = useState(initialSettings || null);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!initialSettings) {
      getSettings().then((s) => s && setSettings(s)).catch(() => {});
    }
  }, [initialSettings]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const address = settings?.contact?.addressPrimary || 
    'Rohini, MRA E34, Mele kuzhivila lane, Maruthankuzhy Brg, Kanjirampara, Thiruvananthapuram, Kerala 695030';
  const phone1 = settings?.contact?.phones?.[0] || '+91 8907634900';
  const phone2 = settings?.contact?.phones?.[1] || '+91 8848608726';
  const email = settings?.contact?.emails?.[0] || 'contact@miscarchive.com';
  const workingHours = settings?.contact?.workingHours || 'Mon-Sat 9.30am - 6.30pm';
  const copyright = settings?.copyrightText || 
    'COPYRIGHT © 2023, MISCARCHIVE | IT SOLUTION | DIGITAL MARKETING AGENCY | AUDIBLES';

  const logoSrc = resolveMediaUrl(settings?.logos?.blackSticky || settings?.logos?.blackNonSticky) || '/assets/images/42.png';

  const socialLinks = {
    instagram: settings?.socialLinks?.instagram || 'https://www.instagram.com/misc_archive_/',
    facebook: settings?.socialLinks?.facebook || 'https://www.facebook.com/miscarchives',
    linkedin: settings?.socialLinks?.linkedin || 'https://www.linkedin.com/company/misc-archive/',
    youtube: settings?.socialLinks?.youtube || 'https://www.youtube.com/@miscarchive',
  };

  return (
    <footer className={styles.footerWrapper} id="footer">
      {/* =========================================
          TOP SECTION: LET'S WORK TOGETHER & CONTACT
          ========================================= */}
      <section className={styles.contactSection} aria-label="Get In Touch">

        <div className={styles.container}>
          {/* Header Row: Title & Subtitle on Left, CTA Contact Button on Right */}
          <div className={styles.headerRow}>
            <div className={styles.headerLeft}>
              <h2 className={styles.heading}>
                Let’s Work <span className={styles.highlight}>Together</span>
              </h2>
              <p className={styles.description}>
                Have a project in mind or just want to say hello? We’d love to hear from you. Reach out using the details below or drop us a message.
              </p>
            </div>

            {/* CTA Button linking to Contact */}
            <Link href="/contact" className={styles.ctaButton}>
              <span>CONTACT US</span>
              <span className={styles.btnArrowCircle} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </Link>
          </div>

          {/* 4-Item Contact Information Strip */}
          <div className={styles.contactStrip}>
            {/* 1. Location */}
            <div className={styles.contactItem}>
              <div className={styles.iconBadge} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>LOCATION</h3>
                <p className={styles.itemText}>{address}</p>
              </div>
            </div>

            {/* 2. Phone */}
            <div className={styles.contactItem}>
              <div className={styles.iconBadge} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>PHONE</h3>
                <p className={styles.itemText}>
                  <a href={`tel:${phone1.replace(/\s+/g, '')}`}>{phone1}</a><br />
                  <a href={`tel:${phone2.replace(/\s+/g, '')}`}>{phone2}</a>
                </p>
              </div>
            </div>

            {/* 3. E-mail */}
            <div className={styles.contactItem}>
              <div className={styles.iconBadge} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>E-MAIL</h3>
                <p className={styles.itemText}>
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
            </div>

            {/* 4. Working Hours */}
            <div className={styles.contactItem}>
              <div className={styles.iconBadge} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>WORKING HOURS</h3>
                <p className={styles.itemText}>{workingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          MAIN 4-COLUMN FOOTER
          ========================================= */}
      <section className={styles.mainFooter} aria-label="Website Footer Navigation">
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Column 1: Brand */}
            <div className={styles.brandCol}>
              <Link href="/" className={styles.footerLogoLink} aria-label="Miscarchive Home">
                <img
                  src={logoSrc}
                  alt="Miscarchive Logo"
                  className={styles.footerLogo}
                />
              </Link>
              <p className={styles.brandText}>
                Your trusted digital marketing partner in Trivandrum. We help brands grow with strategy, creativity, and measurable results.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className={styles.linksCol}>
              <h3 className={styles.colHeading}>Quick Links</h3>
              <ul className={styles.linksList}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/services/miscaudibles">Misc Audible</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3: Follow Us */}
            <div className={styles.socialCol}>
              <h3 className={styles.colHeading}>Follow Us</h3>
              <div className={styles.socialRow}>
                {/* Instagram */}
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialBtn} ${styles.socialInstagram}`}
                  aria-label="Follow Miscarchive on Instagram"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialBtn} ${styles.socialFacebook}`}
                  aria-label="Follow Miscarchive on Facebook"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialBtn} ${styles.socialLinkedin}`}
                  aria-label="Follow Miscarchive on LinkedIn"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.socialBtn} ${styles.socialYoutube}`}
                  aria-label="Subscribe to Miscarchive on YouTube"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
              <p className={styles.socialText}>
                Stay connected for the latest updates, insights, and digital marketing tips.
              </p>
            </div>

            {/* Column 4: Newsletter */}
            <div className={styles.newsletterCol}>
              <h3 className={styles.colHeading}>Newsletter</h3>
              <p className={styles.newsletterText}>
                Subscribe to get the latest news and updates from Miscarchive.
              </p>
              <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className={styles.newsletterInput}
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className={styles.newsletterSubmit} aria-label="Subscribe to newsletter">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>
              {subscribed && (
                <p className={styles.newsletterSuccess} role="status">
                  ✓ Thank you for subscribing!
                </p>
              )}
            </div>
          </div>

          {/* Bottom Copyright & Legal Links Bar */}
          <div className={styles.bottomBar}>
            <div className={styles.bottomFlex}>
              <p className={styles.copyrightText}>{copyright}</p>
              <div className={styles.legalLinks}>
                <Link href="/terms-and-conditions">Privacy Policy</Link>
                <span className={styles.legalSep} aria-hidden="true">|</span>
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PRESERVED LEGACY SCRIPTS & GTM
          ========================================= */}
      <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
      <Script src="/assets/js/bootstrap.min.js" strategy="beforeInteractive" />
      <Script strategy="lazyOnload">{`
        (function($) {
          $(window).on('load', function(){
            $(".loading .table .inner").addClass("fade");
            $('.loading').delay(2000).addClass("fade-out");
          });
        })(jQuery);
      `}</Script>

      {[
        'jquery.form.js',
        'jquery.validate.min.js',
        'contact-form.js',
        'waypoints.min.js',
        'jquery.counterup.min.js',
        'isotope.min.js',
        'masonry.js',
        'wow.js',
        'owl.carousel.js',
        'jquery.stellar.js',
        'jquery.fancybox.js',
        'jquery.themepunch.tools.min.js',
        'jquery.themepunch.revolution.min.js',
        'settings.js',
        'scripts.js',
      ].map((file, index) => (
        <Script
          key={index}
          src={`/assets/js/${file}`}
          strategy="lazyOnload"
          type="text/javascript"
        />
      ))}

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KCWBVHW"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    </footer>
  );
}
