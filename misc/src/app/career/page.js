import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import CareerContent from '@/components/career/CareerContent';
import { getCareers, getSettings, getServices } from "@/lib/api";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Career at MiscArchive | Join Our Growing Team',
  description: 'Looking for the best digital marketing company in Trivandrum? Miscarchive offers expert SEO, social media marketing and more to grow your business online.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management',
};

export default async function page() {
  const [careers, settings, services] = await Promise.all([
    getCareers(),
    getSettings(),
    getServices(true),
  ]);

  return (
    <div>
      <Header settings={settings} services={services} />
      <CareerContent initialCareers={careers} />
      <FooterSection settings={settings} />
    </div>
  );
}
