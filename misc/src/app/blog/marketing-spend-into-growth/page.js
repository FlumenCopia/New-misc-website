import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import MarketingSpendIntoGrowth from '@/components/blog/MarketingSpendIntoGrowth';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'marketing-spend-into-growth';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "How to Turn Marketing Spend Into Growth"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<MarketingSpendIntoGrowth />} />
            <FooterSection />
        </div>
    );
}
