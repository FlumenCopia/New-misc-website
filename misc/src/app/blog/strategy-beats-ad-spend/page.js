import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import StrategyBeatsAdSpend from '@/components/blog/StrategyBeatsAdSpend';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'strategy-beats-ad-spend';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "Top 5 Reasons Strategy Beats Ad Spend"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<StrategyBeatsAdSpend />} />
            <FooterSection />
        </div>
    );
}
