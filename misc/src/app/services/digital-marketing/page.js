import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import CommonServiceTemplate from '@/components/services/CommonServiceTemplate';
import { getUnifiedService } from '@/lib/servicesData';

export const metadata = {
  title: 'Digital Marketing Company in Trivandrum, Kerala | Miscarchive',
  description:
    'Looking for the best digital marketing company in Trivandrum? Miscarchive offers expert SEO, social media marketing, PPC campaigns, and content strategy to grow your business online.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management, PPC, Content Marketing',
};

export default async function DigitalMarketingPage() {
  const service = await getUnifiedService('digital-marketing');

  return (
    <div>
      <Header />
      <CommonServiceTemplate service={service} slug="digital-marketing" />
      <FooterSection />
    </div>
  );
}
