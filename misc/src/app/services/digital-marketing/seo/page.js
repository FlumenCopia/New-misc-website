import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import CommonServiceTemplate from '@/components/services/CommonServiceTemplate';
import { getUnifiedService } from '@/lib/servicesData';

export const metadata = {
  title: 'Search Engine Optimization (SEO) Services | Miscarchive',
  description:
    'Boost organic rankings, drive targeted search traffic, and generate qualified leads with Miscarchive data-driven SEO services.',
  keywords: 'SEO, Search Engine Optimization, Technical SEO, Keyword Research, Link Building, Local SEO',
};

export default async function SeoPage() {
  const service = await getUnifiedService('seo');

  return (
    <div>
      <Header />
      <CommonServiceTemplate
        service={service}
        slug="seo"
        isSubService={true}
        parentService={{ title: 'Digital Marketing', route: '/services/digital-marketing' }}
      />
      <FooterSection />
    </div>
  );
}
