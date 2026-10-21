import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import ContactContent from '@/components/contact/ContactContent';
import { getSettings } from "@/lib/api";

export const metadata = {
  title: 'Contact Us | Miscarchive Digital Agency',
  description: 'Have a project in mind or want to know more about our services? Drop us a message and our team will get back to you shortly.',
  keywords: 'Contact Miscarchive, Digital Marketing Trivandrum, Web Development, SEO Kerala',
};

export default async function page() {
  const settings = await getSettings();

  return (
    <div>
      <Header settings={settings} />
      <ContactContent initialSettings={settings} />
      <FooterSection settings={settings} />
    </div>
  );
}
