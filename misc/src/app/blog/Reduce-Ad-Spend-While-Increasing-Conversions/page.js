import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import ReduceAdSpend from '@/components/blog/ReduceAdSpend';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'Reduce-Ad-Spend-While-Increasing-Conversions';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Reduce Ad Spend While Increasing Conversions in 2026"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<ReduceAdSpend />} />
            <FooterSection />
        </div>
    );
}
