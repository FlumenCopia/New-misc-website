import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import CommonServiceTemplate from '@/components/services/CommonServiceTemplate';
import { getUnifiedService } from '@/lib/servicesData';

export const metadata = {
  title: 'Social Media Marketing (SMM) Services | Miscarchive',
  description:
    'Grow brand awareness and build loyal communities with Miscarchive social media marketing services across Instagram, LinkedIn, Facebook, and more.',
  keywords: 'SMM, Social Media Marketing, Instagram Growth, LinkedIn Marketing, Social Ads, Content Strategy',
};

export default async function SmmPage() {
  const service = await getUnifiedService('smm');

  return (
    <div>
      <Header />
      <CommonServiceTemplate
        service={service}
        slug="smm"
        isSubService={true}
        parentService={{ title: 'Digital Marketing', route: '/services/digital-marketing' }}
      />
      <FooterSection />
    </div>
  );
}
