import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Neyyattinkaratemplate from '@/components/Neyyattinkara/Neyyattinkaratemplate';
import NeyyattinkaraAbout from '@/components/Neyyattinkara/NeyyattinkaraAbout';
import ServicesNeyyattinkara from '@/components/Neyyattinkara/ServicesNeyyattinkara';
import WhyChoose from '@/components/Neyyattinkara/WhyChoose';
import ProcessSection from '@/components/Neyyattinkara/ProcessSection';
import WorkWith from '@/components/Neyyattinkara/WorkWith';
import { getSettings, getPageBySlug } from "@/lib/api";

export async function generateMetadata() {
  const page = await getPageBySlug('neyyattinkara');
  return {
    title: page?.metaTitle || 'Digital Marketing & Creative Agency in Neyyattinkara | MiscArchive',
    description:
      page?.metaDescription ||
      'Looking for the top digital marketing agency in Neyyattinkara? MiscArchive provides expert SEO, branding, web development, social media, and creative production.',
    keywords:
      'Digital Marketing Neyyattinkara, SEO Neyyattinkara, Web Development, Branding, Social Media Marketing, South Trivandrum',
  };
}

export default async function NeyyattinkaraPage() {
  const [settings, pageData] = await Promise.all([
    getSettings(),
    getPageBySlug('neyyattinkara'),
  ]);

  // Section component mapping
  const componentMap = {
    hero: (key) => (
      <Neyyattinkaratemplate
        key={key}
        heroHeading={pageData?.heroHeading}
        heroSubheading={pageData?.heroSubheading}
      />
    ),
    about: (key) => <NeyyattinkaraAbout key={key} />,
    services: (key) => <ServicesNeyyattinkara key={key} />,
    whyChoose: (key) => <WhyChoose key={key} />,
    process: (key) => <ProcessSection key={key} />,
    whoWeWorkWith: (key) => <WorkWith key={key} />,
  };

  // If pageData has sections, sort and render enabled sections
  const sectionsToRender = pageData?.sections && Array.isArray(pageData.sections)
    ? [...pageData.sections]
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        .filter((s) => s.isEnabled !== false)
    : null;

  return (
    <div>
      <Header settings={settings} />

      {sectionsToRender && sectionsToRender.length > 0 ? (
        sectionsToRender.map((sec, idx) => {
          const renderFn = componentMap[sec.sectionKey];
          return renderFn ? renderFn(sec.sectionKey || idx) : null;
        })
      ) : (
        /* Fallback default section sequence */
        <>
          <Neyyattinkaratemplate />
          <NeyyattinkaraAbout />
          <ServicesNeyyattinkara />
          <WhyChoose />
          <ProcessSection />
          <WorkWith />
        </>
      )}

      <FooterSection settings={settings} />
    </div>
  );
}
