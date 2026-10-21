import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import CommonServiceTemplate from '@/components/services/CommonServiceTemplate';
import { getUnifiedService } from '@/lib/servicesData';

export const metadata = {
  title: 'Search Engine Marketing (SEM) & PPC Ads | Miscarchive',
  description:
    'Drive instant leads and sales with high-ROI paid advertising and Google Ads management from Miscarchive.',
  keywords: 'SEM, PPC, Google Ads, Pay-Per-Click Advertising, Performance Marketing, Ad Optimization',
};

export default async function SemPage() {
  const service = await getUnifiedService('sem');

  return (
    <div>
      <Header />
      <CommonServiceTemplate
        service={service}
        slug="sem"
        isSubService={true}
        parentService={{ title: 'Digital Marketing', route: '/services/digital-marketing' }}
      />
      <FooterSection />
    </div>
  );
}
