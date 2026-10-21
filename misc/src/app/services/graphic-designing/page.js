import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import CommonServiceTemplate from '@/components/services/CommonServiceTemplate';
import { getUnifiedService } from '@/lib/servicesData';

export const metadata = {
  title: 'Graphic Designing Services in Trivandrum | Miscarchive',
  description:
    'Looking for top-notch graphic design services in Trivandrum? Miscarchive offers brand identity, marketing visuals, packaging, and digital assets that capture attention.',
  keywords: 'Graphic Designing, Brand Identity, Marketing Creatives, Visuals, Logo Design, Packaging, Print Design',
};

export default async function GraphicDesigningPage() {
  const service = await getUnifiedService('graphic-designing');

  return (
    <div>
      <Header />
      <CommonServiceTemplate service={service} slug="graphic-designing" />
      <FooterSection />
    </div>
  );
}
