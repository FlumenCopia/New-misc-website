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
        zIndex: "9999",
        bottom: "22px",
        right: "22px",
        backgroundColor: "#25D366",
        color: "#ffffff",
        borderRadius: "50%",
        width: "48px",
        height: "48px",
        fontSize: "26px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
        textDecoration: "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <i className="fa-brands fa-whatsapp" style={{ lineHeight: 1 }}></i>
    </a>
  );
};

export default WhatsAppButton;
