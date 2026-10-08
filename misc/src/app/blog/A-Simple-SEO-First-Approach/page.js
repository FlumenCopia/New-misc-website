import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import SEOFirstApproach from '@/components/blog/SEO-FirstApproach';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'A-Simple-SEO-First-Approach';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Building Visibility on YouTube: A Simple SEO-First Approach"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<SEOFirstApproach />} />
            <FooterSection />
        </div>
    );
}