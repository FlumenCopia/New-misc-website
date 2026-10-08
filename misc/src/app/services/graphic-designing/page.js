import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Service_Design from '@/components/services/Service_Design';
import GraphicDesign from '@/components/GraphicsDesigning/GraphicDesign';
import { getServiceBySlug } from '@/lib/api';

export const metadata = {
  title: 'Graphic Designing Services | Miscarchive',
  description: 'Looking for top-notch graphic design services in Trivandrum? Miscarchive offers brand identity, marketing visuals, and digital assets.',
  keywords: 'Graphic Designing, Brand Identity, Marketing Creatives, Visuals, Logo Design',
};

export default async function page() {
  const service = await getServiceBySlug('graphic-designing');

  return (
    <div>
      <Header />
      <Service_Design title={service?.title} />
      <GraphicDesign initialService={service} />
      <FooterSection />
    </div>
  );
}
