import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import TurningAnalyticsintoRevenue from '@/components/blog/TurningAnalyticsintoRevenue';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'turning-analytics-into-revenue';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Data-Driven Marketing: Turning Analytics into Revenue"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<TurningAnalyticsintoRevenue />} />
            <FooterSection />
        </div>
    );
}
