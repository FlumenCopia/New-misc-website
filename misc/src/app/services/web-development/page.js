import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Service_Web from '@/components/services/Service_Web';
import WebDevelopmentServices from '@/components/webdevelopment/WebDevelopmentServices';
import { getServiceBySlug } from '@/lib/api';

export const metadata = {
  title: 'Web Development Services | Miscarchive',
  description: 'Looking for expert web development in Trivandrum? Miscarchive offers custom, fast, and responsive website development services.',
  keywords: 'Web Development, Custom Websites, Responsive Design, Frontend, Backend',
};

export default async function page() {
  const service = await getServiceBySlug('web-development');

  return (
    <div>
      <Header />
      <Service_Web title={service?.title} />
      <WebDevelopmentServices initialService={service} />
      <FooterSection />
    </div>
  );
}
