import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import ServicesPage from '@/components/services/ServicesPage';
import { getServices, getServiceBySlug, getSettings } from '@/lib/api';

export const metadata = {
  title: 'Our Services | Miscarchive',
  description: 'Looking for the best digital marketing company in Trivandrum? Miscarchive offers expert SEO, social media marketing and more to grow your business online.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management',
};

export default async function page() {
  const [services, mainService, settings] = await Promise.all([
    getServices(true),
    getServiceBySlug('main-services'),
    getSettings(),
  ]);

  return (
    <div>
      <Header settings={settings} />
      <ServicesPage initialServices={services} initialMainService={mainService} />
      <FooterSection settings={settings} />
    </div>
  );
}
