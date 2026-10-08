import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import LocalSeoStrategies from '@/components/blog/LocalSeoStrategies';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Local-SEO-Strategies';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Local SEO Strategies Every Business Needs in 2026"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<LocalSeoStrategies />} />
            <FooterSection />
        </div>
    );
}
