import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import GuidetoReadingAdMetrics from '@/components/blog/GuidetoReadingAdMetrics';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'guide-to-reading-ad-metrics';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "A Practical Guide to Reading Ad Metrics"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<GuidetoReadingAdMetrics />} />
            <FooterSection />
        </div>
    );
}
