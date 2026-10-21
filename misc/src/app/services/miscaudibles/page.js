import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import CommonServiceTemplate from '@/components/services/CommonServiceTemplate';
import { getUnifiedService } from '@/lib/servicesData';

export const metadata = {
  title: 'Misc Audible | Audio Production & Sound Design | Miscarchive',
  description:
    'Misc Audible is a Kerala-based production house specializing in podcasts, audiobook narration, sound design, and sonic branding crafted by professional sound engineers.',
  keywords: 'Misc Audible, Podcast Production, Audiobook Production, Sound Design, Sonic Branding, Audio Mastering',
};

export default async function MiscAudiblesPage() {
  const service = await getUnifiedService('miscaudibles');

  return (
    <div>
      <Header />
      <CommonServiceTemplate service={service} slug="miscaudibles" />
      <FooterSection />
    </div>
  );
}
