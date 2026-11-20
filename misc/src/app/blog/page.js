import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import BlogContent from '@/components/blog/BlogContent';
import { getBlogs, getSettings, getServices } from "@/lib/api";

export const metadata = {
  title: 'Latest Updates | Miscarchive',
  description: 'Looking for the best digital marketing company in Trivandrum? Miscarchive offers expert SEO, social media marketing and more to grow your business online.',
  keywords: 'Digital Marketing, Marketing Solutions, Web Development, SEO, Social Media Management',
};

export default async function page() {
  const [blogs, settings, services] = await Promise.all([
    getBlogs({ limit: 100 }),
    getSettings(),
    getServices(true),
  ]);

  return (
    <div>
      <Header settings={settings} services={services} />
      <BlogContent initialBlogs={blogs} />
      <FooterSection settings={settings} />
    </div>
  );
}
