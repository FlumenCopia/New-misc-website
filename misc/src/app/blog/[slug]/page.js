import React from 'react';
import { notFound } from 'next/navigation';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CommonBlogTemplate from '@/components/blog/CommonBlogTemplate';
import { getBlogBySlug, getSettings, getServices } from '@/lib/api';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Article | Miscarchive',
      description: 'Explore the latest insights on digital marketing, SEO, and web development from Miscarchive.',
    };
  }

  return {
    title: `${blog.seoTitle || blog.title} | Miscarchive`,
    description: blog.seoDescription || blog.excerpt || blog.shortDescription,
    keywords: blog.seoKeywords && Array.isArray(blog.seoKeywords) ? blog.seoKeywords.join(', ') : blog.category,
  };
}

export default async function DynamicBlogPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const [blog, settings, services] = await Promise.all([
    getBlogBySlug(slug),
    getSettings(),
    getServices(true),
  ]);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <Header settings={settings} services={services} />
      <Blogtitle title={blog.title} />
      <CommonBlogTemplate slug={slug} initialBlog={blog} />
      <FooterSection settings={settings} />
    </div>
  );
}
