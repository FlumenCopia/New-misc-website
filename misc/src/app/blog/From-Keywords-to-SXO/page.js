import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import FromKeywords from '@/components/blog/FromKeywords';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'From-Keywords-to-SXO';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "From Keywords to SXO: What SEO Looks Like in 2026"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<FromKeywords />} />
            <FooterSection />
        </div>
    );
}
