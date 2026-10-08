import React from 'react';
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import CmsBlogArticle from '@/components/blog/CmsBlogArticle';
import Power_Of_Ai_Analytics from '@/components/blog/Power_Of_Ai_Analytics';
import { getBlogBySlug } from '@/lib/api';

const SLUG = 'the-power-of-ai-analytics';

export default async function page() {
    const blog = await getBlogBySlug(SLUG);

    return (
        <div>
            <Header />
            <Blogtitle title={blog?.title || "From Data to Decisions: The Power of AI Analytics"} />
            <CmsBlogArticle slug={SLUG} initialBlog={blog} fallback={<Power_Of_Ai_Analytics />} />
            <FooterSection />
        </div>
    );
}
