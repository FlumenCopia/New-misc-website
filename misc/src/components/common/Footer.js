'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getSettings } from '@/lib/api';

export default function FooterSection({ settings: initialSettings }) {
  const [settings, setSettings] = useState(initialSettings || null);

  useEffect(() => {
    if (!initialSettings) {
      getSettings().then((s) => s && setSettings(s)).catch(() => {});
    }
  }, [initialSettings]);

  const address = settings?.contact?.addressPrimary || 
    'Rohini, MRA E34, Mele kuzhivila lane, Maruthankuzhy Brg, Kanjirampara, Thiruvananthapuram, Kerala 695030';
  const phone1 = settings?.contact?.phones?.[0] || '+91 8907634900';
  const phone2 = settings?.contact?.phones?.[1] || '+91 8848608726';
  const email = settings?.contact?.emails?.[0] || 'contact@miscarchive.com';
  const workingHours = settings?.contact?.workingHours || 'Mon-Sat 9.30am - 6.30pm';
  const copyright = settings?.copyrightText || 
    'Copyright © 2023, MiscArchive | IT Solution | Digital Marketing Agency | Audibles';

  return (
    <>
      <section className="contact footer-contact">
        <div className="container fadeInUp">
          <div className="footer-contact-grid">
            <div className="footer-contact-item">
              <img src="/assets/images/icon5.png" alt="Location Icon" />
              <div>
                <strong>LOCATION</strong>
                <address>{address}</address>
              </div>
            </div>

            <div className="footer-contact-item">
              <img src="/assets/images/icon6.png" alt="Phone Icon" />
              <div>
                <strong>PHONE</strong>
                <p>
                  {phone1}<br />
                  {phone2}
                </p>
              </div>
            </div>

            <div className="footer-contact-item">
              <img src="/assets/images/icon7.png" alt="Email Icon" />
              <div>
                <strong>E-MAIL</strong>
                <p>{email}</p>
              </div>
            </div>

            <div className="footer-contact-item">
              <img src="/assets/images/icon8.png" alt="Working Hours Icon" />
              <div>
                <strong>WORKING HOURS</strong>
                <p>{workingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub Footer */}
      <section className="sub-footer py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {/* <Script src="https://apps.elfsight.com/p/platform.js" strategy="lazyOnload" />
              <div className="elfsight-app-4755684f-b1cf-4ee2-b1e8-26479ae849bb"></div> */}
              <h6 className="footer-copyright">
                {copyright}
              </h6>
            </div>
            <div className="col-md-6 text-md-end">
              {/* Placeholder for future footer note or credits */}
            </div>
          </div>
        </div>
      </section>

      {/* JS files with Script tag */}
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
    </>
  );
}
