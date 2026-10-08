import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import SEOandAEO from '@/components/blog/SEO-and-AEO';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'SEO-vs-AEO';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "SEO vs AEO: How to Win Both the Screen and the Speaker in 2025"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<SEOandAEO />} />
            <FooterSection />
        </div>
    );
}
