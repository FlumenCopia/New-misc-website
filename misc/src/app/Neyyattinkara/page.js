import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Neyyattinkaratemplate from '@/components/Neyyattinkara/Neyyattinkaratemplate';
import NeyyattinkaraAbout from '@/components/Neyyattinkara/NeyyattinkaraAbout';
import ServicesNeyyattinkara from '@/components/Neyyattinkara/ServicesNeyyattinkara';
import WhyChoose from '@/components/Neyyattinkara/WhyChoose';
import ProcessSection from '@/components/Neyyattinkara/ProcessSection';
import WorkWith from '@/components/Neyyattinkara/WorkWith';
import { getSettings } from "@/lib/api";

export const metadata = {
  title: 'Digital Marketing & Creative Agency in Neyyattinkara | MiscArchive',
  description:
    'Looking for the top digital marketing agency in Neyyattinkara? MiscArchive provides expert SEO, branding, web development, social media, and creative production.',
  keywords:
    'Digital Marketing Neyyattinkara, SEO Neyyattinkara, Web Development, Branding, Social Media Marketing, South Trivandrum',
};

export default async function NeyyattinkaraPage() {
  const settings = await getSettings();

  return (
    <div>
      <Header settings={settings} />
      <Neyyattinkaratemplate />
      <NeyyattinkaraAbout />
      <ServicesNeyyattinkara />
      <WhyChoose />
      <ProcessSection />
      <WorkWith />
      <FooterSection settings={settings} />
    </div>
  );
}
