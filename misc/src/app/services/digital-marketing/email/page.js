import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import CommonServiceTemplate from '@/components/services/CommonServiceTemplate';
import { getUnifiedService } from '@/lib/servicesData';

export const metadata = {
  title: 'E-mail Marketing & Automation Services | Miscarchive',
  description:
    'Turn leads into repeat customers with personalized, automated email marketing sequences and campaigns designed by Miscarchive.',
  keywords: 'Email Marketing, Drip Campaigns, Lead Nurturing, Automated Workflows, Newsletter Design',
};

export default async function EmailMarketingPage() {
  const service = await getUnifiedService('email');

  return (
    <div>
      <Header />
      <CommonServiceTemplate
        service={service}
        slug="email"
        isSubService={true}
        parentService={{ title: 'Digital Marketing', route: '/services/digital-marketing' }}
      />
      <FooterSection />
    </div>
  );
}
