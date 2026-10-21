import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import CommonServiceTemplate from '@/components/services/CommonServiceTemplate';
import { getUnifiedService } from '@/lib/servicesData';

export const metadata = {
  title: 'Web Development Services in Trivandrum | Miscarchive',
  description:
    'Looking for expert web development in Trivandrum? Miscarchive offers custom, ultra-fast, responsive, and SEO-ready website and web application development services.',
  keywords: 'Web Development, Custom Websites, Responsive Design, Next.js, React, Full-Stack Engineering',
};

export default async function WebDevelopmentPage() {
  const service = await getUnifiedService('web-development');

  return (
    <div>
      <Header />
      <CommonServiceTemplate service={service} slug="web-development" />
      <FooterSection />
    </div>
  );
}
