'use client';
import React, { useEffect, useState } from 'react';
import { getSettings } from '@/lib/api';

const WhatsAppButton = ({ phoneNumber }) => {
  const [number, setNumber] = useState(phoneNumber || "918848608726");

  useEffect(() => {
    if (!phoneNumber) {
      getSettings().then((s) => {
        if (s?.contact?.whatsappNumber) setNumber(s.contact.whatsappNumber);
      }).catch(() => {});
    }
  }, [phoneNumber]);

  const whatsappNumber = number.replace(/\D/g, '');
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <a 
    className="no-display"
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        zIndex:"99999",
        bottom: "20px",
        right:"20px",
        backgroundColor: "#25D366",
        color: "white",
        // padding: "4px 12px",
        borderRadius: "50%",
        width:'50px',
        height:'46px',
        fontSize: "32px",
        textAlign: "center",
        alignItems: "center",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <div>
        <i className="fa-brands fa-whatsapp"></i>
      </div>
    </a>
  );
};

export default WhatsAppButton;
