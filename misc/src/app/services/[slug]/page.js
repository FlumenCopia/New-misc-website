import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/common/Header';
import FooterSection from '@/components/common/Footer';
import CommonServiceTemplate from '@/components/services/CommonServiceTemplate';
import { getUnifiedService, getAllUnifiedServices } from '@/lib/servicesData';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const service = await getUnifiedService(slug);

  if (!service) {
    return {
      title: 'Our Services | Miscarchive',
      description: 'Explore tailored digital marketing, engineering, and design services from Miscarchive.',
    };
  }

  return {
    title: `${service.title} | Miscarchive Services`,
    description: service.shortDescription,
    keywords: service.features ? service.features.join(', ') : service.title,
  };
}

export default async function ServiceDynamicPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const service = await getUnifiedService(slug);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <Header />
      <CommonServiceTemplate service={service} slug={slug} />
      <FooterSection />
    </div>
  );
}
