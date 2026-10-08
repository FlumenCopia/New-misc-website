import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Service_DM from '@/components/services/Service_DM';
import Service_Content from '@/components/Service/Service_Content';
import { getServiceBySlug } from '@/lib/api';

export const metadata = {
  title: 'Digital Marketing company in trivandrum, Kerala | Miscarchive',
  description: 'Looking for the best digital marketing company in Trivandrum? Miscarchive offers expert SEO, social media marketing and more to grow your business online.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management',
};

export default async function page() {
  const service = await getServiceBySlug('digital-marketing');

  return (
    <div>
      <Header />
      <Service_DM title={service?.title} />
      <Service_Content initialService={service} />
      <FooterSection />
    </div>
  );
}
