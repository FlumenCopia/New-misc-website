import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import MiscAudibles from '@/components/MiscAudibles/MiscAudibles';
import { getServiceBySlug } from '@/lib/api';

export const metadata = {
  title: 'Misc Audible | Miscarchive',
  description:
    'Misc Audible is a Kerala-based audible production house for podcasts, audiobooks, and sound design.',
  keywords: 'Misc Audible, Podcast Production, Audiobook Production, Sound Design',
};

export default async function page() {
  const service = await getServiceBySlug('miscaudibles');

  return (
    <div>
      <Header />
      <MiscAudibles initialService={service} />
      <FooterSection />
    </div>
  );
}
