import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import AiWithoutLosingMarketingSense from '@/components/blog/AiWithoutLosingMarketingSense';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'ai-without-losing-marketing-sense';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "A Guide to Using AI Without Losing Marketing Sense"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<AiWithoutLosingMarketingSense />} />
            <FooterSection />
        </div>
    );
}
